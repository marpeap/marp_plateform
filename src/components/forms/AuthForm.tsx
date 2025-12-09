"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Mail, Lock, User, ArrowRight } from "lucide-react";

interface AuthFormProps {
  type: "login" | "register" | "reset";
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean; message?: string }>;
}

export function AuthForm({ type, action }: AuthFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const result = await action(formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.message || "Opération réussie");
    }

    setIsPending(false);
  };

  const titles = {
    login: "Connexion",
    register: "Créer un compte",
    reset: "Réinitialiser le mot de passe",
  };

  const subtitles = {
    login: "Connectez-vous pour accéder à votre espace",
    register: "Rejoignez notre communauté dès maintenant",
    reset: "Entrez votre email pour recevoir un lien de réinitialisation",
  };

  const buttonLabels = {
    login: "Se connecter",
    register: "Créer mon compte",
    reset: "Envoyer le lien",
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-dark-900 font-display">{titles[type]}</h1>
        <p className="mt-2 text-dark-500">{subtitles[type]}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {type === "register" && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-dark-700 mb-2">
              Nom complet
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="input pl-10"
                placeholder="Jean Dupont"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-2">
            Adresse email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input pl-10"
              placeholder="vous@exemple.com"
            />
          </div>
        </div>

        {type !== "reset" && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-dark-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="input pl-10"
                placeholder="••••••••"
              />
            </div>
            {type === "login" && (
              <div className="mt-2 text-right">
                <Link href="/reset-password" className="text-sm text-primary-600 hover:text-primary-700">
                  Mot de passe oublié ?
                </Link>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary w-full justify-center py-3 text-base"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Chargement...
            </>
          ) : (
            <>
              {buttonLabels[type]}
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        {type === "login" ? (
          <p className="text-dark-500">
            Pas encore de compte ?{" "}
            <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              Créer un compte
            </Link>
          </p>
        ) : type === "register" ? (
          <p className="text-dark-500">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Se connecter
            </Link>
          </p>
        ) : (
          <p className="text-dark-500">
            <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Retour à la connexion
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

