"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function NewProductPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
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

      const { data: cats } = await supabase.from("categories").select("*");
      setCategories(cats || []);
      setLoading(false);
    };

    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const form = new FormData(e.currentTarget);
    const supabase = createClient();

    const { error } = await supabase.from("products").insert({
      name: form.get("name"),
      slug: form.get("slug"),
      description: form.get("description"),
      long_description: form.get("long_description") || null,
      price: parseFloat(form.get("price") as string),
      product_type: form.get("product_type"),
      category_id: form.get("category_id") || null,
      image_url: form.get("image_url") || null,
      is_active: form.get("is_active") === "on",
    });

    if (error) {
      alert("Erreur: " + error.message);
      setSaving(false);
    } else {
      window.location.href = "/admin";
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b py-4">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">Marpeap</Link>
          <Link href="/admin" className="text-sm">← Admin</Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Nouveau produit</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom *</label>
            <input name="name" required className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug URL *</label>
            <input name="slug" required className="w-full border rounded px-3 py-2" placeholder="mon-produit" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description courte *</label>
            <textarea name="description" required rows={2} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description longue</label>
            <textarea name="long_description" rows={4} className="w-full border rounded px-3 py-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Prix (€) *</label>
              <input name="price" type="number" step="0.01" required className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type *</label>
              <select name="product_type" required className="w-full border rounded px-3 py-2">
                <option value="digital">Digital</option>
                <option value="formation">Formation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <select name="category_id" className="w-full border rounded px-3 py-2">
              <option value="">Aucune</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL Image</label>
            <input name="image_url" type="url" className="w-full border rounded px-3 py-2" />
          </div>

          <div className="flex items-center gap-2">
            <input name="is_active" type="checkbox" defaultChecked id="active" />
            <label htmlFor="active" className="text-sm">Produit actif</label>
          </div>

          <div className="flex gap-4 pt-4">
            <Link href="/admin" className="flex-1 text-center border rounded py-2">Annuler</Link>
            <button type="submit" disabled={saving} className="flex-1 bg-orange-500 text-white rounded py-2 disabled:opacity-50">
              {saving ? "Enregistrement..." : "Créer"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
