import Image from "next/image";
import Link from "next/link";

/**
 * Pie de sitio provisional, común a todas las páginas (va en el layout raíz).
 *
 * Deliberadamente contiene SOLO datos verificados. Faltan por confirmar en la
 * Sesión de Descubrimiento (doc. 02 §1.1 y §1.4) y deben añadirse aquí:
 *   - Denominación oficial: hoy conviven "Asociación" (TikTok) y "Partido"
 *     (logo). Hasta cerrarlo, el pie usa la forma neutra "Concertación Peruana".
 *   - Correo institucional, WhatsApp y sedes.
 *   - Enlace a la política de privacidad (RNF-11).
 *   - Resto de redes sociales.
 *
 * Fondo verde-profundo: el verde es superficie aquí, no texto, y sobre él el
 * blanco alcanza 6.12:1 — sí cumple AA (doc. 02 §5.4).
 */

const TIKTOK_URL = "https://www.tiktok.com/@concertacionperuana";
const ANIO = 2026;

export default function PieDeSitio() {
  return (
    <footer className="bg-verde-profundo text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12 sm:py-14">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          {/* Marca */}
          <div className="flex items-center gap-4">
            <Image
              src="/logo-blanco-192.png"
              alt=""
              width={192}
              height={192}
              className="h-12 w-12 shrink-0"
            />
            <div>
              <p className="font-serif text-lg leading-tight font-semibold">
                Concertación Peruana
              </p>
              <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-white/85 uppercase">
                Dios · Patria · Familia
              </p>
            </div>
          </div>

          {/* Canales. Hoy solo hay uno confirmado; el resto se suma tras la sesión. */}
          <nav aria-label="Redes sociales">
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 font-medium transition-colors hover:bg-white hover:text-verde-profundo focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-verde-profundo focus-visible:outline-none"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 fill-current"
              >
                <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06v-3.1a5.66 5.66 0 0 0-.77-.05 5.68 5.68 0 1 0 5.68 5.68V9.01a7.35 7.35 0 0 0 4.31 1.38V7.3a4.28 4.28 0 0 1-3.25-1.48Z" />
              </svg>
              TikTok
            </a>
          </nav>
        </div>

        <hr className="border-0 border-t border-white/15" />

        <div className="flex flex-col items-center gap-3 text-center text-sm text-white/85 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {ANIO} Concertación Peruana ·{" "}
            <Link
              href="/"
              className="underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              concertacionperuana.pe
            </Link>
          </p>
          <p>Sitio en construcción</p>
        </div>
      </div>
    </footer>
  );
}
