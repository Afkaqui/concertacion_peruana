/**
 * Comprueba que toda imagen referenciada desde el contenido existe en /public.
 *
 * POR QUÉ EXISTE ESTE SCRIPT:
 * una entrada de publicación con `imagen:` apuntando a un archivo inexistente
 * compila sin error, se despliega, y el visitante ve un hueco roto en la
 * tarjeta más un 404 en consola. Nadie se entera hasta que alguien mira.
 * Aquí falla la compilación, que es cuando cuesta barato arreglarlo.
 *
 * Se ejecuta solo, antes de `next build`, desde el script `build`.
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(RAIZ, "public");
const CONTENIDO = join(RAIZ, "app", "_contenido");

const rutas = new Set();

for (const archivo of readdirSync(CONTENIDO).filter((f) => f.endsWith(".ts"))) {
  const texto = readFileSync(join(CONTENIDO, archivo), "utf8");
  // Descarta líneas comentadas: los ejemplos de la plantilla apuntan a
  // archivos que no existen a propósito.
  for (const linea of texto.split("\n")) {
    if (linea.trimStart().startsWith("//") || linea.trimStart().startsWith("*")) continue;
    for (const m of linea.matchAll(/["'`](\/[^"'`]+\.(?:jpg|jpeg|png|webp|svg|avif))["'`]/g)) {
      // Las plantillas con ${...} son rutas que se arman en ejecución
      // (una por pilar, una por foto): no hay un archivo literal que mirar.
      if (m[1].includes("${")) continue;
      rutas.add(m[1]);
    }
  }
}

const faltan = [...rutas].filter((r) => !existsSync(join(PUBLIC, r)));

if (faltan.length) {
  console.error("\n  Imágenes referenciadas que NO existen en /public:\n");
  for (const f of faltan) console.error(`    ${f}`);
  console.error(
    "\n  Genera la que falte con:\n" +
      "    python scripts/portada-publicacion.py <slug> <url>\n" +
      "  o quita la línea `imagen:` de esa entrada.\n"
  );
  process.exit(1);
}

console.log(`  imágenes verificadas: ${rutas.size} referencias, todas existen`);
