"""
Genera las tarjetas Open Graph (1200x630) de todas las rutas del sitio.

Por qué imágenes estáticas y no `next/og`:
  - `/ideario/[pilar]` es una ruta dinámica. La convención de archivo
    `opengraph-image.png` aplicaría LA MISMA imagen a los seis pilares.
    Generando PNG por slug y referenciándolos con `openGraph.images` cada
    pilar tiene la suya.
  - Es determinista: no depende de Satori ni de cargar fuentes en compilación.

Uso:  python scripts/generar-og.py
Salida: public/og/*.png  (referenciados desde el `metadata` de cada página)

Las fuentes se descargan a scripts/.fuentes/ la primera vez y no se versionan.
"""

import os
import sys
import urllib.request
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR_FUENTES = os.path.join(RAIZ, "scripts", ".fuentes")
DIR_SALIDA = os.path.join(RAIZ, "public", "og")
LOGO = os.path.join(RAIZ, "public", "logo-384.png")

FUENTES = {
    "SourceSerif4.ttf": "https://github.com/google/fonts/raw/main/ofl/sourceserif4/SourceSerif4%5Bopsz%2Cwght%5D.ttf",
    "Inter.ttf": "https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf",
}

W, H = 1200, 630
GROUND, VERDE, PROFUNDO, GRIS = "#E8F6EF", "#00A35E", "#00713F", "#5C6B63"

# (archivo, antetitulo, titulo, bajada)
TARJETAS = [
    ("inicio", "", "Concertación Peruana", "Un Perú para todos, que se construye unidos."),
    ("institucional", "Propuesta institucional", "Visión, misión y objetivos", "Los cuatro pilares estratégicos."),
    ("ideario", "Ideario", "Seis pilares, una convicción", "La doctrina que orienta cada decisión."),
    ("partido", "Proyecto político", "Partido de la Concertación Peruana", "En proceso de constitución."),
    ("ideario-humanismo-teista", "Ideario", "Humanismo Teísta", "La persona como centro y fin."),
    ("ideario-democracia-participativa", "Ideario", "Democracia Participativa", "El ciudadano decide, no solo elige."),
    ("ideario-fraternidad", "Ideario", "Fraternidad", "El lazo que nos une."),
    ("ideario-igualdad-de-oportunidades", "Ideario", "Igualdad de Oportunidades", "Dar a cada quien lo que le corresponde."),
    ("ideario-identidad-nacional", "Ideario", "Identidad Nacional", "Un país de todas las sangres."),
    ("ideario-concertacion", "Ideario", "Concertación", "Ponerse de acuerdo: medio y fin."),
]


def asegurar_fuentes():
    os.makedirs(DIR_FUENTES, exist_ok=True)
    for nombre, url in FUENTES.items():
        destino = os.path.join(DIR_FUENTES, nombre)
        if os.path.exists(destino) and os.path.getsize(destino) > 100_000:
            continue
        print(f"  descargando {nombre}...")
        urllib.request.urlretrieve(url, destino)


def cara(archivo, tam, peso, opsz=None):
    f = ImageFont.truetype(os.path.join(DIR_FUENTES, archivo), tam)
    ejes = f.get_variation_axes()
    vals = []
    for a in ejes:
        n = a["name"].decode() if isinstance(a["name"], bytes) else str(a["name"])
        ln = n.lower()
        if "weight" in ln:
            vals.append(peso)
        elif "optical" in ln:
            vals.append(opsz if opsz else min(max(tam, a["minimum"]), a["maximum"]))
        else:
            vals.append(a["default"])
    f.set_variation_by_axes(vals)
    return f


def ajustar(d, texto, fuente, ancho_max):
    """Parte el título en líneas que quepan."""
    palabras, lineas, actual = texto.split(), [], ""
    for p in palabras:
        prueba = (actual + " " + p).strip()
        if d.textlength(prueba, font=fuente) <= ancho_max:
            actual = prueba
        else:
            if actual:
                lineas.append(actual)
            actual = p
    if actual:
        lineas.append(actual)
    return lineas


def generar(nombre, antetitulo, titulo, bajada):
    img = Image.new("RGB", (W, H), GROUND)
    d = ImageDraw.Draw(img)
    d.rectangle([0, H - 10, W, H], fill=VERDE)

    logo = Image.open(LOGO).convert("RGBA").resize((236, 236), Image.LANCZOS)
    x_logo, ancho_txt = 96, W - 96 - 236 - 64 - 96
    tx = x_logo + 236 + 64

    # El título define el tamaño: baja si no cabe en dos líneas
    for tam in (76, 66, 58, 50):
        f_tit = cara("SourceSerif4.ttf", tam, 600, 60)
        lineas = ajustar(d, titulo, f_tit, ancho_txt)
        if len(lineas) <= 2:
            break

    f_ante = cara("Inter.ttf", 24, 600)
    f_baja = cara("Inter.ttf", 30, 400)
    f_marca = cara("Inter.ttf", 24, 600)

    alto_tit = int(tam * 1.14)
    bloque = (len(lineas) * alto_tit) + (46 if antetitulo else 0) + 52
    y = (H - 10 - bloque) / 2

    img.paste(logo, (x_logo, int((H - 10 - 236) / 2)), logo)

    if antetitulo:
        cx = tx + 2
        for ch in antetitulo.upper():
            d.text((cx, y), ch, font=f_ante, fill=VERDE)
            cx += d.textlength(ch, font=f_ante) + 3.2
        y += 46

    for ln in lineas:
        d.text((tx, y), ln, font=f_tit, fill=PROFUNDO)
        y += alto_tit

    y += 8
    d.text((tx, y), bajada, font=f_baja, fill=GRIS)

    # Firma abajo, para que la tarjeta se reconozca sin leer el título
    if nombre != "inicio":
        d.text((tx, H - 10 - 58), "concertacionperuana.pe", font=f_marca, fill=VERDE)

    destino = os.path.join(DIR_SALIDA, f"{nombre}.png")
    img.save(destino, optimize=True)
    return destino, os.path.getsize(destino)


def main():
    asegurar_fuentes()
    os.makedirs(DIR_SALIDA, exist_ok=True)
    total = 0
    for nombre, ante, tit, baja in TARJETAS:
        ruta, peso = generar(nombre, ante, tit, baja)
        total += peso
        print(f"  {nombre + '.png':<42}{peso:>8,} B")
    print(f"  {'TOTAL':<42}{total:>8,} B  ({total/1024:.0f} KB)")


if __name__ == "__main__":
    sys.exit(main())
