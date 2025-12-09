import Link from "next/link";
import { ShoppingBag, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark-900 text-dark-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-500">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-display">
                Marpeap
              </span>
            </Link>
            <p className="text-sm text-dark-400 leading-relaxed">
              Votre destination pour des formations de qualité, des produits digitaux 
              exclusifs et des objets soigneusement sélectionnés.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Catégories
            </h3>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-dark-400">
                <Mail className="h-4 w-4 text-primary-400" />
                contact@marpeap.com
              </li>
              <li className="flex items-center gap-3 text-sm text-dark-400">
                <Phone className="h-4 w-4 text-primary-400" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-start gap-3 text-sm text-dark-400">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-dark-500">
              © {new Date().getFullYear()} Marpeap Digitals. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/mentions-legales"
                className="text-sm text-dark-500 hover:text-dark-300 transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/confidentialite"
                className="text-sm text-dark-500 hover:text-dark-300 transition-colors"
              >
                Confidentialité
              </Link>
              <Link
                href="/cgv"
                className="text-sm text-dark-500 hover:text-dark-300 transition-colors"
              >
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const quickLinks = [
  { href: "/", label: "Accueil" },
  { href: "/products", label: "Catalogue" },
  { href: "/login", label: "Connexion" },
  { href: "/register", label: "Inscription" },
];

const categoryLinks = [
  { href: "/products?type=formation", label: "Formations" },
  { href: "/products?type=digital", label: "Produits digitaux" },
  { href: "/products?type=physical", label: "Objets physiques" },
];

