/* =========================================================
   ÚNETE A LA CAMPAÑA
   ========================================================= */
(function () {
  "use strict";

  var CFG = window.CAMPANA;

  function err(form, id, msg) {
    var box = form.querySelector('[data-err-for="' + id + '"]');
    if (box) box.textContent = msg || "";
    var campo = document.getElementById(id);
    if (campo) campo.classList.toggle("is-invalid", Boolean(msg));
  }

  function formulario() {
    var form = document.getElementById("form-unete");
    if (!form) return;
    var ok = document.getElementById("form-ok");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (ok) ok.hidden = true;

      var nombre = document.getElementById("f-nombre");
      var tel = document.getElementById("f-tel");
      var mail = document.getElementById("f-mail");
      var hab = document.getElementById("f-hab");
      var malo = null;

      if (nombre.value.trim().length < 3) { err(form, "f-nombre", "Escribe tu nombre completo."); malo = malo || nombre; }
      else err(form, "f-nombre", "");

      if (tel.value.replace(/\D/g, "").length < 7) { err(form, "f-tel", "Escribe un número de contacto válido."); malo = malo || tel; }
      else err(form, "f-tel", "");

      if (mail.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim())) {
        err(form, "f-mail", "Revisa tu correo electrónico."); malo = malo || mail;
      } else err(form, "f-mail", "");

      if (!hab.checked) { err(form, "f-hab", "Debes autorizar el tratamiento de datos."); malo = malo || hab; }
      else err(form, "f-hab", "");

      if (malo) return malo.focus();

      Store.usuario.registrar({
        nombre: nombre.value,
        telefono: tel.value,
        correo: mail.value,
        zona: document.getElementById("f-zona").value,
        ayuda: document.getElementById("f-ayuda").value,
        mensaje: document.getElementById("f-msg").value
      }).then(function (persona) {
        form.reset();
        if (ok) { ok.hidden = false; ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
        UI.toast("¡Bienvenido al equipo, " + persona.nombre.split(" ")[0] + "!");
      });
    });

    /* El error desaparece en cuanto la persona corrige */
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
    formulario();
    pintarEstadisticas();

    var wa = document.getElementById("wa-unete");
    if (wa) wa.href = "https://wa.me/" + CFG.whatsapp +
      "?text=" + encodeURIComponent("Hola, quiero unirme a la campaña de " + CFG.candidato + ".");

    /* Si alguien llega desde otra página con la ayuda ya elegida:
       unete.html?ayuda=Ser+voluntario */
    var params = new URLSearchParams(location.search);
    var ayuda = params.get("ayuda");
    if (ayuda) {
      var sel = document.getElementById("f-ayuda");
      Array.prototype.forEach.call(sel.options, function (o) {
        if (o.text === ayuda) sel.value = o.value || o.text;
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
