import { labItems } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LabsPage() {
  return (
    <div className="container space-y-8 py-10">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-primary">Labs</p>
        <h1 className="text-3xl font-semibold">Expérimentations et prototypes</h1>
        <p className="text-muted-foreground">
          Mettre en avant une évolution continue : tests IA, micro-scripts, Godot, automations.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {labItems.map((item) => (
          <Card key={item.title} className="flex flex-col justify-between">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{item.status}</Badge>
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

