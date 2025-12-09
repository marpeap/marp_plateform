import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { getAllOrders } from "@/lib/supabase/admin";
import { formatPrice, formatDate, getOrderStatusLabel, getOrderStatusColor, cn } from "@/lib/utils";

export const metadata = {
  title: "Gestion des commandes | Admin",
  description: "Gérez vos commandes",
};

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Retour au dashboard
          </Link>
          <h1 className="section-title">Gestion des commandes</h1>
          <p className="section-subtitle mt-2">
            {orders.length} commande{orders.length > 1 ? "s" : ""} au total
          </p>
        </div>

        {/* Orders Table */}
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-50 border-b border-dark-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Commande
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Articles
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-dark-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-dark-900">
                        #{order.id.slice(0, 8)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-dark-600">
                      {order.user_id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-dark-600">
                        {order.items?.length || 0} article{(order.items?.length || 0) > 1 ? "s" : ""}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-dark-900">
                        {formatPrice(order.total_amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("badge", getOrderStatusColor(order.status))}>
                        {getOrderStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-dark-500">
                      {formatDate(order.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-dark-300 mx-auto mb-3" />
              <p className="text-dark-500">Aucune commande pour le moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

