Imágenes de la campaña.

LOGO
----
logo-original.png   Archivo tal como lo entregó el diseñador (1536x1024, 1.2 MB).
                    Es la fuente: no se usa directamente en el sitio.
logo-anterior.png   Versión anterior del logo (sin el símbolo de las figuras).
                    Ya no se usa: se puede borrar.
logo.png            Logo recortado y optimizado, para FONDO CLARO (cabecera).
logo-claro.png      Versión aclarada, para FONDO OSCURO (pie de página).
                    El arte original es azul muy oscuro y sobre el azul del
                    pie desaparecía; esta versión lleva a blanco solo las
                    zonas oscuras y conserva el destello azul.
simbolo.png         Solo el símbolo de las tres figuras, en cuadrado.
favicon.png         Ícono del navegador (32x32).
icono-apple.png     Ícono para iOS al agregar a pantalla de inicio (180x180).
icono-192.png       Ícono de la app instalable.
icono-512.png       Ícono de la app instalable, alta resolución.

Todos los derivados se generan con:

    python assets/img/generar-logos.py

Si llega un logo nuevo, se reemplaza logo-original.png y se vuelve a correr
ese script: regenera las 7 versiones con las mismas medidas.

FOTO DEL CANDIDATO
------------------
arbeyramos.PNG      Foto tal como llegó (recorte con fondo transparente).
                    Es la fuente: no se usa directamente en el sitio.
arbey.webp          Foto optimizada, la que carga el sitio (88 KB).
arbey.png           Respaldo para navegadores sin WebP, a menor resolución.
og-image.jpg        Imagen que se ve al compartir el enlace en WhatsApp,
                    Facebook o X (1200x630). Se arma sola con el logo y la foto.

Se generan con:

    python assets/img/generar-fotos.py

En WebP la foto pesa 88 KB; el mismo PNG pesaba 763 KB. Por eso el sitio usa
<picture> con WebP primero y PNG solo de respaldo.

Si llega una foto nueva se reemplaza arbeyramos.PNG (debe venir recortada,
con fondo transparente) y se vuelve a correr el script.

FOTOS QUE AÚN FALTAN
--------------------
Fotos en territorio (recorridos, encuentros veredales) para las noticias
y la galería. Formato libre; conviene exportarlas también a WebP.
