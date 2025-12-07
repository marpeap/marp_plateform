import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const event = req.headers.get("x-github-event") ?? "unknown";
  const payload = await req.json().catch(() => ({}));

  // TODO: vérifier la signature avec un secret
  // Exemple: header x-hub-signature-256

  return NextResponse.json({ received: true, event, payload });
}

