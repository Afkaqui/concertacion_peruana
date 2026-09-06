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
