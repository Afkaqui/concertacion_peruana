import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estático: sin servidor, portable a cualquier hosting.
  // Ver 02-PLAN-OPCION-2-DESARROLLO-INTEGRAL.md §6.1
  output: "export",

  // Obligatorio bajo `output: 'export'`: el optimizador por defecto
  // necesita servidor. Las imágenes se optimizan antes de entrar a /public.
  images: { unoptimized: true },

  // Una sola forma de URL. Debe coincidir con `alternates.canonical`
  // y con las URLs del sitemap. Ver 03-PLAN-SEO-METADATOS.md §7
  trailingSlash: false,
};

export default nextConfig;
