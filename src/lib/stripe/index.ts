import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export async function createCheckoutSession({
  productId,
  productName,
  productDescription,
  price,
  userId,
  customerEmail,
  successUrl,
  cancelUrl,
}: {
  productId: string;
  productName: string;
  productDescription?: string;
  price: number;
  userId: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: productName,
            description: productDescription,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      productId,
      userId,
    },
  });

  return session;
}

export async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer"],
  });

  return session;
}

export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
) {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
