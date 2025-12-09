import Link from "next/link";
import { SimpleHeader } from "@/components/SimpleHeader";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SimpleHeader />

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Formations & Produits Digitaux</h1>
        <p className="text-gray-600 mb-8">Développez vos compétences avec nos ressources</p>
        <Link href="/products" className="bg-orange-500 text-white px-6 py-3 rounded font-medium">
          Voir le catalogue
        </Link>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
          © 2025 Marpeap Digitals
        </div>
      </footer>
    </div>
  );
}
