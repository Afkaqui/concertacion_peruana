import Link from "./_ui/Enlace";
import TrebolWebGL from "./TrebolWebGL";
import EntradaTexto from "./EntradaTexto";
import { Seccion } from "./_ui/Pagina";
import { IDEARIO } from "./_contenido/ideario";
import { VISION } from "./_contenido/institucional";
import DatosEstructurados from "./_ui/DatosEstructurados";
import type { Metadata } from "next";
import { metadataDe } from "./_contenido/rutas";

export const metadata: Metadata = metadataDe("");

const LEMA = ["Dios", "·", "Patria", "·", "Familia"];

const EJES = [
  "Agricultura",
  "Turismo",
  "Industria",
  "Innovación tecnológica",
  "Pesquería",
  "Minería responsable",
];

export default function Home() {
  return (
    <div className="flex-1 bg-verde-claro pb-16">
      <DatosEstructurados />

      {/* ── Portada ─────────────────────────────────────────────── */}
      <EntradaTexto>
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 pt-14 pb-10 text-center sm:pt-20">
          <div data-anim="marca" className="w-32 sm:w-40">
            <TrebolWebGL />
          </div>

          <h1
            data-anim="titulo"
            className="mt-7 font-serif text-3xl leading-tight font-semibold tracking-tight text-verde-profundo sm:text-5xl"
          >
            Concertación Peruana
          </h1>

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

          <p
            data-anim="cuerpo"
            className="font-serif text-xl text-balance text-grafito sm:text-2xl"
          >
            Un Perú para todos, que se construye unidos.
          </p>

          <p data-anim="cuerpo" className="mt-4 text-lg text-balance text-gris-medio">
            Somos una organización humanista teísta, democrática participativa,
            concertadora y fraterna, comprometida con un cambio generacional de
            pensamiento y acción.
          </p>

          <div data-anim="accion" className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/ideario"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-verde-profundo px-7 py-3 font-medium text-white transition-colors hover:bg-grafito focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Conoce nuestro Ideario
            </Link>
            <Link
              href="/partido"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-verde/40 px-7 py-3 font-medium text-verde-profundo transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              El Partido
            </Link>
          </div>
        </section>
      </EntradaTexto>

      {/* ── Los tres principios ─────────────────────────────────── */}
      <Seccion className="max-w-4xl!">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Dios",
              d: "La dignidad de la persona tiene un fundamento trascendente: es inviolable y no la otorga el Estado.",
            },
            {
              t: "Patria",
              d: "Un solo Perú, diverso y fraterno. La peruanidad como suma de identidades, no como uniformidad.",
            },
            {
              t: "Familia",
              d: "Pilar de la sociedad y primer espacio donde se forman los valores básicos de la convivencia.",
            },
          ].map((x) => (
            <li
              key={x.t}
              className="rounded-2xl border border-verde/15 bg-white p-6 text-center"
            >
              <h2 className="font-serif text-xl font-semibold text-verde-profundo">
                {x.t}
              </h2>
              <p className="mt-2 text-gris-medio">{x.d}</p>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* ── Visión ──────────────────────────────────────────────── */}
      <Seccion titulo="Hacia dónde vamos">
        <div className="rounded-2xl border border-verde/15 bg-white p-6 sm:p-8">
          <p className="text-lg text-grafito">{VISION}</p>
          <p className="mt-5">
            <Link
              href="/institucional"
              className="font-medium text-verde-profundo underline-offset-4 hover:underline"
            >
              Ver misión y objetivos estratégicos →
            </Link>
          </p>
        </div>
      </Seccion>

      {/* ── Ideario ─────────────────────────────────────────────── */}
      <Seccion titulo="Nuestro Ideario">
        <p className="mb-6 text-gris-medio">
          Seis pilares doctrinarios que orientan cada decisión.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {IDEARIO.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/ideario/${p.slug}`}
                className="group flex h-full flex-col rounded-xl border border-verde/15 bg-white p-5 transition-colors hover:border-verde/40 focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <h3 className="font-serif text-lg leading-snug font-semibold text-balance text-verde-profundo group-hover:underline">
                  {p.nombre}
                </h3>
                <p className="mt-1 text-sm text-gris-medio">{p.sumario}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* ── Ejes de desarrollo ──────────────────────────────────── */}
      <Seccion titulo="Sobre qué construir el desarrollo">
        <p className="mb-6 text-gris-medio">
          Partimos de nuestra realidad y de nuestras potencialidades.
        </p>
        <ul className="flex flex-wrap gap-2">
          {EJES.map((e) => (
            <li
              key={e}
              className="rounded-full border border-verde/25 bg-white px-4 py-2 text-sm font-medium text-verde-profundo"
            >
              {e}
            </li>
          ))}
        </ul>
      </Seccion>
    </div>
  );
}
