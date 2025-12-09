import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { getProducts, getCategories } from "@/lib/supabase/products";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find(c => c.slug === slug);
  
  if (!category) {
    return { title: "Catégorie non trouvée" };
  }

  return {
    title: `${category.name} | Marpeap Digitals`,
    description: category.description || `Découvrez nos ${category.name.toLowerCase()}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  const products = await getProducts({ category: slug });

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <Link href="/products" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Retour au catalogue
          </Link>
          <h1 className="section-title">{category.name}</h1>
          {category.description && (
            <p className="section-subtitle mt-2">{category.description}</p>
          )}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-dark-500 mb-4">Aucun produit dans cette catégorie</p>
            <Link href="/products" className="btn-primary inline-flex">
              Voir tous les produits
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Suspense fallback={
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="aspect-[4/3] bg-dark-100 rounded-lg mb-4" />
                  <div className="h-4 bg-dark-100 rounded mb-2" />
                  <div className="h-3 bg-dark-100 rounded w-2/3" />
                </div>
              ))
            }>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}

