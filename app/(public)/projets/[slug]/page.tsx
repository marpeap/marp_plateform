import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Lock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { projects as fallback } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const dbProject = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  const fallbackProject = fallback.find((p) => p.slug === params.slug) ?? null;

  if (!dbProject && !fallbackProject) return notFound();

  const project = dbProject
    ? {
        title: dbProject.title,
        slug: dbProject.slug,
        description: dbProject.description,
        category: dbProject.category,
        stack: dbProject.stack,
        difficulty: dbProject.difficulty ?? "intermediaire",
        role: dbProject.role ?? "Builder",
        repo: dbProject.repoUrl ?? undefined,
        demo: dbProject.demoUrl ?? undefined,
        private: dbProject.private,
      }
    : {
        title: fallbackProject!.title,
        slug: fallbackProject!.slug,
        description: fallbackProject!.description,
        category: fallbackProject!.category,
        stack: fallbackProject!.stack,
        difficulty: fallbackProject!.difficulty,
        role: fallbackProject!.role,
        repo: fallbackProject!.repo,
        demo: fallbackProject!.demo,
        private: fallbackProject!.private,
      };

  return (
    <div className="container space-y-6 py-10">
      <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-wide text-primary">
        <span>{project.category}</span>
        {project.private && (
          <Badge variant="warning" className="inline-flex items-center gap-1">
            <Lock className="h-3 w-3" /> Privé — demander un accès
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{project.title}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex gap-2">
          {project.repo && (
            <Button asChild variant="outline">
              <Link href={project.repo} target="_blank" className="inline-flex items-center gap-2">
                Repo <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}
          {project.demo && (
            <Button asChild>
              <Link href={project.demo} target="_blank" className="inline-flex items-center gap-2">
                Demo <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stack & rôle</CardTitle>
          <CardDescription>
            Stack technique, niveau, responsabilités exactes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Rôle: {project.role} — Niveau: {project.difficulty}
          </p>
          {project.private && (
            <Button asChild variant="soft" className="w-fit">
              <Link href="/contact">Demander un accès privé</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

