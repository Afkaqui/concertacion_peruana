"use client";

import { useEffect, useRef } from "react";

/**
 * PROTOTIPO — anime.js sobre el DOM (sin WebGL de por medio).
 *
 * Una sola secuencia orquestada al cargar, no efectos sueltos. El lema
 * DIOS · PATRIA · FAMILIA entra palabra por palabra con `stagger`, que es el
 * único momento donde la animación dice algo: tres términos, tres tiempos,
 * como las tres hojas del trébol.
 *
 * anime.js pesa poco (~19 KB) frente a three.js, pero igual se carga diferido
 * para no bloquear el primer render.
 */
export default function EntradaTexto({ children }: { children: React.ReactNode }) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = raiz.current;
    if (!host) return;

    // Accesibilidad primero: si el sistema pide menos movimiento, se muestra
    // todo de una vez y no se descarga nada.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      host.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    let vivo = true;
    let revertir: (() => void) | undefined;

    (async () => {
      const { createTimeline, stagger } = await import("animejs");
      if (!vivo || !raiz.current) return;

      const q = (sel: string) => host.querySelectorAll<HTMLElement>(sel);

      const tl = createTimeline({ defaults: { ease: "outExpo" } });

      tl.add(q("[data-anim='marca']"), {
        opacity: [0, 1],
        scale: [0.94, 1],
        duration: 900,
      })
        .add(
          q("[data-anim='estado']"),
          { opacity: [0, 1], y: [10, 0], duration: 600 },
          "-=550"
        )
        .add(
          q("[data-anim='titulo']"),
          { opacity: [0, 1], y: [16, 0], duration: 800 },
          "-=400"
        )
        // El momento con intención: tres palabras, tres entradas escalonadas
        .add(
          q("[data-anim='lema-palabra']"),
          {
            opacity: [0, 1],
            y: [14, 0],
            filter: ["blur(6px)", "blur(0px)"],
            duration: 700,
            delay: stagger(130),
          },
          "-=450"
        )
        .add(
          q("[data-anim='filete']"),
          { scaleX: [0, 1], opacity: [0, 1], duration: 700 },
          "-=500"
        )
        .add(
          q("[data-anim='cuerpo']"),
          { opacity: [0, 1], y: [12, 0], duration: 700, delay: stagger(90) },
          "-=450"
        )
        .add(
          q("[data-anim='accion']"),
          { opacity: [0, 1], y: [12, 0], scale: [0.97, 1], duration: 700 },
          "-=400"
        );

      revertir = () => tl.revert();
    })();

    return () => {
      vivo = false;
      revertir?.();
    };
  }, []);

  return <div ref={raiz}>{children}</div>;
}
