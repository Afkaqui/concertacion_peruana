import type { Metadata } from "next";
import Link from "../../_ui/Enlace";
import { notFound } from "next/navigation";
import { EncabezadoPagina, Seccion, Ancla } from "../../_ui/Pagina";
import { IDEARIO, porSlug } from "../../_contenido/ideario";
import { metadataDe } from "../../_contenido/rutas";
import Migas from "../../_ui/Migas";

// Obligatorio con `output: 'export'`: las rutas dinámicas necesitan conocer
// todos sus parámetros en compilación (doc. 03 §1.1).
export function generateStaticParams() {
  return IDEARIO.map((p) => ({ pilar: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pilar: string }>;
}): Promise<Metadata> {
  const { pilar } = await params;
  return metadataDe(`/ideario/${pilar}`);
}

export default async function PaginaPilar({
  params,
}: {
  params: Promise<{ pilar: string }>;
}) {
  const { pilar } = await params;
  const p = porSlug(pilar);
  if (!p) notFound();

  const i = IDEARIO.findIndex((x) => x.slug === p.slug);
  const siguiente = IDEARIO[(i + 1) % IDEARIO.length];

  return (
    <div className="flex-1 bg-verde-claro pb-16">
      <Migas path={`/ideario/${p.slug}`} />
      <EncabezadoPagina antetitulo={`Ideario · ${i + 1} de 6`} titulo={p.nombre} />

      <Seccion>
        <Ancla>«{p.ancla}»</Ancla>

        <div className="mt-8 grid gap-5 text-lg text-grafito">
          {p.parrafos.map((t, n) => (
            <p key={n}>{t}</p>
          ))}
        </div>
      </Seccion>

      <Seccion titulo="Qué significa en la práctica">
        <ul className="grid gap-3">
          {p.practica.map((t, n) => (
            <li
              key={n}
              className="flex gap-3 rounded-xl border border-verde/15 bg-white p-4"
            >
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-verde" />
              <span className="text-gris-medio">{t}</span>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* Se lee como recorrido, no como archivo (doc. 02 §4.4) */}
      <Seccion>
        <Link
          href={`/ideario/${siguiente.slug}`}
          className="group flex flex-col rounded-2xl border border-verde/15 bg-white p-6 transition-colors hover:border-verde/40 focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <span className="text-xs font-semibold tracking-[0.18em] text-verde-profundo uppercase">
            Siguiente pilar
          </span>
          <span className="mt-2 font-serif text-xl font-semibold text-verde-profundo group-hover:underline">
            {siguiente.nombre} →
          </span>
        </Link>

        <p className="mt-5 text-center">
          <Link
            href="/ideario"
            className="inline-flex min-h-11 items-center px-3 text-sm font-medium text-verde-profundo underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Ver los seis pilares
          </Link>
        </p>
      </Seccion>
    </div>
  );
}
