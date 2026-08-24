import type { MetadataRoute } from "next";

const SITE_URL = "https://concertacionperuana.pe";

// Obligatorio con `output: 'export'` — mismo motivo que en robots.ts.
export const dynamic = "force-static";

// Solo las rutas que existen. Las 16 previstas se van sumando conforme
// se construyen — ver 03-PLAN-SEO-METADATOS.md §7 para la lista completa.
//
// `lastModified` lleva la fecha REAL de edición del contenido, no la del
// despliegue: Google la contrasta contra la modificación efectiva de la
// página, y un `new Date()` automático degrada la señal.
//
// `priority` y `changeFrequency` se omiten a propósito: Google los ignora.
const rutas: Array<{ path: string; lastModified: string }> = [
  { path: "", lastModified: "2026-08-24" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return rutas.map(({ path, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
  }));
}
