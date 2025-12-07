"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { Paperclip, Send } from "lucide-react";
import { submitContact, type ContactFormState } from "./actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactFormState = { ok: false };

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContact, initialState);

  useEffect(() => {
    if (state.ok) {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 150);
    }
  }, [state.ok]);

  return (
    <div className="container grid gap-8 py-10 lg:grid-cols-[1fr_0.8fr]">
      <div className="space-y-4">
        <Badge variant="soft">Contact pro</Badge>
        <h1 className="text-3xl font-semibold">Un besoin concret ? Discutons-en.</h1>
        <p className="text-muted-foreground">
          Décrivez brièvement votre projet. Réponse rapide, devis clair, livrables nettes.
        </p>
        <div className="grid gap-3 rounded-lg border border-border/70 bg-muted/40 p-4 text-sm">
          <div className="flex items-center justify-between">
            <span>Telegram (pro)</span>
            <Link href="https://t.me" className="text-primary hover:underline">
              @marpeap
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <span>Email business</span>
            <Link href="mailto:contact@marpeap-digitals.fr" className="text-primary hover:underline">
              contact@marpeap-digitals.fr
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <span>Disponibilité</span>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-600">
              Ouvert aux missions
            </span>
          </div>
        </div>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Formulaire sécurisé</CardTitle>
          <CardDescription>Anti-spam (honeypot), validation et stockage interne.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <input type="text" name="nickname" className="hidden" tabIndex={-1} aria-hidden />
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" name="name" placeholder="Votre nom" required />
              {state.errors?.name && (
                <p className="text-xs text-destructive">{state.errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="vous@domaine.com"
                required
              />
              {state.errors?.email && (
                <p className="text-xs text-destructive">{state.errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Décrivez rapidement le contexte, objectifs, deadlines."
                required
              />
              {state.errors?.message && (
                <p className="text-xs text-destructive">{state.errors.message}</p>
              )}
            </div>
            {state.message && (
              <div
                className={`rounded-md border px-3 py-2 text-sm ${state.ok ? "border-emerald-400 text-emerald-600" : "border-destructive text-destructive"}`}
              >
                {state.message}
              </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" className="w-full sm:w-auto">
                Envoyer <Send className="ml-2 h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                Joindre un document <Paperclip className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

