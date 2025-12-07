import { prisma } from "@/lib/prisma";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marpeap-digitals.local";

  const [projects, articles, pages] = await Promise.all([
    prisma.project.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.article.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.page.findMany({ select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes = ["", "/projets", "/formations", "/labs", "/contact"].map((path) => ({
    url: `${baseUrl}${path || "/"}`,
    lastModified: new Date().toISOString(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projets/${project.slug}`,
    lastModified: project.updatedAt.toISOString(),
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/formations/${article.slug}`,
    lastModified: article.updatedAt.toISOString(),
  }));

  const pageRoutes = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt.toISOString(),
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes, ...pageRoutes];
}

