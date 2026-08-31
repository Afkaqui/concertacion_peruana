"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { decodificarTrebol } from "./_treboles";

/**
 * PROTOTIPO — Three.js gobernado por anime.js.
 *
 * Concepto: miles de puntos dispersos convergen en el trébol institucional.
 * No es decoración: es el Ideario hecho mecanismo. "Unidad en la Diversidad"
 * y "Concertación" son, literalmente, elementos distintos que confluyen en una
 * forma común (doc. 01 §1.2).
 *
 * Presupuesto: three.js pesa más que todo el resto del sitio junto, así que
 * NO entra en el paquete inicial. Se importa dinámicamente y solo después de
 * pasar los filtros de §2 — si alguno falla, nunca se descarga (RNF-02, RNF-04).
 */

const VERTEX = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  attribute vec3 aDispersa;
  attribute float aSemilla;
  varying float vAlfa;

  void main() {
    // Cada punto llega en un momento distinto: la convergencia se siente
    // como acuerdo progresivo, no como un interruptor.
    float p = clamp((uProgress - aSemilla * 0.35) / 0.65, 0.0, 1.0);
    p = 1.0 - pow(1.0 - p, 3.0);            // easing out-cubic

    vec3 pos = mix(aDispersa, position, p);

    // Respiración leve una vez formado
    float respira = sin(uTime * 0.7 + aSemilla * 6.28) * 0.006 * p;
    pos.xy *= 1.0 + respira;
    pos.z += sin(uTime * 0.5 + aSemilla * 9.42) * 0.02 * p;

    vAlfa = 0.35 + 0.65 * p;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (1.0 / -mv.z);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  varying float vAlfa;

  void main() {
    // Punto circular con borde suave
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float borde = smoothstep(0.25, 0.06, d);
    gl_FragColor = vec4(uColor, vAlfa * borde);
  }
`;

type Modo = "evaluando" | "webgl" | "estatico";

/** §2 — Filtros. Cualquiera que falle evita la descarga de three.js. */
function debeAnimar(): boolean {
  if (typeof window === "undefined") return false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  // Conexión: la audiencia territorial del Ideario está en 3G (RNF-04)
  const con = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (con?.saveData) return false;
  if (con?.effectiveType && ["slow-2g", "2g", "3g"].includes(con.effectiveType)) return false;

  // Equipos modestos
  if (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2)
    return false;

  // ¿Hay WebGL?
  try {
    const c = document.createElement("canvas");
    if (!(c.getContext("webgl2") || c.getContext("webgl"))) return false;
  } catch {
    return false;
  }

  return true;
}

export default function TrebolWebGL({ className = "" }: { className?: string }) {
  const contenedor = useRef<HTMLDivElement>(null);
  const [modo, setModo] = useState<Modo>("evaluando");

  useEffect(() => {
    if (!debeAnimar()) {
      setModo("estatico");
      return;
    }

    let vivo = true;
    let limpiar: (() => void) | undefined;

    (async () => {
      // Carga diferida: estos dos módulos viajan en su propio chunk
      const [THREE, { animate }] = await Promise.all([
        import("three"),
        import("animejs"),
        import("animejs/adapters/three"), // side-effect: enseña a anime.js a hablar three
      ]);

      const host = contenedor.current;
      if (!vivo || !host) return;

      const lado = Math.min(host.clientWidth, host.clientHeight) || 320;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(lado, lado, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.appendChild(renderer.domElement);

      const escena = new THREE.Scene();
      const camara = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camara.position.z = 2.9;

      // ── Geometría: destino = logo, origen = esfera dispersa
      const plano = decodificarTrebol();
      const n = plano.length / 2;
      const destino = new Float32Array(n * 3);
      const dispersa = new Float32Array(n * 3);
      const semilla = new Float32Array(n);

      for (let i = 0; i < n; i++) {
        destino[i * 3] = plano[i * 2];
        destino[i * 3 + 1] = plano[i * 2 + 1];
        destino[i * 3 + 2] = (Math.random() - 0.5) * 0.08;

        const t = Math.random() * Math.PI * 2;
        const f = Math.acos(2 * Math.random() - 1);
        const r = 1.7 + Math.random() * 1.3;
        dispersa[i * 3] = r * Math.sin(f) * Math.cos(t);
        dispersa[i * 3 + 1] = r * Math.sin(f) * Math.sin(t);
        dispersa[i * 3 + 2] = r * Math.cos(f) * 0.5;

        semilla[i] = Math.random();
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(destino, 3));
      geo.setAttribute("aDispersa", new THREE.BufferAttribute(dispersa, 3));
      geo.setAttribute("aSemilla", new THREE.BufferAttribute(semilla, 1));

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uProgress: { value: 0 },
          uTime: { value: 0 },
          // Tamaño en px a distancia unitaria. Debe ser POSITIVO: el shader lo
          // divide por -mv.z (que ya es positivo delante de la cámara), así que
          // un valor negativo produce gl_PointSize negativo y no dibuja nada.
          uSize: { value: 7.5 * Math.min(window.devicePixelRatio, 2) },
          // verde institucional: aquí es superficie, no texto (doc. 02 §5.4)
          uColor: { value: new THREE.Color("#00a35e") },
        },
      });

      const puntos = new THREE.Points(geo, material);
      escena.add(puntos);

      // ── anime.js conduce los uniforms del shader, vía el adaptador
      const entrada = animate(material, {
        uProgress: 1,
        duration: 2600,
        ease: "outQuart",
        delay: 250,
      });

      // Giro de reposo, muy contenido: es un sitio institucional
      const giro = animate(puntos, {
        rotateY: [-9, 9],
        duration: 9000,
        ease: "inOutSine",
        loop: true,
        alternate: true,
      });

      let raf = 0;
      // THREE.Clock quedó obsoleto en three 0.185: avisa por consola y pide Timer.
      // Timer necesita update() con el timestamp antes de leer getElapsed().
      const reloj = new THREE.Timer();
      const dibujar = (t?: number) => {
        reloj.update(t);
        material.uniforms.uTime.value = reloj.getElapsed();
        renderer.render(escena, camara);
        raf = requestAnimationFrame(dibujar);
      };
      dibujar();

      const alRedimensionar = () => {
        const l = Math.min(host.clientWidth, host.clientHeight) || 320;
        renderer.setSize(l, l, false);
        camara.updateProjectionMatrix();
      };
      window.addEventListener("resize", alRedimensionar);

      // Pausa fuera de pantalla: no gastar batería animando lo invisible
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            if (!raf) dibujar();
          } else {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        },
        { threshold: 0 }
      );
      obs.observe(host);

      setModo("webgl");

      limpiar = () => {
        cancelAnimationFrame(raf);
        obs.disconnect();
        window.removeEventListener("resize", alRedimensionar);
        entrada.revert();
        giro.revert();
        geo.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      vivo = false;
      limpiar?.();
    };
  }, []);

  return (
    <div
      ref={contenedor}
      className={`relative aspect-square ${className}`}
      // El logo estático queda de respaldo hasta que WebGL tome el relevo,
      // y para siempre si no lo toma. Nunca hay un hueco vacío.
    >
      {modo !== "webgl" && (
        <Image
          src="/logo-384.png"
          alt="Partido de la Concertación Peruana — Dios, Patria, Familia"
          width={384}
          height={384}
          priority
          className="h-full w-full object-contain"
        />
      )}
    </div>
  );
}
