import { createClient } from "@/lib/supabase/server";
import { SimpleHeader } from "@/components/SimpleHeader";
import { ProductCard } from "@/components/ProductCard";

export default async function ProductsPage() {
  const supabase = await createClient();
  
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen">
      <SimpleHeader />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Catalogue</h1>

        {!products || products.length === 0 ? (
          <p className="text-gray-500">Aucun produit disponible</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
