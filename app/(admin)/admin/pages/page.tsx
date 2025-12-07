import { upsertPage } from "../actions";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";

export default async function AdminPages() {
  const pages = await prisma.page.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-primary">Pages statiques</p>
        <h1 className="text-2xl font-semibold">Accueil, À propos, Contact...</h1>
        <p className="text-muted-foreground">Contenu en Markdown.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nouvelle page</CardTitle>
          <CardDescription>Upsert par slug.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={upsertPage} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" placeholder="a-propos" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" name="title" placeholder="À propos" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="content">Contenu (Markdown)</Label>
              <Textarea id="content" name="content" required placeholder="..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta title</Label>
              <Input id="metaTitle" name="metaTitle" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDesc">Meta description</Label>
              <Input id="metaDesc" name="metaDesc" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pages existantes</CardTitle>
          <CardDescription>Meta données et dernier update.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>Slug</TH>
                <TH>Titre</TH>
                <TH>Meta</TH>
              </TR>
            </THead>
            <TBody>
              {pages.map((page) => (
                <TR key={page.id}>
                  <TD className="font-medium">{page.slug}</TD>
                  <TD>{page.title}</TD>
                  <TD>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{page.metaTitle ?? "—"}</Badge>
                      <Badge variant="outline">{page.metaDesc ? "meta ok" : "meta vide"}</Badge>
                    </div>
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

