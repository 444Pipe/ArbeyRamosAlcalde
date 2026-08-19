/* =========================================================
   INTERFAZ COMPARTIDA
   Inyecta el sprite de iconos, el encabezado y el pie de página
   en todas las páginas, y expone utilidades de interfaz.
   ========================================================= */

window.UI = (function () {
  "use strict";

  var CFG = window.CAMPANA || {};
  var ALT = 'Arbey Ramos Gómez, candidato a la Alcaldía de Restrepo';

  /* =========================================================
     1. SPRITE DE ICONOS
     ========================================================= */
  var SPRITE = [
    '<svg class="sprite" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">',
    '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 4.5 5.9v5.4c0 4.4 3.2 8.5 7.5 9.6 4.3-1.1 7.5-5.2 7.5-9.6V5.9L12 3Z"/><path d="m9.2 12.1 1.9 1.9 3.7-3.9"/></symbol>',
    '<symbol id="i-briefcase" viewBox="0 0 24 24"><rect x="3" y="7.5" width="18" height="13" rx="2.2"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"/><path d="M3 13h18"/></symbol>',
    '<symbol id="i-road" viewBox="0 0 24 24"><path d="M8.6 3.6 5.4 20.4"/><path d="m15.4 3.6 3.2 16.8"/><path d="M12 4.4v2.6"/><path d="M12 10.7v2.6"/><path d="M12 17v2.6"/></symbol>',
    '<symbol id="i-tree" viewBox="0 0 24 24"><path d="M12 3.2 16.6 10h-2.8l4.2 6H6l4.2-6H7.4L12 3.2Z"/><path d="M12 16v4.8"/><path d="M9.4 20.8h5.2"/></symbol>',
    '<symbol id="i-salud" viewBox="0 0 24 24"><path d="M12 20.4S3.7 15.3 3.7 9.8A4.4 4.4 0 0 1 12 7.9a4.4 4.4 0 0 1 8.3 1.9c0 5.5-8.3 10.6-8.3 10.6Z"/><path d="M3.9 12.2h3.7l1.3-2.4 2.4 5.2 1.7-3.6 1 .8h5.9"/></symbol>',
    '<symbol id="i-graduation" viewBox="0 0 24 24"><path d="M12 3.4 2.6 8.1 12 12.8l9.4-4.7L12 3.4Z"/><path d="M6.4 10.3v4.4c0 1.9 2.5 3.4 5.6 3.4s5.6-1.5 5.6-3.4v-4.4"/><path d="M21.4 8.1v5.6"/></symbol>',
    '<symbol id="i-sprout" viewBox="0 0 24 24"><path d="M12 20.8v-8.2"/><path d="M12 12.6h1.6A6.4 6.4 0 0 0 20 6.2V4.8h-1.6A6.4 6.4 0 0 0 12 11.2v1.4Z"/><path d="M12 12.6h-1.4A5.6 5.6 0 0 1 5 7v-1.2h1.4A5.6 5.6 0 0 1 12 11.4v1.2Z"/></symbol>',
    '<symbol id="i-water" viewBox="0 0 24 24"><path d="M12 3.4s6 6.4 6 10.2a6 6 0 1 1-12 0c0-3.8 6-10.2 6-10.2Z"/></symbol>',
    '<symbol id="i-bulb" viewBox="0 0 24 24"><path d="M12 3.2a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.2 1.1 2v.5h5v-.5c0-.8.4-1.5 1.1-2A6 6 0 0 0 12 3.2Z"/><path d="M9.6 19.2h4.8"/><path d="M10.8 21.4h2.4"/></symbol>',
    '<symbol id="i-users" viewBox="0 0 24 24"><circle cx="9.2" cy="8" r="3.3"/><path d="M3.4 20a5.8 5.8 0 0 1 11.6 0"/><path d="M16.4 5.2a3.3 3.3 0 0 1 0 5.6"/><path d="M18 19.4a5.8 5.8 0 0 0-2.3-4.4"/></symbol>',
    '<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8.4" r="4"/><path d="M4.6 20.6a7.4 7.4 0 0 1 14.8 0"/></symbol>',
    '<symbol id="i-megaphone" viewBox="0 0 24 24"><path d="M4 9.6v4.8a2 2 0 0 0 2 2h2l8.4 4V3.6L8 7.6H6a2 2 0 0 0-2 2Z"/><path d="M8 16.4V20"/><path d="M19.4 9.6a3.4 3.4 0 0 1 0 4.8"/></symbol>',
    '<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.4 4.6 4.6L19 7.2"/></symbol>',
    '<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21.2s7-6.4 7-11.2a7 7 0 1 0-14 0c0 4.8 7 11.2 7 11.2Z"/><circle cx="12" cy="10" r="2.6"/></symbol>',
    '<symbol id="i-map" viewBox="0 0 24 24"><path d="m9 3.6-5.4 2v14.8L9 18.4l6 2 5.4-2V3.6l-5.4 2-6-2Z"/><path d="M9 3.6v14.8"/><path d="M15 5.6v14.8"/></symbol>',
    '<symbol id="i-flag" viewBox="0 0 24 24"><path d="M5.6 21V3.6"/><path d="M5.6 4.4h11.8l-2.4 4 2.4 4H5.6"/></symbol>',
    '<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2.2"/><path d="m3.6 7.6 8.4 5.8 8.4-5.8"/></symbol>',
    '<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.6 3.4h2.8l1.4 3.8-2 1.4a12.2 12.2 0 0 0 6.6 6.6l1.4-2 3.8 1.4v2.8a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 3.6 5.6a2 2 0 0 1 2-2.2Z"/></symbol>',
    '<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.6"/><path d="m15.8 15.8 4.6 4.6"/></symbol>',
    '<symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3.4" y="5.2" width="17.2" height="15.6" rx="2.4"/><path d="M3.4 10h17.2"/><path d="M8 3.2v4"/><path d="M16 3.2v4"/></symbol>',
    '<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/><path d="M12 7.4V12l3.2 2"/></symbol>',
    '<symbol id="i-news" viewBox="0 0 24 24"><path d="M4 4.6h12.6v13.2a2.2 2.2 0 0 0 2.2 2.2H6.2A2.2 2.2 0 0 1 4 17.8V4.6Z"/><path d="M16.6 9h2a1.4 1.4 0 0 1 1.4 1.4v7.4a2.2 2.2 0 0 1-2.2 2.2"/><path d="M7.4 8.4h5.8"/><path d="M7.4 12h5.8"/><path d="M7.4 15.6h3.6"/></symbol>',
    '<symbol id="i-trophy" viewBox="0 0 24 24"><path d="M7.2 4h9.6v5.6a4.8 4.8 0 0 1-9.6 0V4Z"/><path d="M7.2 6H4.6v1.4a3.2 3.2 0 0 0 3.2 3.2"/><path d="M16.8 6h2.6v1.4a3.2 3.2 0 0 1-3.2 3.2"/><path d="M12 14.4v3.6"/><path d="M8.6 20.4h6.8"/></symbol>',
    '<symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20.2h16"/><rect x="5.6" y="11" width="3.6" height="6" rx=".8"/><rect x="10.2" y="6.4" width="3.6" height="10.6" rx=".8"/><rect x="14.8" y="13.4" width="3.6" height="3.6" rx=".8"/></symbol>',
    '<symbol id="i-camera" viewBox="0 0 24 24"><path d="M3.8 8h3l1.4-2.4h7.6L17.2 8h3a1.8 1.8 0 0 1 1.8 1.8v8.2a1.8 1.8 0 0 1-1.8 1.8H3.8A1.8 1.8 0 0 1 2 18V9.8A1.8 1.8 0 0 1 3.8 8Z"/><circle cx="12" cy="13.6" r="3.4"/></symbol>',
    '<symbol id="i-share" viewBox="0 0 24 24"><circle cx="17.6" cy="5.6" r="2.6"/><circle cx="6.4" cy="12" r="2.6"/><circle cx="17.6" cy="18.4" r="2.6"/><path d="m8.8 10.7 6.4-3.7"/><path d="m8.8 13.3 6.4 3.7"/></symbol>',
    '<symbol id="i-hand" viewBox="0 0 24 24"><path d="M7.2 21.4V10.6l4.4-7.4a1.9 1.9 0 0 1 2.7 2.1L13.2 9.6h5.4a2 2 0 0 1 2 2.4l-1.4 6.6a2.2 2.2 0 0 1-2.2 1.8H7.2Z"/><path d="M7.2 10.6H4.6a1.4 1.4 0 0 0-1.4 1.4v8a1.4 1.4 0 0 0 1.4 1.4h2.6"/></symbol>',
    '<symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3.4 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.8l6-.9L12 3.4Z"/></symbol>',
    '<symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/></symbol>',
    '<symbol id="i-lock" viewBox="0 0 24 24"><rect x="4.6" y="10.2" width="14.8" height="10.6" rx="2.4"/><path d="M8.2 10.2V7.6a3.8 3.8 0 0 1 7.6 0v2.6"/></symbol>',
    '<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4.6 12h13.8"/><path d="m13 6.6 5.4 5.4-5.4 5.4"/></symbol>',
    '<symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="M19.4 12H5.6"/><path d="m11 6.6-5.4 5.4 5.4 5.4"/></symbol>',
    '<symbol id="i-chevron" viewBox="0 0 24 24"><path d="m6.4 9.6 5.6 5 5.6-5"/></symbol>',
    '<symbol id="i-close" viewBox="0 0 24 24"><path d="M6.6 6.6 17.4 17.4"/><path d="M17.4 6.6 6.6 17.4"/></symbol>',
    '<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5.2v13.6"/><path d="M5.2 12h13.6"/></symbol>',
    '<symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M20.6 11.8a8.6 8.6 0 0 1-12.7 7.5l-4.5 1.3 1.3-4.4A8.6 8.6 0 1 1 20.6 11.8Z"/><path d="M9.1 9.3c.3-.1.6 0 .7.3l.6 1.3c.1.2 0 .4-.1.5l-.5.5a5.9 5.9 0 0 0 2.6 2.6l.5-.5c.2-.2.4-.2.6-.1l1.3.6c.3.1.4.4.3.7-.2.7-.9 1.1-1.7 1-2.5-.3-5.3-3.1-5.6-5.6-.1-.7.4-1.3 1.3-1.3Z"/></symbol>',
    '<symbol id="i-facebook" viewBox="0 0 24 24"><rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.6"/><path d="M15.2 8.2h-1.6a2 2 0 0 0-2 2v10.4"/><path d="M9 12.8h5.4"/></symbol>',
    '<symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.8"/><circle cx="12" cy="12" r="3.8"/><circle cx="16.9" cy="7.1" r="1.1" fill="currentColor" stroke="none"/></symbol>',
    '<symbol id="i-tiktok" viewBox="0 0 24 24"><path d="M14.6 3.2v10.6a3.2 3.2 0 1 1-2.6-3.1"/><path d="M14.6 3.2a5 5 0 0 0 4.6 4.4"/><path d="M19.2 7.6v2.8a7.6 7.6 0 0 1-4.6-1.6"/></symbol>',
    '<symbol id="i-youtube" viewBox="0 0 24 24"><rect x="2.6" y="5.6" width="18.8" height="12.8" rx="4"/><path d="m10.4 9.6 5 2.4-5 2.4V9.6Z"/></symbol>',
    "</svg>"
  ].join("");

  function icono(id, clase) {
    return '<svg class="ico ' + (clase || "") + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }

  /* =========================================================
     2. ENCABEZADO Y PIE
     ========================================================= */
  /* Estructura del sitio. Cambiar aquí cambia el menú y el pie de TODAS
     las páginas: es el único lugar donde vive la navegación. */
  var MENU = [
    { txt: "Inicio", href: "index.html" },
    { txt: "El candidato", href: "candidato.html" },
    { txt: "Propuestas", href: "propuestas.html" },
    { txt: "Tu voz", href: "voz.html", destacado: true },
    {
      txt: "Actualidad",
      hijos: [
        { txt: "Noticias", href: "noticias.html", desc: "Comunicados y recorridos" },
        { txt: "Eventos y agenda", href: "eventos.html", desc: "Dónde estamos y cuándo" },
        { txt: "Trayectoria", href: "logros.html", desc: "Y el semáforo de compromisos" }
      ]
    },
    { txt: "Contacto", href: "contacto.html" }
  ];

  /* Mapa del sitio que se pinta en el pie de página. */
  var PIE = [
    {
      titulo: "La campaña",
      enlaces: [
        { txt: "El candidato", href: "candidato.html" },
        { txt: "Programa de gobierno", href: "propuestas.html" },
        { txt: "Trayectoria y compromisos", href: "logros.html" },
        { txt: "Noticias", href: "noticias.html" }
      ]
    },
    {
      titulo: "Participa",
      enlaces: [
        { txt: "Mapa ciudadano", href: "voz.html" },
        { txt: "Reportar una problemática", href: "voz.html#reportar" },
        { txt: "Eventos y agenda", href: "eventos.html" },
        { txt: "Únete a la campaña", href: "unete.html" }
      ]
    }
  ];

  function paginaActual() {
    var p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function esActivo(href) {
    if (!href) return false;
    var base = href.split("#")[0];
    if (href.indexOf("#") >= 0 && base === "index.html") return false;
    return base === paginaActual();
  }

  function enlaceMenu(m) {
    /* Grupo con submenú */
    if (m.hijos) {
      var activo = m.hijos.some(function (h) { return esActivo(h.href); });
      return '<div class="nav__grupo' + (activo ? " is-active" : "") + '">' +
        '<button class="nav__btn" aria-expanded="false">' + m.txt +
          '<svg class="ico nav__flecha" aria-hidden="true"><use href="#i-chevron"/></svg>' +
        "</button>" +
        '<div class="nav__sub">' +
          m.hijos.map(function (h) {
            return '<a href="' + h.href + '"' + (esActivo(h.href) ? ' class="is-active" aria-current="page"' : "") + ">" +
              "<strong>" + h.txt + "</strong>" +
              (h.desc ? "<span>" + h.desc + "</span>" : "") +
            "</a>";
          }).join("") +
        "</div>" +
      "</div>";
    }

    /* Enlace simple */
    return '<a href="' + m.href + '"' + (esActivo(m.href) ? ' class="is-active" aria-current="page"' : "") +
      ">" + m.txt + (m.destacado ? '<span class="nav__punto" aria-hidden="true"></span>' : "") + "</a>";
  }

  function pintarEncabezado() {
    var host = document.getElementById("app-header");
    if (!host) return;

    host.innerHTML =
      '<div class="topbar"><div class="wrap topbar__in">' +
        '<p class="topbar__txt"><span class="dot" aria-hidden="true"></span> Precandidatura a la ' +
          CFG.cargo + '<span class="topbar__extra"> · Período ' + CFG.periodo + "</span></p>" +
        '<div class="topbar__social">' +
          '<a href="' + CFG.redes.facebook + '" aria-label="Facebook">' + icono("i-facebook") + "</a>" +
          '<a href="' + CFG.redes.instagram + '" aria-label="Instagram">' + icono("i-instagram") + "</a>" +
          '<a href="' + CFG.redes.tiktok + '" aria-label="TikTok">' + icono("i-tiktok") + "</a>" +
          '<a href="https://wa.me/' + CFG.whatsapp + '" aria-label="WhatsApp">' + icono("i-whatsapp") + "</a>" +
        "</div>" +
      "</div></div>" +

      '<header class="header" id="header"><div class="wrap header__in">' +
        '<a class="brand" href="index.html">' +
          '<img class="brand__logo" src="assets/img/logo.png" width="480" height="292" alt="' + ALT + '">' +
          '<span class="brand__txt"><small>' + CFG.cargo + " · " + CFG.periodo + "</small></span>" +
        "</a>" +
        '<nav class="nav" id="nav" aria-label="Navegación principal">' +
          MENU.map(enlaceMenu).join("") +
          '<a class="btn btn--primary nav__cta" href="unete.html">' + icono("i-hand") + " Únete</a>" +
        "</nav>" +
        '<button class="burger" id="burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav">' +
          "<span></span><span></span><span></span></button>" +
      "</div></header>";
  }

  function pintarPie() {
    var host = document.getElementById("app-footer");
    if (!host) return;

    host.innerHTML =
      '<footer class="footer"><div class="wrap footer__mapa">' +

        '<div class="footer__brand">' +
          '<img class="footer__logo" src="assets/img/logo-claro.png" width="480" height="292" alt="' + ALT + '">' +
          "<div><p>Candidato a la " + CFG.cargo + "<br>" + CFG.periodo + " · " + CFG.partido + "</p></div>" +
          '<div class="footer__social">' +
            '<a href="' + CFG.redes.facebook + '" aria-label="Facebook">' + icono("i-facebook") + "</a>" +
            '<a href="' + CFG.redes.instagram + '" aria-label="Instagram">' + icono("i-instagram") + "</a>" +
            '<a href="' + CFG.redes.tiktok + '" aria-label="TikTok">' + icono("i-tiktok") + "</a>" +
            '<a href="https://wa.me/' + CFG.whatsapp + '" aria-label="WhatsApp">' + icono("i-whatsapp") + "</a>" +
          "</div>" +
        "</div>" +

        PIE.map(function (col) {
          return '<nav class="footer__col" aria-label="' + col.titulo + '">' +
            "<h3>" + col.titulo + "</h3>" +
            col.enlaces.map(function (e) { return '<a href="' + e.href + '">' + e.txt + "</a>"; }).join("") +
          "</nav>";
        }).join("") +

        '<div class="footer__col">' +
          "<h3>Contacto</h3>" +
          '<a href="tel:' + CFG.telefono.replace(/\s/g, "") + '">' + icono("i-phone") + " " + CFG.telefono + "</a>" +
          '<a href="https://wa.me/' + CFG.whatsapp + '">' + icono("i-whatsapp") + " Escríbenos por WhatsApp</a>" +
          '<a href="mailto:' + CFG.correo + '">' + icono("i-mail") + " " + CFG.correo + "</a>" +
          '<span class="footer__sede">' + icono("i-pin") + " " + CFG.sede + "</span>" +
        "</div>" +

      "</div>" +
      '<div class="wrap footer__legal">' +
        "<p>© " + new Date().getFullYear() + " Campaña " + CFG.candidato + ". Todos los derechos reservados.</p>" +
        "<p>Sitio en construcción · Contenido preliminar sujeto a actualización.</p>" +
      "</div></footer>" +
      '<a class="wa-float" href="https://wa.me/' + CFG.whatsapp + '" target="_blank" rel="noopener" ' +
        'aria-label="Escríbenos por WhatsApp">' + icono("i-whatsapp") + "</a>";
  }

  /* =========================================================
     3. COMPORTAMIENTOS GLOBALES
     ========================================================= */
  function menuMovil() {
    var burger = document.getElementById("burger");
    var nav = document.getElementById("nav");
    if (!burger || !nav) return;
    var scrim = null;

    function cerrar() {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      if (scrim) {
        var el = scrim; scrim = null;
        el.classList.remove("is-on");
        setTimeout(function () { el.remove(); }, 300);
      }
    }

    burger.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) return cerrar();
      nav.classList.add("is-open");
      burger.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
      scrim = document.createElement("div");
      scrim.className = "nav-scrim";
      scrim.addEventListener("click", cerrar);
      document.body.appendChild(scrim);
      requestAnimationFrame(function () { scrim.classList.add("is-on"); });
    });

    nav.addEventListener("click", function (e) {
      var btn = e.target.closest(".nav__btn");
      if (btn) {
        var grupo = btn.parentNode;
        var abierto = grupo.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", abierto ? "true" : "false");
        nav.querySelectorAll(".nav__grupo").forEach(function (g) {
          if (g !== grupo) {
            g.classList.remove("is-open");
            g.querySelector(".nav__btn").setAttribute("aria-expanded", "false");
          }
        });
        return;
      }
      if (e.target.closest("a")) cerrar();
    });

    /* Un clic fuera cierra cualquier submenú abierto */
    document.addEventListener("click", function (e) {
      if (e.target.closest(".nav__grupo")) return;
      nav.querySelectorAll(".nav__grupo.is-open").forEach(function (g) {
        g.classList.remove("is-open");
        g.querySelector(".nav__btn").setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) cerrar(); });
  }

  function sombraHeader() {
    var header = document.getElementById("header");
    if (!header) return;
    function f() { header.classList.toggle("is-stuck", window.scrollY > 8); }
    window.addEventListener("scroll", f, { passive: true });
    f();
  }

  var observador = null;
  function activarReveal(raiz) {
    var elems = (raiz || document).querySelectorAll(".reveal:not(.is-in)");
    if (!("IntersectionObserver" in window)) {
      elems.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    if (!observador) {
      observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); observador.unobserve(e.target); }
        });
      }, {
        threshold: 0.1,
        /* En móvil se hace scroll rápido con el pulgar: se dispara antes
           para que el bloque no aparezca ya estando a la vista. */
        rootMargin: window.innerWidth < 700 ? "0px 0px -20px 0px" : "0px 0px -50px 0px"
      });
    }
    elems.forEach(function (el) { observador.observe(el); });
  }

  /* =========================================================
     4. AVISOS Y VENTANAS
     ========================================================= */
  function toast(mensaje, tipo) {
    var cont = document.getElementById("toasts");
    if (!cont) {
      cont = document.createElement("div");
      cont.id = "toasts";
      cont.className = "toasts";
      cont.setAttribute("role", "status");
      cont.setAttribute("aria-live", "polite");
      document.body.appendChild(cont);
    }
    var t = document.createElement("div");
    t.className = "toast toast--" + (tipo || "ok");
    t.innerHTML = icono(tipo === "error" ? "i-close" : "i-check") + "<span>" + mensaje + "</span>";
    cont.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("is-in"); });
    setTimeout(function () {
      t.classList.remove("is-in");
      setTimeout(function () { t.remove(); }, 350);
    }, 4200);
  }

  var modalAbierto = null;

  function modal(html, opciones) {
    opciones = opciones || {};
    cerrarModal();

    var fondo = document.createElement("div");
    fondo.className = "modal";
    fondo.innerHTML =
      '<div class="modal__caja" role="dialog" aria-modal="true"' + (opciones.titulo ? ' aria-label="' + opciones.titulo + '"' : "") + ">" +
        '<button class="modal__x" aria-label="Cerrar">' + icono("i-close") + "</button>" +
        '<div class="modal__cuerpo">' + html + "</div>" +
      "</div>";

    document.body.appendChild(fondo);
    document.body.classList.add("modal-abierto");
    requestAnimationFrame(function () { fondo.classList.add("is-on"); });

    fondo.addEventListener("click", function (e) {
      if (e.target === fondo || e.target.closest(".modal__x")) cerrarModal();
    });
    document.addEventListener("keydown", escModal);

    modalAbierto = fondo;
    var foco = fondo.querySelector("input, select, textarea, button:not(.modal__x)");
    if (foco) setTimeout(function () { foco.focus(); }, 120);
    return fondo;
  }

  function escModal(e) { if (e.key === "Escape") cerrarModal(); }

  function cerrarModal() {
    if (!modalAbierto) return;
    var el = modalAbierto;
    modalAbierto = null;
    document.removeEventListener("keydown", escModal);
    el.classList.remove("is-on");
    document.body.classList.remove("modal-abierto");
    setTimeout(function () { el.remove(); }, 280);
  }

  /* =========================================================
     5. REGISTRO CIUDADANO
     Devuelve una promesa con la persona registrada, o null si cancela.
     ========================================================= */
  function pedirRegistro(motivo) {
    var actual = Store.usuario.actual();
    if (actual) return Promise.resolve(actual);

    return new Promise(function (resolve) {
      var caja = modal(
        '<div class="registro">' +
          '<span class="registro__ico">' + icono("i-user") + "</span>" +
          "<h3>Regístrate para continuar</h3>" +
          "<p>" + (motivo || "Con tu nombre y tu celular podemos darte respuesta y avisarte cuando haya novedades.") + "</p>" +
          '<form class="form" id="form-registro" novalidate>' +
            '<div class="form__row"><label for="r-nombre">Nombre completo <span class="req">*</span></label>' +
              '<input id="r-nombre" name="nombre" type="text" autocomplete="name" required placeholder="Tu nombre"><p class="form__err" data-err-for="r-nombre"></p></div>' +
            '<div class="form__row"><label for="r-tel">Celular / WhatsApp <span class="req">*</span></label>' +
              '<input id="r-tel" name="telefono" type="tel" inputmode="tel" autocomplete="tel" required placeholder="300 000 0000"><p class="form__err" data-err-for="r-tel"></p></div>' +
            '<div class="form__row"><label for="r-zona">Barrio o vereda</label>' +
              '<input id="r-zona" name="zona" type="text" placeholder="¿Dónde vives?"></div>' +
            '<label class="form__check"><input type="checkbox" id="r-hab" required>' +
              "<span>Autorizo el tratamiento de mis datos conforme a la Ley 1581 de 2012.</span></label>" +
            '<p class="form__err" data-err-for="r-hab"></p>' +
            '<button class="btn btn--primary btn--block btn--lg" type="submit">Registrarme</button>' +
            '<p class="registro__nota">' + icono("i-lock") + " Tus datos no se publican. Solo el equipo de campaña los ve.</p>" +
          "</form>" +
        "</div>",
        { titulo: "Registro" }
      );

      var form = caja.querySelector("#form-registro");

      function err(id, msg) {
        var campo = caja.querySelector("#" + id);
        var box = caja.querySelector('[data-err-for="' + id + '"]');
        if (box) box.textContent = msg || "";
        if (campo) campo.classList.toggle("is-invalid", Boolean(msg));
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var nombre = caja.querySelector("#r-nombre");
        var tel = caja.querySelector("#r-tel");
        var hab = caja.querySelector("#r-hab");
        var malo = null;

        if (nombre.value.trim().length < 3) { err("r-nombre", "Escribe tu nombre completo."); malo = malo || nombre; }
        else err("r-nombre", "");

        if (tel.value.replace(/\D/g, "").length < 7) { err("r-tel", "Escribe un celular válido."); malo = malo || tel; }
        else err("r-tel", "");

        if (!hab.checked) { err("r-hab", "Debes autorizar el tratamiento de datos."); malo = malo || hab; }
        else err("r-hab", "");

        if (malo) return malo.focus();

        Store.usuario.registrar({
          nombre: nombre.value,
          telefono: tel.value,
          zona: caja.querySelector("#r-zona").value
        }).then(function (persona) {
          cerrarModal();
          toast("¡Listo, " + persona.nombre.split(" ")[0] + "! Ya estás registrado.");
          resolve(persona);
        });
      });

      caja.addEventListener("click", function (e) {
        if (e.target === caja || e.target.closest(".modal__x")) resolve(null);
      });
    });
  }

  /* =========================================================
     6. UTILIDADES VARIAS
     ========================================================= */
  function compartir(texto, url) {
    url = url || location.href;
    if (navigator.share) {
      navigator.share({ title: CFG.candidato, text: texto, url: url }).catch(function () {});
      return;
    }
    window.open("https://wa.me/?text=" + encodeURIComponent(texto + "\n" + url), "_blank", "noopener");
  }

  function animarNumero(el, destino, sufijo) {
    destino = Number(destino) || 0;
    var inicio = performance.now();
    var dur = 1100;
    function paso(t) {
      var p = Math.min(1, (t - inicio) / dur);
      var v = Math.round(destino * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString("es-CO") + (sufijo || "");
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  function escapar(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* =========================================================
     6b. ENCUESTA RELÁMPAGO (reutilizable en varias páginas)
     ========================================================= */
  function encuesta(idContenedor) {
    var cont = document.getElementById(idContenedor);
    var q = Store.encuesta.definicion();
    if (!cont || !q) return;

    var miVoto = Store.encuesta.miVoto();

    function dibujar(resultados) {
      cont.className = "encuesta" + (miVoto ? " votada" : "");
      cont.innerHTML =
        "<h3>" + escapar(q.pregunta) + "</h3>" +
        '<div class="encuesta__ops">' +
        q.opciones.map(function (o) {
          var r = resultados ? resultados.filter(function (x) { return x.id === o.id; })[0] : null;
          return '<button class="op' + (miVoto === o.id ? " is-mia" : "") + '" data-op="' + o.id + '"' +
            (miVoto ? " disabled" : "") + ">" +
            '<span class="op__barra" style="width:' + (miVoto && r ? r.porcentaje : 0) + '%"></span>' +
            "<span>" + escapar(o.texto) + "</span>" +
            (miVoto && r ? '<span class="op__pct">' + r.porcentaje + "%</span>" : "") +
          "</button>";
        }).join("") +
        "</div>" +
        (miVoto && resultados && resultados[0]
          ? '<p class="encuesta__total">' + resultados[0].total.toLocaleString("es-CO") +
            " respuestas · gracias por participar</p>"
          : '<p class="encuesta__total">Un clic y ves los resultados</p>');
    }

    if (miVoto) Store.encuesta.resultados().then(dibujar);
    else dibujar(null);

    cont.addEventListener("click", function (e) {
      var op = e.target.closest(".op");
      if (!op || miVoto) return;
      Store.encuesta.votar(op.dataset.op).then(function () {
        miVoto = op.dataset.op;
        Store.encuesta.resultados().then(function (res) {
          dibujar(res);
          toast("Voto registrado. ¡Gracias!");
        });
      });
    });
  }

  /* =========================================================
     7. ARRANQUE
     ========================================================= */
  /* Cada cifra del tablero lleva su icono. Se hace aquí, en un solo sitio,
     porque el mismo tablero aparece en seis páginas distintas. */
  var ICONO_CIFRA = {
    reportes: "i-megaphone", apoyos: "i-hand", zonas: "i-pin",
    atendidos: "i-check", eventos: "i-calendar", registros: "i-users",
    "n-noticias": "i-news", "n-eventos": "i-calendar",
    "n-proximos": "i-calendar", "n-confirmados": "i-check"
  };

  function iconosDelTablero() {
    document.querySelectorAll(".tablero__item").forEach(function (item) {
      if (item.querySelector(".tablero__ico")) return;
      var cifra = item.querySelector("[data-stat], b[id]");
      if (!cifra) return;
      var clave = cifra.dataset.stat || cifra.id;
      var ic = ICONO_CIFRA[clave];
      if (ic) item.insertAdjacentHTML("afterbegin", '<span class="tablero__ico">' + icono(ic) + "</span>");
    });
  }

  function iniciar() {
    document.body.insertAdjacentHTML("afterbegin", SPRITE);
    pintarEncabezado();
    pintarPie();
    menuMovil();
    sombraHeader();
    iconosDelTablero();
    activarReveal();

    if (Store.modo === "demo") {
      var aviso = document.getElementById("aviso-demo");
      if (aviso) aviso.hidden = false;
    }

    /* App instalable. Solo funciona servido por http/https,
       no al abrir el archivo con doble clic. */
    if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();

  return {
    icono: icono,
    encuesta: encuesta,
    toast: toast,
    modal: modal,
    cerrarModal: cerrarModal,
    pedirRegistro: pedirRegistro,
    compartir: compartir,
    animarNumero: animarNumero,
    escapar: escapar,
    activarReveal: activarReveal
  };
})();
