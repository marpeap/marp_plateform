import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ClientDashboard() {
  const clientProjects = await prisma.clientProject.findMany({
    orderBy: { createdAt: "desc" },
    include: { project: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-primary">Vue client</p>
        <h1 className="text-2xl font-semibold">Suivi de projet</h1>
        <p className="text-muted-foreground">
          Statuts, livrables, documents partagés.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {clientProjects.length === 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Aucun projet client pour le moment</CardTitle>
              <CardDescription>Les dossiers apparaîtront ici.</CardDescription>
            </CardHeader>
          </Card>
        )}
        {clientProjects.map((cp) => (
          <Card key={cp.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{cp.title}</CardTitle>
                <CardDescription>{cp.project?.title}</CardDescription>
              </div>
              <Badge variant="outline">{cp.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Livrables: {cp.deliverables.join(", ") || "—"}</p>
              <p>Documents: {cp.documents.join(", ") || "—"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

