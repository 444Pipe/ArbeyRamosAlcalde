/* =========================================================
   TU VOZ — mapa ciudadano de problemáticas
   ========================================================= */
(function () {
  "use strict";

  var CFG = window.CAMPANA;
  var esc = UI.escapar;

  var estado = {
    categoria: "",
    texto: "",
    orden: "recientes",
    lista: [],
    marcadores: {},
    activo: null,
    punto: CFG.mapa.centro.slice(),
    foto: ""
  };

  var mapa = null;
  var capaPines = null;
  var pinNuevo = null;

  /* =========================================================
     1. MAPA
     ========================================================= */
  function iniciarMapa() {
    var caja = document.getElementById("mapa-caja");
    if (typeof L === "undefined") { caja.classList.add("sin-mapa"); return; }

    try {
      mapa = L.map("mapa", {
        center: CFG.mapa.centro,
        zoom: CFG.mapa.zoom,
        minZoom: CFG.mapa.zoomMin,
        scrollWheelZoom: false
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; colaboradores de <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapa);

      capaPines = L.layerGroup().addTo(mapa);

      /* Al tocar el mapa se mueve el punto del nuevo reporte */
      mapa.on("click", function (e) {
        fijarPunto([e.latlng.lat, e.latlng.lng], "Punto marcado en el mapa");
      });

      /* La rueda solo hace zoom cuando el mapa tiene el foco: evita
         que la página se quede atascada al hacer scroll en el celular. */
      mapa.on("focus", function () { mapa.scrollWheelZoom.enable(); });
      mapa.on("blur", function () { mapa.scrollWheelZoom.disable(); });

      /* Si el contenedor cambia de tamaño después de arrancar (girar el
         celular, una imagen que carga arriba y empuja el layout), Leaflet
         no se entera y deja zonas grises sin tiles. Hay que avisarle. */
      var reajuste;
      function reajustar() {
        clearTimeout(reajuste);
        reajuste = setTimeout(function () { mapa.invalidateSize(); }, 180);
      }
      window.addEventListener("resize", reajustar);
      window.addEventListener("orientationchange", reajustar);
      if ("ResizeObserver" in window) {
        new ResizeObserver(reajustar).observe(document.getElementById("mapa"));
      }
      /* Y una vez pasado el primer pintado, por si el layout se acomodó. */
      setTimeout(function () { mapa.invalidateSize(); }, 400);
    } catch (e) {
      console.warn("Mapa no disponible:", e);
      caja.classList.add("sin-mapa");
      mapa = null;
    }
  }

  function iconoPin(cat) {
    return L.divIcon({
      className: "",
      html: '<div class="pin" style="background:' + cat.color + '">' + UI.icono(cat.icono) + "</div>",
      iconSize: [30, 30],
      iconAnchor: [15, 28],
      popupAnchor: [0, -26]
    });
  }

  function pintarPines(lista) {
    if (!mapa || !capaPines) return;
    capaPines.clearLayers();
    estado.marcadores = {};

    lista.forEach(function (r) {
      if (typeof r.lat !== "number" || typeof r.lng !== "number") return;
      var cat = Store.util.categoria(r.categoria);
      var m = L.marker([r.lat, r.lng], { icon: iconoPin(cat), title: r.titulo });

      m.bindPopup(
        '<div class="pop"><h4>' + esc(r.titulo) + "</h4>" +
        "<p>" + esc(r.descripcion.slice(0, 130)) + (r.descripcion.length > 130 ? "…" : "") + "</p>" +
        '<div class="pop__pie"><span>' + esc(cat.nombre) + "</span> · <span>" +
        (r.apoyos || 0) + " apoyos</span></div></div>"
      );

      m.on("click", function () { resaltar(r.id); });
      m.addTo(capaPines);
      estado.marcadores[r.id] = m;
    });
  }

  function fijarPunto(coords, texto) {
    estado.punto = coords;
    document.getElementById("ubi-texto").textContent = texto;

    if (!mapa) return;
    if (pinNuevo) mapa.removeLayer(pinNuevo);
    pinNuevo = L.marker(coords, {
      icon: L.divIcon({
        className: "",
        html: '<div class="pin pin--nuevo">' + UI.icono("i-plus") + "</div>",
        iconSize: [30, 30],
        iconAnchor: [15, 28]
      }),
      zIndexOffset: 500
    }).addTo(mapa);
  }

  /* =========================================================
     2. FILTROS Y LEYENDA
     ========================================================= */
  function pintarFiltros() {
    var cont = document.getElementById("filtros");
    cont.innerHTML =
      '<button class="chip is-on" data-cat="">Todos</button>' +
      CFG.categorias.map(function (c) {
        return '<button class="chip" data-cat="' + c.id + '">' + UI.icono(c.icono) + " " + c.nombre + "</button>";
      }).join("");

    cont.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      cont.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-on"); });
      chip.classList.add("is-on");
      estado.categoria = chip.dataset.cat;
      cargar();
    });

    document.getElementById("leyenda").innerHTML = CFG.categorias.map(function (c) {
      return '<span><i style="background:' + c.color + '"></i>' + c.nombre + "</span>";
    }).join("");
  }

  /* =========================================================
     3. LISTA DE REPORTES
     ========================================================= */
  function tarjeta(r) {
    var cat = Store.util.categoria(r.categoria);
    var est = Store.util.estado(r.estado);
    var apoyado = Store.reportes.yaApoyo(r.id);

    return '<article class="reporte" data-id="' + r.id + '" style="border-left-color:' + cat.color + '" tabindex="0">' +
      '<div class="reporte__top">' +
        '<span class="etiqueta" style="background:' + cat.color + '1F">' +
          '<span class="etiqueta__ico" style="color:' + cat.color + '">' + UI.icono(cat.icono) + "</span>" +
          esc(cat.nombre) + "</span>" +
        '<span class="etiqueta etiqueta--estado" style="border-color:' + est.color + '">' +
          '<i class="etiqueta__dot" style="background:' + est.color + '"></i>' + esc(est.nombre) + "</span>" +
        (r.demo ? '<span class="etiqueta etiqueta--demo">Ejemplo</span>' : "") +
      "</div>" +
      "<h3>" + esc(r.titulo) + "</h3>" +
      "<p>" + esc(r.descripcion.slice(0, 150)) + (r.descripcion.length > 150 ? "…" : "") + "</p>" +
      (r.foto ? '<img class="reporte__foto" src="' + r.foto + '" alt="" loading="lazy">' : "") +
      '<div class="reporte__pie">' +
        '<button class="apoyo' + (apoyado ? " is-on" : "") + '" data-apoyar="' + r.id + '"' + (apoyado ? " disabled" : "") + '>' +
          UI.icono("i-hand") + '<span data-n="' + r.id + '">' + (r.apoyos || 0) + "</span>" +
          (apoyado ? " apoyado" : " apoyar") +
        "</button>" +
        (r.zona ? "<span>" + UI.icono("i-pin") + " " + esc(r.zona) + "</span>" : "") +
        "<span>" + Store.util.haceCuanto(r.creado) + "</span>" +
      "</div>" +
    "</article>";
  }

  function pintarLista(lista) {
    var cont = document.getElementById("lista");
    document.getElementById("conteo").textContent =
      lista.length === 0 ? "Sin resultados" :
      lista.length === 1 ? "1 reporte" : lista.length + " reportes";

    if (!lista.length) {
      cont.innerHTML =
        '<div class="vacio">' + UI.icono("i-map") +
        "<h3>Todavía no hay reportes aquí</h3>" +
        "<p>Sé la primera persona en contar qué está pasando en tu sector.</p>" +
        '<a class="btn btn--primary" href="#reportar" style="margin-top:1rem">Reportar ahora</a></div>';
      return;
    }
    cont.innerHTML = lista.map(tarjeta).join("");
  }

  function resaltar(id) {
    document.querySelectorAll(".reporte").forEach(function (el) {
      el.classList.toggle("is-activo", el.dataset.id === id);
    });
    var el = document.querySelector('.reporte[data-id="' + id + '"]');
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    estado.activo = id;
  }

  /* =========================================================
     4. DETALLE
     ========================================================= */
  function abrirDetalle(id) {
    var r = estado.lista.filter(function (x) { return x.id === id; })[0];
    if (!r) return;

    var cat = Store.util.categoria(r.categoria);
    var est = Store.util.estado(r.estado);
    var apoyado = Store.reportes.yaApoyo(r.id);

    UI.modal(
      '<div class="detalle">' +
        '<div class="detalle__meta">' +
          '<span class="etiqueta" style="background:' + cat.color + '1F">' +
            '<span class="etiqueta__ico" style="color:' + cat.color + '">' + UI.icono(cat.icono) + "</span>" +
            esc(cat.nombre) + "</span>" +
          '<span class="etiqueta etiqueta--estado" style="border-color:' + est.color + '">' +
          '<i class="etiqueta__dot" style="background:' + est.color + '"></i>' + esc(est.nombre) + "</span>" +
        "</div>" +
        "<h3>" + esc(r.titulo) + "</h3>" +
        (r.foto ? '<img src="' + r.foto + '" alt="Foto del reporte">' : "") +
        "<p>" + esc(r.descripcion) + "</p>" +
        '<div class="reporte__pie">' +
          (r.zona ? "<span>" + UI.icono("i-pin") + " " + esc(r.zona) + "</span>" : "") +
          "<span>" + UI.icono("i-user") + " " + esc(r.autor || "Ciudadano") + "</span>" +
          "<span>" + Store.util.fecha(r.creado) + "</span>" +
        "</div>" +
        '<div class="detalle__acciones">' +
          '<button class="btn btn--primary' + (apoyado ? " is-on" : "") + '" data-apoyar="' + r.id + '"' + (apoyado ? " disabled" : "") + ">" +
            UI.icono("i-hand") + (apoyado ? "Ya lo apoyaste" : "Apoyar este reporte") + "</button>" +
          '<button class="btn btn--linea" data-compartir="' + r.id + '">' + UI.icono("i-share") + "Compartir</button>" +
        "</div>" +
      "</div>",
      { titulo: r.titulo }
    );
  }

  /* =========================================================
     5. APOYAR
     ========================================================= */
  function apoyar(id, boton) {
    if (Store.reportes.yaApoyo(id)) return;

    UI.pedirRegistro("Regístrate para apoyar reportes. Así garantizamos que cada persona apoye una sola vez.")
      .then(function (persona) {
        if (!persona) return;
        return Store.reportes.apoyar(id).then(function (res) {
          if (!res.ok) return;

          estado.lista.forEach(function (r) { if (r.id === id) r.apoyos = (r.apoyos || 0) + 1; });

          document.querySelectorAll('[data-n="' + id + '"]').forEach(function (n) {
            n.textContent = Number(n.textContent) + 1;
          });
          document.querySelectorAll('[data-apoyar="' + id + '"]').forEach(function (b) {
            b.classList.add("is-on", "late");
            b.disabled = true;
          });
          if (boton) setTimeout(function () { boton.classList.remove("late"); }, 500);

          UI.toast("¡Gracias! Tu apoyo quedó registrado.");
          pintarRanking();
          pintarEstadisticas();
        });
      });
  }

  /* =========================================================
     6. RANKING Y ESTADÍSTICAS
     ========================================================= */
  function pintarRanking() {
    Store.reportes.listar({ orden: "apoyos" }).then(function (lista) {
      var top = lista.slice(0, 5);
      var cont = document.getElementById("ranking");
      if (!top.length) {
        cont.innerHTML = '<p style="color:var(--gris-2)">Aún no hay reportes apoyados.</p>';
        return;
      }
      cont.innerHTML = top.map(function (r) {
        var cat = Store.util.categoria(r.categoria);
        return '<button class="ranking__item" data-ver="' + r.id + '">' +
          '<span class="ranking__pos"></span>' +
          '<span class="ranking__ico" style="color:' + cat.color + '">' + UI.icono(cat.icono) + "</span>" +
          '<span class="ranking__txt"><strong>' + esc(r.titulo) + "</strong>" +
            "<span>" + esc(cat.nombre) + (r.zona ? " · " + esc(r.zona) : "") + "</span></span>" +
          '<span class="ranking__n">' + (r.apoyos || 0) + "</span>" +
        "</button>";
      }).join("");
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

  /* =========================================================
     8. FORMULARIO
     ========================================================= */
  function pintarCategorias() {
    document.getElementById("cat-grid").innerHTML = CFG.categorias.map(function (c) {
      return '<label class="cat-op"><input type="radio" name="categoria" value="' + c.id + '">' +
        "<span>" + UI.icono(c.icono) + esc(c.nombre) + "</span></label>";
    }).join("");
  }

  function err(id, msg) {
    var box = document.querySelector('[data-err-for="' + id + '"]');
    if (box) box.textContent = msg || "";
    var campo = document.getElementById(id);
    if (campo) campo.classList.toggle("is-invalid", Boolean(msg));
  }

  function iniciarFormulario() {
    var form = document.getElementById("form-reporte");

    /* Foto: se comprime en el navegador antes de guardarla */
    var input = document.getElementById("rp-foto");
    var previa = document.getElementById("previa");
    var previaImg = document.getElementById("previa-img");

    input.addEventListener("change", function () {
      var archivo = input.files && input.files[0];
      if (!archivo) return;
      Store.util.comprimirImagen(archivo).then(function (dataUrl) {
        estado.foto = dataUrl;
        previaImg.src = dataUrl;
        previa.hidden = false;
      }).catch(function () {
        UI.toast("No pudimos procesar esa imagen.", "error");
      });
    });

    document.getElementById("quitar-foto").addEventListener("click", function () {
      estado.foto = "";
      input.value = "";
      previa.hidden = true;
    });

    /* Ubicación */
    document.getElementById("btn-ubicacion").addEventListener("click", function () {
      if (!navigator.geolocation) return UI.toast("Tu navegador no permite ubicación.", "error");
      this.textContent = "Buscando…";
      var boton = this;
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          fijarPunto([pos.coords.latitude, pos.coords.longitude], "Tu ubicación actual");
          if (mapa) mapa.setView([pos.coords.latitude, pos.coords.longitude], 16);
          boton.textContent = "Cambiar";
          UI.toast("Ubicación tomada.");
        },
        function () {
          boton.textContent = "Usar mi ubicación";
          UI.toast("No pudimos obtener tu ubicación. Marca el punto en el mapa.", "error");
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var cat = form.querySelector('input[name="categoria"]:checked');
      var titulo = document.getElementById("rp-titulo");
      var desc = document.getElementById("rp-desc");
      var malo = null;

      if (!cat) { err("categoria", "Elige un tema."); malo = malo || form.querySelector(".cat-grid"); }
      else err("categoria", "");

      if (titulo.value.trim().length < 8) { err("rp-titulo", "Escribe una frase un poco más clara."); malo = malo || titulo; }
      else err("rp-titulo", "");

      if (desc.value.trim().length < 20) { err("rp-desc", "Cuéntanos un poco más para poder ayudarte."); malo = malo || desc; }
      else err("rp-desc", "");

      if (malo) { malo.scrollIntoView({ behavior: "smooth", block: "center" }); if (malo.focus) malo.focus(); return; }

      UI.pedirRegistro("Regístrate para publicar tu reporte. Así podemos contactarte con la respuesta.")
        .then(function (persona) {
          if (!persona) return;

          return Store.reportes.crear({
            categoria: cat.value,
            titulo: titulo.value,
            descripcion: desc.value,
            zona: document.getElementById("rp-zona").value || persona.zona,
            autor: persona.nombre,
            lat: estado.punto[0],
            lng: estado.punto[1],
            foto: estado.foto
          }).then(function () {
            form.reset();
            estado.foto = "";
            previa.hidden = true;
            UI.toast("¡Tu reporte quedó publicado! Gracias por aportar.");
            cargar();
            pintarRanking();
            pintarEstadisticas();
            document.getElementById("mapa-seccion").scrollIntoView({ behavior: "smooth" });
          });
        });
    });
  }

  /* =========================================================
     9. CARGA Y EVENTOS GLOBALES
     ========================================================= */
  function cargar() {
    return Store.reportes.listar({
      categoria: estado.categoria,
      texto: estado.texto,
      orden: estado.orden
    }).then(function (lista) {
      estado.lista = lista;
      pintarLista(lista);
      pintarPines(lista);
      UI.activarReveal(document.getElementById("lista"));
    });
  }

  function eventosGlobales() {
    document.addEventListener("click", function (e) {
      var b;

      if ((b = e.target.closest("[data-apoyar]"))) {
        e.stopPropagation();
        apoyar(b.dataset.apoyar, b);
        return;
      }
      if ((b = e.target.closest("[data-compartir]"))) {
        var r = estado.lista.filter(function (x) { return x.id === b.dataset.compartir; })[0];
        if (r) UI.compartir("Apoya este reporte de nuestro municipio: " + r.titulo, location.href);
        return;
      }
      if ((b = e.target.closest("[data-ver]"))) {
        abrirDetalle(b.dataset.ver);
        return;
      }
      if ((b = e.target.closest(".reporte"))) {
        var id = b.dataset.id;
        resaltar(id);
        if (mapa && estado.marcadores[id]) {
          mapa.setView(estado.marcadores[id].getLatLng(), Math.max(mapa.getZoom(), 15));
          estado.marcadores[id].openPopup();
        }
        abrirDetalle(id);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var card = e.target.closest && e.target.closest(".reporte");
      if (card) abrirDetalle(card.dataset.id);
    });

    var buscar = document.getElementById("buscar");
    var temporizador;
    buscar.addEventListener("input", function () {
      clearTimeout(temporizador);
      temporizador = setTimeout(function () {
        estado.texto = buscar.value.trim();
        cargar();
      }, 260);
    });

    document.getElementById("orden").addEventListener("change", function () {
      estado.orden = this.value;
      cargar();
    });
  }

  /* ---------- arranque ---------- */
  function iniciar() {
    pintarFiltros();
    pintarCategorias();
    iniciarMapa();
    iniciarFormulario();
    eventosGlobales();
    UI.encuesta("encuesta");
    cargar();
    pintarRanking();
    pintarEstadisticas();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
