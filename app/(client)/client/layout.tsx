import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/client/dashboard", label: "Dashboard" },
  { href: "/client/documents", label: "Documents" },
  { href: "/client/projets", label: "Suivi de projet" },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/client/dashboard" className="font-semibold">
            Espace client
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <div className="container grid gap-6 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-lg border border-border/70 bg-muted/40 p-4">
          <nav className="grid gap-2 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}

