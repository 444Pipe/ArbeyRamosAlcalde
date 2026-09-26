Imágenes del sitio.

LOGO
----
nuevo logo/         La fuente de la marca "Avanza Restrepo" tal como llegó:
                    la versión azul (limpia, la que se usa) y una versión
                    blanca con bordes sucios que NO se usa (la versión clara
                    se fabrica desde la azul).
logo-original.png   Logo anterior ("Arbey Ramos Gómez · Alcalde"). Ya no se
                    usa: se conserva solo como histórico. Se puede borrar.
logo-anterior.png   Versión aún más vieja. Se puede borrar.
logo.png            Logo "Avanza Restrepo" recortado y optimizado, para
                    FONDO CLARO (cabecera y pantalla de carga).
logo-claro.png      Versión en blanco, para FONDO OSCURO (pie de página).
                    Se fabrica rellenando de blanco la silueta del logo azul.
simbolo.png         Solo el monograma AR, en cuadrado.
carga-a.png         Capa para la pantalla de carga: la A del monograma.
carga-r.png         Capa: la R con la banda y la flecha calada.
carga-texto.png     Capa: el bloque AVANZA / RESTREPO.
                    Las tres van en el mismo lienzo que logo.png: apiladas
                    reconstruyen el logo, y por eso pueden entrar animadas
                    cada una por su lado (ver carga.js y styles.css).
favicon.png         Ícono del navegador (32x32).
icono-apple.png     Ícono para iOS al agregar a pantalla de inicio (180x180).
icono-192.png       Ícono de la app instalable.
icono-512.png       Ícono de la app instalable, alta resolución.

Todos los derivados se generan con:

    python assets/img/generar-logos.py

Si llega un logo nuevo, se reemplaza el archivo que apunta ORIGEN dentro de
ese script y se vuelve a correr: regenera las 7 versiones con las mismas
medidas.

FOTO DE ARBEY
-------------
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
Fotos en territorio (recorridos, encuentros veredales, sesiones del Concejo)
para las noticias y la galería. Formato libre; conviene exportarlas también
a WebP.
