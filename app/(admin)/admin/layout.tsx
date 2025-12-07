import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/projets", label: "Projets" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/medias", label: "Médias" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/settings", label: "Paramètres" },
  { href: "/admin/users", label: "Utilisateurs" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container flex h-14 items-center justify-between gap-4">
          <Link href="/admin/dashboard" className="font-semibold">
            Admin • Marpeap Digitals
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm">
              <Link href="/">Retour site</Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="container grid gap-6 py-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-lg border border-border/70 bg-muted/40 p-4">
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Navigation
            </p>
            <nav className="mt-2 grid gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-foreground hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}

