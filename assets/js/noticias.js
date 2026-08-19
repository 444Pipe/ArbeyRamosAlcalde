/* =========================================================
   SALA DE PRENSA
   ========================================================= */
(function () {
  "use strict";

  var esc = UI.escapar;
  var TODAS = (window.CONTENIDO.noticias || []).slice().sort(function (a, b) {
    return b.fecha.localeCompare(a.fecha);
  });

  var filtro = "";

  function categorias() {
    var vistas = {};
    TODAS.forEach(function (n) { vistas[n.categoria] = true; });
    return Object.keys(vistas);
  }

  function tarjeta(n, destacada) {
    return '<article class="noticia' + (destacada ? " noticia--destacada" : "") + ' reveal" data-id="' + n.id + '">' +
      '<div class="noticia__img">' +
        (n.imagen
          ? '<img src="' + esc(n.imagen) + '" alt="" loading="lazy">'
          : UI.icono("i-news")) +
      "</div>" +
      '<div class="noticia__cuerpo">' +
        '<div class="noticia__meta">' +
          '<span class="etiqueta">' + esc(n.categoria) + "</span>" +
          "<span>" + Store.util.fecha(n.fecha) + "</span>" +
          (n.demo ? '<span class="etiqueta etiqueta--demo">Ejemplo</span>' : "") +
        "</div>" +
        "<h3>" + esc(n.titulo) + "</h3>" +
        "<p>" + esc(n.resumen) + "</p>" +
        '<button class="noticia__mas" data-leer="' + n.id + '">Leer completo ' + UI.icono("i-arrow") + "</button>" +
      "</div>" +
    "</article>";
  }

  function pintar() {
    var lista = filtro ? TODAS.filter(function (n) { return n.categoria === filtro; }) : TODAS;
    var cont = document.getElementById("lista-noticias");

    if (!lista.length) {
      cont.innerHTML = '<div class="vacio" style="grid-column:1/-1">' + UI.icono("i-news") +
        "<h3>Sin publicaciones en esta categoría</h3><p>Prueba con otro filtro.</p></div>";
      return;
    }

    cont.innerHTML = lista.map(function (n, i) {
      return tarjeta(n, i === 0 && n.destacada && !filtro);
    }).join("");

    UI.activarReveal(cont);
  }

  function pintarFiltros() {
    var cont = document.getElementById("filtros-noticias");
    cont.innerHTML = '<button class="chip is-on" data-cat="">Todas</button>' +
      categorias().map(function (c) {
        return '<button class="chip" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
      }).join("");

    cont.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      cont.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-on"); });
      chip.classList.add("is-on");
      filtro = chip.dataset.cat;
      pintar();
    });
  }

  function abrir(id) {
    var n = TODAS.filter(function (x) { return x.id === id; })[0];
    if (!n) return;

    UI.modal(
      '<div class="detalle">' +
        '<div class="detalle__meta">' +
          '<span class="etiqueta">' + esc(n.categoria) + "</span>" +
          '<span class="etiqueta" style="background:transparent;color:var(--gris)">' + Store.util.fecha(n.fecha) + "</span>" +
          (n.demo ? '<span class="etiqueta etiqueta--demo">Ejemplo</span>' : "") +
        "</div>" +
        "<h3>" + esc(n.titulo) + "</h3>" +
        (n.imagen ? '<img src="' + esc(n.imagen) + '" alt="">' : "") +
        '<p style="font-weight:600;color:var(--azul-800)">' + esc(n.resumen) + "</p>" +
        "<p>" + esc(n.cuerpo || "").replace(/\n/g, "</p><p>") + "</p>" +
        '<div class="detalle__acciones">' +
          '<button class="btn btn--primary" data-compartir="' + n.id + '">' + UI.icono("i-share") + "Compartir</button>" +
          '<a class="btn btn--linea" href="voz.html#reportar">' + UI.icono("i-megaphone") + "Reportar algo</a>" +
        "</div>" +
      "</div>",
      { titulo: n.titulo }
    );
  }

  function iniciar() {
    pintarFiltros();
    pintar();

    document.getElementById("n-noticias").textContent = TODAS.length;
    document.getElementById("n-eventos").textContent = Store.eventos.lista().length;

    document.addEventListener("click", function (e) {
      var b;
      if ((b = e.target.closest("[data-leer]"))) return abrir(b.dataset.leer);
      if ((b = e.target.closest("[data-compartir]"))) {
        var n = TODAS.filter(function (x) { return x.id === b.dataset.compartir; })[0];
        if (n) UI.compartir(n.titulo, location.href);
        return;
      }
      if ((b = e.target.closest(".noticia"))) return abrir(b.dataset.id);
    });

    document.getElementById("btn-suscribir").addEventListener("click", function () {
      UI.pedirRegistro("Déjanos tu celular y te avisamos de cada novedad de la campaña.")
        .then(function (p) { if (p) UI.toast("Listo. Te avisaremos por WhatsApp."); });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
