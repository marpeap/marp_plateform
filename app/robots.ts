export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marpeap-digitals.local";
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/admin", "/client"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

