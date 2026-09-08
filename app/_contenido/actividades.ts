/**
 * Actividades de la organización — alimenta el carrusel de la portada.
 *
 * ── CÓMO AÑADIR UNA FOTO ─────────────────────────────────────────────────
 *  1. Copia la imagen en  public/actividades/
 *     Nombre: AAAA-MM-DD-lugar-tema-NN.jpg   (minúsculas, sin tildes ni espacios)
 *     Formato: horizontal 3:2, mínimo 1600 px de ancho, sin marca de agua.
 *  2. Añade una entrada abajo, la más reciente primero.
 *  3. `alt` describe lo que se ve, para quien no puede ver la imagen.
 *     No repitas el título: complementa.
 *
 * ── REQUISITO LEGAL ──────────────────────────────────────────────────────
 *  Toda persona identificable que aparezca debe haber firmado autorización de
 *  uso de imagen. No es una formalidad: es condición para publicar (doc. 02 §5.1).
 *
 * ── ESTADO ───────────────────────────────────────────────────────────────
 *  Vacío a propósito. El carrusel NO se renderiza mientras no haya entradas,
 *  así que la portada no muestra un hueco ni una sección vacía.
 *  Abajo queda un ejemplo listo para descomentar, y los marcadores de
 *  public/actividades/muestra/ sirven para ver el componente funcionando
 *  (bórralos cuando lleguen las fotos reales).
 */

export type Actividad = {
  /** Ruta desde /public */
  src: string;
  /** Descripción para lectores de pantalla */
  alt: string;
  titulo: string;
  lugar?: string;
  /** ISO: "2026-09-02" */
  fecha?: string;
  /** Si se indica, el título de la tarjeta enlaza aquí */
  href?: string;
  /** Atribución, obligatoria en las fotos con licencia Creative Commons */
  credito?: { autor: string; licencia: string; pagina: string };
  ancho: number;
  alto: number;
};

export const ACTIVIDADES: Actividad[] = [
  // Descomenta y ajusta cuando lleguen las fotos:
  //
  // {
  //   src: "/actividades/2026-09-02-lima-asamblea-01.jpg",
  //   alt: "Militantes reunidos alrededor de una mesa durante la asamblea de bases",
  //   titulo: "Asamblea con bases",
  //   lugar: "Lima",
  //   fecha: "2026-09-02",
  //   ancho: 1600,
  //   alto: 1067,
  // },
];

/** Marcadores para previsualizar el componente. No usar en producción. */
export const ACTIVIDADES_MUESTRA: Actividad[] = [
  {
    src: "/actividades/muestra/muestra-1.png",
    alt: "Marcador de posición para una fotografía de asamblea de bases",
    titulo: "Asamblea de bases",
    lugar: "Por definir",
    fecha: "2026-09-02",
    ancho: 1200,
    alto: 800,
  },
  {
    src: "/actividades/muestra/muestra-2.png",
    alt: "Marcador de posición para una fotografía de jornada de formación",
    titulo: "Jornada de formación",
    lugar: "Por definir",
    fecha: "2026-08-24",
    ancho: 1200,
    alto: 800,
  },
  {
    src: "/actividades/muestra/muestra-3.png",
    alt: "Marcador de posición para una fotografía de mesa de concertación",
    titulo: "Mesa de concertación",
    lugar: "Por definir",
    fecha: "2026-08-10",
    ancho: 1200,
    alto: 800,
  },
  {
    src: "/actividades/muestra/muestra-4.png",
    alt: "Marcador de posición para una fotografía de encuentro regional",
    titulo: "Encuentro regional",
    lugar: "Por definir",
    fecha: "2026-07-28",
    ancho: 1200,
    alto: 800,
  },
  {
    src: "/actividades/muestra/muestra-5.png",
    alt: "Marcador de posición para una fotografía de reunión de dirigencia",
    titulo: "Reunión de dirigencia",
    lugar: "Por definir",
    fecha: "2026-07-15",
    ancho: 1200,
    alto: 800,
  },
];

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "2026-09-02" -> "2 de septiembre de 2026" */
export function fechaLarga(iso?: string): string | undefined {
  if (!iso) return undefined;
  const [a, m, d] = iso.split("-").map(Number);
  if (!a || !m || !d) return undefined;
  return `${d} de ${MESES[m - 1]} de ${a}`;
}


/**
 * Tarjetas del Ideario — lo que muestra el carrusel MIENTRAS no hay fotografía
 * de actividades.
 *
 * No son fotos ni lo aparentan: son citas literales del Ideario compuestas con
 * la identidad de la organización. Bajo un título como "Nuestras actividades",
 * una foto de banco afirmaría que esa actividad ocurrió; una cita no afirma
 * nada que no sea cierto.
 *
 * Se generan con `python scripts/generar-tarjetas-ideario.py`.
 *
 * CUANDO LLEGUEN LAS FOTOS: en app/page.tsx, cambiar el import y el prop a
 * ACTIVIDADES y ajustar el título del carrusel a "Nuestras actividades".
 */
export const DESTACADOS_IDEARIO: Actividad[] = [
  { src: "/ideario/humanismo-teista.png", titulo: "Humanismo Teísta",
    alt: "Cita del Ideario: todos somos iguales en dignidad, en derechos y en oportunidades",
    href: "/ideario/humanismo-teista", ancho: 1500, alto: 1000 },
  { src: "/ideario/democracia-participativa.png", titulo: "Democracia Participativa",
    alt: "Cita del Ideario: una democracia auténtica da voz a quienes rara vez son escuchados",
    href: "/ideario/democracia-participativa", ancho: 1500, alto: 1000 },
  { src: "/ideario/fraternidad.png", titulo: "Fraternidad",
    alt: "Cita del Ideario: es amar al prójimo como a nosotros mismos",
    href: "/ideario/fraternidad", ancho: 1500, alto: 1000 },
  { src: "/ideario/igualdad-de-oportunidades.png", titulo: "Igualdad de Oportunidades",
    alt: "Cita del Ideario: las desigualdades son construcciones sociales e históricas y se pueden transformar",
    href: "/ideario/igualdad-de-oportunidades", ancho: 1500, alto: 1000 },
  { src: "/ideario/identidad-nacional.png", titulo: "Identidad Nacional",
    alt: "Cita del Ideario: un solo Perú, diverso y fraterno",
    href: "/ideario/identidad-nacional", ancho: 1500, alto: 1000 },
  { src: "/ideario/concertacion.png", titulo: "Concertación",
    alt: "Cita del Ideario: no es el camino más corto, pero sí el más seguro para legitimar decisiones",
    href: "/ideario/concertacion", ancho: 1500, alto: 1000 },
];


/**
 * Fotografía del Perú (Wikimedia Commons) — territorio y sectores productivos.
 *
 * NO son actividades de la organización y el título del carrusel no lo insinúa.
 * Ilustran el país del que habla el Ideario; presentarlas bajo "Nuestras
 * actividades" sí afirmaría hechos que no ocurrieron.
 *
 * La atribución se muestra en cada pie: es condición de la licencia CC, no un
 * detalle opcional. Se generan con `python scripts/descargar-fotos-peru.py`.
 */
import { CREDITOS } from "./creditos";

export const FOTOS_PERU: Actividad[] = CREDITOS.map((c) => ({
  src: `/peru/${c.nombre}.jpg`,
  alt: `${c.titulo}: ${c.pie}`,
  titulo: c.titulo,
  lugar: c.pie,
  ancho: 1400,
  alto: 933,
  credito: { autor: c.autor, licencia: c.licencia, pagina: c.pagina },
}));
