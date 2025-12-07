import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: import("@prisma/client").Role;
    };
  }

  interface User {
    role: import("@prisma/client").Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: import("@prisma/client").Role;
  }
}

