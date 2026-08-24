import Image from "next/image";

const TIKTOK_URL = "https://www.tiktok.com/@concertacionperuana";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-verde-claro px-6 py-16">
      <main className="flex w-full max-w-xl flex-col items-center text-center">
        <Image
          src="/logo-384.png"
          alt="Partido de la Concertación Peruana — Dios, Patria, Familia"
          width={168}
          height={168}
          priority
          className="h-36 w-36 sm:h-42 sm:w-42"
        />

        <h1 className="mt-8 font-serif text-3xl leading-tight font-semibold tracking-tight text-verde-profundo sm:text-4xl">
          Concertación Peruana
        </h1>

        {/* verde-profundo, no verde: #00A35E sobre fondo claro da 2.95:1 y
            no alcanza el 4.5:1 de WCAG AA (RNF-05). Medido, no supuesto. */}
        <p className="mt-3 text-sm font-semibold tracking-[0.18em] text-verde-profundo uppercase">
          Dios · Patria · Familia
        </p>

        <hr className="my-8 h-px w-16 border-0 bg-verde/30" />

        <p className="text-lg text-balance text-grafito">
          Un Perú para todos, que se construye unidos.
        </p>

        <p className="mt-4 text-base text-gris-medio">
          Estamos construyendo nuestro sitio web. Muy pronto encontrarás aquí
          nuestro ideario, nuestras propuestas y cómo sumarte.
        </p>

        <a
          href={TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          // Área táctil ≥ 44px (RNF-06). Fondo verde-profundo: con el verde de
          // marca el texto blanco queda en 3.28:1 y no pasa AA (RNF-05).
          className="mt-10 inline-flex min-h-11 items-center justify-center rounded-full bg-verde-profundo px-7 py-3 font-medium text-white transition-colors hover:bg-grafito focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Síguenos en TikTok
        </a>
      </main>

      <footer className="mt-16 text-center text-sm text-gris-medio">
        <p>concertacionperuana.pe</p>
      </footer>
    </div>
  );
}
