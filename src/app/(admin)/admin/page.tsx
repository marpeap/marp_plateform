import Link from "next/link";
import { Package, Users, ShoppingCart, TrendingUp, ArrowRight, DollarSign } from "lucide-react";
import { getAdminStats, getAllOrders } from "@/lib/supabase/admin";
import { formatPrice, formatDate, getOrderStatusLabel, getOrderStatusColor, cn } from "@/lib/utils";

export const metadata = {
  title: "Admin | Marpeap Digitals",
  description: "Panneau d'administration",
};

export default async function AdminDashboardPage() {
  const [stats, orders] = await Promise.all([
    getAdminStats(),
    getAllOrders(),
  ]);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="section-title">Tableau de bord Admin</h1>
          <p className="section-subtitle mt-2">
            Vue d&apos;ensemble de votre plateforme
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Produits actifs</p>
                <p className="text-3xl font-bold mt-1">{stats.productsCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/20">
                <Package className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Clients inscrits</p>
                <p className="text-3xl font-bold mt-1">{stats.clientsCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/20">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Commandes totales</p>
                <p className="text-3xl font-bold mt-1">{stats.ordersCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/20">
                <ShoppingCart className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100 text-sm">Chiffre d&apos;affaires</p>
                <p className="text-3xl font-bold mt-1">{formatPrice(stats.totalRevenue)}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/20">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark-900">Commandes récentes</h2>
                <Link href="/admin/orders" className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1">
                  Voir tout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-dark-300 mx-auto mb-3" />
                  <p className="text-dark-500">Aucune commande pour le moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-xl bg-dark-50 hover:bg-dark-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-dark-900">
                            #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-sm text-dark-500">{formatDate(order.created_at)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-dark-900">{formatPrice(order.total_amount)}</p>
                          <span className={cn("badge text-xs", getOrderStatusColor(order.status))}>
                            {getOrderStatusLabel(order.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-dark-900 mb-4">Actions rapides</h3>
              <div className="space-y-2">
                <Link href="/admin/products/new" className="btn-primary w-full justify-center">
                  <Package className="h-4 w-4" />
                  Ajouter un produit
                </Link>
                <Link href="/admin/products" className="btn-secondary w-full justify-center">
                  Gérer les produits
                </Link>
                <Link href="/admin/clients" className="btn-secondary w-full justify-center">
                  Voir les clients
                </Link>
                <Link href="/admin/orders" className="btn-secondary w-full justify-center">
                  Voir les commandes
                </Link>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-dark-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-500">Taux de conversion</span>
                  <span className="font-medium text-dark-900">--</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-500">Panier moyen</span>
                  <span className="font-medium text-dark-900">
                    {stats.ordersCount > 0 
                      ? formatPrice(stats.totalRevenue / stats.ordersCount)
                      : "--"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-500">CA / client</span>
                  <span className="font-medium text-dark-900">
                    {stats.clientsCount > 0 
                      ? formatPrice(stats.totalRevenue / stats.clientsCount)
                      : "--"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

