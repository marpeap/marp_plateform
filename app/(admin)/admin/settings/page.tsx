import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-primary">Paramètres</p>
        <h1 className="text-2xl font-semibold">Branding, couleurs, légales</h1>
        <p className="text-muted-foreground">Logo, palette, infos légales, API keys.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Identité</CardTitle>
          <CardDescription>Logo, nom du site, baseline.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="siteName">Nom du site</Label>
            <Input id="siteName" placeholder="Marpeap Digitals" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="baseline">Baseline</Label>
            <Input id="baseline" placeholder="Dev web, IA, automations" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="logoUrl">Logo (URL)</Label>
            <Input id="logoUrl" placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <Button>Enregistrer</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Couleurs</CardTitle>
          <CardDescription>Accent et état du thème.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary</Label>
            <Input id="primaryColor" placeholder="#00a2ff" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accentColor">Accent</Label>
            <Input id="accentColor" placeholder="#7c3aed" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background</Label>
            <Input id="backgroundColor" placeholder="#0f172a" />
          </div>
          <div className="md:col-span-3">
            <Button>Mettre à jour</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Légales</CardTitle>
          <CardDescription>Mentions légales, CGU, politique de confidentialité.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea placeholder="Mentions légales..." />
          <Button>Enregistrer</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clés API</CardTitle>
          <CardDescription>Mail, analytics, monitoring.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="mailApi">Clé mail</Label>
            <Input id="mailApi" placeholder="sk-..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="analyticsApi">Analytics</Label>
            <Input id="analyticsApi" placeholder="..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monitoringApi">Monitoring</Label>
            <Input id="monitoringApi" placeholder="..." />
          </div>
          <div className="md:col-span-2">
            <Button>Enregistrer</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

