import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";
import { getUserOrders } from "@/lib/supabase/dashboard";
import { formatPrice, formatDate, getOrderStatusLabel, getOrderStatusColor, cn } from "@/lib/utils";

export const metadata = {
  title: "Mes Commandes | Marpeap Digitals",
  description: "Consultez l'historique de vos commandes",
};

export default async function OrdersPage() {
  const orders = await getUserOrders();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Retour au tableau de bord
          </Link>
          <h1 className="section-title">Mes commandes</h1>
          <p className="section-subtitle mt-2">
            Consultez l&apos;historique de toutes vos commandes
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="card text-center py-16">
            <Package className="h-16 w-16 text-dark-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-700 mb-2">Aucune commande</h3>
            <p className="text-dark-500 mb-6">
              Vous n&apos;avez pas encore passé de commande
            </p>
            <Link href="/products" className="btn-primary inline-flex">
              Découvrir le catalogue
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="card block hover:border-primary-200 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold text-dark-900">
                        Commande #{order.id.slice(0, 8)}
                      </p>
                      <span className={cn("badge", getOrderStatusColor(order.status))}>
                        {getOrderStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-dark-500">
                      {formatDate(order.created_at)}
                      {order.items && ` • ${order.items.length} article${order.items.length > 1 ? "s" : ""}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-dark-900">
                      {formatPrice(order.total_amount)}
                    </p>
                  </div>
                </div>
                
                {/* Order items preview */}
                {order.items && order.items.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-dark-100">
                    <div className="flex flex-wrap gap-2">
                      {order.items.slice(0, 3).map((item) => (
                        <span key={item.id} className="text-sm text-dark-600 bg-dark-50 px-3 py-1 rounded-full">
                          {item.product?.name || "Produit"}
                        </span>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-sm text-dark-400 px-3 py-1">
                          +{order.items.length - 3} autre(s)
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

