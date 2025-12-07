import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";

export default async function AdminUsers() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-primary">Utilisateurs</p>
        <h1 className="text-2xl font-semibold">Admins, éditeurs, clients</h1>
        <p className="text-muted-foreground">Gestion des rôles (lecteur, éditeur, admin).</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste</CardTitle>
          <CardDescription>Synchronisée avec NextAuth (OAuth GitHub/Google).</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>Nom</TH>
                <TH>Email</TH>
                <TH>Rôle</TH>
                <TH>Création</TH>
              </TR>
            </THead>
            <TBody>
              {users.map((user) => (
                <TR key={user.id}>
                  <TD className="font-medium">{user.name ?? "—"}</TD>
                  <TD>{user.email ?? "—"}</TD>
                  <TD>
                    <Badge variant="outline">{user.role}</Badge>
                  </TD>
                  <TD className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
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

