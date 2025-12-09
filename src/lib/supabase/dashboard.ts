import { createClient } from "./server";
import type { Order, Interaction, Product } from "@/types";

export async function getUserOrders(): Promise<Order[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(
        *,
        product:products(*)
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data as Order[];
}

export async function getUserInterests(): Promise<(Interaction & { product: Product })[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("interactions")
    .select(`
      *,
      product:products(
        *,
        category:categories(*)
      )
    `)
    .eq("user_id", user.id)
    .eq("interaction_type", "interest")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching interests:", error);
    return [];
  }

  return data as (Interaction & { product: Product })[];
}

export async function getUserDownloads(): Promise<(Interaction & { product: Product })[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  // Get purchased digital products
  const { data, error } = await supabase
    .from("orders")
    .select(`
      items:order_items(
        product:products(*)
      )
    `)
    .eq("user_id", user.id)
    .eq("status", "paid");

  if (error) {
    console.error("Error fetching downloads:", error);
    return [];
  }

  // Flatten and filter digital products
  const digitalProducts: Product[] = [];
  data?.forEach((order: any) => {
    order.items?.forEach((item: any) => {
      if (item.product && (item.product.product_type === "digital" || item.product.product_type === "formation")) {
        digitalProducts.push(item.product);
      }
    });
  });

  return digitalProducts.map((product) => ({
    id: product.id,
    user_id: user.id,
    product_id: product.id,
    interaction_type: "download" as const,
    metadata: null,
    created_at: new Date().toISOString(),
    product,
  }));
}

export async function getDashboardStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const [ordersResult, interestsResult, purchasesResult] = await Promise.all([
    supabase
      .from("orders")
      .select("id", { count: "exact" })
      .eq("user_id", user.id),
    supabase
      .from("interactions")
      .select("id", { count: "exact" })
      .eq("user_id", user.id)
      .eq("interaction_type", "interest"),
    supabase
      .from("orders")
      .select("total_amount")
      .eq("user_id", user.id)
      .eq("status", "paid"),
  ]);

  const totalSpent = purchasesResult.data?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

  return {
    ordersCount: ordersResult.count || 0,
    interestsCount: interestsResult.count || 0,
    totalSpent,
  };
}
