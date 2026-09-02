import type { MetadataRoute } from "next";
import { RUTAS, SITE_URL, EDICION, urlOg } from "./_contenido/rutas";

// Obligatorio bajo `output: 'export'` — mismo motivo que en robots.ts.
export const dynamic = "force-static";

/**
 * El sitemap se deriva de la MISMA lista que alimenta los metadatos
 * (_contenido/rutas.ts), así que no puede quedarse desfasado.
 *
 * `images` publica la tarjeta social de cada página como sitemap de imágenes.
 * `priority` y `changeFrequency` se omiten a propósito: Google los ignora.
 * `lastModified` lleva la fecha real de edición, no la del despliegue.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return RUTAS.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: EDICION,
    images: [urlOg(r.og)],
  }));
}
