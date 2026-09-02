import Link from "./_ui/Enlace";
import Image from "next/image";
import type { Metadata } from "next";
import EntradaTexto from "./EntradaTexto";

// RF-23 — página 404 propia con rutas de recuperación.
// Se renderiza dentro del layout raíz, así que hereda tipografías, tokens de
// color y el script de realce progresivo. Deliberadamente NO carga el trébol
// WebGL: 380 KB de three.js no se justifican en una página de error.

// `robots` es necesario aquí aunque Next ya inyecte su propio `noindex`:
// sin esta línea, el 404 hereda el `index, follow` del layout raíz y el HTML
// acaba con dos etiquetas contradictorias. Google aplicaría la más restrictiva
// igualmente, pero deja el documento diciendo dos cosas opuestas.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};


export default function NotFound() {
  return (
    <EntradaTexto>
      <div className="flex flex-1 flex-col items-center justify-center bg-verde-claro px-6 py-16">
        <div className="flex w-full max-w-lg flex-col items-center text-center">
          <div data-anim="marca" className="w-20 opacity-70">
            <Image
              src="/logo-384.png"
              alt=""
              width={384}
              height={384}
              className="h-full w-full object-contain"
            />
          </div>

          <p
            data-anim="estado"
            className="mt-7 font-serif text-5xl leading-none font-semibold tracking-tight text-verde/40 tabular-nums"
          >
            404
          </p>

          <h1
            data-anim="titulo"
            className="mt-5 font-serif text-2xl leading-tight font-semibold tracking-tight text-verde-profundo sm:text-3xl"
          >
            Página no encontrada
          </h1>

          <hr
            data-anim="filete"
            className="my-7 h-px w-16 origin-center border-0 bg-verde/30"
          />

          <p data-anim="cuerpo" className="text-base text-balance text-gris-medio">
            La dirección que buscas no existe o cambió de lugar. Desde aquí
            puedes volver al inicio o ir directamente a lo que quizá buscabas.
          </p>

          <div
            data-anim="accion"
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-verde-profundo px-7 py-3 font-medium text-white transition-colors hover:bg-grafito focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Volver al inicio
            </Link>

            <Link
              href="/ideario"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-verde/40 px-7 py-3 font-medium text-verde-profundo transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Ideario
            </Link>
            <Link
              href="/partido"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-verde/40 px-7 py-3 font-medium text-verde-profundo transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              El Partido
            </Link>
          </div>
        </div>
      </div>
    </EntradaTexto>
  );
}
