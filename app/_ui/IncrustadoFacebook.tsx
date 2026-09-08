"use client";

import { useState } from "react";

/**
 * Fachada para incrustar una publicación de Facebook.
 *
 * El iframe NO se carga hasta que el visitante lo pide. Dos motivos:
 *
 *  · Rendimiento. El incrustado de Facebook arrastra cientos de kilobytes y
 *    varias peticiones a terceros. Cargarlo de entrada en una lista de
 *    publicaciones multiplicaría eso por cada entrada (RNF-02, RNF-04).
 *
 *  · Privacidad. Mientras no se pulse, Facebook no recibe ninguna petición ni
 *    sabe que alguien visitó esta página. Quien solo pasa a leer el resumen no
 *    queda registrado por un tercero.
 *
 * Se usa el plugin `plugins/post.php`, que funciona por iframe y no necesita
 * el SDK de Facebook ni token de aplicación.
 */
export default function IncrustadoFacebook({
  url,
  titulo,
}: {
  url: string;
  titulo: string;
}) {
  const [cargado, setCargado] = useState(false);

  if (!cargado) {
    return (
      <button
        type="button"
        onClick={() => setCargado(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-verde/40 px-5 py-2.5 text-sm font-medium text-verde-profundo transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
          <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
        </svg>
        Ver la publicación aquí
      </button>
    );
  }

  const src =
    "https://www.facebook.com/plugins/post.php?href=" +
    encodeURIComponent(url) +
    "&show_text=true&width=500";

  return (
    <div className="overflow-hidden rounded-xl border border-verde/15 bg-white">
      <iframe
        src={src}
        title={`Publicación de Facebook: ${titulo}`}
        loading="lazy"
        className="h-[560px] w-full border-0"
        // El plugin necesita estos permisos para reproducir vídeo dentro
        allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
        // Se aísla el contenido de terceros: puede ejecutar scripts y navegar
        // dentro de su propio marco, pero no acceder al sitio que lo contiene.
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
