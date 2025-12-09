"use client";

import { useState } from "react";
import { Loader2, Save, User, Mail, Phone } from "lucide-react";
import type { Profile } from "@/types";

interface ProfileFormProps {
  profile: Profile;
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
}

export function ProfileForm({ profile, action }: ProfileFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await action(formData);

    if (result?.error) {
      setMessage({ type: "error", text: result.error });
    } else if (result?.success) {
      setMessage({ type: "success", text: "Profil mis à jour avec succès" });
    }

    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-2">
          Adresse email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
          <input
            id="email"
            type="email"
            value={profile.email}
            disabled
            className="input pl-10 bg-dark-50 text-dark-500 cursor-not-allowed"
          />
        </div>
        <p className="mt-1 text-xs text-dark-400">L&apos;email ne peut pas être modifié</p>
      </div>

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
            defaultValue={profile.full_name || ""}
            className="input pl-10"
            placeholder="Jean Dupont"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-dark-700 mb-2">
          Téléphone (optionnel)
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={profile.phone || ""}
            className="input pl-10"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg text-sm ${
          message.type === "success" 
            ? "bg-green-50 border border-green-200 text-green-700" 
            : "bg-red-50 border border-red-200 text-red-700"
        }`}>
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full justify-center py-3"
      >
        {isPending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Enregistrement...
          </>
        ) : (
          <>
            <Save className="h-5 w-5" />
            Enregistrer les modifications
          </>
        )}
      </button>
    </form>
  );
}

