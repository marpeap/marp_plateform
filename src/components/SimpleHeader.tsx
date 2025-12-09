"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SimpleHeader() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // Vérifier la session actuelle
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();
        
        setIsAdmin(profile?.role === "admin");
      }
      setChecked(true);
    };

    checkAuth();

    // Écouter les changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            setIsAdmin(data?.role === "admin");
          });
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="border-b py-4">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">Marpeap</Link>
        <nav className="flex items-center gap-4">
          <Link href="/products" className="text-sm">Catalogue</Link>
          {checked && user ? (
            <>
              {isAdmin && <Link href="/admin" className="text-sm text-orange-500">Admin</Link>}
              <Link href="/dashboard" className="text-sm">Mon compte</Link>
              <button onClick={handleSignOut} className="text-sm text-red-500">Déconnexion</button>
            </>
          ) : checked ? (
            <>
              <Link href="/login" className="text-sm">Connexion</Link>
              <Link href="/register" className="text-sm bg-orange-500 text-white px-3 py-1.5 rounded">S&apos;inscrire</Link>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
