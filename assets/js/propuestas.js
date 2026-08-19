/* =========================================================
   PROGRAMA DE GOBIERNO
   Los ejes salen de CONTENIDO.propuestas, así que la portada
   y esta página nunca se desincronizan.
   ========================================================= */
(function () {
  "use strict";

  var esc = UI.escapar;
  var EJES = window.CONTENIDO.propuestas || [];

  function pintarIndice() {
    document.getElementById("indice").innerHTML = EJES.map(function (e) {
      return '<a class="eje-chip reveal" href="#' + e.id + '">' +
        UI.icono(e.icono) + esc(e.titulo) + "</a>";
    }).join("");
  }

  function pintarEjes() {
    document.getElementById("ejes-detalle").innerHTML = EJES.map(function (e, i) {
      return '<article class="eje reveal" id="' + e.id + '">' +
        '<div class="eje__cab">' +
          '<span class="eje__ico">' + UI.icono(e.icono) + "</span>" +
          '<span class="eje__num">EJE ' + String(i + 1).padStart(2, "0") + "</span>" +
          "<h2>" + esc(e.titulo) + "</h2>" +
          '<p class="eje__resumen">' + esc(e.resumen) + "</p>" +
        "</div>" +
        "<div>" +
          '<p class="eje__detalle">' + esc(e.detalle) + "</p>" +
          '<p class="eyebrow eyebrow--dark"><span class="eyebrow__bar" aria-hidden="true"></span> Nos comprometemos a</p>' +
          '<ul class="eje__acciones">' +
            e.acciones.map(function (a) {
              return "<li>" + UI.icono("i-check") + "<span>" + esc(a) + "</span></li>";
            }).join("") +
          "</ul>" +
        "</div>" +
      "</article>";
    }).join("");
  }

  function pintarEstadisticas() {
    Store.estadisticas().then(function (s) {
      document.querySelectorAll("[data-stat]").forEach(function (el) {
        var v = s[el.dataset.stat];
        if (typeof v === "number") UI.animarNumero(el, v);
      });
    });
  }

  function iniciar() {
    pintarIndice();
    pintarEjes();
    pintarEstadisticas();
    UI.activarReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
