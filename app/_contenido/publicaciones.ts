/**
 * Actualidad — recoge las publicaciones de las redes de la organización.
 *
 * ── POR QUÉ NO SE TRAEN SOLAS ────────────────────────────────────────────
 *  Facebook no sirve el contenido de las publicaciones sin sesión: la página
 *  responde, pero los textos llegan por JavaScript tras el muro. Traerlas
 *  automáticamente exigiría la Graph API con token de página y revisión de
 *  app, y además el sitio es estático (no hay servidor que consulte nada).
 *
 *  Por eso cada entrada se registra a mano aquí. A cambio: carga instantánea,
 *  sin JavaScript de terceros y sin rastreo de Facebook en quien solo pasa a
 *  leer (RNF-02, RNF-04).
 *
 * ── CÓMO AÑADIR UNA PUBLICACIÓN ──────────────────────────────────────────
 *  1. Abre la publicación en Facebook y copia su enlace permanente
 *     (menú ··· → «Copiar enlace»).
 *  2. Añade una entrada abajo, la más reciente primero.
 *  3. `titulo`: una frase corta y clara, no el texto entero.
 *     `extracto`: 2–3 líneas. Si citas literalmente, entrecomilla.
 *  4. `incrustar: true` añade un botón que carga la publicación original
 *     dentro de la página. Solo se descarga si el visitante lo pulsa.
 *
 * ── ESTADO ───────────────────────────────────────────────────────────────
 *  Vacío. La página /actualidad ya existe y, mientras no haya entradas,
 *  muestra los canales donde la organización sí publica. No queda un
 *  esqueleto vacío.
 */

export type Red = "facebook" | "instagram" | "tiktok";

export type Publicacion = {
  /** Identificador para la URL y la clave de React */
  slug: string;
  titulo: string;
  extracto: string;
  /** ISO: "2026-09-08" */
  fecha: string;
  red: Red;
  /** Enlace permanente a la publicación original */
  url: string;
  /** Muestra el botón para cargar la publicación incrustada */
  incrustar?: boolean;
};

export const PUBLICACIONES: Publicacion[] = [
  // Ejemplo listo para copiar:
  //
  // {
  //   slug: "2026-09-08-aniversario",
  //   titulo: "Honremos nuestra historia y construyamos el futuro del Perú",
  //   extracto:
  //     "Mensaje por Fiestas Patrias: la unidad en la diversidad como base de la peruanidad.",
  //   fecha: "2026-09-08",
  //   red: "facebook",
  //   url: "https://www.facebook.com/61582546580948/posts/XXXXXXXXXX",
  //   incrustar: true,
  // },
];

export const REDES_INFO: Record<Red, { nombre: string; url: string }> = {
  facebook: {
    nombre: "Facebook",
    url: "https://www.facebook.com/p/Partido-De-La-Concertaci%C3%B3n-Peruana-61582546580948/",
  },
  instagram: {
    nombre: "Instagram",
    url: "https://www.instagram.com/partidodelaconcertacionperuana/",
  },
  tiktok: {
    nombre: "TikTok",
    url: "https://www.tiktok.com/@concertacionperuana",
  },
};

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function fechaLegible(iso: string): string {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}
