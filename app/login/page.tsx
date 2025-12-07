"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Authentification OAuth (GitHub / Google).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full" onClick={() => signIn("github")}>
            Se connecter avec GitHub
          </Button>
          <Button className="w-full" variant="outline" onClick={() => signIn("google")}>
            Se connecter avec Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

