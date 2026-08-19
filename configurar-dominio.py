# -*- coding: utf-8 -*-
"""Pone el dominio definitivo en las etiquetas que lo necesitan absoluto.

    python configurar-dominio.py https://arbeyramos.co

Por qué hace falta: WhatsApp, Facebook y X exigen que `og:image` y `og:url`
sean direcciones completas. Con una ruta relativa el enlace se comparte sin
imagen. Y `canonical` evita que el buscador trate como páginas distintas la
misma dirección con y sin "www", o la de Railway y la del dominio propio.

Se puede correr las veces que haga falta: si las etiquetas ya están, las
actualiza en lugar de duplicarlas.
"""
import glob
import io
import re
import sys

if len(sys.argv) < 2:
    print(__doc__)
    sys.exit(1)

dominio = sys.argv[1].rstrip('/')
if not dominio.startswith('http'):
    print('El dominio debe empezar por https://  (recibido: %s)' % dominio)
    sys.exit(1)

cambiados = 0

for pagina in sorted(glob.glob('*.html')):
    s = io.open(pagina, encoding='utf-8').read()
    original = s

    # index.html es la raíz del sitio, no "/index.html"
    ruta = '/' if pagina == 'index.html' else '/' + pagina
    url = dominio + ruta
    imagen = dominio + '/assets/img/og-image.jpg'

    # --- og:image absoluto ---
    if 'property="og:image"' in s:
        s = re.sub(r'<meta property="og:image" content="[^"]*"',
                   '<meta property="og:image" content="%s"' % imagen, s)

    # --- og:url (se crea si no existe) ---
    if 'property="og:url"' in s:
        s = re.sub(r'<meta property="og:url" content="[^"]*"',
                   '<meta property="og:url" content="%s"' % url, s)
    elif 'property="og:image"' in s:
        s = s.replace('<meta property="og:image"',
                      '<meta property="og:url" content="%s" />\n  <meta property="og:image"' % url, 1)

    # --- canonical (la 404 no lleva: no debe indexarse) ---
    if pagina != '404.html':
        if 'rel="canonical"' in s:
            s = re.sub(r'<link rel="canonical" href="[^"]*"',
                       '<link rel="canonical" href="%s"' % url, s)
        else:
            s = s.replace('<link rel="icon"',
                          '<link rel="canonical" href="%s" />\n  <link rel="icon"' % url, 1)

    if s != original:
        io.open(pagina, 'w', encoding='utf-8').write(s)
        cambiados += 1
        print('  %-18s -> %s' % (pagina, url))

print('\n%d páginas actualizadas con el dominio %s' % (cambiados, dominio))
print('Falta hacer commit y desplegar para que las redes lo vean.')
