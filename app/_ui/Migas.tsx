import Link from "./Enlace";
import { SITE_URL, porPath } from "../_contenido/rutas";

/**
 * Migas de pan: navegación visible + `BreadcrumbList` en JSON-LD.
 *
 * Las dos cosas a la vez y desde la misma fuente, que es como Google pide que
 * se haga: el marcado debe corresponder a algo que el usuario ve. A cambio,
 * en resultados de búsqueda la URL se sustituye por la ruta de secciones
 * (Inicio › Ideario › Concertación) en lugar de la dirección cruda.
 */
export default function Migas({ path }: { path: string }) {
  const r = porPath(path);
  if (!r?.migas?.length) return null;

  const items = [{ nombre: "Inicio", path: "" }, ...r.migas];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.nombre,
      item: `${SITE_URL}${m.path || "/"}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Ruta de navegación"
        className="mx-auto w-full max-w-3xl px-6 pt-6"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gris-medio">
          {items.map((m, i) => {
            const ultimo = i === items.length - 1;
            return (
              <li key={m.path} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-verde/50">
                    ›
                  </span>
                )}
                {ultimo ? (
                  <span aria-current="page" className="text-verde-profundo">
                    {m.nombre}
                  </span>
                ) : (
                  <Link
                    href={m.path || "/"}
                    className="underline-offset-4 hover:text-verde-profundo hover:underline focus-visible:ring-2 focus-visible:ring-verde-profundo focus-visible:outline-none"
                  >
                    {m.nombre}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
