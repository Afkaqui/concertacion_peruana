"use client";

import { useState } from "react";
import {
  ICONOS,
  PROPORCION,
  REDES_INFO,
  urlIncrustado,
  type Red,
} from "../_contenido/publicaciones";

/**
 * Fachada para incrustar una publicación de Facebook, Instagram, TikTok o
 * YouTube.
 *
 * El iframe NO se carga hasta que el visitante lo pide. Dos motivos:
 *
 *  · Rendimiento. Cada incrustado arrastra cientos de kilobytes y varias
 *    peticiones a terceros. En una lista de publicaciones eso se multiplica
 *    por cada entrada (RNF-02, RNF-04).
 *
 *  · Privacidad. Mientras no se pulse, la red social no recibe ninguna
 *    petición ni sabe que alguien visitó esta página. Quien solo lee el
 *    resumen no queda registrado por un tercero.
 *
 * Las cuatro se incrustan por iframe, sin SDK ni token de aplicación.
 */
export default function IncrustadoRed({
  red,
  url,
  titulo,
}: {
  red: Red;
  url: string;
  titulo: string;
}) {
  const [cargado, setCargado] = useState(false);
  const src = urlIncrustado(red, url);

  // Enlace no reconocido: mejor sin botón que con un marco roto
  if (!src) return null;

  const nombre = REDES_INFO[red].nombre;

  if (!cargado) {
    return (
      <button
        type="button"
        onClick={() => setCargado(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-verde/40 px-5 py-2.5 text-sm font-medium text-verde-profundo transition-colors hover:bg-verde-claro focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
          <path d={ICONOS[red]} />
        </svg>
        Ver aquí
      </button>
    );
  }

  return (
    // basis-full fuerza una línea propia dentro de la fila de botones
    <div className="basis-full">
      <div
        className={`w-full max-w-md overflow-hidden rounded-xl border border-verde/15 bg-white ${PROPORCION[red]}`}
      >
        <iframe
          src={src}
          title={`Publicación de ${nombre}: ${titulo}`}
          loading="lazy"
          className="h-full w-full border-0"
          allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture; web-share"
          // Se aísla el contenido de terceros: puede ejecutar scripts y navegar
          // dentro de su propio marco, pero no acceder al sitio que lo contiene.
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
        />
      </div>
    </div>
  );
}
