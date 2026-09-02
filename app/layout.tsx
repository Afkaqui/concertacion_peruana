import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Cabecera from "./Cabecera";
import PieDeSitio from "./PieDeSitio";

// next/font descarga y auto-hospeda las fuentes en build:
// no hay petición a terceros en tiempo de carga (RNF-02).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const serifTitulos = Source_Serif_4({
  variable: "--font-serif-titulos",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://concertacionperuana.pe";
const SITE_NAME = "Concertación Peruana"; // pendiente: denominación oficial (doc. 02 §1.1 Bloque A)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Concertación Peruana — Humanismo Teísta y Democracia Participativa",
    template: "%s | Concertación Peruana",
  },

  description:
    "Organización política peruana inspirada en el Humanismo Teísta. Democracia Participativa, Concertación, Fraternidad y Unidad en la Diversidad.",

  applicationName: SITE_NAME,
  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: SITE_NAME,
    title: "Concertación Peruana",
    description: "Dios, Patria y Familia. Un Perú para todos, que se construye unidos.",
  },

  twitter: { card: "summary_large_image" },

  // Indexable. La página de espera es breve pero legítima: tiene título,
  // descripción e imagen social propias, y encamina las búsquedas de marca
  // hacia TikTok, hoy el único canal activo. Es mejor resultado que el vacío.
  // Ver 03-PLAN-SEO-METADATOS.md §6.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: { icon: "/logo-192.png", apple: "/logo-192.png" },
};

export const viewport: Viewport = {
  // themeColor salió del objeto `metadata` en v14 y vive aquí
  themeColor: "#00a35e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-PE"
      className={`${inter.variable} ${serifTitulos.variable} h-full antialiased`}
    >
      <head>
        {/* Marca que hay JS y que se puede animar, ANTES del primer pintado.
            Si falla, si no hay JS o si el sistema pide menos movimiento, la
            clase no se aplica y el contenido se ve sin esperar a nada. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)" +
              "document.documentElement.classList.add('js-anim')}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Cabecera />
        {children}
        {/* Común a todas las páginas: aquí, no en cada page.tsx */}
        <PieDeSitio />
      </body>
    </html>
  );
}
