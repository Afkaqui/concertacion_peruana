import type { Metadata } from "next";
import Image from "next/image";
import Link from "../_ui/Enlace";
import Revelar from "../_ui/Revelar";
import { Seccion } from "../_ui/Pagina";
import { IDEARIO } from "../_contenido/ideario";
import { metadataDe } from "../_contenido/rutas";
import Portada from "../_ui/Portada";
import Migas from "../_ui/Migas";

/**
 * La misma fotografia que encabeza cada pagina de pilar.
 *
 * Deliberado: la miniatura de la tarjeta anticipa lo que se vera al entrar, en
 * vez de ser una imagen decorativa sin relacion. Debe seguir el mismo orden
 * que PORTADAS_PILAR en ideario/[pilar]/page.tsx.
 */
const MINIATURAS = [
  "/peru/sierra.jpg",
  "/peru/andes.jpg",
  "/peru/campo.jpg",
  "/peru/costa.jpg",
  "/peru/turismo.jpg",
  "/portadas/ideario.jpg",
];

export const metadata: Metadata = metadataDe("/ideario");

export default function IdearioIndice() {
  return (
    <div className="flex-1 bg-verde-claro pb-16">
      <Migas path="/ideario" />
      <Portada
        src="/portadas/ideario.jpg"
        antetitulo="Ideario"
        titulo="Seis pilares, una sola convicción"
        entradilla="Somos una organización humanista teísta, democrática participativa, concertadora y fraterna. Esto es lo que nos sostiene."
      />

      <Seccion>
        <Revelar as="ul" escalonado={70} className="grid gap-4 sm:grid-cols-2">
          {IDEARIO.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/ideario/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-verde/15 bg-white shadow-[0_1px_2px_rgba(28,43,35,0.04),0_12px_32px_-20px_rgba(0,113,63,0.35)] transition-colors hover:border-verde/40 focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {/* Decorativa: el nombre del pilar ya está en el <h2> de al
                    lado, así que `alt=""` evita que se anuncie dos veces. */}
                <span className="relative block aspect-[16/7] overflow-hidden bg-grafito">
                  <Image
                    src={MINIATURAS[i % MINIATURAS.length]}
                    alt=""
                    width={640}
                    height={280}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 font-serif text-base font-semibold text-verde-profundo tabular-nums"
                  >
                    {i + 1}
                  </span>
                </span>

                <span className="flex flex-1 flex-col p-6">
                  <h2 className="font-serif text-xl leading-snug font-semibold text-balance text-verde-profundo">
                    {p.nombre}
                  </h2>
                  <span className="mt-2 flex-1 text-gris-medio">{p.sumario}</span>
                  <span className="mt-4 text-sm font-medium text-verde-profundo group-hover:underline">
                    Leer más →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </Revelar>
      </Seccion>
    </div>
  );
}
