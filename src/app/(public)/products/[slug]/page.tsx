import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SimpleHeader } from "@/components/SimpleHeader";
import { BuySection } from "@/components/BuySection";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!product) notFound();

  return (
    <div className="min-h-screen">
      <SimpleHeader />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/products" className="text-sm text-gray-500 hover:text-orange-500 mb-4 inline-block">
          ← Retour au catalogue
        </Link>

        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        
        <span className="text-sm text-gray-500 uppercase">
          {product.product_type === "formation" ? "Formation" : "Produit digital"}
        </span>
        
        <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
        
        <p className="text-2xl font-bold text-orange-500 mt-4">{product.price} €</p>
        
        <p className="text-gray-600 mt-4">{product.description}</p>
        
        {product.long_description && (
          <div className="mt-6 text-gray-700 whitespace-pre-line">
            {product.long_description}
          </div>
        )}

        <BuySection productId={product.id} productName={product.name} price={product.price} />
      </main>
    </div>
  );
}
