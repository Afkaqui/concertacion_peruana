import TrebolWebGL from "./TrebolWebGL";
import EntradaTexto from "./EntradaTexto";

const TIKTOK_URL = "https://www.tiktok.com/@concertacionperuana";
const LEMA = ["Dios", "·", "Patria", "·", "Familia"];

export default function Home() {
  return (
    <EntradaTexto>
      <div className="flex flex-1 flex-col items-center justify-center bg-verde-claro px-6 py-16">
        <main className="flex w-full max-w-xl flex-col items-center text-center">
          {/* PROTOTIPO 1 — three.js conducido por anime.js */}
          <div data-anim="marca" className="w-36 sm:w-44">
            <TrebolWebGL />
          </div>

          <span
            data-anim="estado"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-verde/25 bg-white px-3 py-1 text-xs font-semibold tracking-[0.1em] text-verde-profundo uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-verde" />
            Sitio en construcción
          </span>

          <h1
            data-anim="titulo"
            className="mt-5 font-serif text-3xl leading-tight font-semibold tracking-tight text-verde-profundo sm:text-4xl"
          >
            Concertación Peruana
          </h1>

          {/* PROTOTIPO 2 — anime.js sobre el DOM: stagger palabra por palabra */}
          <p className="mt-3 flex flex-wrap justify-center gap-x-2 text-sm font-semibold tracking-[0.18em] text-verde-profundo uppercase">
            {LEMA.map((palabra, i) => (
              <span key={i} data-anim="lema-palabra" className="inline-block">
                {palabra}
              </span>
            ))}
          </p>

          <hr
            data-anim="filete"
            className="my-8 h-px w-16 origin-center border-0 bg-verde/30"
          />

          <p data-anim="cuerpo" className="text-lg text-balance text-grafito">
            Un Perú para todos, que se construye unidos.
          </p>

          <p data-anim="cuerpo" className="mt-4 text-base text-gris-medio">
            Estamos construyendo nuestro sitio web. Muy pronto encontrarás aquí
            nuestro ideario, nuestras propuestas y cómo sumarte.
          </p>

          <a
            data-anim="accion"
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
      </div>
    </EntradaTexto>
  );
}
