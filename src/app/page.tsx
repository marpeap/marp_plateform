import Link from "next/link";
import { ArrowRight, BookOpen, Package, Sparkles, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-primary-950 py-24 md:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-stagger">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-400 ring-1 ring-primary-500/20 mb-6">
              <Sparkles className="h-4 w-4" />
              Nouveau : Formations disponibles
            </span>
            
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-display">
              Développez vos{" "}
              <span className="text-gradient">compétences</span>
              <br />
              avec nos produits exclusifs
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-dark-300 md:text-xl">
              Découvrez notre catalogue de formations, produits digitaux et objets 
              soigneusement sélectionnés pour vous accompagner dans votre réussite.
            </p>
            
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/products" className="btn-primary text-base px-8 py-3">
                Explorer le catalogue
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/register" className="btn-outline border-dark-600 text-white hover:border-primary-400 hover:text-primary-400 text-base px-8 py-3">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Pourquoi nous choisir ?</h2>
            <p className="section-subtitle mt-4 max-w-2xl mx-auto">
              Une plateforme pensée pour vous offrir la meilleure expérience
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="card group hover:border-primary-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary-100 p-3 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-dark-900 mb-2">{feature.title}</h3>
                <p className="text-dark-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-dark-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos catégories</h2>
            <p className="section-subtitle mt-4">
              Explorez notre offre variée de produits et formations
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-dark-100 transition-all duration-300 hover:shadow-lg hover:border-primary-200 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className={`inline-flex items-center justify-center rounded-xl p-3 mb-4 ${category.bgColor} ${category.textColor}`}>
                  <category.icon className="h-7 w-7" />
                </div>
                
                <h3 className="text-xl font-semibold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-dark-500 mb-4">{category.description}</p>
                
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary-600">
                  Découvrir
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-16 md:px-16 md:py-20">
            {/* Background decoration */}
            <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 opacity-20">
              <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="200" r="200" fill="white" />
              </svg>
            </div>
            
            <div className="relative max-w-2xl">
              <h2 className="text-3xl font-bold text-white md:text-4xl font-display">
                Prêt à commencer votre parcours ?
              </h2>
              <p className="mt-4 text-lg text-primary-100">
                Rejoignez notre communauté et accédez à des ressources exclusives 
                pour booster votre développement personnel et professionnel.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/register" className="btn bg-white text-primary-600 hover:bg-primary-50 text-base px-8 py-3">
                  Créer mon compte gratuit
                </Link>
                <Link href="/products" className="btn border-2 border-white/30 text-white hover:bg-white/10 text-base px-8 py-3">
                  Voir les produits
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Produits de qualité",
    description: "Chaque produit est soigneusement sélectionné et vérifié pour garantir la meilleure expérience.",
    icon: Package,
  },
  {
    title: "Formations complètes",
    description: "Des parcours d'apprentissage structurés pour vous accompagner de A à Z.",
    icon: BookOpen,
  },
  {
    title: "Support dédié",
    description: "Une équipe disponible pour répondre à toutes vos questions et vous guider.",
    icon: Users,
  },
  {
    title: "Accès instantané",
    description: "Téléchargez vos produits digitaux immédiatement après l'achat.",
    icon: Sparkles,
  },
];

const categories = [
  {
    title: "Formations",
    description: "Développez de nouvelles compétences avec nos cours en ligne",
    href: "/products?type=formation",
    icon: BookOpen,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    title: "Produits digitaux",
    description: "E-books, templates, ressources et outils numériques",
    href: "/products?type=digital",
    icon: Sparkles,
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
  },
  {
    title: "Objets physiques",
    description: "Produits exclusifs livrés directement chez vous",
    href: "/products?type=physical",
    icon: Package,
    bgColor: "bg-amber-100",
    textColor: "text-amber-600",
  },
];

