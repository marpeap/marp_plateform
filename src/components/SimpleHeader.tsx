"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Circle } from "lucide-react";

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
    <header className="border-b-2 border-gold-300/50 bg-gradient-to-r from-white via-blue-50/50 to-slate-50/50 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="relative">
              <Image
                src="/images/Marpeap.png"
                alt="Marpeap Digitals"
                width={45}
                height={45}
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
              Marpeap Digitals
            </span>
          </Link>

          {/* Navigation principale */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="nav-link">Accueil</Link>
            <Link href="/products" className="nav-link">Catalogue</Link>
            <Link href="/projects" className="nav-link">Projets</Link>
            {checked && user && (
              <Link href="/profile" className="nav-link">Contact</Link>
            )}
          </nav>

          {/* Section connexion/déconnexion */}
          <div className="flex items-center gap-4">
            {checked && user ? (
              <>
                {/* Indicateur de connexion */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                  <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                  <span className="text-xs font-medium text-green-700">Connecté</span>
                </div>

                {/* Menu utilisateur */}
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <Link href="/admin" className="nav-link-active text-sm">
                      Admin
                    </Link>
                  )}
                  <Link href="/dashboard" className="nav-link text-sm">
                    Mon compte
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors border border-red-200"
                  >
                    <Circle className="h-2 w-2 fill-red-500 text-red-500" />
                    <span className="hidden sm:inline">Déconnexion</span>
                  </button>
                </div>
              </>
            ) : checked ? (
              <>
                {/* Indicateur de déconnexion */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200">
                  <Circle className="h-2 w-2 fill-red-500 text-red-500" />
                  <span className="text-xs font-medium text-red-700">Déconnecté</span>
                </div>

                <div className="flex items-center gap-3">
                  <Link href="/login" className="nav-link text-sm">
                    Connexion
                  </Link>
                  <Link href="/register" className="btn-primary text-sm px-4 py-2">
                    S&apos;inscrire
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                <Circle className="h-2 w-2 fill-slate-400 text-slate-400 animate-pulse" />
                <span className="text-xs font-medium text-slate-600">Chargement...</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation mobile */}
        <nav className="md:hidden flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gold-200/30">
          <Link href="/" className="nav-link text-sm">Accueil</Link>
          <Link href="/products" className="nav-link text-sm">Catalogue</Link>
          <Link href="/projects" className="nav-link text-sm">Projets</Link>
          {checked && user && (
            <Link href="/profile" className="nav-link text-sm">Contact</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
