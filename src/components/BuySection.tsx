"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface BuySectionProps {
  productId: string;
  productName: string;
  price: number;
}

export function BuySection({ productId, productName, price }: BuySectionProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };
    checkAuth();

    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleBuy = async () => {
    setBuying(true);
    
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
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
        alert(data.error || "Erreur lors de la création du paiement");
      }
    } catch (error) {
      alert("Erreur lors de la création du paiement");
    }
    
    setBuying(false);
  };

  if (loading) {
    return (
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <p className="text-gray-600 mb-3">Connectez-vous pour acheter ce produit</p>
        <Link href="/login" className="bg-orange-500 text-white px-6 py-2 rounded inline-block">
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-gray-600 mb-3">Prêt à acheter ?</p>
      <button
        onClick={handleBuy}
        disabled={buying}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50 transition-colors"
      >
        {buying ? "Ouverture..." : `Acheter - ${price} €`}
      </button>
    </div>
  );
}

// Composant pour le prix cliquable dans les cartes
export function PriceButton({ productId, price }: { productId: string; price: number }) {
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
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (data.url) {
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
      alert("Erreur");
    }
    
    setBuying(false);
  };

  return (
    <button
      onClick={handleBuy}
      disabled={buying}
      className="text-lg font-bold text-orange-500 hover:text-orange-600 hover:underline cursor-pointer disabled:opacity-50"
    >
      {buying ? "..." : `${price} €`}
    </button>
  );
}
