import type { MetadataRoute } from "next";

const SITE_URL = "https://concertacionperuana.pe";

// Obligatorio con `output: 'export'`. robots.ts es un Route Handler y sin esta
// línea la compilación falla: "export const dynamic = force-static not configured
// on route /robots.txt". No aparece en la documentación de robots.txt, sino en
// la guía de Static Exports, en el apartado de Route Handlers.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // PLACEHOLDER: mientras el sitio esté en construcción se bloquea todo el
  // rastreo, para no gastar la primera impresión del dominio en una página
  // delgada. Al lanzar, poner NEXT_PUBLIC_SITE_ENV=production en Vercel.
  // Ver 03-PLAN-SEO-METADATOS.md §6
  const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
