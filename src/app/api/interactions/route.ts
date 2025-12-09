import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { InteractionType } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, type, metadata } = body as {
      productId: string;
      type: InteractionType;
      metadata?: Record<string, unknown>;
    };

    if (!productId || !type) {
      return NextResponse.json(
        { error: "productId et type sont requis" },
        { status: 400 }
      );
    }

    const validTypes: InteractionType[] = ["view", "interest", "cart", "purchase", "download"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: "Type d'interaction invalide" },
        { status: 400 }
      );
    }

    // For interest type, check if already exists
    if (type === "interest") {
      const { data: existing } = await supabase
        .from("interactions")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .eq("interaction_type", "interest")
        .single();

      if (existing) {
        return NextResponse.json(
          { message: "Intérêt déjà enregistré" },
          { status: 200 }
        );
      }
    }

    const { data, error } = await supabase
      .from("interactions")
      .insert({
        user_id: user.id,
        product_id: productId,
        interaction_type: type,
        metadata: metadata || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating interaction:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement de l'interaction" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Interaction error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const type = searchParams.get("type") as InteractionType;

    if (!productId || type !== "interest") {
      return NextResponse.json(
        { error: "Paramètres invalides" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("interactions")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .eq("interaction_type", "interest");

    if (error) {
      console.error("Error deleting interaction:", error);
      return NextResponse.json(
        { error: "Erreur lors de la suppression" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete interaction error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const type = searchParams.get("type") as InteractionType | null;

    let query = supabase
      .from("interactions")
      .select("*")
      .eq("user_id", user.id);

    if (productId) {
      query = query.eq("product_id", productId);
    }

    if (type) {
      query = query.eq("interaction_type", type);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching interactions:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Get interactions error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

