import type { ReactNode } from "react";

/**
 * Envoltorio común de las páginas de contenido: encabezado con antetítulo,
 * título y entradilla, sobre el fondo verde claro del sistema.
 */
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
        <p className="text-xs font-semibold tracking-[0.18em] text-verde-profundo uppercase">
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
    <article className="rounded-2xl border border-verde/15 bg-white p-6 sm:p-8">
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-verde-profundo">
        {titulo}
      </h2>
      <div className="mt-4 text-grafito">{children}</div>
    </article>
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
