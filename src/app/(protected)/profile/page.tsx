import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProfile, updateProfile, signOut } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/forms/ProfileForm";

export const metadata = {
  title: "Mon Profil | Marpeap Digitals",
  description: "Gérez vos informations personnelles",
};

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Retour au tableau de bord
          </Link>
          <h1 className="section-title">Mon profil</h1>
          <p className="section-subtitle mt-2">
            Gérez vos informations personnelles
          </p>
        </div>

        <div className="card">
          <ProfileForm profile={profile} action={updateProfile} />
        </div>

        {/* Danger Zone */}
        <div className="mt-8 card border-red-200">
          <h3 className="text-lg font-semibold text-dark-900 mb-4">Zone de danger</h3>
          <p className="text-dark-500 mb-4">
            Se déconnecter de votre compte
          </p>
          <form action={signOut}>
            <button type="submit" className="btn bg-red-100 text-red-700 hover:bg-red-200">
              Se déconnecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

