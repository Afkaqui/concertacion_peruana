import type { Metadata } from "next";
import { Seccion } from "../_ui/Pagina";
import Portada from "../_ui/Portada";
import Image from "next/image";
import Migas from "../_ui/Migas";
import IncrustadoRed from "../_ui/IncrustadoRed";
import { metadataDe } from "../_contenido/rutas";
import {
  PUBLICACIONES,
  REDES_INFO,
  ICONOS,
  fechaLegible,
  type Red,
} from "../_contenido/publicaciones";

export const metadata: Metadata = metadataDe("/actualidad");

/** Canales con enlace: YouTube aún no tiene, así que no aparece todavía. */
const CANALES = (Object.keys(REDES_INFO) as Red[]).filter(
  (r) => REDES_INFO[r].url
);

export default function Actualidad() {
  const hay = PUBLICACIONES.length > 0;

  return (
    <div className="flex-1 bg-verde-claro pb-16">
      <Migas path="/actualidad" />
      <Portada
        src="/portadas/actualidad.jpg"
        antetitulo="Actualidad"
        titulo="Lo que venimos publicando"
        entradilla="Recogemos aquí lo más importante de lo que compartimos en nuestras redes."
      />

      {hay ? (
        <Seccion>
          <ol className="grid gap-5">
            {PUBLICACIONES.map((p) => {
              const red = REDES_INFO[p.red];
              return (
                <li
                  key={p.slug}
                  className="overflow-hidden rounded-2xl border border-verde/15 bg-white sm:flex"
                >
                  {p.imagen && (
                    <Image
                      src={p.imagen}
                      alt=""
                      width={900}
                      height={600}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover sm:aspect-auto sm:w-56 sm:shrink-0"
                    />
                  )}

                  <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gris-medio">
                    <span className="inline-flex items-center gap-1.5 font-medium text-verde-profundo">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-4 w-4 fill-current"
                      >
                        <path d={ICONOS[p.red]} />
                      </svg>
                      {red.nombre}
                    </span>
                    <span aria-hidden="true" className="text-verde/50">
                      ·
                    </span>
                    <time dateTime={p.fecha}>{fechaLegible(p.fecha)}</time>
                  </div>

                  <h2 className="mt-3 font-serif text-xl leading-snug font-semibold text-balance text-verde-profundo">
                    {p.titulo}
                  </h2>
                  <p className="mt-2 text-gris-medio">{p.extracto}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-full bg-verde-profundo px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-grafito focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      Ver en {red.nombre}
                    </a>
                    {/* basis-full: al cargarse, el marco baja a su propia línea
                        en lugar de quedar apretado junto a los botones */}
                    {p.incrustar && (
                      <IncrustadoRed red={p.red} url={p.url} titulo={p.titulo} />
                    )}
                  </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Seccion>
      ) : (
        /* Estado honesto: la organización sí publica, solo que todavía no se ha
           recogido nada aquí. Se envía al visitante donde el contenido existe,
           en lugar de dejar una página en blanco. */
        <Seccion>
          <div className="rounded-2xl border border-verde/15 bg-white p-6 sm:p-8">
            <p className="text-lg text-grafito">
              Publicamos nuestras actividades y comunicados en redes sociales.
              Aquí iremos recogiendo lo más importante; mientras tanto, puedes
              seguirnos directamente:
            </p>

            <ul className="mt-6 flex flex-wrap gap-3">
              {CANALES.map((r) => (
                <li key={r}>
                  <a
                    href={REDES_INFO[r].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-verde/40 px-5 py-2.5 font-medium text-verde-profundo transition-colors hover:bg-verde-claro focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4 w-4 fill-current"
                    >
                      <path d={ICONOS[r]} />
                    </svg>
                    {REDES_INFO[r].nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Seccion>
      )}
    </div>
  );
}
