"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useTrackView(productId: string) {
  useEffect(() => {
    const trackView = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      try {
        await fetch("/api/interactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            type: "view",
          }),
        });
      } catch (error) {
        console.error("Error tracking view:", error);
      }
    };

    trackView();
  }, [productId]);
}

