"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { slugify } from "@/lib/utils";
import type { Product, Category, ProductType } from "@/types";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!product);

  // Auto-generate slug from name
  useEffect(() => {
    if (autoSlug && name) {
      setSlug(slugify(name));
    }
  }, [name, autoSlug]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const data = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      long_description: formData.get("long_description") as string || null,
      price: parseFloat(formData.get("price") as string),
      category_id: formData.get("category_id") as string || null,
      product_type: formData.get("product_type") as ProductType,
      image_url: formData.get("image_url") as string || null,
      download_url: formData.get("download_url") as string || null,
      is_active: formData.get("is_active") === "on",
      stock: formData.get("stock") ? parseInt(formData.get("stock") as string) : null,
      tags: (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean),
    };

    try {
      const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products";
      const method = product ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    }

    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Slug */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-dark-700 mb-2">
            Nom du produit *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="Formation Marketing Digital"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-dark-700 mb-2">
            Slug URL *
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setAutoSlug(false);
            }}
            className="input"
            placeholder="formation-marketing-digital"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-dark-700 mb-2">
          Description courte *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={2}
          defaultValue={product?.description}
          className="input"
          placeholder="Une brève description du produit..."
        />
      </div>

      {/* Long Description */}
      <div>
        <label htmlFor="long_description" className="block text-sm font-medium text-dark-700 mb-2">
          Description détaillée
        </label>
        <textarea
          id="long_description"
          name="long_description"
          rows={5}
          defaultValue={product?.long_description || ""}
          className="input"
          placeholder="Description complète avec tous les détails..."
        />
      </div>

      {/* Type & Category */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="product_type" className="block text-sm font-medium text-dark-700 mb-2">
            Type de produit *
          </label>
          <select
            id="product_type"
            name="product_type"
            required
            defaultValue={product?.product_type || "digital"}
            className="input"
          >
            <option value="digital">Produit digital</option>
            <option value="physical">Produit physique</option>
            <option value="formation">Formation</option>
          </select>
        </div>
        <div>
          <label htmlFor="category_id" className="block text-sm font-medium text-dark-700 mb-2">
            Catégorie
          </label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={product?.category_id || ""}
            className="input"
          >
            <option value="">Aucune catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price & Stock */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-dark-700 mb-2">
            Prix (€) *
          </label>
          <input
            id="price"
            name="price"
            type="number"
            required
            min="0"
            step="0.01"
            defaultValue={product?.price || ""}
            className="input"
            placeholder="29.00"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-dark-700 mb-2">
            Stock (produits physiques)
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            defaultValue={product?.stock || ""}
            className="input"
            placeholder="100"
          />
        </div>
      </div>

      {/* URLs */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-dark-700 mb-2">
            URL de l&apos;image
          </label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            defaultValue={product?.image_url || ""}
            className="input"
            placeholder="https://..."
          />
        </div>
        <div>
          <label htmlFor="download_url" className="block text-sm font-medium text-dark-700 mb-2">
            URL de téléchargement
          </label>
          <input
            id="download_url"
            name="download_url"
            type="url"
            defaultValue={product?.download_url || ""}
            className="input"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-dark-700 mb-2">
          Tags (séparés par des virgules)
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          defaultValue={product?.tags?.join(", ") || ""}
          className="input"
          placeholder="marketing, seo, digital"
        />
      </div>

      {/* Active */}
      <div className="flex items-center gap-3">
        <input
          id="is_active"
          name="is_active"
          type="checkbox"
          defaultChecked={product?.is_active ?? true}
          className="h-4 w-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="is_active" className="text-sm font-medium text-dark-700">
          Produit actif (visible dans le catalogue)
        </label>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary flex-1 justify-center py-3"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary flex-1 justify-center py-3"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              {product ? "Mettre à jour" : "Créer le produit"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
