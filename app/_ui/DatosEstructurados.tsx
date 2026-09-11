/**
 * Datos estructurados de la portada (JSON-LD) — doc. 03 §5.
 *
 * Van dos entidades enlazadas en un `@graph`, no dos bloques sueltos:
 *
 *   WebSite       el sitio. Es lo que hace que en el buscador aparezca
 *                 «Concertación Peruana» en lugar de «concertacionperuana.pe».
 *   Organization  quien lo publica.
 *
 * El `@id` las une: el sitio declara `publisher` apuntando a la organización.
 * Separadas, Google tiene que adivinar que hablan de lo mismo; enlazadas, no.
 * Aquí eso pesa más de lo normal, porque el nombre está disputado: buscando
 * «Concertación Perú» salen también el Colectivo Concertación Perú y la
 * Concertación Descentralista, que son organizaciones distintas.
 *
 * ── REQUISITOS DE GOOGLE PARA EL NOMBRE DE SITIO ─────────────────────────
 * Solo lo lee en la raíz del dominio, no en subdirectorios, así que este
 * componente se monta únicamente en `app/page.tsx`. `url` debe ser la portada
 * canónica. Refuerzan la señal `og:site_name`, el <title> y el <h1>, que ya
 * dicen los tres «Concertación Peruana».
 *
 * ── DOS DECISIONES QUE NO SON TÉCNICAS ───────────────────────────────────
 *
 * 1. `@type` es "Organization", NO "PoliticalParty". Schema.org tiene ese tipo
 *    y es tentador, pero la fuente institucional sitúa la inscripción del
 *    Partido como resultado esperado, no como hecho. Declararse partido aquí
 *    sería la misma sobreafirmación que evitamos en /partido — solo que legible
 *    por máquinas y archivada por Google. "Organization" es correcto en
 *    cualquier escenario; se cambia cuando haya inscripción acreditada.
 *
 * 2. `legalName` es la Asociación, que es la entidad que existe. El Partido
 *    sigue sin aparecer como `alternateName` DE LA ORGANIZACIÓN: no son la
 *    misma entidad y confundirlas ahí es justo lo que hay que evitar. Sí está
 *    como `alternateName` DEL SITIO, que es otra cosa: nombra a la web, no a
 *    una persona jurídica, y es como la propia organización se presenta en su
 *    logotipo y en sus redes. Si se prefiere no arriesgar ni eso, se borra esa
 *    línea y lo único que se pierde son las búsquedas por ese nombre.
 *
 * `sameAs` es lo más valioso del bloque: le dice a Google que el sitio y las
 * tres cuentas sociales son la misma entidad, y es la vía hacia un panel de
 * conocimiento cuando alguien busque el nombre.
 */

const SITE_URL = "https://concertacionperuana.pe";
const ID_SITIO = `${SITE_URL}/#sitio`;
const ID_ORGANIZACION = `${SITE_URL}/#organizacion`;

export default function DatosEstructurados() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ID_SITIO,
        name: "Concertación Peruana",
        alternateName: "Partido de la Concertación Peruana",
        // Con barra final: Google pide aquí la raíz del dominio, no una ruta.
        url: `${SITE_URL}/`,
        inLanguage: "es-PE",
        publisher: { "@id": ID_ORGANIZACION },
      },
      {
        "@type": "Organization",
        "@id": ID_ORGANIZACION,
        name: "Concertación Peruana",
        legalName: "Asociación de la Concertación Peruana",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo-384.png`,
          width: 384,
          height: 384,
        },
        image: `${SITE_URL}/og/inicio.png`,
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
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
