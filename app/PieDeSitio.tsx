import Image from "next/image";
import Link from "./_ui/Enlace";

/**
 * Pie de sitio común (va en el layout raíz).
 *
 * Contiene SOLO datos verificados. Pendientes de la Sesión de Descubrimiento
 * (doc. 02 §1.4), para añadir aquí cuando se confirmen:
 *   - Correo institucional, WhatsApp y sedes.
 *   - Enlace a la política de privacidad (RNF-11).
 *
 * La nota de entidad no es decorativa: distingue a la Asociación (que existe)
 * del Partido (en constitución), tal como establece la fuente institucional.
 *
 * Fondo verde-profundo: el verde es superficie aquí, no texto. Contrastes
 * medidos — blanco 6.12:1, blanco/85 4.89:1. Ambos pasan AA (doc. 02 §5.4).
 */

const REDES = [
  {
    nombre: "TikTok",
    url: "https://www.tiktok.com/@concertacionperuana",
    icono: "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06v-3.1a5.66 5.66 0 0 0-.77-.05 5.68 5.68 0 1 0 5.68 5.68V9.01a7.35 7.35 0 0 0 4.31 1.38V7.3a4.28 4.28 0 0 1-3.25-1.48Z",
  },
  {
    nombre: "Facebook",
    url: "https://www.facebook.com/p/Partido-De-La-Concertaci%C3%B3n-Peruana-61582546580948/",
    icono: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z",
  },
  {
    nombre: "Instagram",
    url: "https://www.instagram.com/partidodelaconcertacionperuana/",
    icono: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.02a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z",
  },
];

const SECCIONES = [
  { href: "/institucional", texto: "Institucional" },
  { href: "/ideario", texto: "Ideario" },
  { href: "/partido", texto: "El Partido" },
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
                <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-white/85 uppercase">
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
            <h2 className="text-xs font-semibold tracking-[0.18em] text-white/85 uppercase">
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
            <h2 className="text-xs font-semibold tracking-[0.18em] text-white/85 uppercase">
              Síguenos
            </h2>
            <ul className="mt-3 grid gap-1">
              {REDES.map((r) => (
                <li key={r.nombre}>
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
                      <path d={r.icono} />
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
            className="underline-offset-4 transition-colors hover:underline"
          >
            concertacionperuana.pe
          </Link>
        </p>
      </div>
    </footer>
  );
}
