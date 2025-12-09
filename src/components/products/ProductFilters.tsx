"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface ProductFiltersProps {
  categories: Category[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentType = searchParams.get("type");
  const currentCategory = searchParams.get("category");
  const currentSearch = searchParams.get("search") || "";

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/products");
  };

  const productTypes = [
    { value: "formation", label: "Formations" },
    { value: "digital", label: "Digitaux" },
    { value: "physical", label: "Physiques" },
  ];

  const hasActiveFilters = currentType || currentCategory || currentSearch;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            defaultValue={currentSearch}
            onChange={(e) => {
              const value = e.target.value;
              // Debounce search
              const timeout = setTimeout(() => {
                updateFilters("search", value || null);
              }, 300);
              return () => clearTimeout(timeout);
            }}
            className="input pl-10 pr-10"
          />
          {currentSearch && (
            <button
              onClick={() => updateFilters("search", null)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-dark-700 mb-3">
          <SlidersHorizontal className="h-4 w-4" />
          Type de produit
        </h3>
        <div className="flex flex-wrap gap-2">
          {productTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => updateFilters("type", currentType === type.value ? null : type.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                currentType === type.value
                  ? "bg-primary-500 text-white"
                  : "bg-dark-100 text-dark-600 hover:bg-dark-200"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-dark-700 mb-3">Catégorie</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => updateFilters("category", currentCategory === category.slug ? null : category.slug)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                currentCategory === category.slug
                  ? "bg-primary-100 text-primary-700 font-medium"
                  : "text-dark-600 hover:bg-dark-50"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full btn-ghost justify-center text-sm"
        >
          <X className="h-4 w-4" />
          Effacer les filtres
        </button>
      )}
    </div>
  );
}

