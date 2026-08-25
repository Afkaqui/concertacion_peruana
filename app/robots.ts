import type { MetadataRoute } from "next";

const SITE_URL = "https://concertacionperuana.pe";

// Obligatorio con `output: 'export'`. robots.ts es un Route Handler y sin esta
// línea la compilación falla: "export const dynamic = force-static not configured
// on route /robots.txt". No aparece en la documentación de robots.txt, sino en
// la guía de Static Exports, en el apartado de Route Handlers.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Se bloquea ÚNICAMENTE en despliegues de vista previa de Vercel (las URL
  // *.vercel.app de cada rama). VERCEL_ENV lo pone Vercel solo, sin
  // configuración manual: la variable que había antes nunca se llegó a definir
  // y el bloqueo terminó aplicándose a producción.
  //
  // Falla hacia "permitido" a propósito: un bloqueo accidental de producción
  // es mucho más caro que una vista previa indexada.
  const esVistaPrevia = process.env.VERCEL_ENV === "preview";

  if (esVistaPrevia) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  // Producción: rastreo permitido.
  //
  // Importante: `Disallow` NO saca una página del índice, solo impide rastrearla
  // — y si Google no puede entrar, tampoco puede leer un `noindex`, así que
  // acaba indexando la URL desnuda con el cartel "No hay información disponible
  // sobre esta página". Para excluir de verdad hay que PERMITIR el rastreo y
  // servir `noindex` en la etiqueta meta. Ver 03-PLAN-SEO-METADATOS.md §6.
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
