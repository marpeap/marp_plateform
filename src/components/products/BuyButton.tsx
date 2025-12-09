"use client";

import { useState } from "react";
import { ShoppingCart, Download, Loader2 } from "lucide-react";
import type { Product } from "@/types";
import { createClient } from "@/lib/supabase/client";

interface BuyButtonProps {
  product: Product;
}

export function BuyButton({ product }: BuyButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleBuy = async () => {
    setIsPending(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = `/login?redirect=/products/${product.slug}`;
      return;
    }

    try {
      // Track the interaction
      await supabase.from("interactions").insert({
        user_id: user.id,
        product_id: product.id,
        interaction_type: "cart",
      });

      // Create Stripe checkout session
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          priceId: product.stripe_price_id,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Erreur lors de la création du paiement");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }

    setIsPending(false);
  };

  const isOutOfStock = product.product_type === "physical" && product.stock === 0;

  return (
    <button
      onClick={handleBuy}
      disabled={isPending || isOutOfStock}
      className="btn-primary flex-1 justify-center py-3 text-base"
    >
      {isPending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Chargement...
        </>
      ) : isOutOfStock ? (
        "Rupture de stock"
      ) : (
        <>
          {product.product_type === "digital" ? (
            <Download className="h-5 w-5" />
          ) : (
            <ShoppingCart className="h-5 w-5" />
          )}
          Acheter maintenant
        </>
      )}
    </button>
  );
}

