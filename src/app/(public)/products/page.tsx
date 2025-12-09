import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ProductsPage() {
  const supabase = await createClient();
  
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b py-4">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">Marpeap</Link>
          <nav className="flex items-center gap-4">
            <Link href="/products" className="text-sm font-medium">Catalogue</Link>
            <Link href="/login" className="text-sm">Connexion</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Catalogue</h1>

        {!products || products.length === 0 ? (
          <p className="text-gray-500">Aucun produit disponible</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <span className="text-xs text-gray-500 uppercase">
                  {product.product_type === "formation" ? "Formation" : "Digital"}
                </span>
                <h2 className="font-semibold mt-1">{product.name}</h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold text-orange-500 mt-2">{product.price} €</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
