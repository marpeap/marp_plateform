import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function ClientDocuments() {
  const docs = await prisma.clientProject.findMany({
    select: { id: true, title: true, documents: true },
  });

  const rows = docs.flatMap((doc) =>
    (doc.documents ?? []).map((file) => ({
      project: doc.title,
      file,
    })),
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-primary">Documents</p>
        <h1 className="text-2xl font-semibold">Livrables & contrats</h1>
        <p className="text-muted-foreground">Dépôt et téléchargement sécurisés.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents disponibles</CardTitle>
          <CardDescription>Contrats PDF, factures, livrables.</CardDescription>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun document pour le moment.</p>
          ) : (
            <Table>
              <THead>
                <TR>
                  <TH>Projet</TH>
                  <TH>Document</TH>
                </TR>
              </THead>
              <TBody>
                {rows.map((row, idx) => (
                  <TR key={`${row.project}-${idx}`}>
                    <TD>{row.project}</TD>
                    <TD className="text-primary underline">{row.file}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

