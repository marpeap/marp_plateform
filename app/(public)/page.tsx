import Link from "next/link";
import { ArrowRight, Github, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { projects, skillTree, tools } from "@/lib/content";

const featured = projects.filter((p) => p.featured).slice(0, 3);

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/40 text-foreground">
      <section className="container grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6">
          <Badge variant="soft" className="inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" /> Dev full-stack, IA, automations
          </Badge>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Construire des outils modernes, rapides et mesurables.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Je conçois des produits web, des bots et des pipelines data/IA. Code propre,
            monitoring, et déploiement sans friction.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/projets" className="inline-flex items-center gap-2">
                Voir les projets <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/formations">Formations</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/client" className="inline-flex items-center gap-2">
                Espace clients <Github className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-3">
            {tools.map((tool) => (
              <Badge key={tool} variant="outline">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <Card className="glass border-primary/20 shadow-lg shadow-primary/10">
            <CardHeader>
              <CardTitle>Ce que je fais</CardTitle>
              <CardDescription>
                Des blocs modulaires pour livrer vite : web, IA, scraping, bots.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {[
                { title: "Apps & APIs", text: "Next.js, FastAPI, Laravel" },
                { title: "Scraping & bots", text: "Playwright, Telegram, alerting" },
                { title: "IA & agents", text: "LLMs, RAG, pipelines LangChain" },
                { title: "Automations", text: "Webhooks, CRON, monitoring" },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-border/80 p-4">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Stack fiable et auditable</CardTitle>
                <CardDescription>Monitoring, métriques, alertes.</CardDescription>
              </div>
              <ShieldCheck className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="grid gap-2 text-sm text-muted-foreground">
              <div>• Logs structurés + métriques (Prometheus friendly)</div>
              <div>• Builds reproductibles (Docker / Vercel / Railway)</div>
              <div>• Qualité : lint, format, tests ciblés</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container space-y-6 py-12">
        <div className="flex items-center gap-3">
          <Layers className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm uppercase tracking-wide text-primary">Projets</p>
            <h2 className="text-2xl font-semibold">Une sélection rapide</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((project) => (
            <Card key={project.slug} className="flex flex-col justify-between">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{project.category}</Badge>
                  {project.private && <Badge variant="warning">Privé</Badge>}
                </div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Rôle: {project.role}</span>
                  <span>Niveau: {project.difficulty}</span>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/projets/${project.slug}`}>Détails</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-end">
          <Button asChild variant="ghost">
            <Link href="/projets" className="inline-flex items-center gap-2">
              Tous les projets <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container grid gap-6 py-12 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Parcours & skill tree</CardTitle>
            <CardDescription>Une progression orientée production.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
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
        <Card>
          <CardHeader>
            <CardTitle>Labs & R&D</CardTitle>
              <CardDescription>Prototypes en continu.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Agent IA", detail: "Veille auto + résumés" },
              { title: "Auto-extract PDF", detail: "Structuration -> Notion" },
              { title: "Shader pack Godot", detail: "Explorations graphiques" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-md border border-border/70 bg-muted/40 p-3"
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link href="/labs">Voir les labs</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

