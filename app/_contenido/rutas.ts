import type { Metadata } from "next";
import { IDEARIO } from "./ideario";

/**
 * Fuente única de verdad de las rutas del sitio.
 *
 * De aquí salen a la vez los metadatos de cada página Y el sitemap.xml, de modo
 * que no pueden desincronizarse: añadir una ruta aquí la publica en ambos
 * sitios, con su imagen social incluida.
 *
 * Las imágenes se generan con `python scripts/generar-og.py` y viven en
 * public/og/. Se referencian con `openGraph.images` en lugar de la convención
 * de archivo `opengraph-image.png` porque /ideario/[pilar] es una ruta dinámica:
 * la convención aplicaría la misma imagen a los seis pilares.
 */

export const SITE_URL = "https://concertacionperuana.pe";
export const SITE_NAME = "Concertación Peruana";

/** Fecha real de última edición del contenido (no la del despliegue). */
export const EDICION = "2026-09-10";

export type Ruta = {
  path: string;
  /** nombre del PNG en public/og/, sin extensión */
  og: string;
  titulo: string;
  descripcion: string;
  /** Texto alternativo de la tarjeta social */
  ogAlt: string;
  palabrasClave: string[];
  /** Miga de pan; la raíz (Inicio) se añade sola */
  migas?: { nombre: string; path: string }[];
};

const COMUNES = [
  "Concertación Peruana",
  "Partido de la Concertación Peruana",
  "Asociación de la Concertación Peruana",
  "partido político Perú",
  "Humanismo Teísta",
];

export const RUTAS: Ruta[] = [
  {
    path: "",
    og: "inicio",
    titulo: "Concertación Peruana — Humanismo Teísta y Democracia",
    descripcion:
      "Organización política peruana inspirada en el Humanismo Teísta. Democracia Participativa, Concertación, Fraternidad y Unidad en la Diversidad.",
    ogAlt: "Concertación Peruana — Dios, Patria, Familia",
    palabrasClave: [...COMUNES, "Dios Patria Familia", "democracia participativa"],
  },
  {
    path: "/institucional",
    og: "institucional",
    titulo: "Institucional",
    descripcion:
      "Visión, misión y objetivos estratégicos de la Asociación de la Concertación Peruana: institucionalidad, participación, desarrollo y transparencia.",
    ogAlt: "Propuesta institucional — visión, misión y objetivos estratégicos",
    palabrasClave: [...COMUNES, "visión y misión", "objetivos estratégicos", "propuesta institucional"],
    migas: [{ nombre: "Institucional", path: "/institucional" }],
  },
  {
    path: "/ideario",
    og: "ideario",
    titulo: "Nuestro Ideario",
    descripcion:
      "Los seis pilares de Concertación Peruana: Humanismo Teísta, Democracia Participativa, Fraternidad, Igualdad de Oportunidades, Identidad Nacional y Concertación.",
    ogAlt: "Ideario — seis pilares, una convicción",
    palabrasClave: [...COMUNES, "ideario", "pilares doctrinarios", "doctrina política"],
    migas: [{ nombre: "Ideario", path: "/ideario" }],
  },
  ...IDEARIO.map((p) => ({
    path: `/ideario/${p.slug}`,
    og: `ideario-${p.slug}`,
    // `nombreSeo` existe solo cuando el nombre completo, más la marca que
    // añade `title.template`, pasa de 60 caracteres y Google lo trunca.
    titulo: p.nombreSeo ?? p.nombre,
    descripcion: p.descripcion,
    ogAlt: `${p.nombre} — ${p.sumario}`,
    palabrasClave: [...COMUNES, p.nombre.toLowerCase(), "ideario"],
    migas: [
      { nombre: "Ideario", path: "/ideario" },
      { nombre: p.nombre, path: `/ideario/${p.slug}` },
    ],
  })),
  {
    path: "/actualidad",
    og: "actualidad",
    titulo: "Actualidad",
    descripcion:
      "Noticias, comunicados y actividades de Concertación Peruana. Recogemos aquí lo más importante de lo que publicamos en nuestras redes.",
    ogAlt: "Actualidad — lo que venimos publicando",
    palabrasClave: [...COMUNES, "noticias", "comunicados", "actividades"],
    migas: [{ nombre: "Actualidad", path: "/actualidad" }],
  },
  {
    path: "/partido",
    og: "partido",
    titulo: "Partido de la Concertación Peruana",
    descripcion:
      "Proyecto político impulsado por la Asociación de la Concertación Peruana, hoy en proceso de constitución formal como partido político.",
    ogAlt: "Partido de la Concertación Peruana — en proceso de constitución",
    palabrasClave: [...COMUNES, "partido en formación", "inscripción JNE", "organización política"],
    migas: [{ nombre: "El Partido", path: "/partido" }],
  },
];

export const porPath = (path: string) => RUTAS.find((r) => r.path === path);

export const urlOg = (og: string) => `${SITE_URL}/og/${og}.png`;

/**
 * Construye el objeto `metadata` de una página a partir de su ruta.
 * Concentra aquí canonical, Open Graph, Twitter e imagen para que ninguna
 * página pueda quedarse sin alguno por olvido.
 */
export function metadataDe(path: string, extra: Metadata = {}): Metadata {
  const r = porPath(path);
  if (!r) return extra;

  const imagen = {
    url: `/og/${r.og}.png`,
    width: 1200,
    height: 630,
    alt: r.ogAlt,
  };

  return {
    // La portada usa el título por defecto del layout (lleva la marca dentro)
    ...(path === "" ? {} : { title: r.titulo }),
    description: r.descripcion,
    keywords: r.palabrasClave,
    alternates: { canonical: path === "" ? "/" : path },
    openGraph: {
      type: path === "" ? "website" : "article",
      locale: "es_PE",
      siteName: SITE_NAME,
      url: path === "" ? "/" : path,
      title: r.titulo,
      description: r.descripcion,
      images: [imagen],
    },
    twitter: {
      card: "summary_large_image",
      title: r.titulo,
      description: r.descripcion,
      images: [imagen],
    },
    ...extra,
  };
}
