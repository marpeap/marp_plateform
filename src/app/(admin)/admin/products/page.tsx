"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, ArrowLeft, Edit, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { formatPrice, getProductTypeLabel, cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(*)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data as Product[]);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      alert("Erreur lors de la suppression");
    }

    setDeletingId(null);
  };

  const toggleActive = async (id: string, currentState: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !currentState }),
      });

      if (response.ok) {
        setProducts(products.map(p => 
          p.id === id ? { ...p, is_active: !currentState } : p
        ));
      }
    } catch (error) {
      alert("Erreur lors de la mise à jour");
    }
  };

  const typeColors = {
    digital: "bg-purple-100 text-purple-700",
    physical: "bg-amber-100 text-amber-700",
    formation: "bg-blue-100 text-blue-700",
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold tracking-tight text-dark-900 md:text-4xl">Gestion des produits</h1>
            <p className="text-lg text-dark-500 mt-2">
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
                      <button
                        onClick={() => toggleActive(product.id, product.is_active)}
                        className={cn(
                          "inline-flex items-center gap-1 cursor-pointer hover:opacity-80",
                          product.is_active ? "text-green-600" : "text-dark-400"
                        )}
                      >
                        {product.is_active ? (
                          <>
                            <Eye className="h-4 w-4" />
                            Actif
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4" />
                            Inactif
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 rounded-lg text-dark-400 hover:text-primary-600 hover:bg-dark-100 transition-colors"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={deletingId === product.id}
                          className="p-2 rounded-lg text-dark-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Supprimer"
                        >
                          {deletingId === product.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
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
