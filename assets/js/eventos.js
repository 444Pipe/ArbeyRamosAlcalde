/* =========================================================
   AGENDA DE EVENTOS
   Confirmación de asistencia + descarga al calendario (.ics)
   ========================================================= */
(function () {
  "use strict";

  var CFG = window.CAMPANA;
  var esc = UI.escapar;
  var MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

  /* ---------- Archivo .ics para agregar al calendario ---------- */
  function sinSaltos(t) {
    return String(t || "").replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  }

  function marcaTiempo(fecha, hora, masMinutos) {
    var d = new Date(fecha + "T" + (hora || "09:00") + ":00");
    if (masMinutos) d.setMinutes(d.getMinutes() + masMinutos);
    function p(n) { return String(n).padStart(2, "0"); }
    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) +
      "T" + p(d.getHours()) + p(d.getMinutes()) + "00";
  }

  function descargarICS(ev) {
    var ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Campana " + sinSaltos(CFG.candidato) + "//ES",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:" + ev.id + "@campana-arbey-ramos",
      "DTSTAMP:" + marcaTiempo(ev.fecha, ev.hora) + "Z",
      "DTSTART;TZID=America/Bogota:" + marcaTiempo(ev.fecha, ev.hora),
      "DTEND;TZID=America/Bogota:" + marcaTiempo(ev.fecha, ev.hora, 120),
      "SUMMARY:" + sinSaltos(ev.titulo),
      "DESCRIPTION:" + sinSaltos(ev.descripcion + " — Campaña " + CFG.candidato),
      "LOCATION:" + sinSaltos(ev.lugar + ", " + CFG.municipio),
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    var blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "evento-" + ev.id + ".ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    UI.toast("Evento descargado. Ábrelo para agregarlo a tu calendario.");
  }

  /* ---------- Tarjeta ---------- */
  function tarjeta(ev, pasado) {
    var d = new Date(ev.fecha + "T12:00:00");
    var confirmado = Store.eventos.confirmado(ev.id);
    var asistentes = Store.eventos.asistentes(ev.id);
    var pct = ev.cupo ? Math.min(100, Math.round((asistentes / ev.cupo) * 100)) : 0;

    return '<article class="evento reveal' + (pasado ? " evento--pasado" : "") + '">' +
      '<div class="evento__fecha">' +
        "<b>" + d.getDate() + "</b>" +
        "<span>" + MESES[d.getMonth()] + "</span>" +
        "<em>" + d.getFullYear() + "</em>" +
      "</div>" +

      '<div class="evento__info">' +
        "<h3>" + esc(ev.titulo) + (ev.demo ? ' <span class="etiqueta etiqueta--demo">Ejemplo</span>' : "") + "</h3>" +
        "<p>" + esc(ev.descripcion) + "</p>" +
        '<div class="evento__datos">' +
          "<span>" + UI.icono("i-clock") + esc(ev.hora) + "</span>" +
          "<span>" + UI.icono("i-pin") + esc(ev.lugar) + "</span>" +
          (ev.cupo ? "<span>" + UI.icono("i-users") + asistentes + " de " + ev.cupo + " cupos</span>" : "") +
        "</div>" +
      "</div>" +

      '<div class="evento__accion">' +
        (pasado
          ? '<button class="btn btn--linea" data-compartir="' + ev.id + '">' + UI.icono("i-share") + "Compartir</button>"
          : '<button class="btn ' + (confirmado ? "btn--linea" : "btn--primary") + '" data-rsvp="' + ev.id + '"' +
              (confirmado ? " disabled" : "") + ">" +
              UI.icono(confirmado ? "i-check" : "i-hand") +
              (confirmado ? "Ya confirmaste" : "Confirmar asistencia") + "</button>" +
            '<button class="btn btn--linea" data-ics="' + ev.id + '">' + UI.icono("i-calendar") + "Mi calendario</button>") +
        (ev.cupo && !pasado
          ? '<div class="barra-cupo"><i style="width:' + pct + '%"></i></div>' +
            '<span class="evento__cupo">' + (ev.cupo - asistentes) + " cupos disponibles</span>"
          : "") +
      "</div>" +
    "</article>";
  }

  function pintar() {
    var proximos = Store.eventos.proximos();
    var pasados = Store.eventos.pasados();

    var cp = document.getElementById("lista-proximos");
    cp.innerHTML = proximos.length
      ? proximos.map(function (e) { return tarjeta(e, false); }).join("")
      : '<div class="vacio">' + UI.icono("i-calendar") +
        "<h3>No hay eventos programados</h3>" +
        "<p>Estamos organizando la próxima agenda. Regístrate y te avisamos.</p></div>";

    var cpa = document.getElementById("lista-pasados");
    cpa.innerHTML = pasados.length
      ? pasados.map(function (e) { return tarjeta(e, true); }).join("")
      : '<div class="vacio">' + UI.icono("i-clock") + "<h3>Aún no hay eventos realizados</h3><p>Muy pronto.</p></div>";

    document.getElementById("n-proximos").textContent = proximos.length;
    document.getElementById("n-confirmados").textContent = (Store._leer("asistencias", []) || []).length;

    UI.activarReveal();
  }

  function confirmar(id) {
    UI.pedirRegistro("Confirma con tu nombre y celular para reservar tu cupo en el encuentro.")
      .then(function (persona) {
        if (!persona) return;
        Store.eventos.confirmar(id, persona).then(function (res) {
          if (!res.ok) return UI.toast("Ya habías confirmado este evento.");
          UI.toast("¡Te esperamos! Tu cupo quedó reservado.");
          pintar();
        });
      });
  }

  function iniciar() {
    pintar();

    var wa = document.getElementById("wa-directo");
    if (wa) wa.href = "https://wa.me/" + CFG.whatsapp +
      "?text=" + encodeURIComponent("Hola, quiero solicitar un encuentro de campaña en mi sector.");

    document.addEventListener("click", function (e) {
      var b;
      if ((b = e.target.closest("[data-rsvp]"))) return confirmar(b.dataset.rsvp);
      if ((b = e.target.closest("[data-ics]"))) {
        var ev = Store.eventos.lista().filter(function (x) { return x.id === b.dataset.ics; })[0];
        if (ev) descargarICS(ev);
        return;
      }
      if ((b = e.target.closest("[data-compartir]"))) {
        var ev2 = Store.eventos.lista().filter(function (x) { return x.id === b.dataset.compartir; })[0];
        if (ev2) UI.compartir(ev2.titulo + " · " + ev2.lugar, location.href);
      }
    });

    document.getElementById("btn-pedir").addEventListener("click", function () {
      UI.pedirRegistro("Déjanos tus datos y te contactamos para coordinar el encuentro en tu sector.")
        .then(function (p) {
          if (p) UI.toast("Recibido. Te contactaremos para coordinar la visita.");
        });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
