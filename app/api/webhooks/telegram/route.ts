import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json().catch(() => ({}));

  // TODO: vérifier le token secret Telegram via l'URL ou un header personnalisé

  if (payload?.message?.text) {
    return NextResponse.json({
      received: true,
      echo: payload.message.text,
    });
  }

  return NextResponse.json({ received: true });
}

