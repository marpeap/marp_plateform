"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { SimpleHeader } from "@/components/SimpleHeader";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  external_url: string;
  display_order: number;
  is_active: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      setProjects(data || []);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SimpleHeader />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-dark-900 mb-4">Projets réalisés</h1>
          <p className="text-lg text-dark-600">
            Découvrez une sélection de nos réalisations digitales
          </p>
        </div>

        {loading ? (
          <div className="card text-center py-12">
            <p className="text-dark-500">Chargement...</p>
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="card overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => window.open(project.external_url, "_blank", "width=1200,height=800")}
              >
                {project.image_url && (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-dark-900 mb-2">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-sm text-dark-600 line-clamp-3">
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-dark-500">Aucun projet disponible pour le moment.</p>
          </div>
        )}
      </main>
    </div>
  );
}

