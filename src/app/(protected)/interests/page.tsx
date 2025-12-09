import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { getUserInterests } from "@/lib/supabase/dashboard";
import { ProductCard } from "@/components/products/ProductCard";

export const metadata = {
  title: "Mes Intérêts | Marpeap Digitals",
  description: "Consultez les produits qui vous intéressent",
};

export default async function InterestsPage() {
  const interests = await getUserInterests();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Retour au tableau de bord
          </Link>
          <h1 className="section-title">Mes centres d&apos;intérêt</h1>
          <p className="section-subtitle mt-2">
            Les produits que vous avez marqués comme intéressants
          </p>
        </div>

        {interests.length === 0 ? (
          <div className="card text-center py-16">
            <Heart className="h-16 w-16 text-dark-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-700 mb-2">Aucun intérêt enregistré</h3>
            <p className="text-dark-500 mb-6">
              Parcourez notre catalogue et marquez les produits qui vous intéressent
            </p>
            <Link href="/products" className="btn-primary inline-flex">
              Explorer le catalogue
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {interests.map((interest) => (
              <ProductCard
                key={interest.id}
                product={interest.product}
                isInterested={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

