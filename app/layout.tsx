import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

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

  // PLACEHOLDER: bloqueado a propósito mientras el sitio esté en construcción,
  // para que Google no indexe una página delgada como primera impresión del
  // dominio. Al lanzar, cambiar a index/follow — ver 03-PLAN-SEO-METADATOS.md §6
  robots: { index: false, follow: false },

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
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
