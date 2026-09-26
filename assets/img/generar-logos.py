# -*- coding: utf-8 -*-
"""Genera todos los archivos del logo que usa el sitio, a partir del original.

    python assets/img/generar-logos.py

El original es el logo "Avanza Restrepo" en azul sobre fondo transparente
(carpeta "nuevo logo"). Si llega un logo nuevo: se reemplaza el archivo de
ORIGEN y se vuelve a correr. La versión clara NO se toma de la carpeta
(viene con los bordes sucios de un quitado de fondo): se fabrica aquí
rellenando de blanco la silueta del logo azul, que sí tiene bordes limpios.

Además del logo completo, se generan las CAPAS que usa la pantalla de carga
para el ensamblaje animado (carga.js + styles.css): la A, la R con la banda
de la flecha, y el bloque de texto AVANZA/RESTREPO. Las tres capas van en el
mismo lienzo que el logo completo: apiladas lo reconstruyen pixel a pixel.
"""
from PIL import Image
from collections import deque
import os

ORIGEN = 'assets/img/nuevo logo/Logo_Avanza_Restrepo_azul.png'
DEST = 'assets/img'
AZUL_800 = (7, 36, 92, 255)


def guardar(img, nombre, ancho=None):
    if ancho:
        alto = round(img.size[1] * ancho / img.size[0])
        img = img.resize((ancho, alto), Image.LANCZOS)
    ruta = os.path.join(DEST, nombre)
    img.save(ruta, 'PNG', optimize=True)
    print('  %-20s %-11s %6.1f KB' % (nombre, '%dx%d' % img.size, os.path.getsize(ruta) / 1024))


def blanquear(img):
    """Versión para fondos oscuros: conserva la silueta (el alfa) y
       rellena todo el trazo de blanco."""
    blanco = Image.new('RGBA', img.size, (255, 255, 255, 255))
    blanco.putalpha(img.split()[3])
    return blanco


def extraer_simbolo(rec):
    """Aísla el monograma AR de la parte superior. El monograma y el texto
       AVANZA están separados por una franja horizontal sin tinta: se busca
       la primera franja vacía dentro del tercio central y se corta ahí."""
    w, h = rec.size
    al = rec.split()[3].load()

    def fila_vacia(y):
        return not any(al[x, y] > 40 for x in range(0, w, 2))

    corte = None
    for y in range(int(h * 0.25), int(h * 0.80)):
        if fila_vacia(y):
            corte = y
            break
    if corte is None:
        raise SystemExit('No se encontró la franja que separa el monograma del texto.')

    simbolo = rec.crop((0, 0, w, corte))
    simbolo = simbolo.crop(simbolo.split()[3].getbbox())
    print('  monograma aislado: corte en y=%d -> %dx%d' % (corte, simbolo.size[0], simbolo.size[1]))
    return simbolo, corte


# =====================================================================
im = Image.open(ORIGEN).convert('RGBA')
recorte = im.crop(im.split()[3].getbbox())
print('original %s  ->  recortado %s' % (im.size, recorte.size))

# ---------- 1. Logo completo ----------
# 480px basta: la cabecera lo muestra a ~81px y el pie a ~210px (2x cubierto).
guardar(recorte, 'logo.png', 480)                    # fondo claro
guardar(blanquear(recorte), 'logo-claro.png', 480)   # fondo azul oscuro

# ---------- 2. Símbolo suelto (el monograma AR) ----------
simbolo, CORTE = extraer_simbolo(recorte)
lado = max(simbolo.size)
cuadro = Image.new('RGBA', (lado, lado), (0, 0, 0, 0))
cuadro.alpha_composite(simbolo, ((lado - simbolo.size[0]) // 2, (lado - simbolo.size[1]) // 2))
guardar(cuadro, 'simbolo.png', 512)

# ---------- 2b. Capas para la pantalla de carga ----------
# Con umbral de alfa 25 la A y la R+banda son piezas separadas (con menos
# umbral el suavizado del borde las une). Se etiquetan esos dos núcleos y
# después las etiquetas crecen unas pasadas SOLO sobre píxeles con algo de
# tinta: así cada capa se lleva su borde suavizado y en la capa del texto
# no quedan fantasmas de la A ni de la R.
def piezas_conexas(img, umbral):
    w, h = img.size
    al = img.split()[3].load()
    visto = bytearray(w * h)
    piezas = []
    for y0 in range(h):
        for x0 in range(w):
            if visto[y0 * w + x0] or al[x0, y0] <= umbral:
                continue
            q = deque([(x0, y0)])
            visto[y0 * w + x0] = 1
            pix = []
            while q:
                cx, cy = q.popleft()
                pix.append((cx, cy))
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1),
                               (1, 1), (1, -1), (-1, 1), (-1, -1)):
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < w and 0 <= ny < h and not visto[ny * w + nx] and al[nx, ny] > umbral:
                        visto[ny * w + nx] = 1
                        q.append((nx, ny))
            piezas.append(pix)
    piezas.sort(key=len, reverse=True)
    return piezas


W, H = recorte.size
ALFA = recorte.split()[3].load()
piezas = piezas_conexas(recorte, 25)
etiqueta = bytearray(W * H)          # 0 libre · 1 R+banda · 2 A
for (cx, cy) in piezas[0]:
    etiqueta[cy * W + cx] = 1
for (cx, cy) in piezas[1]:
    etiqueta[cy * W + cx] = 2

borde = [(cx, cy) for (cx, cy) in piezas[0] + piezas[1]]
for _ in range(6):                   # 6 px de crecimiento sobre el suavizado
    nuevos = []
    for (cx, cy) in borde:
        e = etiqueta[cy * W + cx]
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1),
                       (1, 1), (1, -1), (-1, 1), (-1, -1)):
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < W and 0 <= ny < H and not etiqueta[ny * W + nx] and ALFA[nx, ny] > 0:
                etiqueta[ny * W + nx] = e
                nuevos.append((nx, ny))
    borde = nuevos

capa_r = Image.new('RGBA', recorte.size, (0, 0, 0, 0))
capa_a = Image.new('RGBA', recorte.size, (0, 0, 0, 0))
capa_texto = recorte.copy()
src = recorte.load()
dr, da, dt = capa_r.load(), capa_a.load(), capa_texto.load()
n_r = n_a = 0
for y in range(H):
    for x in range(W):
        e = etiqueta[y * W + x]
        if e == 1:
            dr[x, y] = src[x, y]; dt[x, y] = (0, 0, 0, 0); n_r += 1
        elif e == 2:
            da[x, y] = src[x, y]; dt[x, y] = (0, 0, 0, 0); n_a += 1
        elif y < CORTE:
            # Residuos difusos del suavizado en la zona del monograma:
            # fuera de la capa del texto, que empieza bajo la franja.
            dt[x, y] = (0, 0, 0, 0)
print('  piezas: R+banda %d px, A %d px' % (n_r, n_a))

guardar(capa_a, 'carga-a.png', 480)
guardar(capa_r, 'carga-r.png', 480)
guardar(capa_texto, 'carga-texto.png', 480)

# ---------- 3. Favicon e iconos de la app instalable ----------
simbolo_claro = blanquear(cuadro)
for lado_px, nombre, ocupa in [(32, 'favicon.png', 0.88), (180, 'icono-apple.png', 0.74),
                               (192, 'icono-192.png', 0.66), (512, 'icono-512.png', 0.66)]:
    # Los iconos "maskable" se recortan en círculo: hay que dejar margen.
    fondo = Image.new('RGBA', (lado_px, lado_px), AZUL_800)
    util = int(lado_px * ocupa)
    escala = util / max(simbolo_claro.size)
    nuevo = (round(simbolo_claro.size[0] * escala), round(simbolo_claro.size[1] * escala))
    fondo.alpha_composite(simbolo_claro.resize(nuevo, Image.LANCZOS),
                          ((lado_px - nuevo[0]) // 2, (lado_px - nuevo[1]) // 2))
    ruta = os.path.join(DEST, nombre)
    fondo.convert('RGB').save(ruta, 'PNG', optimize=True)
    print('  %-20s %-11s %6.1f KB' % (nombre, '%dx%d' % (lado_px, lado_px), os.path.getsize(ruta) / 1024))
