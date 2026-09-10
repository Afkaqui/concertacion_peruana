import type { ReactNode } from "react";

/**
 * Piezas comunes de las páginas de contenido.
 *
 * ── SOBRE LAS TARJETAS ───────────────────────────────────────────────────
 * Antes todas eran la misma caja blanca con filete: el aviso legal, los
 * pilares numerados y visión/misión pesaban igual, así que nada tenía
 * jerarquía. Ahora hay tres tipos, y la diferencia dice algo:
 *
 *   Tarjeta          contenido corriente
 *   TarjetaNumerada  un elemento de una serie ordenada (los cuatro pilares
 *                    van numerados en el documento institucional, así que el
 *                    número no es adorno: existe en la fuente)
 *   Aviso            una declaración de estado, no contenido. Lleva cabecera
 *                    propia porque debe leerse antes que lo que hay debajo.
 *
 * La sombra es verde, no gris: sobre un fondo verde claro una sombra neutra
 * se ve sucia.
 */

const SOMBRA =
  "shadow-[0_1px_2px_rgba(28,43,35,0.04),0_12px_32px_-20px_rgba(0,113,63,0.35)]";

export function EncabezadoPagina({
  antetitulo,
  titulo,
  entradilla,
}: {
  antetitulo?: string;
  titulo: string;
  entradilla?: string;
}) {
  return (
    <header className="mx-auto w-full max-w-3xl px-6 pt-14 pb-10 text-center sm:pt-20">
      {antetitulo && (
        <p className="text-[13px] font-semibold tracking-[0.18em] text-verde-profundo uppercase">
          {antetitulo}
        </p>
      )}
      <h1 className="mt-3 font-serif text-3xl leading-tight font-semibold tracking-tight text-balance text-verde-profundo sm:text-4xl">
        {titulo}
      </h1>
      {entradilla && (
        <p className="mx-auto mt-5 max-w-2xl text-lg text-balance text-gris-medio">
          {entradilla}
        </p>
      )}
    </header>
  );
}

export function Seccion({
  titulo,
  children,
  className = "",
}: {
  titulo?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto w-full max-w-3xl px-6 py-8 ${className}`}>
      {titulo && (
        <h2 className="mb-5 font-serif text-2xl font-semibold tracking-tight text-verde-profundo">
          {titulo}
        </h2>
      )}
      {children}
    </section>
  );
}

/** Bloque destacado, para visión y misión. */
export function Tarjeta({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) {
  return (
    <article
      className={`rounded-2xl border border-verde/12 bg-white p-6 sm:p-8 ${SOMBRA}`}
    >
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-verde-profundo">
        {titulo}
      </h2>
      <div className="mt-1 h-px w-10 bg-verde/40" />
      <div className="mt-4 text-grafito">{children}</div>
    </article>
  );
}

/**
 * Tarjeta de una serie ordenada. El número va en un disco sólido, no suelto
 * junto al título: así ancla la tarjeta y se lee de un vistazo la posición
 * dentro de la serie.
 */
export function TarjetaNumerada({
  n,
  titulo,
  children,
}: {
  n: number;
  titulo: string;
  children: ReactNode;
}) {
  return (
    <article
      className={`rounded-2xl border border-verde/12 bg-white p-6 sm:p-7 ${SOMBRA}`}
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-verde-profundo font-serif text-lg font-semibold text-white tabular-nums"
        >
          {n}
        </span>
        <h3 className="font-serif text-xl leading-snug font-semibold text-balance text-verde-profundo">
          {titulo}
        </h3>
      </div>
      <div className="mt-5 sm:pl-14">{children}</div>
    </article>
  );
}

/**
 * Declaración de estado. Cabecera de color con la etiqueta, cuerpo debajo:
 * se distingue del contenido corriente sin recurrir a un filete lateral.
 */
export function Aviso({
  etiqueta,
  children,
}: {
  etiqueta: string;
  children: ReactNode;
}) {
  return (
    <aside
      className={`overflow-hidden rounded-2xl border border-verde/20 bg-white ${SOMBRA}`}
    >
      <p className="flex items-center gap-2 bg-verde-profundo px-6 py-3 text-[13px] font-semibold tracking-[0.18em] text-white uppercase">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 shrink-0 fill-current"
        >
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 5a1.3 1.3 0 1 1 0 2.6A1.3 1.3 0 0 1 12 7Zm1.2 10.5h-2.4v-6.4h2.4v6.4Z" />
        </svg>
        {etiqueta}
      </p>
      <div className="p-6 sm:p-7">{children}</div>
    </aside>
  );
}

/** Cita literal del Ideario, usada como ancla en las páginas doctrinarias. */
export function Ancla({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 border-verde py-1 pl-5 font-serif text-xl leading-snug text-balance text-verde-profundo sm:text-2xl">
      {children}
    </blockquote>
  );
}
