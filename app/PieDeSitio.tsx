import Image from "next/image";
import Link from "./_ui/Enlace";
import { REDES_INFO, ICONOS, type Red } from "./_contenido/publicaciones";

/** Solo las redes con enlace: evita publicar un canal que todavía no existe. */
const REDES = (Object.keys(REDES_INFO) as Red[])
  .filter((r) => REDES_INFO[r].url)
  .map((r) => ({ clave: r, nombre: REDES_INFO[r].nombre, url: REDES_INFO[r].url! }));

/**
 * Pie de sitio común (va en el layout raíz).
 *
 * Contiene SOLO datos verificados. Pendientes de la Sesión de Descubrimiento
 * (doc. 02 §1.4), para añadir aquí cuando se confirmen:
 *   - Correo institucional, WhatsApp y sedes.
 *   - Enlace a la política de privacidad (RNF-11).
 *   - YouTube: el canal aún no existe (conversación del 2/9/2026). Basta con
 *     rellenar su `url` en _contenido/publicaciones.ts y aparecerá aquí solo;
 *     mientras esté vacía no se muestra, para no dejar un enlace muerto.
 *
 * La nota de entidad no es decorativa: distingue a la Asociación (que existe)
 * del Partido (en constitución), tal como establece la fuente institucional.
 *
 * Fondo verde-profundo: el verde es superficie aquí, no texto. Contrastes
 * medidos — blanco 6.12:1, blanco/85 4.89:1. Ambos pasan AA (doc. 02 §5.4).
 */


const SECCIONES = [
  { href: "/institucional", texto: "Institucional" },
  { href: "/ideario", texto: "Ideario" },
  { href: "/partido", texto: "El Partido" },
  { href: "/actualidad", texto: "Actualidad" },
];

const ANIO = 2026;

export default function PieDeSitio() {
  return (
    <footer className="bg-verde-profundo text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-9 px-6 py-12 sm:py-14">
        <div className="grid gap-9 sm:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca */}
          <div>
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
                <p className="mt-1 text-[13px] font-semibold tracking-[0.18em] text-white/85 uppercase">
                  Dios · Patria · Familia
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-white/85">
              Asociación de la Concertación Peruana, base político-programática
              del Partido de la Concertación Peruana, en proceso de
              constitución.
            </p>
          </div>

          {/* Secciones */}
          <nav aria-label="Secciones del sitio">
            <h2 className="text-[13px] font-semibold tracking-[0.18em] text-white/85 uppercase">
              Secciones
            </h2>
            <ul className="mt-3 grid gap-1">
              {SECCIONES.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="inline-flex min-h-11 items-center text-sm underline-offset-4 transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                  >
                    {s.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Redes */}
          <nav aria-label="Redes sociales">
            <h2 className="text-[13px] font-semibold tracking-[0.18em] text-white/85 uppercase">
              Síguenos
            </h2>
            <ul className="mt-3 grid gap-1">
              {REDES.map((r) => (
                <li key={r.clave}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-sm underline-offset-4 transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 fill-current"
                    >
                      <path d={ICONOS[r.clave]} />
                    </svg>
                    {r.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <hr className="border-0 border-t border-white/15" />

        <p className="text-sm text-white/85">
          © {ANIO} Concertación Peruana ·{" "}
          <Link
            href="/"
            /* Va dentro de una frase, así que le aplicaría la excepción de
               enlace en línea de la SC 2.5.8; el relleno vertical lo lleva
               igualmente a 25px de alto sin romper el renglón. */
            className="inline-block py-1 underline-offset-4 transition-colors hover:underline"
          >
            concertacionperuana.pe
          </Link>
        </p>
      </div>
    </footer>
  );
}
