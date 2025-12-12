import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User, Mail } from "lucide-react";
import { getAllClients } from "@/lib/supabase/admin";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Gestion des clients | Admin",
  description: "Gérez vos clients",
};

export default async function AdminClientsPage() {
  const clients = await getAllClients();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Retour au dashboard
          </Link>
          <h1 className="section-title">Gestion des clients</h1>
          <p className="section-subtitle mt-2">
            {clients.length} client{clients.length > 1 ? "s" : ""} inscrit{clients.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Clients Table */}
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-50 border-b border-dark-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Téléphone
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Inscrit le
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-100">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-dark-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center relative overflow-hidden">
                          {client.avatar_url ? (
                            <Image
                              src={client.avatar_url}
                              alt=""
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-5 w-5 text-primary-600" />
                          )}
                        </div>
                        <span className="font-medium text-dark-900">
                          {client.full_name || "Sans nom"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-dark-600">
                        <Mail className="h-4 w-4 text-dark-400" />
                        {client.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-dark-600">
                      {client.phone || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${
                        client.role === "admin" 
                          ? "bg-purple-100 text-purple-700" 
                          : "bg-dark-100 text-dark-600"
                      }`}>
                        {client.role === "admin" ? "Admin" : "Client"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-dark-500">
                      {formatDate(client.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {clients.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-dark-300 mx-auto mb-3" />
              <p className="text-dark-500">Aucun client inscrit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

