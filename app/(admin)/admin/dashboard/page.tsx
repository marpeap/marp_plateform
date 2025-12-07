import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  const [projects, articles, messages] = await Promise.all([
    prisma.project.count(),
    prisma.article.count(),
    prisma.contact.count(),
  ]);

  const alerts = [
    { title: "Brouillons à publier", value: await prisma.project.count({ where: { status: "DRAFT" } }) },
    { title: "Images manquantes", value: 0 },
    { title: "Pages en brouillon", value: await prisma.page.count() },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-primary">Tableau de bord</p>
        <h1 className="text-2xl font-semibold">Vue globale</h1>
        <p className="text-muted-foreground">Indicateurs rapides et alertes.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Visites (mock)", value: "—" },
          { title: "Projets publiés", value: projects },
          { title: "Articles/Formats", value: articles },
          { title: "Messages reçus", value: messages },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alertes</CardTitle>
          <CardDescription>Images manquantes, brouillons, accès privés.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {alerts.map((alert) => (
            <div
              key={alert.title}
              className="rounded-lg border border-border/70 bg-muted/40 p-3"
            >
              <p className="text-sm text-muted-foreground">{alert.title}</p>
              <p className="text-xl font-semibold">{alert.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>Publier, ajouter un projet, répondre aux messages.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="outline">Ajouter un projet</Badge>
          <Badge variant="outline">Nouvel article</Badge>
          <Badge variant="outline">Répondre aux messages</Badge>
          <Badge variant="outline">Mettre à jour la landing</Badge>
        </CardContent>
      </Card>
    </div>
  );
}

