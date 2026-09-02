import Image from "next/image";
import Link from "./_ui/Enlace";

/**
 * Cabecera común. Server Component puro: sin menú desplegable ni JS de cliente.
 * Con tres enlaces cortos la fila cabe en 360 px, así que un hamburguesa solo
 * añadiría peso y un estado más que mantener (RNF-01, RNF-04).
 */

const ENLACES = [
  { href: "/institucional", texto: "Institucional" },
  { href: "/ideario", texto: "Ideario" },
  { href: "/partido", texto: "El Partido" },
];

export default function Cabecera() {
  return (
    <header className="sticky top-0 z-50 border-b border-verde/15 bg-verde-claro/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 px-5 py-3 sm:flex-row sm:justify-between sm:gap-6">
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
          <span className="font-serif text-base leading-tight font-semibold text-verde-profundo">
            Concertación Peruana
          </span>
        </Link>

        <nav aria-label="Principal">
          <ul className="flex items-center gap-1 text-sm">
            {ENLACES.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3 font-medium text-verde-profundo transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
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
