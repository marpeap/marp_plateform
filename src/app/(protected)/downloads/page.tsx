import Link from "next/link";
import { Download, ArrowLeft, ExternalLink } from "lucide-react";
import { getUserDownloads } from "@/lib/supabase/dashboard";
import { formatPrice, getProductTypeLabel, cn } from "@/lib/utils";

export const metadata = {
  title: "Mes Téléchargements | Marpeap Digitals",
  description: "Accédez à vos produits digitaux achetés",
};

export default async function DownloadsPage() {
  const downloads = await getUserDownloads();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Retour au tableau de bord
          </Link>
          <h1 className="section-title">Mes téléchargements</h1>
          <p className="section-subtitle mt-2">
            Accédez à tous vos produits digitaux et formations achetés
          </p>
        </div>

        {downloads.length === 0 ? (
          <div className="card text-center py-16">
            <Download className="h-16 w-16 text-dark-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-700 mb-2">Aucun téléchargement disponible</h3>
            <p className="text-dark-500 mb-6">
              Vos produits digitaux et formations apparaîtront ici après achat
            </p>
            <Link href="/products?type=digital" className="btn-primary inline-flex">
              Voir les produits digitaux
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {downloads.map((download) => (
              <div key={download.id} className="card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-dark-900">{download.product.name}</h3>
                      <span className={cn(
                        "badge text-xs",
                        download.product.product_type === "formation" 
                          ? "bg-blue-100 text-blue-700" 
                          : "bg-purple-100 text-purple-700"
                      )}>
                        {getProductTypeLabel(download.product.product_type)}
                      </span>
                    </div>
                    <p className="text-sm text-dark-500 line-clamp-2">
                      {download.product.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-dark-900">
                      {formatPrice(download.product.price)}
                    </span>
                    {download.product.download_url ? (
                      <a
                        href={download.product.download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <Download className="h-4 w-4" />
                        Télécharger
                      </a>
                    ) : (
                      <Link
                        href={`/products/${download.product.slug}`}
                        className="btn-secondary"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Accéder
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

