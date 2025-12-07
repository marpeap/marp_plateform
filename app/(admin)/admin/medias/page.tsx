import { registerMedia } from "../actions";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";

export default async function AdminMedias() {
  const medias = await prisma.media.findMany({ orderBy: { createdAt: "desc" }, take: 20 });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-primary">Bibliothèque médias</p>
        <h1 className="text-2xl font-semibold">Upload + organisation</h1>
        <p className="text-muted-foreground">Drag & drop à brancher, enregistrement rapide.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enregistrer un média</CardTitle>
          <CardDescription>Stockage local ou S3-compatible (à configurer).</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerMedia} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" name="url" placeholder="https://..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt">Texte alternatif</Label>
              <Input id="alt" name="alt" placeholder="Description brève" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input id="category" name="category" placeholder="PROJETS / FORMATIONS..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mimeType">MIME type</Label>
              <Input id="mimeType" name="mimeType" placeholder="image/png" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Taille (bytes)</Label>
              <Input id="size" name="size" type="number" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Derniers médias</CardTitle>
          <CardDescription>Copie rapide des URL.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>URL</TH>
                <TH>Catégorie</TH>
                <TH>Taille</TH>
              </TR>
            </THead>
            <TBody>
              {medias.map((media) => (
                <TR key={media.id}>
                  <TD className="truncate text-primary">{media.url}</TD>
                  <TD>
                    <Badge variant="outline">{media.category ?? "N/A"}</Badge>
                  </TD>
                  <TD className="text-sm text-muted-foreground">
                    {media.size ? `${media.size} o` : "—"}
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

