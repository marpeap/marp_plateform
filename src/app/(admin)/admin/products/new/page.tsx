import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllCategories } from "@/lib/supabase/admin";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = {
  title: "Nouveau produit | Admin",
  description: "Ajouter un nouveau produit",
};

export default async function NewProductPage() {
  const categories = await getAllCategories();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/products" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Retour aux produits
          </Link>
          <h1 className="section-title">Nouveau produit</h1>
          <p className="section-subtitle mt-2">
            Ajoutez un nouveau produit au catalogue
          </p>
        </div>

        <div className="card">
          <ProductForm categories={categories} />
        </div>
      </div>
    </div>
  );
}

