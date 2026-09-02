import type { MetadataRoute } from "next";
import { IDEARIO } from "./_contenido/ideario";

const SITE_URL = "https://concertacionperuana.pe";

// Obligatorio bajo `output: 'export'` — mismo motivo que en robots.ts.
export const dynamic = "force-static";

// `lastModified` lleva la fecha REAL de edición del contenido, no la del
// despliegue: Google la contrasta contra la modificación efectiva de la
// página, y un `new Date()` automático degrada la señal.
//
// `priority` y `changeFrequency` se omiten a propósito: Google los ignora.
const EDICION = "2026-09-01";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [
    "",
    "/institucional",
    "/ideario",
    ...IDEARIO.map((p) => `/ideario/${p.slug}`),
    "/partido",
  ];

  return rutas.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: EDICION,
  }));
}
