import { prisma } from "@/lib/prisma";
import { timeline, tutorials as fallbackTutorials, skillTree } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function FormationsPage() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  const tutorials =
    articles.length > 0
      ? articles.map((a) => ({
          title: a.title,
          slug: a.slug,
          tags: a.tags,
          excerpt: a.excerpt ?? "",
        }))
      : fallbackTutorials;

  return (
    <div className="container space-y-8 py-10">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-primary">Formations & parcours</p>
        <h1 className="text-3xl font-semibold">Parcours, certifications, micro-cours</h1>
        <p className="text-muted-foreground">
          Timeline des expériences, skill tree, et contenus courts pour aller droit au but.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>Parcours personnel et montée en puissance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {timeline.map((item) => (
              <div key={item.title} className="relative border-l border-border pl-4">
                <Badge variant="outline" className="absolute -left-3 top-1">•</Badge>
                <p className="text-sm uppercase text-primary">{item.period}</p>
                <p className="text-base font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Skill tree</CardTitle>
            <CardDescription>Stacks maîtrisées et outils préférés.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {skillTree.map((group) => (
              <div key={group.title} className="rounded-lg border border-border/70 p-4">
                <p className="text-sm font-semibold">{group.title}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Micro-cours & tutoriels courts</CardTitle>
          <CardDescription>Un article = une idée, avec tags précis.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {tutorials.map((item) => (
            <div
              key={item.slug}
              className="rounded-lg border border-border/70 p-4 shadow-sm"
            >
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.excerpt}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

