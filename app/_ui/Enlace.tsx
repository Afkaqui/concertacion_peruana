import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * `next/link` con el prefetch desactivado por defecto.
 *
 * MOTIVO (verificado en Next.js 16.3.2 con `output: 'export'`):
 * el prefetch de RSC pide la carga útil con un punto en la ruta —
 *   /institucional/__next.institucional.__PAGE__.txt      → 404
 * pero la exportación la emite con una barra —
 *   /institucional/__next.institucional/__PAGE__.txt      → 200
 *
 * El resultado es que CADA enlace visible dispara una petición fallida. La
 * navegación no se rompe (cae a carga completa del documento), pero ensucia la
 * consola, gasta datos en conexiones lentas —justo lo que RNF-04 quiere evitar—
 * y Lighthouse lo penaliza en Buenas Prácticas.
 *
 * Como el prefetch no funciona en esta configuración, desactivarlo no pierde
 * nada y elimina el ruido. Si una versión futura de Next corrige el desajuste,
 * basta con borrar el `prefetch` de aquí.
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
