import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/formations", label: "Formations" },
  { href: "/projets", label: "Projets" },
  { href: "/client", label: "Espace clients" },
];

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 backdrop-blur bg-background/80">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="text-lg font-semibold">
            Marpeap Digitals
          </Link>
          <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="soft" className="hidden md:inline-flex">
              <Link href="/client">Espace clients</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/60 bg-muted/30 py-6">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Marpeap Digitals. Construisons des
            outils modernes, rapides et fiables.
          </p>
          <div className="flex gap-3 text-sm text-muted-foreground">
            <Link href="/formations">Formations</Link>
            <Link href="/projets">Projets</Link>
            <Link href="/client">Espace clients</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

