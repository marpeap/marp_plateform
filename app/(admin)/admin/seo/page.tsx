import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSEO() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-primary">SEO</p>
        <h1 className="text-2xl font-semibold">Métadonnées & sitemap</h1>
        <p className="text-muted-foreground">Meta par page, sitemap auto, robots.txt.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meta globales</CardTitle>
          <CardDescription>Définir un titre et une description par défaut.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="defaultTitle">Titre par défaut</Label>
            <Input id="defaultTitle" placeholder="Marpeap Digitals" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultDesc">Description par défaut</Label>
            <Textarea id="defaultDesc" placeholder="Plateforme full-stack, IA, bots." />
          </div>
          <div className="md:col-span-2">
            <Button>Enregistrer</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sitemap</CardTitle>
            <CardDescription>Génération automatique via route `/sitemap.xml`.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Inclure projets, articles, pages statiques.</p>
            <p>Actualiser après chaque publication.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>robots.txt</CardTitle>
            <CardDescription>Route `/robots.txt` avec directives de crawl.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Autoriser le public, bloquer `/admin` et `/client`.</p>
            <p>Ajouter le lien du sitemap.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

