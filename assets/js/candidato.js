/* =========================================================
   EL CANDIDATO
   ========================================================= */
(function () {
  "use strict";

  var esc = UI.escapar;

  function pintarValores() {
    var cont = document.getElementById("valores");
    var valores = (window.CONTENIDO.perfil && window.CONTENIDO.perfil.valores) || [];
    var iconos = ["i-users", "i-lock", "i-target"];

    cont.innerHTML = valores.map(function (v, i) {
      return '<article class="help__item reveal' + (i ? " reveal--d" + i : "") + '">' +
        '<span class="help__ico">' + UI.icono(iconos[i] || "i-check") + "</span>" +
        "<h3>" + esc(v.titulo) + "</h3>" +
        "<p>" + esc(v.texto) + "</p>" +
      "</article>";
    }).join("");

    UI.activarReveal(cont);
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
    pintarValores();
    pintarEstadisticas();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
