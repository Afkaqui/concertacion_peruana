import type { Metadata } from "next";
import Link from "next/link";
import { EncabezadoPagina, Seccion } from "../_ui/Pagina";
import { PILARES } from "../_contenido/institucional";

/**
 * Subpágina del Partido de la Concertación Peruana.
 *
 * REDACCIÓN LEGALMENTE SENSIBLE. La fuente institucional describe a la
 * Asociación como "Base Político-Programática del Partido", y la matriz de
 * alineamiento fija como RESULTADO ESPERADO la "inscripción y consolidación
 * formal del Partido". Es decir: el Partido está EN FORMACIÓN.
 *
 * Por eso esta página no afirma en ningún punto que el Partido esté inscrito
 * en el Registro de Organizaciones Políticas del JNE, ni ofrece "afiliación"
 * en sentido registral. Antes de cambiar una sola de estas frases hay que
 * confirmar la situación registral con documentación (doc. 02 §1.1, Bloque A).
 */

export const metadata: Metadata = {
  title: "Partido de la Concertación Peruana",
  description:
    "El Partido de la Concertación Peruana es el proyecto político que impulsa la Asociación de la Concertación Peruana, actualmente en proceso de constitución formal.",
  alternates: { canonical: "/partido" },
  openGraph: {
    title: "Partido de la Concertación Peruana",
    description:
      "El proyecto político que impulsa la Asociación de la Concertación Peruana.",
    url: "/partido",
    type: "article",
  },
};

const PILAR_INSTITUCIONAL = PILARES[0];

export default function Partido() {
  return (
    <div className="flex-1 bg-verde-claro pb-16">
      <EncabezadoPagina
        antetitulo="Proyecto político"
        titulo="Partido de la Concertación Peruana"
        entradilla="La expresión política del trabajo que venimos construyendo desde la Asociación de la Concertación Peruana."
      />

      {/* Aviso de estado. Va arriba y sin rodeos: es lo primero que un
          periodista, una autoridad electoral o un ciudadano necesita saber. */}
      <Seccion>
        <div className="rounded-2xl border border-verde/30 bg-white p-6 sm:p-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-verde-profundo uppercase">
            Estado actual
          </p>
          <p className="mt-3 text-lg text-grafito">
            El Partido de la Concertación Peruana se encuentra{" "}
            <strong className="font-semibold">en proceso de constitución</strong>.
            Su inscripción y consolidación formal es uno de los objetivos
            estratégicos de la Asociación, no un hecho consumado.
          </p>
          <p className="mt-3 text-gris-medio">
            Mientras ese proceso avanza, la Asociación de la Concertación
            Peruana es la organización que desarrolla la base doctrinaria,
            programática y territorial del proyecto.
          </p>
        </div>
      </Seccion>

      <Seccion titulo="Qué nos proponemos">
        <p className="text-lg text-grafito">
          Un partido humanista teísta, democrático participativo, concertador y
          fraterno, conformado por la unión de los peruanos de buena voluntad
          comprometidos con un cambio generacional de pensamiento y acción, para
          construir un Perú líder en Latinoamérica.
        </p>

        <div className="mt-8 grid gap-4">
          {PILAR_INSTITUCIONAL.objetivos.map((o) => (
            <article
              key={o.titulo}
              className="rounded-2xl border border-verde/15 bg-white p-6"
            >
              <h3 className="font-semibold text-grafito">{o.titulo}</h3>
              <p className="mt-2 text-gris-medio">{o.texto}</p>
            </article>
          ))}
        </div>
      </Seccion>

      <Seccion titulo="Sobre qué se construye">
        <p className="text-gris-medio">
          El proyecto no parte de cero: se sostiene sobre una doctrina ya
          formulada y sobre una propuesta institucional con objetivos definidos.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/ideario"
            className="group rounded-2xl border border-verde/15 bg-white p-6 transition-colors hover:border-verde/40 focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <h3 className="font-serif text-xl font-semibold text-verde-profundo group-hover:underline">
              Nuestro Ideario →
            </h3>
            <p className="mt-2 text-gris-medio">
              Los seis pilares doctrinarios que orientan cada decisión.
            </p>
          </Link>

          <Link
            href="/institucional"
            className="group rounded-2xl border border-verde/15 bg-white p-6 transition-colors hover:border-verde/40 focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <h3 className="font-serif text-xl font-semibold text-verde-profundo group-hover:underline">
              Propuesta institucional →
            </h3>
            <p className="mt-2 text-gris-medio">
              Visión, misión y los cuatro pilares estratégicos.
            </p>
          </Link>
        </div>
      </Seccion>

      {/* PENDIENTE (doc. 02 §1.4): cuando se confirmen el WhatsApp y el correo
          institucionales, este bloque pasa a ser el canal directo de contacto.
          Hoy solo se ofrecen las redes, que son los únicos canales verificados. */}
      <Seccion titulo="Sumarse al proyecto">
        <p className="text-gris-medio">
          Si compartes estos principios y quieres participar, escríbenos por
          nuestras redes. Estamos construyendo bases en todo el país.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="https://www.facebook.com/p/Partido-De-La-Concertaci%C3%B3n-Peruana-61582546580948/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-verde-profundo px-6 font-medium text-white transition-colors hover:bg-grafito focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Escríbenos en Facebook
          </a>
          <a
            href="https://www.instagram.com/partidodelaconcertacionperuana/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-verde/40 px-6 font-medium text-verde-profundo transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Instagram
          </a>
        </div>
      </Seccion>
    </div>
  );
}
