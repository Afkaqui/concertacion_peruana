"""
Genera tarjetas gráficas con las citas del Ideario, para el carrusel de la
portada mientras no hay fotografía de actividades.

POR QUÉ ASÍ: bajo un título como "Nuestras actividades", una foto de stock
afirma que esa actividad ocurrió. Estas tarjetas no afirman nada que no sea
cierto: son citas literales del Ideario, compuestas con la identidad de la
organización. Cuando lleguen las fotos reales, se sustituyen y el título del
carrusel cambia a "Nuestras actividades".

Uso:  python scripts/generar-tarjetas-ideario.py
"""

import os
import textwrap
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR_FUENTES = os.path.join(RAIZ, "scripts", ".fuentes")
SALIDA = os.path.join(RAIZ, "public", "ideario")

W, H = 1500, 1000  # 3:2
CLARO, VERDE, PROFUNDO, GRIS, BLANCO = "#E8F6EF", "#00A35E", "#00713F", "#5C6B63", "#FFFFFF"

# (archivo, pilar, cita)  — citas literales del Ideario
TARJETAS = [
    ("humanismo-teista", "Humanismo Teísta",
     "Todos somos iguales en dignidad, en derechos y en oportunidades."),
    ("democracia-participativa", "Democracia Participativa",
     "Una democracia auténtica da voz a quienes rara vez son escuchados."),
    ("fraternidad", "Fraternidad",
     "Es amar al prójimo como a nosotros mismos."),
    ("igualdad-de-oportunidades", "Igualdad de Oportunidades",
     "Las desigualdades son construcciones sociales e históricas, y por tanto se pueden transformar."),
    ("identidad-nacional", "Identidad Nacional",
     "Un solo Perú, diverso y fraterno."),
    ("concertacion", "Concertación",
     "No es el camino más corto, pero sí el más seguro para legitimar decisiones."),
]


def cara(archivo, tam, peso, opsz=None):
    f = ImageFont.truetype(os.path.join(DIR_FUENTES, archivo), tam)
    vals = []
    for a in f.get_variation_axes():
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


def envolver(d, texto, fuente, ancho_max):
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


def generar(nombre, pilar, cita, oscura):
    fondo = PROFUNDO if oscura else CLARO
    tinta = BLANCO if oscura else PROFUNDO
    tenue = "#BFE6D2" if oscura else GRIS
    filete = "#3FBF80" if oscura else VERDE

    img = Image.new("RGB", (W, H), fondo)
    d = ImageDraw.Draw(img)

    margen = 110
    f_pilar = cara("Inter.ttf", 30, 600)
    f_marca = cara("Inter.ttf", 27, 500)

    # El tamaño de la cita se adapta para no pasar de 5 líneas
    for tam in (78, 68, 60, 52):
        f_cita = cara("SourceSerif4.ttf", tam, 600, 60)
        lineas = envolver(d, f"«{cita}»", f_cita, W - margen * 2)
        if len(lineas) <= 5:
            break

    alto_linea = int(tam * 1.2)
    bloque = 46 + 40 + len(lineas) * alto_linea
    y = (H - bloque) / 2 - 20

    # Antetítulo: nombre del pilar, con espaciado
    cx = margen + 2
    for ch in pilar.upper():
        d.text((cx, y), ch, font=f_pilar, fill=filete)
        cx += d.textlength(ch, font=f_pilar) + 3.6
    y += 46

    d.line([(margen, y + 8), (margen + 62, y + 8)], fill=filete, width=3)
    y += 40

    for ln in lineas:
        d.text((margen, y), ln, font=f_cita, fill=tinta)
        y += alto_linea

    logo = os.path.join(RAIZ, "public", "logo-blanco-192.png" if oscura else "logo-384.png")
    marca = Image.open(logo).convert("RGBA").resize((78, 78), Image.LANCZOS)
    img.paste(marca, (margen, H - margen - 40), marca)
    d.text((margen + 100, H - margen - 12), "Concertación Peruana", font=f_marca, fill=tenue)

    destino = os.path.join(SALIDA, f"{nombre}.png")
    img.save(destino, optimize=True)
    return os.path.getsize(destino)


def main():
    os.makedirs(SALIDA, exist_ok=True)
    total = 0
    for i, (nombre, pilar, cita) in enumerate(TARJETAS):
        peso = generar(nombre, pilar, cita, oscura=(i % 2 == 1))
        total += peso
        print(f"  {nombre + '.png':<34}{peso:>8,} B")
    print(f"  {'TOTAL':<34}{total:>8,} B  ({total/1024:.0f} KB)")


if __name__ == "__main__":
    main()
