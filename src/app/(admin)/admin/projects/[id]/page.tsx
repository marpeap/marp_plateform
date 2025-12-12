"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  external_url: string;
  display_order: number;
  is_active: boolean;
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Project>({
    id: "",
    title: "",
    description: "",
    image_url: "",
    external_url: "",
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    const loadProject = async () => {
      const resolvedParams = await params;
      setProjectId(resolvedParams.id);
      
      try {
        const response = await fetch(`/api/admin/projects/${resolvedParams.id}`);
        if (response.ok) {
          const { data } = await response.json();
          setFormData(data);
        } else {
          alert("Projet non trouvé");
          router.push("/admin/projects");
        }
      } catch (error) {
        alert("Erreur lors du chargement");
        router.push("/admin/projects");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [params, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/projects");
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de la mise à jour");
        setSaving(false);
      }
    } catch (error) {
      alert("Erreur lors de la mise à jour");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/admin/projects" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Retour aux projets
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-dark-900 mb-8">Modifier le projet</h1>

        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-dark-700 mb-2">
              Titre *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-dark-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-dark-700 mb-2">
              URL de l&apos;image *
            </label>
            <input
              type="url"
              id="image_url"
              required
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="input"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label htmlFor="external_url" className="block text-sm font-medium text-dark-700 mb-2">
              URL externe (lien du projet) *
            </label>
            <input
              type="url"
              id="external_url"
              required
              value={formData.external_url}
              onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
              className="input"
              placeholder="https://example.com/project"
            />
          </div>

          <div>
            <label htmlFor="display_order" className="block text-sm font-medium text-dark-700 mb-2">
              Ordre d&apos;affichage
            </label>
            <input
              type="number"
              id="display_order"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              className="input"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-300 rounded"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-dark-700">
              Projet actif (visible sur le site)
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                "Enregistrer les modifications"
              )}
            </button>
            <Link href="/admin/projects" className="btn-outline">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

