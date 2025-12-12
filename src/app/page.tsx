import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  Laptop2,
  PlayCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/supabase/products";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(6);

  const highlights = [
    {
      title: "Formations guidées",
      description: "Des parcours structurés pour progresser rapidement.",
      icon: BookOpen,
    },
    {
      title: "Ressources prêtes à l'emploi",
      description: "Templates, checklists et assets digitaux clé-en-main.",
      icon: Laptop2,
    },
    {
      title: "Accompagnement",
      description: "Support réactif et mises à jour continues.",
      icon: ShieldCheck,
    },
  ];

  const stats = [
    { value: "1 200+", label: "apprenants accompagnés" },
    { value: "40+", label: "ressources et produits actifs" },
    { value: "4.8/5", label: "satisfaction moyenne" },
  ];

  const steps = [
    {
      title: "Choisissez votre ressource",
      description: "Filtrez par thématique et type pour trouver l'essentiel.",
      icon: Sparkles,
    },
    {
      title: "Passez à l'action",
      description: "Paiement sécurisé, accès immédiat aux contenus.",
      icon: PlayCircle,
    },
    {
      title: "Progressez chaque semaine",
      description: "Mises à jour, bonus et support pour rester motivé.",
      icon: Clock3,
    },
  ];

  return (
    <div className="min-h-screen gradient-bg text-dark-900">
      <SimpleHeader />

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* Hero */}
        <section className="card mt-8">
          <div className="px-6 py-12 md:px-12 md:py-16 flex flex-col gap-10 md:flex-row md:items-center">
            <div className="space-y-6 md:w-3/5">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                <Sparkles className="h-4 w-4" />
                Nouveautés 2025
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Accélérez vos projets digitaux avec{" "}
                  <span className="text-gradient">Marpeap Digitals</span>
                </h1>
                <p className="text-lg text-dark-500 max-w-2xl">
                  Formations, ressources et produits digitaux prêts à l&apos;emploi pour lancer, automatiser et
                  monétiser vos idées plus vite.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/products" className="btn-primary text-base px-5">
                  Voir le catalogue
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/register" className="btn-outline text-base px-5">
                  Créer un compte
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-dark-500">
                <div className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-600" />
                  Accès immédiat aux ressources
                </div>
                <div className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-600" />
                  Paiement sécurisé
                </div>
                <div className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-600" />
                  Mises à jour incluses
                </div>
              </div>
            </div>

            <div className="md:w-2/5">
              <div className="card">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-10 w-10 text-primary-600" />
                  <div>
                    <p className="text-sm text-dark-500">Parcours recommandés</p>
                    <p className="text-lg font-semibold">Focus sur l&apos;impact</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {highlights.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="mt-0.5 h-10 w-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-dark-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3 rounded-xl bg-dark-50 px-4 py-3 text-sm text-dark-600">
                  <ShieldCheck className="h-5 w-5 text-primary-600" />
                  Garantie satisfaction : accompagnement jusqu&apos;à la réussite de votre objectif.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="card">
              <p className="text-3xl font-bold text-primary-600">{item.value}</p>
              <p className="text-sm text-dark-500">{item.label}</p>
            </div>
          ))}
        </section>

        {/* Pourquoi nous choisir */}
        <section className="mt-14">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-primary-600">Pourquoi Marpeap</p>
              <h2 className="section-title mt-1">Pensé pour apprendre et livrer vite</h2>
              <p className="section-subtitle">Un écosystème cohérent pour passer de l&apos;idée au résultat.</p>
            </div>
            <Link href="/products" className="text-sm font-semibold text-primary-700 hover:text-primary-800">
              Découvrir les ressources <ArrowRight className="inline h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="card h-full">
                <div className="h-11 w-11 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-dark-500">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Produits en avant */}
        <section className="mt-14">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-primary-600">Catalogue</p>
              <h2 className="section-title mt-1">Produits mis en avant</h2>
              <p className="section-subtitle">Une sélection récente pour démarrer maintenant.</p>
            </div>
            <Link href="/products" className="btn-outline text-sm px-4 py-2">
              Tout voir
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="card mt-8 bg-dark-50 text-dark-600">
              Aucun produit actif pour le moment. Revenez vite, de nouvelles ressources arrivent.
            </div>
          )}
        </section>

        {/* Parcours en 3 étapes */}
        <section className="mt-14">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-primary-600">Méthode</p>
              <h2 className="section-title mt-1">Un parcours simple pour passer à l&apos;action</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="card h-full">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-accent-50 text-accent-700 flex items-center justify-center">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-dark-500">Étape {index + 1}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-dark-500">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA finale */}
        <section className="mt-16">
          <div className="card gradient-blue-silver text-white border-gold-400/50">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase font-semibold text-white/80">Prêt à démarrer</p>
                <h3 className="mt-2 text-2xl font-bold">Lancez votre prochain projet aujourd&apos;hui</h3>
                <p className="text-white/80 mt-1">
                  Accédez à l&apos;ensemble des formations et ressources en quelques secondes.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/products" className="btn bg-white text-primary-700 hover:bg-white/90">
                  Explorer les ressources
                </Link>
                <Link href="/login" className="btn-ghost bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-gold-300/50 py-6 mt-auto bg-gradient-to-r from-white via-blue-50/50 to-slate-50/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col gap-2 text-sm text-dark-500 md:flex-row md:items-center md:justify-between">
          <span>© 2025 Marpeap Digitals. Tous droits réservés.</span>
          <div className="flex items-center gap-4">
            <Link href="/products" className="hover:text-primary-700">Catalogue</Link>
            <Link href="/dashboard" className="hover:text-primary-700">Espace client</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
