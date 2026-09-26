/* =========================================================
   PANTALLA DE MARCA
   Fondo blanco y el logo "Avanza Restrepo" ensamblándose por
   piezas (la A, la R con la banda y el texto) mientras terminan
   de llegar las fuentes, las imágenes y el resto de los scripts.
   Desde la punta de la flecha del logo despega una flecha-cohete
   con estela y chispas, en ciclo, hasta que la página está lista.

   Interactivo: un toque o clic en cualquier parte relanza la
   flecha (con vibración en el celular), y en escritorio la marca
   se inclina siguiendo el mouse.

   Se carga como PRIMER elemento del <body> y SIN defer: así se
   pinta en el primer fotograma, antes que el contenido. Se retira
   sola cuando la página termina de cargar y, pase lo que pase, al
   llegar al tope de seguridad: nunca deja el sitio tapado.
   ========================================================= */
(function () {
  "use strict";

  var doc = document;
  if (!doc.body) return;               /* sin <body> todavía: no hay dónde ponerla */

  var SALIDA = 550;                    /* lo que dura el fundido de salida (ver styles.css) */
  var LIMITE = 5000;                   /* tope: si algo se cuelga, la pantalla se va igual */
  var ESPERA_LOGO = 2000;              /* lo máximo que esperamos a que bajen las capas */

  /* La primera visita de la sesión ve la secuencia completa. Al navegar
     entre páginas ya está todo en caché y se muestra la versión corta:
     una pantalla de carga que se repite entera cansa. */
  var primera = true;
  try {
    primera = !sessionStorage.getItem("arg-visto");
    sessionStorage.setItem("arg-visto", "1");
  } catch (e) {}

  /* Quien pidió menos movimiento no ve la animación: solo un respiro. */
  var suave = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var MINIMO = suave ? 700 : (primera ? 2600 : 950);

  var pantalla = doc.createElement("div");
  pantalla.id = "carga";
  pantalla.className = "carga" + (primera && !suave ? "" : " carga--express");
  pantalla.setAttribute("role", "status");
  pantalla.setAttribute("aria-label", "Cargando");
  pantalla.innerHTML =
    '<div class="carga__in">' +
      '<div class="carga__tilt">' +

        /* Las tres capas comparten lienzo: apiladas reconstruyen el logo
           exacto, así que pueden entrar cada una por su lado. */
        '<div class="carga__marca" role="img" aria-label="Avanza Restrepo">' +
          '<img class="carga__capa carga__cp-texto" src="assets/img/carga-texto.png" alt="" fetchpriority="high">' +
          '<img class="carga__capa carga__cp-a" src="assets/img/carga-a.png" alt="" fetchpriority="high">' +
          '<img class="carga__capa carga__cp-r" src="assets/img/carga-r.png" alt="" fetchpriority="high">' +
          '<span class="carga__brillo" aria-hidden="true"></span>' +

          /* Anclado a la punta de la flecha del logo (70.8% / 7.5%). */
          '<span class="carga__punta" aria-hidden="true">' +
            '<span class="carga__rastro"></span>' +
            '<span class="carga__cohete">' +
              '<svg viewBox="0 0 120 120">' +
                '<g transform="rotate(-42 60 60)">' +
                  '<line x1="26" y1="60" x2="68" y2="60"/>' +
                  '<polygon points="62,38 106,60 62,82 70,60"/>' +
                "</g>" +
              "</svg>" +
            "</span>" +
            '<span class="carga__chispas"><i></i><i></i><i></i><i></i><i></i><i></i></span>' +
          "</span>" +
        "</div>" +

        /* El arco azul, dibujándose una y otra vez: es el progreso. */
        '<svg class="carga__trazo" viewBox="0 0 320 22" aria-hidden="true">' +
          '<path pathLength="1" d="M8 16C74 4 246 4 312 16"/>' +
        "</svg>" +
      "</div>" +
    "</div>";

  doc.body.insertBefore(pantalla, doc.body.firstChild);
  doc.documentElement.classList.add("cargando");

  var inicio = Date.now();
  var retirada = false;

  /* En la primera visita las capas todavía se están descargando cuando la
     pantalla aparece. Si la secuencia arrancara ya, las piezas entrarían a
     un hueco vacío; por eso nada se mueve hasta tener las tres imágenes.
     Las páginas las piden con <link rel="preload">, así que casi siempre
     ya están aquí. */
  var capas = pantalla.querySelectorAll(".carga__capa");
  var faltan = capas.length;
  var falloCapa = false;

  function marcaLista() {
    if (pantalla.classList.contains("is-lista")) return;
    pantalla.classList.add("is-lista");
    inicio = Date.now();             /* el mínimo se cuenta desde que se ve la marca */
  }

  /* Plan B: si alguna capa no baja (servidor a medias, caché vieja),
     se muestra el logo completo en su lugar. Nunca un recuadro roto.
     La flecha-cohete sigue funcionando: el ancla vale igual. */
  function planB() {
    if (pantalla.classList.contains("carga--plano")) return;
    var img = doc.createElement("img");
    img.className = "carga__plano";
    img.src = "assets/img/logo.png?v=2";
    img.alt = "";
    pantalla.querySelector(".carga__marca").appendChild(img);
    pantalla.classList.add("carga--plano");
  }

  function unaCapaLista() {
    faltan--;
    if (faltan > 0) return;
    if (falloCapa) planB();
    marcaLista();
  }
  function unaCapaFallo() {
    falloCapa = true;
    unaCapaLista();
  }

  for (var i = 0; i < capas.length; i++) {
    if (capas[i].complete && capas[i].naturalWidth) unaCapaLista();
    else if (capas[i].complete) unaCapaFallo();
    else {
      capas[i].addEventListener("load", unaCapaLista);
      capas[i].addEventListener("error", unaCapaFallo);
    }
  }
  setTimeout(function () {
    if (falloCapa || faltan > 0) planB();
    marcaLista();
  }, ESPERA_LOGO);

  /* =========================================================
     INTERACCIÓN
     ========================================================= */

  /* Un toque o clic relanza la flecha al instante. La clase `is-relanzo`
     anula los retrasos iniciales para que el disparo sea inmediato. */
  var vuelos = pantalla.querySelectorAll(".carga__cohete, .carga__rastro, .carga__chispas i");

  function relanzar() {
    if (suave || !pantalla.classList.contains("is-lista")) return;
    var j;
    for (j = 0; j < vuelos.length; j++) vuelos[j].style.animation = "none";
    void pantalla.offsetWidth;         /* fuerza el reinicio de la animación */
    pantalla.classList.add("is-relanzo");
    for (j = 0; j < vuelos.length; j++) vuelos[j].style.animation = "";
    if (navigator.vibrate) try { navigator.vibrate(12); } catch (e) {}
  }
  pantalla.addEventListener("pointerdown", relanzar);

  /* En escritorio, la marca se inclina siguiendo el mouse. */
  var tilt = pantalla.querySelector(".carga__tilt");
  var conMouse = !suave && window.matchMedia &&
                 window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var mx = 0, my = 0, pedido = false;

  function inclinar(e) {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
    if (pedido) return;
    pedido = true;
    requestAnimationFrame(function () {
      pedido = false;
      if (retirada) return;
      tilt.style.transform =
        "rotateY(" + (mx * 9).toFixed(2) + "deg) rotateX(" + (-my * 7).toFixed(2) + "deg)";
    });
  }
  if (conMouse) doc.addEventListener("mousemove", inclinar);

  /* =========================================================
     RETIRADA
     ========================================================= */
  function retirar() {
    if (retirada) return;
    retirada = true;
    if (conMouse) doc.removeEventListener("mousemove", inclinar);
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
