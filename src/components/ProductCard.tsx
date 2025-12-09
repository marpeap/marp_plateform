"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  product_type: string;
  image_url: string | null;
}

export function ProductCard({ product }: { product: Product }) {
  const [user, setUser] = useState<any>(null);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkAuth();
  }, []);

  const handleBuy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    setBuying(true);
    
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });

      const data = await response.json();

      if (data.url) {
        // Ouvrir Stripe dans une popup
        const width = 500;
        const height = 700;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        
        window.open(
          data.url,
          'stripe-checkout',
          `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
        );
      } else {
        alert(data.error || "Erreur");
      }
    } catch (error) {
      alert("Erreur lors du paiement");
    }
    
    setBuying(false);
  };

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/products/${product.slug}`}>
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-40 object-cover"
          />
        )}
        <div className="p-4">
          <span className="text-xs text-gray-500 uppercase">
            {product.product_type === "formation" ? "Formation" : "Digital"}
          </span>
          <h2 className="font-semibold mt-1">{product.name}</h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        </div>
      </Link>
      
      {/* Prix cliquable pour acheter */}
      <div className="px-4 pb-4">
        <button
          onClick={handleBuy}
          disabled={buying}
          className="text-lg font-bold text-orange-500 hover:text-white hover:bg-orange-500 px-3 py-1 rounded transition-all disabled:opacity-50"
        >
          {buying ? "..." : `${product.price} €`}
        </button>
      </div>
    </div>
  );
}

