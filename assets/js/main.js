/* =========================================================
   PORTADA
   Solo resúmenes: cada bloque enlaza a su sección propia.
   ========================================================= */
(function () {
  "use strict";

  var esc = UI.escapar;
  var MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

  /* ---------- Tablero de participación ---------- */
  function pintarEstadisticas() {
    Store.estadisticas().then(function (s) {
      document.querySelectorAll("[data-stat]").forEach(function (el) {
        var v = s[el.dataset.stat];
        if (typeof v === "number") UI.animarNumero(el, v);
      });
    });
  }

  /* ---------- Resumen del candidato ---------- */
  function pintarPerfil() {
    var cont = document.getElementById("perfil-resumen");
    var p = window.CONTENIDO.perfil;
    if (!cont || !p) return;

    cont.innerHTML =
      '<p class="eyebrow eyebrow--dark"><span class="eyebrow__bar" aria-hidden="true"></span> El candidato</p>' +
      '<h2 class="h2">' + esc(p.titular) + "</h2>" +
      "<p>" + esc(p.resumen) + "</p>" +
      '<ul class="values">' +
      p.valores.map(function (v) {
        return "<li>" +
          '<span class="values__ico">' + UI.icono("i-check") + "</span>" +
          "<div><strong>" + esc(v.titulo) + "</strong>" + esc(v.texto) + "</div>" +
        "</li>";
      }).join("") +
      "</ul>" +
      '<a class="btn btn--primary" href="candidato.html">Conocer su historia ' + UI.icono("i-arrow") + "</a>";
  }

  /* ---------- Resumen de las propuestas ---------- */
  function pintarPropuestas() {
    var cont = document.getElementById("propuestas-resumen");
    var ejes = window.CONTENIDO.propuestas || [];
    if (!cont) return;

    cont.innerHTML = ejes.map(function (e, i) {
      return '<a class="card reveal' + (i % 3 ? " reveal--d" + (i % 3) : "") + '" href="propuestas.html#' + e.id + '">' +
        '<span class="card__ico">' + UI.icono(e.icono) + "</span>" +
        "<h3>" + esc(e.titulo) + "</h3>" +
        "<p>" + esc(e.resumen) + "</p>" +
        '<span class="card__n">' + String(i + 1).padStart(2, "0") + "</span>" +
      "</a>";
    }).join("");

    UI.activarReveal(cont);
  }

  /* ---------- Últimas 3 noticias ---------- */
  function pintarNoticias() {
    var cont = document.getElementById("home-noticias");
    if (!cont) return;

    var lista = (window.CONTENIDO.noticias || []).slice()
      .sort(function (a, b) { return b.fecha.localeCompare(a.fecha); })
      .slice(0, 3);

    if (!lista.length) {
      cont.innerHTML = '<div class="vacio" style="grid-column:1/-1">' + UI.icono("i-news") +
        "<h3>Aún no hay publicaciones</h3><p>Muy pronto.</p></div>";
      return;
    }

    cont.innerHTML = lista.map(function (n) {
      return '<article class="noticia reveal">' +
        '<div class="noticia__img">' +
          (n.imagen ? '<img src="' + esc(n.imagen) + '" alt="" loading="lazy">' : UI.icono("i-news")) +
        "</div>" +
        '<div class="noticia__cuerpo">' +
          '<div class="noticia__meta">' +
            '<span class="etiqueta">' + esc(n.categoria) + "</span>" +
            "<span>" + Store.util.fecha(n.fecha) + "</span>" +
            (n.demo ? '<span class="etiqueta etiqueta--demo">Ejemplo</span>' : "") +
          "</div>" +
          "<h3>" + esc(n.titulo) + "</h3>" +
          "<p>" + esc(n.resumen) + "</p>" +
          '<a class="noticia__mas" href="noticias.html">Leer completo ' + UI.icono("i-arrow") + "</a>" +
        "</div>" +
      "</article>";
    }).join("");

    UI.activarReveal(cont);
  }

  /* ---------- Próximo evento ---------- */
  function pintarEvento() {
    var cont = document.getElementById("home-evento");
    if (!cont) return;

    var ev = Store.eventos.proximos()[0];
    if (!ev) {
      cont.innerHTML = '<div class="vacio">' + UI.icono("i-calendar") +
        "<h3>Sin eventos programados</h3><p>Estamos organizando la próxima agenda.</p></div>";
      return;
    }

    var d = new Date(ev.fecha + "T12:00:00");
    var confirmado = Store.eventos.confirmado(ev.id);

    cont.innerHTML =
      '<article class="evento">' +
        '<div class="evento__fecha"><b>' + d.getDate() + "</b><span>" + MESES[d.getMonth()] +
          "</span><em>" + d.getFullYear() + "</em></div>" +
        '<div class="evento__info">' +
          "<h3>" + esc(ev.titulo) + (ev.demo ? ' <span class="etiqueta etiqueta--demo">Ejemplo</span>' : "") + "</h3>" +
          "<p>" + esc(ev.descripcion) + "</p>" +
          '<div class="evento__datos">' +
            "<span>" + UI.icono("i-clock") + esc(ev.hora) + "</span>" +
            "<span>" + UI.icono("i-pin") + esc(ev.lugar) + "</span>" +
          "</div>" +
        "</div>" +
        '<div class="evento__accion">' +
          '<a class="btn ' + (confirmado ? "btn--linea" : "btn--primary") + '" href="eventos.html">' +
            UI.icono(confirmado ? "i-check" : "i-calendar") +
            (confirmado ? "Ya confirmaste" : "Confirmar asistencia") + "</a>" +
        "</div>" +
      "</article>";
  }

  function iniciar() {
    pintarEstadisticas();
    pintarPerfil();
    pintarPropuestas();
    pintarNoticias();
    pintarEvento();
    UI.encuesta("encuesta");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
