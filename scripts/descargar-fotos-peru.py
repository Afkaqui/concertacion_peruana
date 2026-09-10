"""
Descarga fotografía del Perú desde Wikimedia Commons para el carrusel.

POR QUÉ COMMONS Y NO UN BANCO DE IMÁGENES:
  - La licencia es verificable. En un sitio de organización política, poder
    acreditar el origen de cada imagen importa si alguien pregunta.
  - Se evitan fotos con personas identificables: en un contexto político,
    la imagen de alguien reconocible puede leerse como respaldo suyo, y los
    bancos comerciales lo restringen justamente por eso.

    ESTO NO LO PUEDE COMPROBAR EL SCRIPT. El título de un archivo de Commons
    no dice si hay caras dentro: "Cusco, Peru" resultó ser el primer plano de
    una señora identificable. ABRE CADA IMAGEN Y MÍRALA antes de publicarla.

SOLO SE ACEPTAN CC0 Y DOMINIO PÚBLICO. Las licencias CC BY y CC BY-SA exigen
mostrar la autoría junto a la imagen, y ese pie resultaba intrusivo en el
carrusel. Con CC0 no hace falta crédito y el pie desaparece — legalmente, no
por omisión. El script AVISA si una licencia exige atribución, para que nadie
añada una imagen CC BY y se quede sin acreditar por descuido.

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
    ("turismo", "Machu Picchu, Peru (Unsplash T8tL9 1DRWA).jpg",
     "Patrimonio", "Machu Picchu, Cusco."),
    ("sierra", "Colca Canyon, Chivay, Peru (Unsplash).jpg",
     "Sierra", "Cañón del Colca, Arequipa."),
    ("andes", "Mountain valley in the Andes (Unsplash).jpg",
     "Territorio", "Valle andino."),
    ("campo", "Urubamba Province, Peru (Unsplash).jpg",
     "Diversidad", "Maíces nativos del valle de Urubamba, Cusco."),
    ("costa", "La Marina Lighthouse cliffside (Unsplash).jpg",
     "Costa", "Acantilado de la Costa Verde, Lima."),
]

# Portadas de sección: una imagen ancha por página, en public/portadas/
# (mismo criterio: solo CC0, sin personas identificables)
PORTADAS = [
    # Sustituida: la anterior ("Cusco, Peru (Unsplash JaqX7DfKySs)") era un
    # primer plano de una señora perfectamente identificable. En la página del
    # Ideario de un partido, un rostro reconocible se lee como respaldo de esa
    # persona. Regla: paisaje, sin caras.
    ("ideario", "Ollantaytambo, Peru (Unsplash imQGQL0VV4s).jpg"),
    ("partido", "Mighty peak above clouds (Unsplash).jpg"),
    ("institucional", "Inca Trail mountain (Unsplash).jpg"),
    ("actualidad", "Sun over green mountains (Unsplash).jpg"),
]

# Licencias que NO exigen mostrar autoría junto a la imagen
SIN_CREDITO = ("cc0", "public domain", "pd-")


CACHE = os.path.join(RAIZ, "scripts", ".cache-commons.json")


def _cache_leer():
    try:
        return json.load(io.open(CACHE, encoding="utf-8"))
    except Exception:
        return {}


def _cache_escribir(d):
    json.dump(d, io.open(CACHE, "w", encoding="utf-8"), ensure_ascii=False, indent=1)


def metadatos(titulo):
    """Consulta Commons, con caché en disco.

    Reejecutar el script solo para cambiar un pie de foto no debe volver a
    golpear la API: Wikimedia responde 429 si se insiste, y además la licencia
    y la autoría de un archivo no cambian.
    """
    c = _cache_leer()
    if titulo in c:
        return c[titulo]
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
    m = {
        "url": ii.get("thumburl") or ii.get("url"),
        "autor": limpiar(em.get("Artist", {}).get("value", "")) or "Autor no indicado",
        "licencia": limpiar(em.get("LicenseShortName", {}).get("value", "")) or "Ver Commons",
        "pagina": f"https://commons.wikimedia.org/wiki/{urllib.parse.quote('File:' + titulo)}",
    }
    c[titulo] = m
    _cache_escribir(c)
    return m


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

        destino_previo = os.path.join(SALIDA, f"{nombre}.jpg")
        if os.path.exists(destino_previo):
            peso = os.path.getsize(destino_previo)   # ya descargada
            img = None
        else:
            req = urllib.request.Request(m["url"], headers=UA)
            datos = urllib.request.urlopen(req, timeout=90).read()
            img = recortar_3x2(Image.open(io.BytesIO(datos)).convert("RGB"))

        # Presupuesto por imagen: baja la calidad hasta entrar en 260 KB.
        # Una fuente ruidosa puede pesar el doble que otra a igual calidad, así
        # que fijar un número fijo de calidad no acota el peso (RNF-02).
        destino = os.path.join(SALIDA, f"{nombre}.jpg")
        if img is not None:
            for q in (74, 68, 62, 56, 50):
                img.save(destino, "JPEG", quality=q, optimize=True, progressive=True)
                peso = os.path.getsize(destino)
                if peso <= 260_000:
                    break
        total += peso

        # Solo se emite crédito si la licencia lo exige. Con CC0 el pie no
        # aparece en la web; con CC BY sí, porque es condición de uso.
        exige = not any(t in m["licencia"].lower() for t in SIN_CREDITO)
        entrada = {"nombre": nombre, "titulo": titulo, "pie": pie,
                   "autor": "", "licencia": m["licencia"], "pagina": m["pagina"]}
        if exige:
            entrada["autor"] = m["autor"]
            print(f"  !! {nombre}: licencia {m['licencia']} EXIGE atribución; se mostrará el pie")
        creditos.append(entrada)
        print(f"  {nombre + '.jpg':<20}{peso:>9,} B   {m['licencia']:<14} {'(sin crédito)' if not exige else m['autor'][:30]}")

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

    # ── Portadas de sección (recorte panorámico 21:9)
    dir_port = os.path.join(RAIZ, "public", "portadas")
    os.makedirs(dir_port, exist_ok=True)
    for nombre, archivo in PORTADAS:
        destino = os.path.join(dir_port, f"{nombre}.jpg")
        if os.path.exists(destino):
            print(f"  portadas/{nombre}.jpg{'':<6}{os.path.getsize(destino):>9,} B   (ya estaba)")
            continue
        m = metadatos(archivo)
        if not m:
            print(f"  portadas/{nombre}: NO ENCONTRADO ({archivo})")
            continue
        if any(t in m["licencia"].lower() for t in SIN_CREDITO) is False:
            print(f"  !! portadas/{nombre}: {m['licencia']} exige atribución; se descarta")
            continue
        req = urllib.request.Request(m["url"], headers=UA)
        img = Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=90).read())).convert("RGB")
        w, h = img.size
        obj = 21 / 9
        if w / h > obj:
            nw = int(h * obj); img = img.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
        else:
            nh = int(w / obj); img = img.crop((0, int((h - nh) * 0.35), w, int((h - nh) * 0.35) + nh))
        img = img.resize((1600, int(1600 / obj)), Image.LANCZOS)
        for q in (74, 68, 62, 56):
            img.save(destino, "JPEG", quality=q, optimize=True, progressive=True)
            if os.path.getsize(destino) <= 220_000:
                break
        print(f"  portadas/{nombre}.jpg{'':<6}{os.path.getsize(destino):>9,} B   {m['licencia']}")

    print(f"  {'TOTAL carrusel':<20}{total:>9,} B  ({total/1024:.0f} KB)")


if __name__ == "__main__":
    main()
