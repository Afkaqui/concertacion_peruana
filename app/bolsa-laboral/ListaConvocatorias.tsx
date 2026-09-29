"use client";

import { useEffect, useState } from "react";
import {
  API,
  MODALIDADES,
  fechaLegible,
  type Convocatoria,
} from "../_contenido/bolsa";

/**
 * Lista de convocatorias.
 *
 * Arranca con lo que trajo el build —ya viene dentro del HTML, así que se ve
 * sin esperar a nada— y vuelve a pedirlas al montar. Eso corrige lo que haya
 * vencido o entrado desde el último despliegue sin sacrificar el SEO.
 *
 * No hay pantalla de carga: habría un parpadeo entre contenido válido y un
 * esqueleto, que es peor que no tenerlo. Si la petición falla, se queda lo del
 * build, que es la información más reciente de la que disponemos.
 */
export default function ListaConvocatorias({
  iniciales,
}: {
  iniciales: Convocatoria[];
}) {
  const [convocatorias, setConvocatorias] = useState(iniciales);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`${API}/convocatorias`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (Array.isArray(d?.convocatorias)) setConvocatorias(d.convocatorias);
      })
      .catch(() => {
        /* se conserva lo del build */
      });
    return () => ctrl.abort();
  }, []);

  if (!convocatorias.length) {
    return (
      <div className="rounded-2xl border border-verde/15 bg-white p-8 text-center shadow-[0_1px_2px_rgba(28,43,35,0.04),0_12px_32px_-20px_rgba(0,113,63,0.35)]">
        <p className="font-serif text-xl font-semibold text-verde-profundo">
          Todavía no hay convocatorias abiertas
        </p>
        <p className="mx-auto mt-3 max-w-md text-gris-medio">
          Publicamos aquí las que encajan con los principios de la Asociación.
          Cuando haya alguna, aparecerá en esta página.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-5">
      {convocatorias.map((c) => (
        <li key={c.id}>
          <article className="flex h-full flex-col rounded-2xl border border-verde/12 bg-white p-6 shadow-[0_1px_2px_rgba(28,43,35,0.04),0_12px_32px_-20px_rgba(0,113,63,0.35)] sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              {c.area && (
                <span className="rounded-full bg-verde-claro px-3 py-1 text-[13px] font-semibold text-verde-profundo">
                  {c.area}
                </span>
              )}
              {c.modalidad && (
                <span className="rounded-full border border-verde/25 px-3 py-1 text-[13px] font-medium text-verde-profundo">
                  {MODALIDADES[c.modalidad] ?? c.modalidad}
                </span>
              )}
            </div>

            {/* h2, no h3: al quedar la pagina como vitrina pura, sin seccion
                intermedia, estas tarjetas cuelgan directamente del h1. Saltar
                de h1 a h3 rompe la navegacion por encabezados de un lector de
                pantalla. */}
            <h2 className="mt-3 font-serif text-xl leading-snug font-semibold text-balance text-verde-profundo">
              {c.titulo}
            </h2>
            <p className="mt-1 text-[15px] font-medium text-gris-medio">
              {c.organizacion}
              {c.ubicacion && ` · ${c.ubicacion}`}
            </p>

            <p className="mt-3 flex-1 text-grafito">{c.resumen}</p>

            <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-gris-medio">
              <div className="flex gap-1.5">
                <dt>Publicada:</dt>
                <dd>{fechaLegible(c.publicada_en)}</dd>
              </div>
              {c.vigente_hasta && (
                <div className="flex gap-1.5">
                  <dt>Postula hasta:</dt>
                  <dd className="font-medium text-verde-profundo">
                    {fechaLegible(c.vigente_hasta)}
                  </dd>
                </div>
              )}
            </dl>

            {/*
              La postulación ocurre SIEMPRE en la fuente original, nunca aquí.
              Es lo que mantiene el sitio sin recoger datos personales, y por
              tanto fuera del alcance de la Ley 29733. No convertir esto en un
              formulario sin resolver antes el marco legal (doc. 06 §5).
            */}
            <p className="mt-5">
              <a
                href={c.url_fuente}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-verde-profundo px-5 font-medium text-white transition-colors hover:bg-verde focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Ver la convocatoria
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7ZM5 5h5V3H3v18h18v-7h-2v5H5V5Z" />
                </svg>
                <span className="sr-only">(se abre en otra pestaña)</span>
              </a>
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
