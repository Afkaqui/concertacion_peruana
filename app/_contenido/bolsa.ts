/**
 * Bolsa Laboral — cliente de la API.
 *
 * ── POR QUÉ SE LEE DOS VECES ─────────────────────────────────────────────
 *
 * El sitio es un export estático, así que había que elegir entre dos males:
 *
 *   Leer al compilar     las convocatorias quedan dentro del HTML, Google las
 *                        indexa y se pintan al instante — pero se congelan
 *                        hasta el siguiente despliegue, y una oferta vencida
 *                        seguiría a la vista.
 *   Leer en el navegador siempre frescas, la caducidad funciona sola — pero
 *                        Google no ve nada y hay un parpadeo de carga.
 *
 * Se hacen las dos. El HTML sale del build con las convocatorias dentro (SEO y
 * pintado inmediato) y el navegador vuelve a pedirlas al cargar, corrigiendo
 * lo que haya vencido o entrado desde el último despliegue. Quien no tenga
 * JavaScript ve la versión del build, que es contenido real, no un hueco.
 *
 * ── SI LA API NO RESPONDE AL COMPILAR ────────────────────────────────────
 *
 * El build NO falla: devuelve lista vacía y la página explica que no hay
 * convocatorias. Un backend caído no puede impedir desplegar el sitio
 * institucional — son cosas separadas y así deben seguir.
 */

export const API = "https://api.concertacionperuana.pe";

export type Convocatoria = {
  id: number;
  slug: string;
  titulo: string;
  organizacion: string;
  resumen: string;
  descripcion: string | null;
  area: string | null;
  modalidad: "presencial" | "remoto" | "hibrido" | null;
  ubicacion: string | null;
  url_fuente: string;
  publicada_en: string;
  vigente_hasta: string | null;
};

export async function obtenerConvocatorias(): Promise<Convocatoria[]> {
  try {
    const r = await fetch(`${API}/convocatorias`, {
      // 10 s: en el build, esperar más solo retrasa el despliegue.
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!r.ok) return [];
    const datos = await r.json();
    return Array.isArray(datos?.convocatorias) ? datos.convocatorias : [];
  } catch {
    // Silencioso a propósito: es una degradación prevista, no un error.
    return [];
  }
}

export const MODALIDADES: Record<string, string> = {
  presencial: "Presencial",
  remoto: "Remoto",
  hibrido: "Híbrido",
};

/** "2026-09-29" → "29 de septiembre de 2026", sin depender de la zona horaria. */
export function fechaLegible(iso: string): string {
  const [a, m, d] = iso.slice(0, 10).split("-").map(Number);
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${d} de ${meses[m - 1]} de ${a}`;
}
