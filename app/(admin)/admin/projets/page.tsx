import Link from "next/link";
import { upsertProject } from "../actions";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-primary">Projets</p>
        <h1 className="text-2xl font-semibold">Créer, modifier, archiver</h1>
        <p className="text-muted-foreground">
          Stack, statut, images, liens demo ou repo.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nouveau projet</CardTitle>
          <CardDescription>Upsert par slug : si le slug existe, mise à jour.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={upsertProject} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input name="title" id="title" placeholder="Bot Telegram multi-flux" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input name="slug" id="slug" placeholder="bot-telegram-multi-flux" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Description concise du projet..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input name="category" id="category" placeholder="BOTS | IA | WEB..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stack">Stack (séparée par des virgules)</Label>
              <Input name="stack" id="stack" placeholder="Next.js, Prisma, PostgreSQL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Input name="status" id="status" placeholder="DRAFT | PUBLISHED | ARCHIVED" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">Niveau</Label>
              <Input name="difficulty" id="difficulty" placeholder="facile / intermediaire / avance" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle exact</Label>
              <Input name="role" id="role" placeholder="Lead dev, Builder..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repoUrl">Repo GitHub</Label>
              <Input name="repoUrl" id="repoUrl" placeholder="https://github.com/..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demoUrl">Lien demo</Label>
              <Input name="demoUrl" id="demoUrl" placeholder="https://demo..." />
            </div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" name="featured" /> Mettre en avant
            </label>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" name="private" /> Projet privé
            </label>
            <div className="md:col-span-2">
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des projets</CardTitle>
          <CardDescription>Filtrer rapidement les statuts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>Titre</TH>
                <TH>Catégorie</TH>
                <TH>Statut</TH>
                <TH>Privé</TH>
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {projects.map((project) => (
                <TR key={project.id}>
                  <TD className="font-medium">{project.title}</TD>
                  <TD className="text-xs uppercase text-primary">{project.category}</TD>
                  <TD>
                    <Badge variant="outline">{project.status}</Badge>
                  </TD>
                  <TD>{project.private ? "Oui" : "Non"}</TD>
                  <TD>
                    <Link href={`/projets/${project.slug}`} className="text-primary">
                      Voir
                    </Link>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

