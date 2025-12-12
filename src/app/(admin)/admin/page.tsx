"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const checkAdmin = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        window.location.href = "/dashboard";
        return;
      }

      setIsAdmin(true);

      const { data: products } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      setProducts(products || []);
      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen">
      <header className="border-b py-4">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">Marpeap</Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm">Mon compte</Link>
            <span className="text-sm text-orange-500 font-medium">Admin</span>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Administration</h1>
          <Link href="/admin/products/new" className="bg-orange-500 text-white px-4 py-2 rounded text-sm">
            + Nouveau produit
          </Link>
        </div>

        <div className="mb-6">
          <Link href="/admin/projects" className="text-sm text-primary-600 hover:text-primary-700 mb-4 inline-block">
            → Gérer les projets
          </Link>
        </div>

        <h2 className="font-medium mb-4">Produits ({products.length})</h2>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Nom</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Prix</th>
                <th className="text-left p-3">Actif</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.product_type}</td>
                  <td className="p-3">{product.price} €</td>
                  <td className="p-3">{product.is_active ? "✓" : "✗"}</td>
                  <td className="p-3">
                    <Link href={`/admin/products/${product.id}`} className="text-orange-500">
                      Modifier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
