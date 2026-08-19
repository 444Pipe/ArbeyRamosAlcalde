/* =========================================================
   CONTACTO
   ========================================================= */
(function () {
  "use strict";

  var CFG = window.CAMPANA;
  var esc = UI.escapar;

  /* Los datos salen de config.js: se cambian en un solo sitio */
  function pintarDatos() {
    var cont = document.getElementById("contacto-grid");
    if (!cont) return;

    var items = [
      { ico: "i-phone", tit: "Teléfono", txt: CFG.telefono, href: "tel:" + CFG.telefono.replace(/\s/g, "") },
      { ico: "i-whatsapp", tit: "WhatsApp", txt: "Escríbenos directo", href: "https://wa.me/" + CFG.whatsapp },
      { ico: "i-mail", tit: "Correo", txt: CFG.correo, href: "mailto:" + CFG.correo },
      { ico: "i-pin", tit: "Sede de campaña", txt: CFG.sede, href: "" }
    ];

    cont.innerHTML = items.map(function (i, n) {
      var clase = "contact__item reveal" + (n ? " reveal--d" + Math.min(n, 3) : "");
      var interior =
        '<span class="contact__ico">' + UI.icono(i.ico) + "</span>" +
        "<strong>" + esc(i.tit) + "</strong><span>" + esc(i.txt) + "</span>";
      return i.href
        ? '<a class="' + clase + '" href="' + i.href + '"' +
          (i.href.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "") + ">" + interior + "</a>"
        : '<div class="' + clase + '">' + interior + "</div>";
    }).join("");

    UI.activarReveal(cont);
  }

  function err(form, id, msg) {
    var box = form.querySelector('[data-err-for="' + id + '"]');
    if (box) box.textContent = msg || "";
    var campo = document.getElementById(id);
    if (campo) campo.classList.toggle("is-invalid", Boolean(msg));
  }

  function formulario() {
    var form = document.getElementById("form-contacto");
    if (!form) return;
    var ok = document.getElementById("form-ok");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (ok) ok.hidden = true;

      var nombre = document.getElementById("c-nombre");
      var tel = document.getElementById("c-tel");
      var mail = document.getElementById("c-mail");
      var msg = document.getElementById("c-msg");
      var hab = document.getElementById("c-hab");
      var malo = null;

      if (nombre.value.trim().length < 3) { err(form, "c-nombre", "Escribe tu nombre."); malo = malo || nombre; }
      else err(form, "c-nombre", "");

      if (tel.value.replace(/\D/g, "").length < 7) { err(form, "c-tel", "Escribe un celular válido."); malo = malo || tel; }
      else err(form, "c-tel", "");

      if (mail.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim())) {
        err(form, "c-mail", "Revisa tu correo."); malo = malo || mail;
      } else err(form, "c-mail", "");

      if (msg.value.trim().length < 10) { err(form, "c-msg", "Cuéntanos un poco más."); malo = malo || msg; }
      else err(form, "c-msg", "");

      if (!hab.checked) { err(form, "c-hab", "Debes autorizar el tratamiento de datos."); malo = malo || hab; }
      else err(form, "c-hab", "");

      if (malo) return malo.focus();

      Store.usuario.registrar({
        nombre: nombre.value,
        telefono: tel.value,
        correo: mail.value,
        ayuda: document.getElementById("c-asunto").value,
        mensaje: msg.value
      }).then(function () {
        form.reset();
        if (ok) { ok.hidden = false; ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
        UI.toast("Mensaje enviado. Gracias por escribirnos.");
      });
    });

    form.addEventListener("input", function (e) {
      if (e.target.classList && e.target.classList.contains("is-invalid")) {
        e.target.classList.remove("is-invalid");
        var box = form.querySelector('[data-err-for="' + e.target.id + '"]');
        if (box) box.textContent = "";
      }
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
    pintarDatos();
    formulario();
    pintarEstadisticas();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
