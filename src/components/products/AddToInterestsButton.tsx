"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface AddToInterestsButtonProps {
  productId: string;
  initialIsInterested?: boolean;
}

export function AddToInterestsButton({ productId, initialIsInterested = false }: AddToInterestsButtonProps) {
  const [isInterested, setIsInterested] = useState(initialIsInterested);
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);
    
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Redirect to login
      window.location.href = `/login?redirect=/products`;
      return;
    }

    try {
      if (isInterested) {
        // Remove interest
        await supabase
          .from("interactions")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId)
          .eq("interaction_type", "interest");
        
        setIsInterested(false);
      } else {
        // Add interest
        await supabase
          .from("interactions")
          .insert({
            user_id: user.id,
            product_id: productId,
            interaction_type: "interest",
          });
        
        setIsInterested(true);
      }
    } catch (error) {
      console.error("Error updating interest:", error);
    }

    setIsPending(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "btn-outline flex-1 sm:flex-none justify-center",
        isInterested && "border-red-300 bg-red-50 text-red-600 hover:border-red-400 hover:bg-red-100"
      )}
    >
      {isPending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Heart className={cn("h-5 w-5", isInterested && "fill-current")} />
      )}
      {isInterested ? "Intéressé" : "Ajouter aux intérêts"}
    </button>
  );
}

