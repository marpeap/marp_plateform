import Link from "next/link";
import { Package, Heart, Download, CreditCard, ArrowRight, User } from "lucide-react";
import { getProfile } from "@/lib/supabase/auth";
import { getDashboardStats, getUserOrders, getUserInterests } from "@/lib/supabase/dashboard";
import { formatPrice, formatDate, getOrderStatusLabel, getOrderStatusColor, cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Tableau de bord | Marpeap Digitals",
  description: "Gérez votre compte et consultez vos commandes",
};

export default async function DashboardPage() {
  const profile = await getProfile();
  
  if (!profile) {
    redirect("/login");
  }

  const [stats, orders, interests] = await Promise.all([
    getDashboardStats(),
    getUserOrders(),
    getUserInterests(),
  ]);

  const recentOrders = orders.slice(0, 3);
  const recentInterests = interests.slice(0, 4);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="section-title">
            Bonjour{profile.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""} !
          </h1>
          <p className="section-subtitle mt-2">
            Bienvenue sur votre espace personnel
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-dark-900">{stats?.ordersCount || 0}</p>
                <p className="text-sm text-dark-500">Commandes</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-100 text-red-600">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-dark-900">{stats?.interestsCount || 0}</p>
                <p className="text-sm text-dark-500">Intérêts</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 text-green-600">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-dark-900">{formatPrice(stats?.totalSpent || 0)}</p>
                <p className="text-sm text-dark-500">Total dépensé</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-dark-900">
                  {orders.filter(o => o.status === "paid").length}
                </p>
                <p className="text-sm text-dark-500">Téléchargements</p>
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
                <Link href="/orders" className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1">
                  Voir tout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-dark-300 mx-auto mb-3" />
                  <p className="text-dark-500">Aucune commande pour le moment</p>
                  <Link href="/products" className="btn-primary mt-4 inline-flex">
                    Découvrir le catalogue
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/orders/${order.id}`}
                      className="block p-4 rounded-xl bg-dark-50 hover:bg-dark-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-dark-900">
                            Commande #{order.id.slice(0, 8)}
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
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="card">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <User className="h-7 w-7 text-primary-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-dark-900">{profile.full_name || "Utilisateur"}</p>
                  <p className="text-sm text-dark-500">{profile.email}</p>
                </div>
              </div>
              <Link href="/profile" className="btn-ghost w-full justify-center text-sm">
                Modifier mon profil
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-semibold text-dark-900 mb-4">Actions rapides</h3>
              <div className="space-y-2">
                <Link href="/products" className="block p-3 rounded-lg hover:bg-dark-50 transition-colors">
                  <span className="text-dark-700">Explorer le catalogue</span>
                </Link>
                <Link href="/interests" className="block p-3 rounded-lg hover:bg-dark-50 transition-colors">
                  <span className="text-dark-700">Mes intérêts ({stats?.interestsCount || 0})</span>
                </Link>
                <Link href="/downloads" className="block p-3 rounded-lg hover:bg-dark-50 transition-colors">
                  <span className="text-dark-700">Mes téléchargements</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Interests Section */}
        {recentInterests.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-dark-900">Vos centres d&apos;intérêt</h2>
              <Link href="/interests" className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1">
                Voir tout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentInterests.map((interest) => (
                <Link
                  key={interest.id}
                  href={`/products/${interest.product.slug}`}
                  className="card p-4 hover:border-primary-200 transition-colors"
                >
                  <p className="font-medium text-dark-900 line-clamp-2">{interest.product.name}</p>
                  <p className="mt-2 text-primary-600 font-bold">{formatPrice(interest.product.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

