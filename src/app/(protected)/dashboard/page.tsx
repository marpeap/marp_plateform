"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        window.location.href = "/login";
        return;
      }

      setUser(user);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      console.log("Profile data:", profile);
      console.log("Profile error:", error);
      console.log("Role:", profile?.role);

      setProfile(profile);
      setLoading(false);
    };

    loadUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  const isAdmin = profile?.role === "admin";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b py-4">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">Marpeap</Link>
          <nav className="flex items-center gap-4">
            <Link href="/products" className="text-sm">Catalogue</Link>
            <Link href="/admin" className="text-sm text-orange-500 font-medium">Admin</Link>
            <button onClick={handleSignOut} className="text-sm text-red-500">
              Déconnexion
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Bonjour{profile?.full_name ? `, ${profile.full_name}` : ""} !
        </h1>

        {/* Debug info */}
        <div className="mb-6 p-3 bg-gray-100 rounded text-xs">
          <p>Email: {user?.email}</p>
          <p>Role: {profile?.role || "non défini"}</p>
          <p>Admin: {isAdmin ? "Oui" : "Non"}</p>
        </div>

        <div className="grid gap-4">
          <Link href="/products" className="border rounded-lg p-4 hover:bg-gray-50">
            <h2 className="font-medium">Catalogue</h2>
            <p className="text-sm text-gray-500">Explorer les produits</p>
          </Link>
          
          <Link href="/downloads" className="border rounded-lg p-4 hover:bg-gray-50">
            <h2 className="font-medium">Mes téléchargements</h2>
            <p className="text-sm text-gray-500">Accéder à mes achats</p>
          </Link>

          <Link href="/orders" className="border rounded-lg p-4 hover:bg-gray-50">
            <h2 className="font-medium">Mes commandes</h2>
            <p className="text-sm text-gray-500">Historique des achats</p>
          </Link>

          <Link href="/admin" className="border rounded-lg p-4 hover:bg-orange-50 border-orange-300">
            <h2 className="font-medium text-orange-600">Administration</h2>
            <p className="text-sm text-gray-500">Gérer les produits</p>
          </Link>
        </div>

        <div className="mt-8 p-4 border rounded-lg">
          <h2 className="font-medium mb-2">Mon compte</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </main>
    </div>
  );
}
