import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Download, Package, Check, Truck, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatPrice, formatDate, getOrderStatusLabel, getOrderStatusColor, getProductTypeLabel, cn } from "@/lib/utils";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: OrderDetailPageProps) {
  const { id } = await params;
  return {
    title: `Commande #${id.slice(0, 8)} | Marpeap Digitals`,
    description: "Détails de votre commande",
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(
        *,
        product:products(*)
      )
    `)
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !order) {
    notFound();
  }

  const statusSteps = [
    { status: "pending", label: "En attente", icon: Clock },
    { status: "paid", label: "Payée", icon: Check },
    { status: "shipped", label: "Expédiée", icon: Truck },
    { status: "delivered", label: "Livrée", icon: Package },
  ];

  const currentStepIndex = statusSteps.findIndex(s => s.status === order.status);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/orders" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Retour aux commandes
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="section-title">Commande #{order.id.slice(0, 8)}</h1>
              <p className="text-dark-500 mt-1">Passée le {formatDate(order.created_at)}</p>
            </div>
            <span className={cn("badge text-base px-4 py-2", getOrderStatusColor(order.status))}>
              {getOrderStatusLabel(order.status)}
            </span>
          </div>
        </div>

        {/* Progress Steps (for physical products) */}
        {order.items?.some((item: { product?: { product_type: string } }) => item.product?.product_type === "physical") && order.status !== "cancelled" && (
          <div className="card mb-8">
            <h2 className="text-lg font-semibold text-dark-900 mb-6">Suivi de commande</h2>
            <div className="flex items-center justify-between">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const StepIcon = step.icon;
                
                return (
                  <div key={step.status} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                        isCompleted ? "bg-accent-500 text-white" : "bg-dark-100 text-dark-400",
                        isCurrent && "ring-4 ring-accent-200"
                      )}>
                        <StepIcon className="h-5 w-5" />
                      </div>
                      <span className={cn(
                        "text-xs mt-2 font-medium",
                        isCompleted ? "text-accent-600" : "text-dark-400"
                      )}>
                        {step.label}
                      </span>
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div className={cn(
                        "flex-1 h-1 mx-2 rounded",
                        index < currentStepIndex ? "bg-accent-500" : "bg-dark-100"
                      )} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-dark-900 mb-6">Articles commandés</h2>
          <div className="divide-y divide-dark-100">
            {order.items?.map((item: { id: string; quantity: number; unit_price: number; product?: { name: string; slug: string; image_url: string | null; product_type: string; download_url: string | null } }) => (
              <div key={item.id} className="py-4 flex items-center gap-4">
                {item.product?.image_url ? (
                  <Image
                    src={item.product.image_url}
                    alt=""
                    width={64}
                    height={64}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-dark-100" />
                )}
                <div className="flex-1">
                  <Link
                    href={`/products/${item.product?.slug}`}
                    className="font-medium text-dark-900 hover:text-primary-600"
                  >
                    {item.product?.name}
                  </Link>
                  <p className="text-sm text-dark-500">
                    {getProductTypeLabel(item.product?.product_type || "digital")} • Qté: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-dark-900">{formatPrice(item.unit_price)}</p>
                  {(item.product?.product_type === "digital" || item.product?.product_type === "formation") && 
                   order.status === "paid" && item.product?.download_url && (
                    <a
                      href={item.product.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 mt-1"
                    >
                      <Download className="h-4 w-4" />
                      Télécharger
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="card">
          <h2 className="text-lg font-semibold text-dark-900 mb-4">Récapitulatif</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-dark-600">
              <span>Sous-total</span>
              <span>{formatPrice(order.total_amount)}</span>
            </div>
            <div className="flex justify-between text-dark-600">
              <span>Livraison</span>
              <span>Gratuite</span>
            </div>
            <div className="pt-3 border-t border-dark-100 flex justify-between">
              <span className="font-semibold text-dark-900">Total</span>
              <span className="text-xl font-bold text-dark-900">{formatPrice(order.total_amount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

