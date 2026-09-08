"""
Descarga fotografía del Perú desde Wikimedia Commons para el carrusel.

POR QUÉ COMMONS Y NO UN BANCO DE IMÁGENES:
  - La licencia es verificable y la autoría queda registrada. En un sitio de
    organización política, poder acreditar el origen de cada imagen importa.
  - Se evitan fotos con personas identificables: en un contexto político,
    la imagen de alguien reconocible puede leerse como respaldo suyo, y los
    bancos comerciales lo restringen justamente por eso.

Las imágenes ilustran el territorio y los sectores productivos del país.
NO se presentan como actividades de la organización.

Genera:
  public/peru/*.jpg          imágenes recortadas a 3:2
  app/_contenido/creditos.ts  autoría y licencia de cada una

Uso:  python scripts/descargar-fotos-peru.py
"""

import io
import json
import os
import re
import urllib.parse
import urllib.request

from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, "public", "peru")
UA = {"User-Agent": "ConcertacionPeruanaWeb/1.0 (sitio institucional)"}

# (nombre de salida, título del archivo en Commons, título visible, pie)
FOTOS = [
    ("agricultura", "Peru terrace farming.JPG",
     "Agricultura", "Andenería, una tecnología agrícola de siglos."),
    ("sierra", "Tullparaju mountain and Tullparaju lake.jpg",
     "Sierra", "Cordillera Blanca, Áncash."),
    ("pesqueria", "Puerto de Paracas, Perú, 2019-10-17.jpg",
     "Pesquería", "Puerto de Paracas, Ica."),
    ("turismo", "Machu Picchu Peru 100.jpg",
     "Turismo", "Machu Picchu, Cusco."),
    ("ciudad", "Lima Peru City Skyline 2013.jpg",
     "Ciudad", "Lima, capital y punto de encuentro del país."),
]


def metadatos(titulo):
    q = urllib.parse.urlencode({
        "action": "query", "format": "json", "titles": f"File:{titulo}",
        "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiurlwidth": "1800",
    })
    req = urllib.request.Request(f"https://commons.wikimedia.org/w/api.php?{q}", headers=UA)
    d = json.load(urllib.request.urlopen(req, timeout=40))
    pagina = next(iter(d["query"]["pages"].values()))
    if "imageinfo" not in pagina:
        return None
    ii = pagina["imageinfo"][0]
    em = ii.get("extmetadata", {})
    def limpiar(t):
        """El campo Artist de Commons suele traer marcas de wiki y sello de
        fecha ('J. Thompson (talk) 21:23, 2 November 2008 (UTC)'). Se deja
        solo el nombre, que es lo que la licencia pide acreditar."""
        t = re.sub(r"<[^>]+>", "", t or "")
        t = re.sub(r"\(talk\)", "", t)
        t = re.sub(r"\d{1,2}:\d{2},.*$", "", t)      # sello de fecha en adelante
        t = re.sub(r"\s{2,}", " ", t)
        return t.strip(" ,;·")
    return {
        "url": ii.get("thumburl") or ii.get("url"),
        "autor": limpiar(em.get("Artist", {}).get("value", "")) or "Autor no indicado",
        "licencia": limpiar(em.get("LicenseShortName", {}).get("value", "")) or "Ver Commons",
        "pagina": f"https://commons.wikimedia.org/wiki/{urllib.parse.quote('File:' + titulo)}",
    }


def recortar_3x2(img, ancho=1400):
    w, h = img.size
    objetivo = 3 / 2
    if w / h > objetivo:            # demasiado ancha: recorta a los lados
        nw = int(h * objetivo)
        img = img.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:                            # demasiado alta: recorta arriba y abajo
        nh = int(w / objetivo)
        img = img.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    return img.resize((ancho, int(ancho / objetivo)), Image.LANCZOS)


def main():
    os.makedirs(SALIDA, exist_ok=True)
    creditos, total = [], 0

    for nombre, archivo, titulo, pie in FOTOS:
        m = metadatos(archivo)
        if not m:
            print(f"  {nombre}: NO ENCONTRADO ({archivo})")
            continue

        req = urllib.request.Request(m["url"], headers=UA)
        datos = urllib.request.urlopen(req, timeout=90).read()
        img = recortar_3x2(Image.open(io.BytesIO(datos)).convert("RGB"))

        # Presupuesto por imagen: baja la calidad hasta entrar en 260 KB.
        # Una fuente ruidosa puede pesar el doble que otra a igual calidad, así
        # que fijar un número fijo de calidad no acota el peso (RNF-02).
        destino = os.path.join(SALIDA, f"{nombre}.jpg")
        for q in (74, 68, 62, 56, 50):
            img.save(destino, "JPEG", quality=q, optimize=True, progressive=True)
            peso = os.path.getsize(destino)
            if peso <= 260_000:
                break
        total += peso

        creditos.append({
            "nombre": nombre, "titulo": titulo, "pie": pie,
            "autor": m["autor"], "licencia": m["licencia"], "pagina": m["pagina"],
        })
        print(f"  {nombre + '.jpg':<20}{peso:>9,} B   {m['licencia']:<14} {m['autor'][:34]}")

    with io.open(os.path.join(RAIZ, "app", "_contenido", "creditos.ts"), "w", encoding="utf-8") as f:
        f.write(
            "// GENERADO por scripts/descargar-fotos-peru.py — no editar a mano.\n"
            "// Autoría y licencia de las fotografías de Wikimedia Commons.\n"
            "// Se muestran al pie del carrusel: la atribución es condición de la licencia.\n\n"
            "export type Credito = {\n  nombre: string;\n  titulo: string;\n  pie: string;\n"
            "  autor: string;\n  licencia: string;\n  pagina: string;\n};\n\n"
            "export const CREDITOS: Credito[] = "
            + json.dumps(creditos, ensure_ascii=False, indent=2) + ";\n"
        )

    print(f"  {'TOTAL':<20}{total:>9,} B  ({total/1024:.0f} KB)")


if __name__ == "__main__":
    main()
