import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
      {/* Header */}
      <header className="border-b py-4">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">Marpeap</Link>
          <nav className="flex items-center gap-4">
            <Link href="/products" className="text-sm">← Catalogue</Link>
            <Link href="/login" className="text-sm">Connexion</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
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

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-3">Pour acheter, connectez-vous à votre compte.</p>
          <Link href="/login" className="bg-orange-500 text-white px-6 py-2 rounded inline-block">
            Se connecter pour acheter
          </Link>
        </div>
      </main>
    </div>
  );
}
