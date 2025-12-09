"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // TODO: Replace with actual auth state from Supabase
  const isAuthenticated = false;
  const isAdmin = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark-100 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-dark-900 font-display">
              Marpeap
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dark-600 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="btn-ghost"
              >
                <User className="h-4 w-4" />
                Mon compte
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn-ghost">
                  <LogIn className="h-4 w-4" />
                  Connexion
                </Link>
                <Link href="/register" className="btn-primary">
                  S&apos;inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden rounded-lg p-2 text-dark-600 hover:bg-dark-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden border-t border-dark-100 bg-white",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-base font-medium text-dark-700 hover:bg-dark-50 hover:text-primary-600 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-dark-100 space-y-2">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="btn-ghost w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                Mon compte
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn-ghost w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4" />
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="btn-primary w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  S&apos;inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

const navLinks = [
  { href: "/products", label: "Catalogue" },
  { href: "/products?type=formation", label: "Formations" },
  { href: "/products?type=digital", label: "Digitaux" },
  { href: "/products?type=physical", label: "Objets" },
];

