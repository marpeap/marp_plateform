"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Download, Eye } from "lucide-react";
import { cn, formatPrice, getProductTypeLabel } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onInterest?: (productId: string) => void;
  isInterested?: boolean;
}

export function ProductCard({ product, onInterest, isInterested = false }: ProductCardProps) {
  const typeColors = {
    digital: "bg-purple-100 text-purple-700",
    physical: "bg-amber-100 text-amber-700",
    formation: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="card group overflow-hidden p-0">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-dark-100 flex items-center justify-center">
            <Eye className="h-12 w-12 text-dark-300" />
          </div>
        )}
        
        {/* Badge type */}
        <div className="absolute top-4 left-4">
          <span className={cn("badge", typeColors[product.product_type])}>
            {getProductTypeLabel(product.product_type)}
          </span>
        </div>

        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-dark-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-dark-700 hover:bg-primary-500 hover:text-white transition-colors"
          >
            <Eye className="h-5 w-5" />
          </Link>
          {onInterest && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onInterest(product.id);
              }}
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                isInterested
                  ? "bg-red-500 text-white"
                  : "bg-white text-dark-700 hover:bg-red-500 hover:text-white"
              )}
            >
              <Heart className={cn("h-5 w-5", isInterested && "fill-current")} />
            </button>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-dark-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="mt-2 text-sm text-dark-500 line-clamp-2">
          {product.description}
        </p>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-dark-400 bg-dark-50 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price and Action */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-dark-900">
            {formatPrice(product.price)}
          </span>
          
          <Link
            href={`/products/${product.slug}`}
            className="btn-primary text-sm py-2 px-4"
          >
            {product.product_type === "digital" ? (
              <>
                <Download className="h-4 w-4" />
                Acheter
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Acheter
              </>
            )}
          </Link>
        </div>

        {/* Stock info for physical products */}
        {product.product_type === "physical" && product.stock !== null && (
          <p className={cn(
            "mt-2 text-xs",
            product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-amber-600" : "text-red-600"
          )}>
            {product.stock > 10
              ? "En stock"
              : product.stock > 0
              ? `Plus que ${product.stock} en stock`
              : "Rupture de stock"}
          </p>
        )}
      </div>
    </div>
  );
}

