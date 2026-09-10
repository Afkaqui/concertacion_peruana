import type { Metadata } from "next";
import { Seccion, Tarjeta, TarjetaNumerada } from "../_ui/Pagina";
import { VISION, MISION, PILARES, MATRIZ } from "../_contenido/institucional";
import { metadataDe } from "../_contenido/rutas";
import Portada from "../_ui/Portada";
import Migas from "../_ui/Migas";

export const metadata: Metadata = metadataDe("/institucional");

export default function Institucional() {
  return (
    <div className="flex-1 bg-verde-claro pb-16">
      <Migas path="/institucional" />
      <Portada
        src="/portadas/institucional.jpg"
        antetitulo="Propuesta institucional"
        titulo="Visión, misión y objetivos estratégicos"
        entradilla="La base político-programática que orienta nuestro trabajo y que sostiene el proyecto del Partido de la Concertación Peruana."
      />

      <Seccion>
        <div className="grid gap-5">
          <Tarjeta titulo="Visión">
            <p>{VISION}</p>
          </Tarjeta>
          <Tarjeta titulo="Misión">
            <p>{MISION}</p>
          </Tarjeta>
        </div>
      </Seccion>

      <Seccion titulo="Objetivos estratégicos">
        <p className="mb-8 text-gris-medio">
          Cuatro pilares que ordenan nuestra acción, cada uno con objetivos
          concretos.
        </p>

        <div className="grid gap-6">
          {PILARES.map((p) => (
            <TarjetaNumerada key={p.n} n={p.n} titulo={p.nombre}>
              <dl className="grid gap-4">
                {p.objetivos.map((o, i) => (
                  <div
                    key={o.titulo}
                    /* Filete entre objetivos: sin él los dos bloques de cada
                       pilar se leen como un solo texto corrido */
                    className={i > 0 ? "border-t border-verde/12 pt-4" : ""}
                  >
                    <dt className="font-semibold text-grafito">{o.titulo}</dt>
                    <dd className="mt-1 text-gris-medio">{o.texto}</dd>
                  </div>
                ))}
              </dl>
            </TarjetaNumerada>
          ))}
        </div>
      </Seccion>

      <Seccion titulo="Matriz de alineamiento estratégico">
        <p className="mb-5 text-gris-medio">
          Cómo se conectan cada pilar, los valores que lo sustentan y el
          resultado que esperamos.
        </p>

        {/* Tabla ancha: se desplaza dentro de su contenedor, nunca el body (RNF-01) */}
        <div className="overflow-x-auto rounded-2xl border border-verde/15 bg-white">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Matriz de alineamiento estratégico: pilar, valores sustentantes y
              resultados esperados.
            </caption>
            <thead>
              <tr className="border-b border-verde/15">
                <th scope="col" className="p-4 font-semibold text-verde-profundo">
                  Pilar estratégico
                </th>
                <th scope="col" className="p-4 font-semibold text-verde-profundo">
                  Valores y doctrina
                </th>
                <th scope="col" className="p-4 font-semibold text-verde-profundo">
                  Resultado esperado
                </th>
              </tr>
            </thead>
            <tbody>
              {MATRIZ.map((f) => (
                <tr key={f.pilar} className="border-b border-verde/10 last:border-0">
                  <th
                    scope="row"
                    className="p-4 align-top font-semibold text-grafito"
                  >
                    {f.pilar}
                  </th>
                  <td className="p-4 align-top text-gris-medio">{f.valores}</td>
                  <td className="p-4 align-top text-gris-medio">{f.resultado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Seccion>
    </div>
  );
}
