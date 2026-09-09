/**
 * Actualidad — recoge las publicaciones de las redes de la organización.
 *
 * ── POR QUÉ NO SE TRAEN SOLAS ────────────────────────────────────────────
 *  Facebook e Instagram no sirven el contenido sin sesión: la página responde,
 *  pero los textos llegan por JavaScript tras el muro. Traerlas automáticamente
 *  exigiría la Graph API con token y revisión de app, y además el sitio es
 *  estático (no hay servidor que consulte nada).
 *
 *  Por eso cada entrada se registra a mano aquí. A cambio: carga instantánea,
 *  sin JavaScript de terceros y sin rastreo en quien solo pasa a leer.
 *
 * ── CÓMO AÑADIR UNA PUBLICACIÓN ──────────────────────────────────────────
 *  1. Copia el enlace de la publicación:
 *       Facebook  → menú ··· → «Copiar enlace»
 *       Instagram → menú ··· → «Copiar enlace»
 *       TikTok    → Compartir → «Copiar enlace»
 *       YouTube   → Compartir → «Copiar»
 *  2. Añade una entrada abajo, la más reciente primero.
 *  3. `titulo`: frase corta y clara, no el texto entero.
 *     `extracto`: 2–3 líneas. Si citas literalmente, entrecomilla.
 *  4. `incrustar: true` añade un botón que carga la publicación original
 *     dentro de la página. Solo se descarga si el visitante lo pulsa.
 *
 * ── ESTADO ───────────────────────────────────────────────────────────────
 *  Vacío. La página /actualidad ya existe y, mientras no haya entradas,
 *  muestra los canales donde la organización sí publica.
 */

export type Red = "facebook" | "instagram" | "tiktok" | "youtube";

export type Publicacion = {
  /** Identificador para la clave de React. Convención: fecha-tema */
  slug: string;
  titulo: string;
  extracto: string;
  /** ISO: "2026-09-08" */
  fecha: string;
  red: Red;
  /** Enlace a la publicación original, tal como lo copiaste */
  url: string;
  /** Muestra el botón para cargar la publicación incrustada */
  incrustar?: boolean;
  /**
   * Miniatura en la tarjeta. Descárgala con:
   *   python scripts/portada-publicacion.py <slug> <url>
   * (funciona con TikTok y YouTube; en Facebook e Instagram guarda la imagen
   * a mano en public/publicaciones/, no exponen miniatura sin token)
   */
  imagen?: string;
};

export const PUBLICACIONES: Publicacion[] = [
  // Ejemplos listos para copiar (uno por red):
  //
  // {
  //   slug: "2026-09-08-encuentro-bases",
  //   titulo: "Encuentro con las bases en Cusco",
  //   extracto: "Más de 40 dirigentes revisaron el plan de trabajo regional.",
  //   fecha: "2026-09-08",
  //   red: "facebook",
  //   url: "https://www.facebook.com/61582546580948/posts/XXXXXXXXXX",
  //   incrustar: true,
  //   imagen: "/publicaciones/2026-09-08-encuentro-bases.jpg",
  // },
  // {
  //   slug: "2026-09-05-fiestas-patrias",
  //   titulo: "Honremos nuestra historia",
  //   extracto: "Mensaje por Fiestas Patrias.",
  //   fecha: "2026-09-05",
  //   red: "instagram",
  //   url: "https://www.instagram.com/p/XXXXXXXXXXX/",
  //   incrustar: true,
  // },
  // {
  //   slug: "2026-08-30-primer-video",
  //   titulo: "Nuestro primer video",
  //   extracto: "Un Perú para todos, que se construye unidos.",
  //   fecha: "2026-08-30",
  //   red: "tiktok",
  //   url: "https://www.tiktok.com/@concertacionperuana/video/XXXXXXXXXXXXXXXXXXX",
  //   incrustar: true,
  // },
  // {
  //   slug: "2026-09-10-mensaje",
  //   titulo: "Mensaje a la militancia",
  //   extracto: "Resumen del encuentro nacional.",
  //   fecha: "2026-09-10",
  //   red: "youtube",
  //   url: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
  //   incrustar: true,
  // },

    {
    slug: "2026-08-05-primer-video",
    titulo: "Nuestro primer video",
    extracto: "Un Perú para todos, que se construye unidos.",
    fecha: "2026-08-05",
    red: "tiktok",
    url: "https://www.tiktok.com/@concertacionperuana/video/7670563775447076117",
    imagen: "/publicaciones/2026-08-05-primer-video.jpg",
    incrustar: true,
  },

];

/**
 * Canales de la organización.
 *
 * `url` es opcional a propósito: YouTube está listo para recibir publicaciones,
 * pero el canal aún no existe (conversación del 2/9/2026). Mientras `url` sea
 * `undefined` no aparece en el bloque «síguenos» — no se deja un enlace muerto.
 * En cuanto se cree el canal, basta rellenar esta línea.
 */
export const REDES_INFO: Record<Red, { nombre: string; url?: string }> = {
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
  youtube: {
    nombre: "YouTube",
    // url: "https://www.youtube.com/@...",  ← rellenar al crear el canal
  },
};

export const ICONOS: Record<Red, string> = {
  facebook:
    "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z",
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.02a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z",
  tiktok:
    "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06v-3.1a5.66 5.66 0 0 0-.77-.05 5.68 5.68 0 1 0 5.68 5.68V9.01a7.35 7.35 0 0 0 4.31 1.38V7.3a4.28 4.28 0 0 1-3.25-1.48Z",
  youtube:
    "M21.58 7.19a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42A2.5 2.5 0 0 0 2.42 7.19 26 26 0 0 0 2 12a26 26 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.42-4.81ZM10 15V9l5.2 3-5.2 3Z",
};

/**
 * Convierte el enlace de una publicación en su URL de incrustado.
 *
 * Cada red usa un formato distinto y admite varias formas de enlace (móvil,
 * acortado, reel, short...). Devuelve `null` si no reconoce el enlace, y en ese
 * caso el botón de incrustar no se muestra: mejor sin botón que con un marco roto.
 *
 * YouTube usa el dominio `-nocookie`, que no deja rastreo hasta que se reproduce.
 */
export function urlIncrustado(red: Red, url: string): string | null {
  try {
    switch (red) {
      case "facebook":
        return (
          "https://www.facebook.com/plugins/post.php?href=" +
          encodeURIComponent(url) +
          "&show_text=true&width=500"
        );

      case "instagram": {
        // .../p/ABC/ y .../reel/ABC/ admiten ambos el sufijo /embed
        const m = url.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
        return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed` : null;
      }

      case "tiktok": {
        const m = url.match(/\/video\/(\d+)/);
        return m ? `https://www.tiktok.com/embed/v2/${m[1]}` : null;
      }

      case "youtube": {
        const m =
          url.match(/[?&]v=([A-Za-z0-9_-]{11})/) ||
          url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) ||
          url.match(/\/(?:shorts|embed|live)\/([A-Za-z0-9_-]{11})/);
        return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : null;
      }
    }
  } catch {
    return null;
  }
}

/** Proporción del marco incrustado, según lo que publica cada red. */
export const PROPORCION: Record<Red, string> = {
  facebook: "aspect-[4/5]",
  instagram: "aspect-[4/5]",
  tiktok: "aspect-[9/16]",
  youtube: "aspect-video",
};

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function fechaLegible(iso: string): string {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}
