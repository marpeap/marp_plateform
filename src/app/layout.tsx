import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marpeap Digitals",
  description: "Formations et produits digitaux",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen gradient-bg">
        {children}
      </body>
    </html>
  );
}
