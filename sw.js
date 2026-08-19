/* =========================================================
   Service worker de la plataforma.
   Permite que el sitio se instale como aplicación en el celular
   y que las páginas ya visitadas se puedan abrir sin señal.
   Sube la versión al publicar cambios para forzar la actualización.
   ========================================================= */
var VERSION = "arbey-v19";

var ESENCIALES = [
  "./",
  "index.html",
  "candidato.html",
  "propuestas.html",
  "voz.html",
  "noticias.html",
  "eventos.html",
  "logros.html",
  "unete.html",
  "contacto.html",
  "404.html",
  "manifest.json",
  "assets/css/styles.css",
  "assets/css/plataforma.css",
  "assets/js/carga.js",
  "assets/js/config.js",
  "assets/js/contenido.js",
  "assets/js/store.js",
  "assets/js/ui.js",
  "assets/js/main.js",
  "assets/js/candidato.js",
  "assets/js/propuestas.js",
  "assets/js/voz.js",
  "assets/js/noticias.js",
  "assets/js/eventos.js",
  "assets/js/logros.js",
  "assets/js/unete.js",
  "assets/js/contacto.js",
  "assets/img/arbey.webp",
  "assets/img/arbey.png",
  "assets/img/og-image.jpg",
  "assets/img/logo.png",
  "assets/img/logo-claro.png",
  "assets/img/favicon.png",
  "assets/img/icono-192.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSION)
      .then(function (c) { return c.addAll(ESENCIALES); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (claves) {
        return Promise.all(claves.map(function (k) {
          if (k !== VERSION) return caches.delete(k);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  if (url.origin !== location.origin) return;   // mapas y fuentes: siempre a la red

  /* Páginas: primero la red para tener el contenido fresco,
     y si no hay señal se sirve la copia guardada. */
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(function (r) {
          var copia = r.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copia); });
          return r;
        })
        .catch(function () {
          return caches.match(req).then(function (r) { return r || caches.match("index.html"); });
        })
    );
    return;
  }

  /* Recursos estáticos: primero la copia guardada. */
  e.respondWith(
    caches.match(req).then(function (guardado) {
      return guardado || fetch(req).then(function (r) {
        var copia = r.clone();
        caches.open(VERSION).then(function (c) { c.put(req, copia); });
        return r;
      });
    })
  );
});
