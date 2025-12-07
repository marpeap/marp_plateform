import { prisma } from "@/lib/prisma";
import { projects as fallbackProjects, type ProjectCard } from "@/lib/content";
import { ProjectsGrid } from "@/components/public/projects-grid";

export default async function ProjectsPage() {
  const dbProjects = await prisma.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  const merged: ProjectCard[] =
    dbProjects.length > 0
      ? dbProjects.map((p) => ({
          title: p.title,
          slug: p.slug,
          category: p.category.toLowerCase() as ProjectCard["category"],
          description: p.description,
          stack: p.stack,
          difficulty: (p.difficulty as ProjectCard["difficulty"]) || "intermediaire",
          role: p.role || "Builder",
          repo: p.repoUrl || undefined,
          demo: p.demoUrl || undefined,
          private: p.private,
          featured: p.featured,
        }))
      : fallbackProjects;

  return (
    <div className="container space-y-8 py-10">
      <ProjectsGrid initialProjects={merged} />
    </div>
  );
}

