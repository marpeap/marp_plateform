import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // MVP simple : pas de vérification middleware
  // L'authentification est gérée côté page
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
