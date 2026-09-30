"use client";

import { useEffect, useRef } from "react";

/**
 * Revelado al entrar en pantalla.
 *
 * La portada ya tenía vida —tréboles en WebGL y una secuencia de anime.js al
 * cargar— pero las cinco páginas interiores estaban planas: ni una animación.
 * Este componente las anima mientras se recorren, que es donde una página
 * larga gana ritmo. En la portada no haría falta: allí se ve todo de golpe.
 *
 * ── POR QUÉ anime.js Y NO OTRA ───────────────────────────────────────────
 * Ya es dependencia del proyecto, ya se usa en `EntradaTexto` y se carga
 * diferida. Añadir GSAP, Motion o React Spring para esto sería una segunda
 * librería de animación haciendo el mismo trabajo: más peso que descargar,
 * dos APIs que mantener y dos formas distintas de hacer lo mismo en el mismo
 * repositorio.
 *
 * ── ACCESIBILIDAD, QUE AQUÍ NO ES OPCIONAL ───────────────────────────────
 * `prefers-reduced-motion` no es una preferencia estética: hay personas a
 * quienes el movimiento en pantalla les provoca mareo o náusea. Si está
 * activo, el contenido aparece de una vez y anime.js NI SIQUIERA SE DESCARGA.
 *
 * Y el contenido nunca queda invisible esperando: la opacidad 0 se aplica
 * desde JavaScript, así que sin JavaScript —o si algo falla— todo se ve. Es
 * la misma regla del `js-anim` del layout, aplicada aquí.
 */
export default function Revelar({
  children,
  className = "",
  /** Retraso entre hijos, en ms. 0 los anima a la vez. */
  escalonado = 90,
  /**
   * Etiqueta a renderizar. Es necesario y no cosmetico: para animar los
   * elementos de una lista, el contenedor con la ref TIENE que ser el <ul>.
   * Metiendo un <div> intermedio, los hijos observados serian uno solo —la
   * lista entera— y ademas se rompe la relacion lista/elemento que usan los
   * lectores de pantalla para anunciar "lista de 6 elementos".
   */
  as: Etiqueta = "div",
}: {
  children: React.ReactNode;
  className?: string;
  escalonado?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const host = raiz.current;
    if (!host) return;

    const piezas = Array.from(host.children) as HTMLElement[];
    if (!piezas.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let vivo = true;
    let observador: IntersectionObserver | undefined;
    const animando = new WeakSet<HTMLElement>();

    (async () => {
      // NADA se oculta hasta tener la libreria en la mano.
      //
      // Ocultar antes del `await` parece inofensivo y no lo es: si la descarga
      // del chunk falla —red caida, despliegue a medias, bloqueador— el
      // contenido se queda en opacidad 0 PARA SIEMPRE, y la pagina aparece en
      // blanco sin un solo error visible. Primero se garantiza poder
      // devolverlo a la vista; despues se oculta.
      let animate: typeof import("animejs").animate;
      try {
        ({ animate } = await import("animejs"));
      } catch {
        return; // sin animacion, pero con la pagina entera legible
      }
      if (!vivo || !raiz.current) return;

      for (const p of piezas) {
        p.style.opacity = "0";
        p.style.willChange = "opacity, transform";
      }

      observador = new IntersectionObserver(
        (entradas) => {
          for (const e of entradas) {
            const el = e.target as HTMLElement;
            if (!e.isIntersecting || animando.has(el)) continue;
            animando.add(el);
            // Se deja de observar en cuanto entra: la animación es de entrada,
            // no un efecto que deba repetirse al subir y bajar. Repetirlo marea
            // y además reanima cosas que el visitante ya leyó.
            observador?.unobserve(el);

            animate(el, {
              opacity: [0, 1],
              y: [18, 0],
              duration: 650,
              delay: piezas.indexOf(el) * escalonado,
              ease: "outQuad",
              onComplete: () => { el.style.willChange = "auto"; },
            });
          }
        },
        // Un poco antes del borde inferior: cuando el elemento se ve del todo,
        // la animación ya terminó y no se percibe como un salto.
        { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
      );

      for (const p of piezas) observador.observe(p);
    })();

    return () => {
      vivo = false;
      observador?.disconnect();
      // Si se desmonta a media animación, nada puede quedar invisible.
      for (const p of piezas) {
        p.style.opacity = "";
        p.style.transform = "";
        p.style.willChange = "";
      }
    };
  }, [escalonado]);

  // `ElementType` para la etiqueta variable: con una union de "div"|"ul"|...,
  // TypeScript intenta satisfacer a la vez los tipos de `ref` de TODOS los
  // elementos posibles (HTMLDivElement Y HTMLUListElement Y ...) y ninguna ref
  // puede serlo todo. La conversion se limita a la etiqueta; la ref sigue
  // tipada como HTMLElement, que es lo unico que este componente usa de ella.
  const Contenedor = Etiqueta as React.ElementType;

  return (
    <Contenedor ref={raiz} className={className}>
      {children}
    </Contenedor>
  );
}
