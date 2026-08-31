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

      // Devuelve null cuando no hay coincidencias. Importa porque este mismo
      // componente envuelve el 404, que usa solo parte de los marcadores:
      // encadenar un .add() sobre una lista vacía es pedir problemas.
      const q = (sel: string) => {
        const els = host.querySelectorAll<HTMLElement>(`[data-anim='${sel}']`);
        return els.length ? els : null;
      };

      const tl = createTimeline({ defaults: { ease: "outExpo" } });

      const marca = q("marca");
      if (marca) tl.add(marca, { opacity: [0, 1], scale: [0.94, 1], duration: 900 });

      const estado = q("estado");
      if (estado) tl.add(estado, { opacity: [0, 1], y: [10, 0], duration: 600 }, "-=550");

      const titulo = q("titulo");
      if (titulo) tl.add(titulo, { opacity: [0, 1], y: [16, 0], duration: 800 }, "-=400");

      // El momento con intención: tres palabras, tres entradas escalonadas
      const lema = q("lema-palabra");
      if (lema)
        tl.add(
          lema,
          {
            opacity: [0, 1],
            y: [14, 0],
            filter: ["blur(6px)", "blur(0px)"],
            duration: 700,
            delay: stagger(130),
          },
          "-=450"
        );

      const filete = q("filete");
      if (filete)
        tl.add(filete, { scaleX: [0, 1], opacity: [0, 1], duration: 700 }, "-=500");

      const cuerpo = q("cuerpo");
      if (cuerpo)
        tl.add(
          cuerpo,
          { opacity: [0, 1], y: [12, 0], duration: 700, delay: stagger(90) },
          "-=450"
        );

      const accion = q("accion");
      if (accion)
        tl.add(
          accion,
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

  // `contents` saca al envoltorio del layout: sus hijos pasan a ser hijos
  // directos del <body> flex. Sin esto, este div se interpone en la cadena
  // flex y el `flex-1` del contenido deja de crecer — el fondo no llega abajo.
  // El div sigue existiendo en el DOM para sostener la ref y acotar las
  // consultas; simplemente no ocupa lugar.
  return (
    <div ref={raiz} className="contents">
      {children}
    </div>
  );
}
