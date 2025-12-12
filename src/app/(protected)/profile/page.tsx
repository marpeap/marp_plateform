import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProfile, updateProfile, signOut } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { ContactForm } from "@/components/forms/ContactForm";
import { SimpleHeader } from "@/components/SimpleHeader";

export const metadata = {
  title: "Mon Profil | Marpeap Digitals",
};

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen gradient-bg">
      <SimpleHeader />
      
      <div className="py-8">
        <div className="mx-auto max-w-4xl px-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-dark-500 hover:text-blue-600 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Tableau de bord
          </Link>
          
          <h1 className="text-3xl font-bold text-dark-900 mb-8">Mon profil</h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Formulaire de profil */}
            <div>
              <h2 className="text-xl font-semibold text-dark-900 mb-4">Informations personnelles</h2>
              <div className="card">
                <ProfileForm profile={profile} action={updateProfile} />
              </div>
            </div>

            {/* Formulaire de contact */}
            <div>
              <h2 className="text-xl font-semibold text-dark-900 mb-4">Nous contacter</h2>
              <ContactForm />
            </div>
          </div>

          <div className="card border-red-200 mt-6">
            <h3 className="font-semibold text-dark-900 mb-3">Déconnexion</h3>
            <form action={signOut}>
              <button type="submit" className="btn bg-red-100 text-red-700 hover:bg-red-200 text-sm">
                Se déconnecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
