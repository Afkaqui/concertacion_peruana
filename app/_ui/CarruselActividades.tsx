"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "./Enlace";
import { fechaLarga, type Actividad } from "../_contenido/actividades";

/**
 * Carrusel de actividades.
 *
 * DECISIONES:
 *
 * · Sin librería. El desplazamiento lo hace `scroll-snap` nativo; el JS solo
 *   mueve el contenedor y sigue la diapositiva visible. Añadir un carrusel de
 *   npm costaría más que todo el resto del sitio junto (RNF-02, RNF-04).
 *
 * · Sin reproducción automática. Es la queja de accesibilidad más común en
 *   carruseles: mueve el contenido bajo el cursor y bajo el lector de pantalla.
 *   Aquí siempre avanza el usuario.
 *
 * · Devuelve `null` si no hay fotos. Mientras no lleguen, la portada no muestra
 *   un hueco ni una sección vacía — que comunica abandono peor que no tenerla.
 *
 * · Funciona sin JavaScript: el contenedor es desplazable de por sí. Los
 *   botones son una comodidad, no el único medio de navegar.
 */

export default function CarruselActividades({
  actividades,
  titulo = "Nuestras actividades",
  descripcion,
}: {
  actividades: Actividad[];
  titulo?: string;
  descripcion?: string;
}) {
  const pista = useRef<HTMLDivElement>(null);
  const [actual, setActual] = useState(0);
  const [alInicio, setAlInicio] = useState(true);
  const [alFinal, setAlFinal] = useState(false);

  const total = actividades.length;

  /**
   * Estado derivado de la posición de scroll: bordes y diapositiva activa.
   *
   * La diapositiva activa es la PRIMERA visible, no la más centrada. Con dos
   * visibles a la vez —lo normal en escritorio— el centro del contenedor cae
   * entre la 1 y la 2, así que "la más centrada" marcaba la 2 estando al
   * inicio. Alinear por borde izquierdo, junto con `snap-start`, hace que
   * indicador, botones y desplazamiento cuenten todos lo mismo.
   */
  const actualizar = useCallback(() => {
    const el = pista.current;
    if (!el) return;

    setAlInicio(el.scrollLeft <= 4);
    setAlFinal(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);

    let mejor = 0;
    let menor = Infinity;
    el.querySelectorAll<HTMLElement>("[data-indice]").forEach((s) => {
      const inicio = s.offsetLeft - el.offsetLeft;
      const d = Math.abs(inicio - el.scrollLeft);
      if (d < menor) {
        menor = d;
        mejor = Number(s.dataset.indice);
      }
    });
    setActual(mejor);
  }, []);

  useEffect(() => {
    const el = pista.current;
    if (!el || total === 0) return;

    actualizar();
    el.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);

    return () => {
      el.removeEventListener("scroll", actualizar);
      window.removeEventListener("resize", actualizar);
    };
  }, [total, actualizar]);

  const irA = useCallback((indice: number) => {
    const el = pista.current;
    if (!el) return;
    const destino = el.querySelector<HTMLElement>(`[data-indice="${indice}"]`);
    if (!destino) return;
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: destino.offsetLeft - el.offsetLeft,
      behavior: suave ? "smooth" : "auto",
    });
  }, []);

  const mover = useCallback(
    (paso: number) => irA(Math.min(Math.max(actual + paso, 0), total - 1)),
    [actual, total, irA]
  );

  // Sin fotos no hay sección. Ver _contenido/actividades.ts
  if (total === 0) return null;

  return (
    <section
      aria-roledescription="carrusel"
      aria-label={titulo}
      className="mx-auto w-full max-w-5xl px-6 py-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-verde-profundo">
            {titulo}
          </h2>
          {descripcion && <p className="mt-2 text-gris-medio">{descripcion}</p>}
        </div>

        {total > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => mover(-1)}
              disabled={alInicio}
              aria-label="Actividad anterior"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-verde/40 text-verde-profundo transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-35 focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => mover(1)}
              disabled={alFinal}
              aria-label="Actividad siguiente"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-verde/40 text-verde-profundo transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-35 focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Contenedor <div>, no <ul>: cada diapositiva lleva role="group", y eso
          deja al <ul> sin <li> válidos —axe lo marca como lista malformada—.
          El patrón de carrusel de la APG usa contenedores genéricos por esto.
          tabIndex=0 permite desplazar con las flechas sin usar los botones. */}
      <div
        ref={pista}
        tabIndex={0}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-4 focus-visible:outline-none [scrollbar-width:thin]"
      >
        {actividades.map((a, i) => (
          <div
            key={a.src}
            data-indice={i}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${total}: ${a.titulo}`}
            className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[46%]"
          >
            <figure className="overflow-hidden rounded-2xl border border-verde/15 bg-white">
              <Image
                src={a.src}
                alt={a.alt}
                width={a.ancho}
                height={a.alto}
                loading={i === 0 ? "eager" : "lazy"}
                className="aspect-[3/2] w-full object-cover"
              />
              <figcaption className="p-5">
                {a.href ? (
                  <Link
                    href={a.href}
                    className="inline-flex min-h-11 items-center font-serif text-lg leading-snug font-semibold text-verde-profundo underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {a.titulo} →
                  </Link>
                ) : (
                  <p className="font-serif text-lg leading-snug font-semibold text-verde-profundo">
                    {a.titulo}
                  </p>
                )}
                {(a.lugar || a.fecha) && (
                  <p className="mt-1 text-sm text-gris-medio">
                    {[a.lugar, fechaLarga(a.fecha)].filter(Boolean).join(" · ")}
                  </p>
                )}
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      {total > 1 && (
        <div className="mt-1 flex justify-center gap-2">
          {actividades.map((a, i) => (
            <button
              key={a.src}
              type="button"
              onClick={() => irA(i)}
              aria-label={`Ir a la actividad ${i + 1}: ${a.titulo}`}
              aria-current={i === actual ? "true" : undefined}
              className="inline-flex h-11 w-6 items-center justify-center focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:outline-none"
            >
              <span
                aria-hidden="true"
                className={`block h-1.5 rounded-full transition-all ${
                  i === actual ? "w-6 bg-verde-profundo" : "w-1.5 bg-verde/40"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
