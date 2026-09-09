"""
Descarga la imagen de vista previa de una publicación y la deja lista para
pegarla en app/_contenido/publicaciones.ts.

Uso:
    python scripts/portada-publicacion.py <slug> <url-de-la-publicacion>

Ejemplo:
    python scripts/portada-publicacion.py 2026-08-05-primer-video \\
        https://www.tiktok.com/@concertacionperuana/video/7670563775447076117

De dónde sale la miniatura:
  TikTok   → API oEmbed pública (no necesita token)
  YouTube  → img.youtube.com, portada pública del vídeo
  Facebook
  Instagram → NO tienen miniatura pública sin token de app. Para estas, guarda
              una captura o la propia imagen del post en public/publicaciones/
              con el nombre <slug>.jpg y añade la línea a mano.

Se guarda en public/publicaciones/<slug>.jpg, recortada a 3:2 y por debajo de
180 KB, porque la miniatura de la tarjeta es pequeña y no justifica más.
"""

import io
import json
import os
import re
import sys
import urllib.parse
import urllib.request

from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, "public", "publicaciones")
UA = {"User-Agent": "ConcertacionPeruanaWeb/1.0 (sitio institucional)"}


def url_miniatura(url: str):
    """Devuelve (url_imagen, red) o (None, red) si no hay miniatura pública."""
    if "tiktok.com" in url:
        api = "https://www.tiktok.com/oembed?url=" + urllib.parse.quote(url, safe="")
        req = urllib.request.Request(api, headers=UA)
        d = json.load(urllib.request.urlopen(req, timeout=40))
        return d.get("thumbnail_url"), "tiktok"

    m = (
        re.search(r"[?&]v=([A-Za-z0-9_-]{11})", url)
        or re.search(r"youtu\.be/([A-Za-z0-9_-]{11})", url)
        or re.search(r"/(?:shorts|embed|live)/([A-Za-z0-9_-]{11})", url)
    )
    if m and ("youtube" in url or "youtu.be" in url):
        return f"https://img.youtube.com/vi/{m.group(1)}/maxresdefault.jpg", "youtube"

    if "facebook.com" in url:
        return None, "facebook"
    if "instagram.com" in url:
        return None, "instagram"
    return None, "desconocida"


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        return 1

    slug, url = sys.argv[1], sys.argv[2]
    src, red = url_miniatura(url)

    if not src:
        print(f"  {red}: no expone miniatura pública sin token de aplicación.")
        print(f"  Guarda la imagen a mano en public/publicaciones/{slug}.jpg")
        print(f'  y añade a la entrada:  imagen: "/publicaciones/{slug}.jpg",')
        return 1

    os.makedirs(SALIDA, exist_ok=True)
    req = urllib.request.Request(src, headers=UA)
    img = Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=90).read())).convert("RGB")

    # Recorte 3:2 centrado en el tercio superior: en vídeo vertical lo relevante
    # (rostro, título) casi siempre está arriba, no en el centro geométrico.
    w, h = img.size
    obj = 3 / 2
    if w / h > obj:
        nw = int(h * obj)
        img = img.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / obj)
        arriba = int((h - nh) * 0.3)
        img = img.crop((0, arriba, w, arriba + nh))
    img = img.resize((900, 600), Image.LANCZOS)

    destino = os.path.join(SALIDA, f"{slug}.jpg")
    for q in (78, 70, 62, 55):
        img.save(destino, "JPEG", quality=q, optimize=True, progressive=True)
        if os.path.getsize(destino) <= 180_000:
            break

    print(f"  guardada: public/publicaciones/{slug}.jpg  ({os.path.getsize(destino):,} B)")
    print(f'  añade a la entrada:  imagen: "/publicaciones/{slug}.jpg",')
    return 0


if __name__ == "__main__":
    sys.exit(main())
