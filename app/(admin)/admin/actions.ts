"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  ArticleStatus,
  ProjectCategory,
  ProjectStatus,
} from "@prisma/client";

type ActionState = { ok: boolean; message: string };

const projectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  category: z.nativeEnum(ProjectCategory),
  stack: z.string().optional(),
  difficulty: z.string().optional(),
  role: z.string().optional(),
  repoUrl: z.string().url().optional().or(z.literal("")),
  demoUrl: z.string().url().optional().or(z.literal("")),
  status: z.nativeEnum(ProjectStatus).default(ProjectStatus.DRAFT),
  private: z.coerce.boolean().default(false),
  featured: z.coerce.boolean().default(false),
});

export async function upsertProject(formData: FormData): Promise<ActionState> {
  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    category: formData.get("category"),
    stack: formData.get("stack"),
    difficulty: formData.get("difficulty"),
    role: formData.get("role"),
    repoUrl: formData.get("repoUrl"),
    demoUrl: formData.get("demoUrl"),
    status: formData.get("status"),
    private: formData.get("private") === "on" || formData.get("private") === "true",
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
  });

  if (!parsed.success) {
    return { ok: false, message: "Validation projet échouée." };
  }

  const { stack, ...data } = parsed.data;
  await prisma.project.upsert({
    where: { slug: data.slug },
    update: {
      ...data,
      stack: stack ? stack.split(",").map((s) => s.trim()).filter(Boolean) : [],
    },
    create: {
      ...data,
      stack: stack ? stack.split(",").map((s) => s.trim()).filter(Boolean) : [],
    },
  });

  revalidatePath("/admin/projets");
  revalidatePath("/projets");
  return { ok: true, message: "Projet sauvegardé." };
}

const articleSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().optional(),
  content: z.string().min(20),
  tags: z.string().optional(),
  status: z.nativeEnum(ArticleStatus).default(ArticleStatus.DRAFT),
});

export async function upsertArticle(formData: FormData): Promise<ActionState> {
  const parsed = articleSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    tags: formData.get("tags"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { ok: false, message: "Validation article échouée." };
  }

  const { tags, ...data } = parsed.data;
  await prisma.article.upsert({
    where: { slug: data.slug },
    update: {
      ...data,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    },
    create: {
      ...data,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    },
  });

  revalidatePath("/admin/articles");
  revalidatePath("/formations");
  return { ok: true, message: "Article sauvegardé." };
}

const pageSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  content: z.string().min(10),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
});

export async function upsertPage(formData: FormData): Promise<ActionState> {
  const parsed = pageSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    content: formData.get("content"),
    metaTitle: formData.get("metaTitle"),
    metaDesc: formData.get("metaDesc"),
  });

  if (!parsed.success) {
    return { ok: false, message: "Validation page échouée." };
  }

  await prisma.page.upsert({
    where: { slug: parsed.data.slug },
    update: parsed.data,
    create: parsed.data,
  });

  revalidatePath("/admin/pages");
  return { ok: true, message: "Page sauvegardée." };
}

const mediaSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  category: z.string().optional(),
  mimeType: z.string().optional(),
  size: z.coerce.number().optional(),
});

export async function registerMedia(formData: FormData): Promise<ActionState> {
  const parsed = mediaSchema.safeParse({
    url: formData.get("url"),
    alt: formData.get("alt"),
    category: formData.get("category"),
    mimeType: formData.get("mimeType"),
    size: formData.get("size"),
  });

  if (!parsed.success) {
    return { ok: false, message: "Validation média échouée." };
  }

  await prisma.media.create({
    data: parsed.data,
  });

  revalidatePath("/admin/medias");
  return { ok: true, message: "Média enregistré." };
}

