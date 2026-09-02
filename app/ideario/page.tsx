import type { Metadata } from "next";
import Link from "next/link";
import { EncabezadoPagina, Seccion } from "../_ui/Pagina";
import { IDEARIO } from "../_contenido/ideario";

export const metadata: Metadata = {
  title: "Nuestro Ideario",
  description:
    "Los seis pilares de Concertación Peruana: Humanismo Teísta, Democracia Participativa, Fraternidad, Igualdad de Oportunidades, Identidad Nacional y Concertación.",
  alternates: { canonical: "/ideario" },
  openGraph: {
    title: "Nuestro Ideario",
    description: "Los seis pilares doctrinarios de Concertación Peruana.",
    url: "/ideario",
    type: "article",
  },
};

export default function IdearioIndice() {
  return (
    <div className="flex-1 bg-verde-claro pb-16">
      <EncabezadoPagina
        antetitulo="Ideario"
        titulo="Seis pilares, una sola convicción"
        entradilla="Somos una organización humanista teísta, democrática participativa, concertadora y fraterna. Esto es lo que nos sostiene."
      />

      <Seccion>
        <ul className="grid gap-4 sm:grid-cols-2">
          {IDEARIO.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/ideario/${p.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-verde/15 bg-white p-6 transition-colors hover:border-verde/40 focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-xl font-semibold text-verde/50 tabular-nums"
                >
                  {i + 1}
                </span>
                <h2 className="mt-1 font-serif text-xl leading-snug font-semibold text-balance text-verde-profundo">
                  {p.nombre}
                </h2>
                <p className="mt-2 flex-1 text-gris-medio">{p.sumario}</p>
                <span className="mt-4 text-sm font-medium text-verde-profundo group-hover:underline">
                  Leer más →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Seccion>
    </div>
  );
}
