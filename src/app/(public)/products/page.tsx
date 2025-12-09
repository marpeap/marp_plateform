import { Suspense } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { getProducts, getCategories } from "@/lib/supabase/products";
import type { ProductType } from "@/types";

export const metadata = {
  title: "Catalogue | Marpeap Digitals",
  description: "Découvrez notre catalogue de produits, formations et objets",
};

interface ProductsPageProps {
  searchParams: Promise<{
    type?: ProductType;
    category?: string;
    search?: string;
  }>;
}

async function ProductsGrid({ searchParams }: { searchParams: { type?: ProductType; category?: string; search?: string } }) {
  const products = await getProducts({
    type: searchParams.type,
    category: searchParams.category,
    search: searchParams.search,
  });

  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-16">
        <div className="text-dark-400 mb-4">
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-dark-700">Aucun produit trouvé</h3>
        <p className="mt-2 text-dark-500">
          Essayez de modifier vos filtres ou effectuez une autre recherche.
        </p>
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categories = await getCategories();

  const pageTitle = params.type
    ? params.type === "formation"
      ? "Nos Formations"
      : params.type === "digital"
      ? "Produits Digitaux"
      : "Objets Physiques"
    : "Notre Catalogue";

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="section-title">{pageTitle}</h1>
          <p className="section-subtitle mt-2">
            Explorez notre sélection de produits et formations pour développer vos compétences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 card">
              <Suspense fallback={<div>Chargement...</div>}>
                <ProductFilters categories={categories} />
              </Suspense>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Suspense fallback={
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="aspect-[4/3] bg-dark-100 rounded-lg mb-4" />
                    <div className="h-4 bg-dark-100 rounded mb-2" />
                    <div className="h-3 bg-dark-100 rounded w-2/3" />
                  </div>
                ))
              }>
                <ProductsGrid searchParams={params} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

