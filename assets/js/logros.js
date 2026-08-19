/* =========================================================
   TRAYECTORIA + SEMÁFORO DE COMPROMISOS
   ========================================================= */
(function () {
  "use strict";

  var CFG = window.CAMPANA;
  var esc = UI.escapar;

  function pintarTimeline() {
    var hitos = (window.CONTENIDO.logros || []);
    document.getElementById("timeline").innerHTML = hitos.map(function (h) {
      return '<article class="hito">' +
        '<span class="hito__ico">' + UI.icono(h.icono || "i-star") + "</span>" +
        '<span class="hito__anio">' + esc(h.anio) + "</span>" +
        "<h3>" + esc(h.titulo) + (h.demo ? ' <span class="etiqueta etiqueta--demo">Ejemplo</span>' : "") + "</h3>" +
        "<p>" + esc(h.texto) + "</p>" +
      "</article>";
    }).join("");
  }

  function pintarSemaforo() {
    Store.reportes.listar({ orden: "apoyos" }).then(function (lista) {
      var cont = document.getElementById("semaforo");

      cont.innerHTML = CFG.estados.map(function (est) {
        var suyos = lista.filter(function (r) { return r.estado === est.id; });

        return '<div class="semaforo__col reveal">' +
          '<div class="semaforo__cab">' +
            '<span class="semaforo__ico" style="background:' + est.color + '1F;color:' + est.color + '">' +
              UI.icono(est.icono || "i-check") + "</span>" +
            esc(est.nombre) + "<b>" + suyos.length + "</b>" +
          "</div>" +
          (suyos.length
            ? '<ul class="semaforo__lista">' + suyos.slice(0, 6).map(function (r) {
                var cat = Store.util.categoria(r.categoria);
                return "<li>" + esc(r.titulo) +
                  "<span>" + esc(cat.nombre) + " · " + (r.apoyos || 0) + " apoyos</span></li>";
              }).join("") +
              (suyos.length > 6 ? '<li class="semaforo__vacia">y ' + (suyos.length - 6) + " más…</li>" : "") +
              "</ul>"
            : '<p class="semaforo__vacia">Nada en esta etapa por ahora.</p>') +
        "</div>";
      }).join("");

      UI.activarReveal(cont);
    });
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
    pintarTimeline();
    pintarSemaforo();
    pintarEstadisticas();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
