# -*- coding: utf-8 -*-
"""Genera todos los archivos del logo que usa el sitio, a partir del original.

    python assets/img/generar-logos.py

Si llega un logo nuevo: se reemplaza logo-original.png y se vuelve a correr.
Los valores de REGION_SIMBOLO están ajustados al logo actual (el símbolo de
las tres figuras, a la derecha del texto); si el logo cambia de composición
hay que revisarlos.
"""
from PIL import Image
from collections import deque
import os

ORIGEN = 'assets/img/logo-original.png'
DEST = 'assets/img'
AZUL_800 = (10, 37, 89, 255)

# Zona donde vive el símbolo, en fracciones del logo recortado (x0, y0, x1, y1)
REGION_SIMBOLO = (0.70, 0.10, 1.00, 0.72)


def guardar(img, nombre, ancho=None, fondo=None):
    if ancho:
        alto = round(img.size[1] * ancho / img.size[0])
        img = img.resize((ancho, alto), Image.LANCZOS)
    ruta = os.path.join(DEST, nombre)
    if fondo:
        base = Image.new('RGBA', img.size, fondo)
        base.alpha_composite(img)
        base.convert('RGB').save(ruta, 'PNG', optimize=True)
    else:
        img.save(ruta, 'PNG', optimize=True)
    print('  %-20s %-11s %6.1f KB' % (nombre, '%dx%d' % img.size, os.path.getsize(ruta) / 1024))


def aclarar(img):
    """El arte original es azul muy oscuro: sobre el pie azul desaparece.
       Lleva a blanco solo las zonas oscuras y deja intactos los azules
       brillantes, que ya contrastan y son los que dan carácter al logo."""
    out = img.copy()
    px = out.load()
    for y in range(out.size[1]):
        for x in range(out.size[0]):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            L = 0.2126 * r + 0.7152 * g + 0.0722 * b
            if L < 80:
                f = 1.0 if L < 45 else (80 - L) / 35.0
                px[x, y] = (int(r + (238 - r) * f), int(g + (246 - g) * f), int(b + (255 - b) * f), a)
    return out


def extraer_simbolo(rec):
    """Aísla el símbolo de las figuras. No basta recortar un rectángulo: el arco
       del símbolo pasa por detrás de la 'S' de RAMOS y siempre arrastra
       pedazos de letras. Se separan las formas por componentes conexas y se
       descartan las que tocan el borde izquierdo del recorte (esas son letras)."""
    w, h = rec.size
    fx0, fy0, fx1, fy1 = REGION_SIMBOLO
    sub = rec.crop((int(w * fx0), int(h * fy0), int(w * fx1), int(h * fy1)))
    sw, sh = sub.size
    al = sub.split()[3].load()

    visto = [[False] * sw for _ in range(sh)]
    piezas = []
    for sy in range(sh):
        for sx in range(sw):
            if visto[sy][sx] or al[sx, sy] <= 40:
                continue
            q = deque([(sx, sy)])
            visto[sy][sx] = True
            pix = []
            while q:
                cx, cy = q.popleft()
                pix.append((cx, cy))
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (1, -1), (-1, 1), (-1, -1)):
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < sw and 0 <= ny < sh and not visto[ny][nx] and al[nx, ny] > 40:
                        visto[ny][nx] = True
                        q.append((nx, ny))
            piezas.append(pix)

    buenas = [p for p in piezas if len(p) > 800 and min(c[0] for c in p) > 2]
    limpio = Image.new('RGBA', (sw, sh), (0, 0, 0, 0))
    dst, src = limpio.load(), sub.load()
    for pieza in buenas:
        for (cx, cy) in pieza:
            dst[cx, cy] = src[cx, cy]
    limpio = limpio.crop(limpio.split()[3].getbbox())
    print('  simbolo aislado: %d formas, %dx%d' % (len(buenas), limpio.size[0], limpio.size[1]))
    return limpio


# =====================================================================
im = Image.open(ORIGEN).convert('RGBA')
recorte = im.crop(im.split()[3].getbbox())
print('original %s  ->  recortado %s' % (im.size, recorte.size))

# ---------- 1. Logo completo ----------
# 480px basta: la cabecera lo muestra a ~81px y el pie a ~210px (2x cubierto).
guardar(recorte, 'logo.png', 480)                 # fondo claro
guardar(aclarar(recorte), 'logo-claro.png', 480)  # fondo azul oscuro

# ---------- 2. Símbolo suelto ----------
simbolo = extraer_simbolo(recorte)
lado = max(simbolo.size)
cuadro = Image.new('RGBA', (lado, lado), (0, 0, 0, 0))
cuadro.alpha_composite(simbolo, ((lado - simbolo.size[0]) // 2, (lado - simbolo.size[1]) // 2))
guardar(cuadro, 'simbolo.png', 512)

# ---------- 3. Favicon e iconos de la app instalable ----------
simbolo_claro = aclarar(cuadro)
for lado_px, nombre, ocupa in [(32, 'favicon.png', 0.86), (180, 'icono-apple.png', 0.70),
                               (192, 'icono-192.png', 0.62), (512, 'icono-512.png', 0.62)]:
    # Los iconos "maskable" se recortan en círculo: hay que dejar margen.
    fondo = Image.new('RGBA', (lado_px, lado_px), AZUL_800)
    util = int(lado_px * ocupa)
    fondo.alpha_composite(simbolo_claro.resize((util, util), Image.LANCZOS),
                          ((lado_px - util) // 2, (lado_px - util) // 2))
    ruta = os.path.join(DEST, nombre)
    fondo.convert('RGB').save(ruta, 'PNG', optimize=True)
    print('  %-20s %-11s %6.1f KB' % (nombre, '%dx%d' % (lado_px, lado_px), os.path.getsize(ruta) / 1024))
