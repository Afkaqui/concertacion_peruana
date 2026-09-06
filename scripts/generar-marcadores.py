"""
Genera marcadores de posición para previsualizar el carrusel de actividades
mientras no hay fotografía real.

Son DELIBERADAMENTE reconocibles como marcadores: no se inventan imágenes de
actividades que no ocurrieron. Cuando lleguen las fotos reales, esta carpeta
(public/actividades/muestra/) se borra entera.

Uso:  python scripts/generar-marcadores.py
"""

import os
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR_FUENTES = os.path.join(RAIZ, "scripts", ".fuentes")
SALIDA = os.path.join(RAIZ, "public", "actividades", "muestra")

W, H = 1200, 800  # 3:2
GROUND, VERDE, PROFUNDO, GRIS = "#E8F6EF", "#00A35E", "#00713F", "#5C6B63"

ETIQUETAS = [
    "Asamblea de bases",
    "Jornada de formación",
    "Mesa de concertación",
    "Encuentro regional",
    "Reunión de dirigencia",
]


def cara(archivo, tam, peso):
    f = ImageFont.truetype(os.path.join(DIR_FUENTES, archivo), tam)
    ejes = f.get_variation_axes()
    vals = []
    for a in ejes:
        n = a["name"].decode() if isinstance(a["name"], bytes) else str(a["name"])
        ln = n.lower()
        vals.append(peso if "weight" in ln else (min(max(tam, a["minimum"]), a["maximum"]) if "optical" in ln else a["default"]))
    f.set_variation_by_axes(vals)
    return f


def main():
    os.makedirs(SALIDA, exist_ok=True)
    f_tit = cara("SourceSerif4.ttf", 54, 600)
    f_nota = cara("Inter.ttf", 26, 500)

    for i, etiqueta in enumerate(ETIQUETAS, start=1):
        img = Image.new("RGB", (W, H), GROUND)
        d = ImageDraw.Draw(img)

        # Trama diagonal suave: se lee como "hueco por llenar", no como foto
        for x in range(-H, W, 46):
            d.line([(x, H), (x + H, 0)], fill="#DCEFE5", width=14)

        d.rectangle([48, 48, W - 48, H - 48], outline=VERDE, width=3)

        logo = Image.open(os.path.join(RAIZ, "public", "logo-384.png")).convert("RGBA")
        logo = logo.resize((150, 150), Image.LANCZOS)
        img.paste(logo, ((W - 150) // 2, 190), logo)

        t = f"{i}. {etiqueta}"
        d.text(((W - d.textlength(t, font=f_tit)) / 2, 396), t, font=f_tit, fill=PROFUNDO)

        nota = "Marcador — sustituir por fotografía real"
        d.text(((W - d.textlength(nota, font=f_nota)) / 2, 476), nota, font=f_nota, fill=GRIS)

        destino = os.path.join(SALIDA, f"muestra-{i}.png")
        img.save(destino, optimize=True)
        print(f"  muestra-{i}.png{'':<10}{os.path.getsize(destino):>8,} B")


if __name__ == "__main__":
    main()
