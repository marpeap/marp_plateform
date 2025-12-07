"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const categories = [
  { label: "Tous", value: "all" },
  { label: "Bots & Automations", value: "BOTS" },
  { label: "IA & tools", value: "IA" },
  { label: "Godot / Jeux", value: "GODOT" },
  { label: "Web / APIs", value: "WEB" },
  { label: "Scraping", value: "SCRAPING" },
  { label: "Crypto", value: "CRYPTO" },
  { label: "Automations", value: "AUTOMATION" },
];

export function ProjectsGrid({ initialProjects }: { initialProjects: ProjectCard[] }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchCategory = category === "all" || project.category.toUpperCase() === category;
      const matchText =
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchText;
    });
  }, [category, query, initialProjects]);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-primary">Projets</p>
          <h1 className="text-3xl font-semibold">Sélection détaillée</h1>
          <p className="text-muted-foreground">
            Filtre par catégorie, difficulté et accès privé.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="Rechercher un projet..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64"
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categories}
            className="w-56"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <Card key={project.slug} className="flex flex-col justify-between">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                <span>{project.category}</span>
                {project.private && <Badge variant="warning">Privé</Badge>}
              </div>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Rôle: {project.role}</span>
                <span>Niveau: {project.difficulty}</span>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/projets/${project.slug}`}>Détails</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

