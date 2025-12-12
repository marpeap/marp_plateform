"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { SimpleHeader } from "@/components/SimpleHeader";
import { ProductCard } from "@/components/products/ProductCard";
import { GraduationCap, Package } from "lucide-react";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"formations" | "products">("formations");
  const [formations, setFormations] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      setLoading(true);

      // Récupérer les formations
      const { data: formationsData } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .eq("product_type", "formation")
        .order("created_at", { ascending: false });

      // Récupérer les produits digitaux
      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .in("product_type", ["digital", "physical"])
        .order("created_at", { ascending: false });

      setFormations(formationsData || []);
      setProducts(productsData || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      <SimpleHeader />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Onglets */}
        <div className="mb-8">
          <div className="flex gap-2 border-b-2 border-gold-200/50">
            <button
              onClick={() => setActiveTab("formations")}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                activeTab === "formations"
                  ? "text-blue-600 border-b-2 border-gold-400 -mb-[2px] bg-gradient-to-b from-blue-50 to-transparent"
                  : "text-slate-600 hover:text-blue-500"
              }`}
            >
              <GraduationCap className="h-5 w-5" />
              Formations
              {formations.length > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
                  {formations.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                activeTab === "products"
                  ? "text-blue-600 border-b-2 border-gold-400 -mb-[2px] bg-gradient-to-b from-blue-50 to-transparent"
                  : "text-slate-600 hover:text-blue-500"
              }`}
            >
              <Package className="h-5 w-5" />
              Produits
              {products.length > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
                  {products.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Contenu */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Chargement...</p>
          </div>
        ) : activeTab === "formations" ? (
          formations.length === 0 ? (
            <div className="card text-center py-12">
              <GraduationCap className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 mb-4">Aucune formation disponible pour le moment.</p>
              <button
                onClick={() => setActiveTab("products")}
                className="btn-outline"
              >
                Voir les produits
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {formations.map((formation) => (
                <ProductCard key={formation.id} product={formation} />
              ))}
            </div>
          )
        ) : products.length === 0 ? (
          <div className="card text-center py-12">
            <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 mb-4">Aucun produit disponible pour le moment.</p>
            <button
              onClick={() => setActiveTab("formations")}
              className="btn-outline"
            >
              Voir les formations
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
