"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Plus, ArrowLeft, Edit, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  external_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      if (response.ok) {
        const { data } = await response.json();
        setProjects(data || []);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      alert("Erreur lors de la suppression");
    }

    setDeletingId(null);
  };

  const toggleActive = async (id: string, currentState: boolean) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !currentState }),
      });

      if (response.ok) {
        setProjects(projects.map(p => 
          p.id === id ? { ...p, is_active: !currentState } : p
        ));
      }
    } catch (error) {
      alert("Erreur lors de la mise à jour");
    }
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Retour au dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-dark-900 md:text-4xl">Gestion des projets</h1>
              <p className="text-lg text-dark-500 mt-2">
                {projects.length} projet{projects.length > 1 ? "s" : ""} dans le portfolio
              </p>
            </div>
            <Link href="/admin/projects/new" className="btn-primary">
              <Plus className="h-5 w-5" />
              Nouveau projet
            </Link>
          </div>
        </div>

        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-50 border-b border-dark-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Projet
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Ordre
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-100">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-dark-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {project.image_url ? (
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            width={64}
                            height={64}
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-lg bg-dark-100" />
                        )}
                        <div>
                          <p className="font-medium text-dark-900">{project.title}</p>
                          {project.description && (
                            <p className="text-sm text-dark-500 line-clamp-1">{project.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={project.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-700 truncate max-w-xs block"
                      >
                        {project.external_url}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-dark-600">
                      {project.display_order}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(project.id, project.is_active)}
                        className={`inline-flex items-center gap-1 cursor-pointer hover:opacity-80 ${
                          project.is_active ? "text-green-600" : "text-dark-400"
                        }`}
                      >
                        {project.is_active ? (
                          <>
                            <Eye className="h-4 w-4" />
                            Actif
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4" />
                            Inactif
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="p-2 rounded-lg text-dark-400 hover:text-primary-600 hover:bg-dark-100 transition-colors"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id, project.title)}
                          disabled={deletingId === project.id}
                          className="p-2 rounded-lg text-dark-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Supprimer"
                        >
                          {deletingId === project.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-dark-500 mb-4">Aucun projet dans le portfolio</p>
              <Link href="/admin/projects/new" className="btn-primary inline-flex">
                <Plus className="h-5 w-5" />
                Ajouter le premier projet
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

