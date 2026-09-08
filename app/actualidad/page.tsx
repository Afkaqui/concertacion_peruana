import type { Metadata } from "next";
import { EncabezadoPagina, Seccion } from "../_ui/Pagina";
import Migas from "../_ui/Migas";
import IncrustadoFacebook from "../_ui/IncrustadoFacebook";
import { metadataDe } from "../_contenido/rutas";
import {
  PUBLICACIONES,
  REDES_INFO,
  fechaLegible,
  type Red,
} from "../_contenido/publicaciones";

export const metadata: Metadata = metadataDe("/actualidad");

const ICONO: Record<Red, string> = {
  facebook:
    "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z",
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.02a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z",
  tiktok:
    "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06v-3.1a5.66 5.66 0 0 0-.77-.05 5.68 5.68 0 1 0 5.68 5.68V9.01a7.35 7.35 0 0 0 4.31 1.38V7.3a4.28 4.28 0 0 1-3.25-1.48Z",
};

export default function Actualidad() {
  const hay = PUBLICACIONES.length > 0;

  return (
    <div className="flex-1 bg-verde-claro pb-16">
      <Migas path="/actualidad" />
      <EncabezadoPagina
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
                  className="rounded-2xl border border-verde/15 bg-white p-6 sm:p-7"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gris-medio">
                    <span className="inline-flex items-center gap-1.5 font-medium text-verde-profundo">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                        <path d={ICONO[p.red]} />
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
                    {p.incrustar && p.red === "facebook" && (
                      <IncrustadoFacebook url={p.url} titulo={p.titulo} />
                    )}
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
              {(Object.keys(REDES_INFO) as Red[]).map((r) => (
                <li key={r}>
                  <a
                    href={REDES_INFO[r].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-verde/40 px-5 py-2.5 font-medium text-verde-profundo transition-colors hover:bg-verde-claro focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                      <path d={ICONO[r]} />
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
