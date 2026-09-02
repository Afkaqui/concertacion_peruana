/**
 * Datos estructurados de organización (JSON-LD) — doc. 03 §5.
 *
 * Google no exige ninguna propiedad; recomienda ponerlo solo en la portada o
 * en la página que describe a la organización, no en todas.
 *
 * DOS DECISIONES QUE NO SON TÉCNICAS:
 *
 * 1. `@type` es "Organization", NO "PoliticalParty". Schema.org tiene ese tipo
 *    y es tentador, pero la fuente institucional sitúa la inscripción del
 *    Partido como resultado esperado, no como hecho. Declararse partido aquí
 *    sería la misma sobreafirmación que evitamos en /partido — solo que legible
 *    por máquinas y archivada por Google. "Organization" es correcto en
 *    cualquier escenario; se cambia cuando haya inscripción acreditada.
 *
 * 2. `legalName` es la Asociación, que es la entidad que existe. El Partido no
 *    se declara como `alternateName`: no son la misma entidad, y confundirlas
 *    en datos estructurados es precisamente lo que hay que evitar.
 *
 * `sameAs` es lo más valioso del bloque: le dice a Google que el sitio y las
 * tres cuentas sociales son la misma entidad, y es la vía hacia un panel de
 * conocimiento cuando alguien busque el nombre.
 */

const SITE_URL = "https://concertacionperuana.pe";

export default function DatosEstructurados() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Concertación Peruana",
    legalName: "Asociación de la Concertación Peruana",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-384.png`,
    description:
      "Organización política peruana inspirada en el Humanismo Teísta, la Democracia Participativa y la Concertación. Base político-programática del Partido de la Concertación Peruana.",
    slogan: "Dios, Patria y Familia",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PE",
    },
    sameAs: [
      "https://www.tiktok.com/@concertacionperuana",
      "https://www.facebook.com/p/Partido-De-La-Concertaci%C3%B3n-Peruana-61582546580948/",
      "https://www.instagram.com/partidodelaconcertacionperuana/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
