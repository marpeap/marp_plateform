import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  return NextResponse.json({ articles });
}

