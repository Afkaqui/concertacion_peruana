import Image from "next/image";
import Link from "./_ui/Enlace";

/**
 * Cabecera común. Server Component puro: sin menú desplegable ni JS de cliente.
 * Con cuatro enlaces la fila exige 428 px y no cabe en móvil (medido). En vez
 * de un menú desplegable —que añade JS de cliente y un estado más— el menú se
 * desplaza en horizontal: la cabecera se queda en 61 px y todos los enlaces
 * siguen alcanzables (RNF-01, RNF-04).
 */

const ENLACES = [
  { href: "/institucional", texto: "Institucional" },
  { href: "/ideario", texto: "Ideario" },
  { href: "/partido", texto: "Partido" },
  { href: "/actualidad", texto: "Actualidad" },
];

export default function Cabecera() {
  return (
    <header className="sticky top-0 z-50 border-b border-verde/15 bg-verde-claro/90 backdrop-blur-sm">
      {/* Una sola fila también en móvil. Apilada ocupaba 125 px de 844 —el 15%
          del viewport— de forma permanente por ser fija, y el tráfico llega
          sobre todo desde TikTok en móvil (RNF-01). */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-2 sm:gap-6 sm:px-5 sm:py-3">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Image
            src="/logo-384.png"
            alt=""
            width={384}
            height={384}
            className="h-9 w-9 shrink-0"
          />
          <span className="hidden font-serif text-base leading-tight font-semibold text-verde-profundo sm:inline">
            Concertación Peruana
          </span>
          <span className="sr-only sm:hidden">Concertación Peruana — ir al inicio</span>
        </Link>

        <nav aria-label="Principal" className="min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex w-max items-center gap-1 text-sm">
            {ENLACES.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="inline-flex min-h-11 items-center rounded-full px-2.5 font-medium sm:px-3 text-verde-profundo transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
