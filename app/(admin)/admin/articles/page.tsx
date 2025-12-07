import { upsertArticle } from "../actions";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";

export default async function AdminArticles() {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-primary">Articles / Formations</p>
        <h1 className="text-2xl font-semibold">CRUD complet</h1>
        <p className="text-muted-foreground">Markdown supporté, tags, statut.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nouvel article</CardTitle>
          <CardDescription>Upsert par slug, support Markdown.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={upsertArticle} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" name="title" placeholder="RAG efficace en prod" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" placeholder="rag-efficace" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="excerpt">Extrait</Label>
              <Input id="excerpt" name="excerpt" placeholder="Quelques lignes d'intro" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="content">Contenu (Markdown)</Label>
              <Textarea id="content" name="content" placeholder="Contenu..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
              <Input id="tags" name="tags" placeholder="IA, Next.js, RAG" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Input id="status" name="status" placeholder="DRAFT | PUBLISHED | ARCHIVED" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste</CardTitle>
          <CardDescription>Filtres rapides par statut.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>Titre</TH>
                <TH>Slug</TH>
                <TH>Statut</TH>
                <TH>Tags</TH>
              </TR>
            </THead>
            <TBody>
              {articles.map((article) => (
                <TR key={article.id}>
                  <TD className="font-medium">{article.title}</TD>
                  <TD>{article.slug}</TD>
                  <TD>
                    <Badge variant="outline">{article.status}</Badge>
                  </TD>
                  <TD className="text-sm text-muted-foreground">
                    {article.tags.join(", ")}
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

