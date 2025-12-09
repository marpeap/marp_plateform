import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, ShoppingCart, Download, Package, BookOpen, Sparkles, Check } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/lib/supabase/products";
import { ProductCard } from "@/components/products/ProductCard";
import { cn, formatPrice, getProductTypeLabel } from "@/lib/utils";
import { AddToInterestsButton } from "@/components/products/AddToInterestsButton";
import { BuyButton } from "@/components/products/BuyButton";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return { title: "Produit non trouvé" };
  }

  return {
    title: `${product.name} | Marpeap Digitals`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category_id);

  const typeIcons = {
    digital: Sparkles,
    physical: Package,
    formation: BookOpen,
  };

  const TypeIcon = typeIcons[product.product_type];

  const typeColors = {
    digital: "bg-purple-100 text-purple-700",
    physical: "bg-amber-100 text-amber-700",
    formation: "bg-blue-100 text-blue-700",
  };

  const features = [
    product.product_type === "formation" && "Accès à vie aux contenus",
    product.product_type === "digital" && "Téléchargement immédiat",
    product.product_type === "physical" && "Livraison sous 3-5 jours",
    "Support client dédié",
    "Satisfait ou remboursé",
  ].filter(Boolean);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au catalogue
          </Link>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-50">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <TypeIcon className="h-24 w-24 text-dark-200" />
              </div>
            )}
            
            {/* Badge */}
            <div className="absolute top-6 left-6">
              <span className={cn("badge text-sm", typeColors[product.product_type])}>
                <TypeIcon className="h-4 w-4 mr-1" />
                {getProductTypeLabel(product.product_type)}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category */}
            {product.category && (
              <Link
                href={`/products?category=${product.category.slug}`}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 mb-2"
              >
                {product.category.name}
              </Link>
            )}

            <h1 className="text-3xl lg:text-4xl font-bold text-dark-900 font-display">
              {product.name}
            </h1>

            <p className="mt-4 text-lg text-dark-600">
              {product.description}
            </p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-dark-500 bg-dark-100 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-dark-900">
                {formatPrice(product.price)}
              </span>
              {product.product_type !== "physical" && (
                <span className="text-dark-400 text-sm">Accès immédiat</span>
              )}
            </div>

            {/* Stock for physical */}
            {product.product_type === "physical" && product.stock !== null && (
              <p className={cn(
                "mt-2 text-sm font-medium",
                product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-amber-600" : "text-red-600"
              )}>
                {product.stock > 10
                  ? "✓ En stock"
                  : product.stock > 0
                  ? `⚠ Plus que ${product.stock} en stock`
                  : "✗ Rupture de stock"}
              </p>
            )}

            {/* Features */}
            <ul className="mt-6 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-dark-600">
                  <Check className="h-5 w-5 text-accent-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <BuyButton product={product} />
              <AddToInterestsButton productId={product.id} />
            </div>
          </div>
        </div>

        {/* Long Description */}
        {product.long_description && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-dark-900 mb-6">Description détaillée</h2>
            <div className="prose prose-dark max-w-none">
              <p className="text-dark-600 whitespace-pre-line leading-relaxed">
                {product.long_description}
              </p>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-dark-900 mb-8">Vous aimerez aussi</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

