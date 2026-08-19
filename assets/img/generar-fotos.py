# -*- coding: utf-8 -*-
"""Prepara la foto del candidato y la imagen para compartir en redes.

    python assets/img/generar-fotos.py

Si llega una foto nueva se reemplaza arbeyramos.PNG (recorte con fondo
transparente) y se vuelve a correr.
"""
from PIL import Image
import os

ORIGEN = 'assets/img/arbeyramos.PNG'
LOGO_CLARO = 'assets/img/logo-claro.png'
DEST = 'assets/img'
AZUL_900 = (6, 26, 62)
AZUL_700 = (14, 51, 116)

foto = Image.open(ORIGEN).convert('RGBA')
foto = foto.crop(foto.split()[3].getbbox())
print('foto recortada: %dx%d' % foto.size)


def guardar(img, nombre, ancho=None, calidad=None):
    if ancho:
        alto = round(img.size[1] * ancho / img.size[0])
        img = img.resize((ancho, alto), Image.LANCZOS)
    ruta = os.path.join(DEST, nombre)
    if nombre.endswith('.jpg'):
        img.convert('RGB').save(ruta, 'JPEG', quality=calidad or 82, optimize=True, progressive=True)
    else:
        img.save(ruta, 'PNG', optimize=True)
    print('  %-20s %-11s %6.1f KB' % (nombre, '%dx%d' % img.size, os.path.getsize(ruta) / 1024))
    return img


# ---------- 1. Foto para el sitio ----------
# El hero la muestra a ~460px y la sección del candidato a ~430px.
# 920px cubre pantallas de alta densidad.
# En WebP pesa 88 KB; el mismo PNG pesaba 763 KB (8.7 veces más), así que
# el PNG queda solo como respaldo para navegadores viejos, y a 1x.
ancho = 920
alto = round(foto.size[1] * ancho / foto.size[0])
grande = foto.resize((ancho, alto), Image.LANCZOS)
grande.save(os.path.join(DEST, 'arbey.webp'), 'WEBP', quality=85, method=6)
print('  %-20s %-11s %6.1f KB' % ('arbey.webp', '%dx%d' % grande.size,
                                  os.path.getsize(os.path.join(DEST, 'arbey.webp')) / 1024))
guardar(foto, 'arbey.png', 480)


# ---------- 2. Imagen para compartir en redes (WhatsApp, Facebook) ----------
# 1200x630 es la medida que esperan las redes. Sin esto, al compartir el
# enlace sale un recuadro vacío.
W, H = 1200, 630
tarjeta = Image.new('RGB', (W, H), AZUL_900)

# Degradado diagonal suave
grad = Image.new('RGB', (W, H))
gp = grad.load()
for y in range(H):
    for x in range(0, W, 4):
        t = (x / W) * 0.6 + (1 - y / H) * 0.4
        c = tuple(int(AZUL_900[i] + (AZUL_700[i] - AZUL_900[i]) * t) for i in range(3))
        for dx in range(4):
            if x + dx < W:
                gp[x + dx, y] = c
tarjeta = grad

# La foto, alineada abajo a la derecha
alto_foto = int(H * 0.92)
ancho_foto = round(foto.size[0] * alto_foto / foto.size[1])
f = foto.resize((ancho_foto, alto_foto), Image.LANCZOS)
tarjeta.paste(f, (W - ancho_foto + int(ancho_foto * 0.06), H - alto_foto), f)

# El logo, arriba a la izquierda
logo = Image.open(LOGO_CLARO).convert('RGBA')
ancho_logo = 380
logo = logo.resize((ancho_logo, round(logo.size[1] * ancho_logo / logo.size[0])), Image.LANCZOS)
tarjeta.paste(logo, (64, 70), logo)

guardar(tarjeta, 'og-image.jpg', None, 84)
