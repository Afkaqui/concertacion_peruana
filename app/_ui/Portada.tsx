import Image from "next/image";

/**
 * Portada de sección: imagen panorámica con el título encima.
 *
 * ── POR QUÉ EL FONDO ESTÁ CONSTRUIDO ASÍ ─────────────────────────────────
 *
 * El color sólido (`bg-grafito`) va en el propio <header>, y la foto encima
 * atenuada al 35%. No es estética, son dos requisitos a la vez:
 *
 *  1. Contraste real. Sobre un píxel BLANCO puro —cielos, nubes, nieve— el
 *     texto blanco necesita al menos un 65% de grafito debajo para alcanzar
 *     4.5:1. Con la foto al 35% queda en 4.75:1 en el peor caso posible, sea
 *     cual sea la imagen que se ponga (RNF-05).
 *
 *  2. Contraste verificable. Una capa absoluta separada deja a axe sin color
 *     de fondo que medir: recurre al ancestro más cercano —el verde claro de
 *     la página— y marca el blanco como ilegible aunque no lo sea. Con el
 *     color en el propio elemento, la herramienta mide lo que ve el usuario.
 *
 * La imagen es decorativa: el título va en el <h1>, así que `alt=""` evita que
 * un lector de pantalla lo anuncie dos veces.
 */
export default function Portada({
  src,
  antetitulo,
  titulo,
  entradilla,
}: {
  src: string;
  antetitulo?: string;
  titulo: string;
  entradilla?: string;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-grafito">
      <Image
        src={src}
        alt=""
        width={1600}
        height={686}
        priority
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
      />

      <div className="mx-auto w-full max-w-3xl px-6 py-16 text-center sm:py-24">
        {antetitulo && (
          <p className="text-xs font-semibold tracking-[0.18em] text-white uppercase">
            {antetitulo}
          </p>
        )}
        <h1 className="mt-3 font-serif text-3xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-4xl">
          {titulo}
        </h1>
        {entradilla && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-balance text-white">
            {entradilla}
          </p>
        )}
      </div>
    </header>
  );
}
