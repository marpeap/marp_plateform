import Link from "next/link";
import { Plus, ArrowLeft, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { getAllProducts } from "@/lib/supabase/admin";
import { formatPrice, getProductTypeLabel, cn } from "@/lib/utils";

export const metadata = {
  title: "Gestion des produits | Admin",
  description: "Gérez vos produits",
};

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  const typeColors = {
    digital: "bg-purple-100 text-purple-700",
    physical: "bg-amber-100 text-amber-700",
    formation: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" />
              Retour au dashboard
            </Link>
            <h1 className="section-title">Gestion des produits</h1>
            <p className="section-subtitle mt-2">
              {products.length} produit{products.length > 1 ? "s" : ""} dans le catalogue
            </p>
          </div>
          <Link href="/admin/products/new" className="btn-primary">
            <Plus className="h-5 w-5" />
            Nouveau produit
          </Link>
        </div>

        {/* Products Table */}
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-50 border-b border-dark-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-dark-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt=""
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-dark-100" />
                        )}
                        <div>
                          <p className="font-medium text-dark-900">{product.name}</p>
                          <p className="text-sm text-dark-500 line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("badge", typeColors[product.product_type])}>
                        {getProductTypeLabel(product.product_type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-dark-900">
                        {formatPrice(product.price)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.product_type === "physical" ? (
                        <span className={cn(
                          "font-medium",
                          product.stock && product.stock > 10 ? "text-green-600" :
                          product.stock && product.stock > 0 ? "text-amber-600" : "text-red-600"
                        )}>
                          {product.stock ?? 0}
                        </span>
                      ) : (
                        <span className="text-dark-400">∞</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.is_active ? (
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <Eye className="h-4 w-4" />
                          Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-dark-400">
                          <EyeOff className="h-4 w-4" />
                          Inactif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 rounded-lg text-dark-400 hover:text-primary-600 hover:bg-dark-100 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          className="p-2 rounded-lg text-dark-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-dark-500 mb-4">Aucun produit dans le catalogue</p>
              <Link href="/admin/products/new" className="btn-primary inline-flex">
                <Plus className="h-5 w-5" />
                Ajouter le premier produit
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

