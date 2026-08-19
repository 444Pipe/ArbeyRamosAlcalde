# Sitio estático servido con Caddy. Imagen pequeña, arranque inmediato
# y sin dependencias que mantener.
FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile

# Se copia solo lo que el navegador necesita. Las fuentes del logo y la foto
# (4 MB) se quedan fuera: sirven para regenerar los archivos, no para servirlos.
WORKDIR /srv
COPY *.html ./
COPY manifest.json sw.js ./
COPY assets/css ./assets/css
COPY assets/js ./assets/js
COPY assets/img/arbey.png assets/img/arbey.webp assets/img/og-image.jpg ./assets/img/
COPY assets/img/logo.png assets/img/logo-claro.png ./assets/img/
COPY assets/img/favicon.png assets/img/icono-apple.png ./assets/img/
COPY assets/img/icono-192.png assets/img/icono-512.png ./assets/img/

EXPOSE 8080

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
