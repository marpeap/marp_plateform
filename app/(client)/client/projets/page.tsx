import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function ClientProjects() {
  const clientProjects = await prisma.clientProject.findMany({
    include: { project: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-primary">Suivi projet</p>
        <h1 className="text-2xl font-semibold">Statut, jalons, liens</h1>
        <p className="text-muted-foreground">Mises à jour régulières avec livrables.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {clientProjects.length === 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Pas encore de suivi</CardTitle>
              <CardDescription>Les projets apparaîtront ici.</CardDescription>
            </CardHeader>
          </Card>
        )}
        {clientProjects.map((cp) => (
          <Card key={cp.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{cp.project?.title ?? cp.title}</CardTitle>
                <CardDescription>{cp.title}</CardDescription>
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

