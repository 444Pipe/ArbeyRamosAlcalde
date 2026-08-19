/* =========================================================
   PANTALLA DE CARGA
   Fondo blanco y la marca animada mientras terminan de llegar
   las fuentes, las imágenes y el resto de los scripts.

   Se carga como PRIMER elemento del <body> y SIN defer: así se
   pinta en el primer fotograma, antes que el contenido. Se retira
   sola cuando la página termina de cargar y, pase lo que pase, al
   llegar al tope de seguridad: nunca deja el sitio tapado.
   ========================================================= */
(function () {
  "use strict";

  var doc = document;
  if (!doc.body) return;               /* sin <body> todavía: no hay dónde ponerla */

  /* Mismo texto que `eslogan` en config.js. Se repite aquí a propósito:
     este script corre antes que config.js, que va con defer. */
  var LEMA = "Restrepo lo hacemos entre todos";

  var SALIDA = 550;                    /* lo que dura el fundido de salida (ver styles.css) */
  var LIMITE = 4500;                   /* tope: si algo se cuelga, la pantalla se va igual */

  /* La primera visita de la sesión ve la animación completa. Al navegar
     entre páginas ya está todo en caché y se muestra la versión corta:
     una pantalla de carga que se repite entera cansa. */
  var primera = true;
  try {
    primera = !sessionStorage.getItem("arg-visto");
    sessionStorage.setItem("arg-visto", "1");
  } catch (e) {}

  /* Quien pidió menos movimiento no ve la animación: solo un respiro. */
  var suave = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var MINIMO = suave ? 700 : (primera ? 1800 : 850);

  var pantalla = doc.createElement("div");
  pantalla.id = "carga";
  pantalla.className = "carga" + (primera && !suave ? "" : " carga--express");
  pantalla.setAttribute("role", "status");
  pantalla.setAttribute("aria-label", "Cargando");
  pantalla.innerHTML =
    '<div class="carga__in">' +
      '<div class="carga__marca">' +
        '<img src="assets/img/logo.png" width="480" height="292" alt="" fetchpriority="high">' +
        '<span class="carga__brillo" aria-hidden="true"></span>' +
      "</div>" +
      /* El trazo repite el arco azul que el logo lleva bajo el nombre:
         hace de barra de progreso sin dejar de ser parte de la marca. */
      '<svg class="carga__trazo" viewBox="0 0 320 22" aria-hidden="true">' +
        '<path pathLength="1" d="M8 16C74 4 246 4 312 16"/>' +
      "</svg>" +
      '<p class="carga__lema">' + LEMA + "</p>" +
    "</div>";

  doc.body.insertBefore(pantalla, doc.body.firstChild);
  doc.documentElement.classList.add("cargando");

  var inicio = Date.now();
  var retirada = false;

  function retirar() {
    if (retirada) return;
    retirada = true;
    doc.documentElement.classList.remove("cargando");
    pantalla.classList.add("is-out");
    setTimeout(function () {
      if (pantalla.parentNode) pantalla.parentNode.removeChild(pantalla);
    }, SALIDA);
  }

  /* Aunque la página cargue al instante, la marca se queda el mínimo:
     un parpadeo se ve peor que no poner nada. */
  function cuandoToque() {
    setTimeout(retirar, Math.max(0, MINIMO - (Date.now() - inicio)));
  }

  if (doc.readyState === "complete") cuandoToque();
  else window.addEventListener("load", cuandoToque);

  setTimeout(retirar, LIMITE);
})();
