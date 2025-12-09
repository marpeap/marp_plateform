import { createClient } from "./server";
import type { Product, Profile, Order, Category } from "@/types";

// Products
export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data as Product[];
}

export async function createProduct(product: Partial<Product>): Promise<{ data: Product | null; error: string | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Product, error: null };
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

export async function deleteProduct(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

// Clients
export async function getAllClients(): Promise<Profile[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching clients:", error);
    return [];
  }

  return data as Profile[];
}

export async function getClientStats(userId: string) {
  const supabase = await createClient();

  const [ordersResult, interestsResult, purchasesResult] = await Promise.all([
    supabase
      .from("orders")
      .select("id", { count: "exact" })
      .eq("user_id", userId),
    supabase
      .from("interactions")
      .select("id", { count: "exact" })
      .eq("user_id", userId)
      .eq("interaction_type", "interest"),
    supabase
      .from("orders")
      .select("total_amount")
      .eq("user_id", userId)
      .eq("status", "paid"),
  ]);

  const totalSpent = purchasesResult.data?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

  return {
    ordersCount: ordersResult.count || 0,
    interestsCount: interestsResult.count || 0,
    totalSpent,
  };
}

// Orders
export async function getAllOrders(): Promise<Order[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(
        *,
        product:products(*)
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data as Order[];
}

export async function updateOrderStatus(id: string, status: string): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

// Categories
export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data as Category[];
}

export async function createCategory(category: Partial<Category>): Promise<{ data: Category | null; error: string | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Category, error: null };
}

// Dashboard Stats
export async function getAdminStats() {
  const supabase = await createClient();

  const [productsResult, clientsResult, ordersResult, revenueResult] = await Promise.all([
    supabase.from("products").select("id", { count: "exact" }).eq("is_active", true),
    supabase.from("profiles").select("id", { count: "exact" }),
    supabase.from("orders").select("id", { count: "exact" }),
    supabase.from("orders").select("total_amount").eq("status", "paid"),
  ]);

  const totalRevenue = revenueResult.data?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

  return {
    productsCount: productsResult.count || 0,
    clientsCount: clientsResult.count || 0,
    ordersCount: ordersResult.count || 0,
    totalRevenue,
  };
}

