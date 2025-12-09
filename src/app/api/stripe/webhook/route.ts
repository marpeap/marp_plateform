import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { constructWebhookEvent, getCheckoutSession } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = constructWebhookEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutComplete(session);
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment failed:", paymentIntent.id);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const supabase = await createServiceClient();
  
  const productId = session.metadata?.productId;
  const userId = session.metadata?.userId;

  if (!productId || !userId) {
    console.error("Missing metadata in checkout session");
    return;
  }

  // Get product info
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (!product) {
    console.error("Product not found:", productId);
    return;
  }

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      stripe_session_id: session.id,
      status: "paid",
      total_amount: (session.amount_total || 0) / 100, // Convert from cents
      shipping_address: null,
    })
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    return;
  }

  // Create order item
  const { error: itemError } = await supabase
    .from("order_items")
    .insert({
      order_id: order.id,
      product_id: productId,
      quantity: 1,
      unit_price: product.price,
    });

  if (itemError) {
    console.error("Error creating order item:", itemError);
    return;
  }

  // Track purchase interaction
  await supabase
    .from("interactions")
    .insert({
      user_id: userId,
      product_id: productId,
      interaction_type: "purchase",
      metadata: {
        order_id: order.id,
        amount: product.price,
      },
    });

  // Update stock for physical products
  if (product.product_type === "physical" && product.stock !== null) {
    await supabase
      .from("products")
      .update({ stock: product.stock - 1 })
      .eq("id", productId);
  }

  console.log("Order created successfully:", order.id);
}

