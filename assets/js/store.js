/* =========================================================
   CAPA DE DATOS
   Funciona en dos modos, sin cambiar una sola línea de las páginas:

     MODO DEMO    (por defecto) — guarda todo en este navegador.
                  Sirve para mostrar la plataforma funcionando.
     MODO REMOTO  — si en config.js hay claves de Supabase, todos
                  los datos quedan compartidos entre los visitantes.

   El SQL para crear las tablas está en README.md
   ========================================================= */

window.Store = (function () {
  "use strict";

  var CFG = window.CAMPANA || {};
  var SEED = window.CONTENIDO || {};
  var NS = "arbey:";

  var remoto = Boolean(CFG.supabase && CFG.supabase.url && CFG.supabase.anonKey);

  /* ---------- utilidades de almacenamiento local ---------- */
  function leer(clave, porDefecto) {
    try {
      var v = localStorage.getItem(NS + clave);
      return v ? JSON.parse(v) : porDefecto;
    } catch (e) { return porDefecto; }
  }

  function escribir(clave, valor) {
    try {
      localStorage.setItem(NS + clave, JSON.stringify(valor));
      return true;
    } catch (e) {
      console.warn("No se pudo guardar en este navegador:", e);
      return false;
    }
  }

  function uid(p) {
    return (p || "id") + "-" + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
  }

  /* Identificador anónimo del dispositivo: evita apoyos y votos repetidos
     sin pedir datos personales. No identifica a la persona. */
  function huella() {
    var h = leer("huella", null);
    if (!h) { h = uid("d"); escribir("huella", h); }
    return h;
  }

  /* ---------- cliente REST de Supabase (sin librerías) ---------- */
  var api = {
    url: function (tabla, query) {
      return CFG.supabase.url.replace(/\/$/, "") + "/rest/v1/" + tabla + (query ? "?" + query : "");
    },
    cabeceras: function (extra) {
      var h = {
        apikey: CFG.supabase.anonKey,
        Authorization: "Bearer " + CFG.supabase.anonKey,
        "Content-Type": "application/json"
      };
      for (var k in extra) h[k] = extra[k];
      return h;
    },
    get: function (tabla, query) {
      return fetch(api.url(tabla, query), { headers: api.cabeceras() })
        .then(function (r) { if (!r.ok) throw new Error(r.status + " " + tabla); return r.json(); });
    },
    post: function (tabla, fila) {
      return fetch(api.url(tabla), {
        method: "POST",
        headers: api.cabeceras({ Prefer: "return=representation" }),
        body: JSON.stringify(fila)
      }).then(function (r) { if (!r.ok) throw new Error(r.status + " " + tabla); return r.json(); });
    }
  };

  /* Si el servidor falla, la plataforma no se cae: sigue en modo local. */
  function conRespaldo(promesa, respaldo) {
    return promesa.catch(function (e) {
      console.warn("Servidor no disponible, usando datos locales:", e.message);
      return typeof respaldo === "function" ? respaldo() : respaldo;
    });
  }

  /* =========================================================
     SIEMBRA INICIAL (solo modo demo)
     ========================================================= */
  function sembrarReportes() {
    if (leer("sembrado", false)) return;
    var c = (CFG.mapa && CFG.mapa.centro) || [0, 0];
    var base = Date.now() - 1000 * 60 * 60 * 24 * 30;
    var lista = (SEED.reportesDemo || []).map(function (r, i) {
      return {
        id: uid("r"),
        creado: new Date(base + i * 1000 * 60 * 60 * 26).toISOString(),
        categoria: r.categoria,
        titulo: r.titulo,
        descripcion: r.descripcion,
        zona: r.zona,
        autor: r.autor,
        estado: r.estado || "recibido",
        lat: c[0] + (r.offset ? r.offset[0] : 0),
        lng: c[1] + (r.offset ? r.offset[1] : 0),
        foto: "",
        apoyos: r.apoyos || 0,
        demo: true
      };
    });
    escribir("reportes", lista);
    escribir("sembrado", true);
  }

  /* =========================================================
     REPORTES CIUDADANOS
     ========================================================= */
  var reportes = {
    listar: function (filtros) {
      filtros = filtros || {};
      var p = remoto
        ? conRespaldo(
            Promise.all([
              api.get("reportes", "select=*&order=creado.desc"),
              api.get("apoyos", "select=reporte_id")
            ]).then(function (res) {
              var cuenta = {};
              res[1].forEach(function (a) { cuenta[a.reporte_id] = (cuenta[a.reporte_id] || 0) + 1; });
              return res[0].map(function (r) { r.apoyos = cuenta[r.id] || 0; return r; });
            }),
            function () { return leer("reportes", []); }
          )
        : Promise.resolve(leer("reportes", []));

      return p.then(function (lista) {
        lista = (lista || []).slice();

        if (filtros.categoria) lista = lista.filter(function (r) { return r.categoria === filtros.categoria; });
        if (filtros.estado) lista = lista.filter(function (r) { return r.estado === filtros.estado; });
        if (filtros.texto) {
          var t = filtros.texto.toLowerCase();
          lista = lista.filter(function (r) {
            return (r.titulo + " " + r.descripcion + " " + (r.zona || "")).toLowerCase().indexOf(t) >= 0;
          });
        }

        if (filtros.orden === "apoyos") lista.sort(function (a, b) { return (b.apoyos || 0) - (a.apoyos || 0); });
        else lista.sort(function (a, b) { return new Date(b.creado) - new Date(a.creado); });

        return lista;
      });
    },

    crear: function (datos) {
      var fila = {
        categoria: datos.categoria,
        titulo: datos.titulo.trim(),
        descripcion: datos.descripcion.trim(),
        zona: (datos.zona || "").trim(),
        autor: (datos.autor || "Ciudadano").trim(),
        lat: datos.lat,
        lng: datos.lng,
        foto: datos.foto || "",
        estado: "recibido"
      };

      if (remoto) {
        return conRespaldo(
          api.post("reportes", fila).then(function (r) { return r[0]; }),
          function () { return guardarLocal(fila); }
        );
      }
      return Promise.resolve(guardarLocal(fila));

      function guardarLocal(f) {
        var lista = leer("reportes", []);
        var nuevo = Object.assign({}, f, {
          id: uid("r"),
          creado: new Date().toISOString(),
          apoyos: 0,
          mio: true
        });
        lista.unshift(nuevo);
        escribir("reportes", lista);
        return nuevo;
      }
    },

    yaApoyo: function (id) {
      return leer("apoyos", []).indexOf(id) >= 0;
    },

    apoyar: function (id) {
      if (reportes.yaApoyo(id)) return Promise.resolve({ ok: false, motivo: "repetido" });

      var mios = leer("apoyos", []);
      mios.push(id);
      escribir("apoyos", mios);

      if (remoto) {
        return conRespaldo(
          api.post("apoyos", { reporte_id: id, huella: huella() }).then(function () { return { ok: true }; }),
          function () { return { ok: true }; }
        );
      }

      var lista = leer("reportes", []);
      lista.forEach(function (r) { if (r.id === id) r.apoyos = (r.apoyos || 0) + 1; });
      escribir("reportes", lista);
      return Promise.resolve({ ok: true });
    }
  };

  /* =========================================================
     REGISTRO DE PERSONAS (voluntarios y simpatizantes)
     ========================================================= */
  var usuario = {
    actual: function () { return leer("usuario", null); },

    registrar: function (datos) {
      var persona = {
        nombre: datos.nombre.trim(),
        telefono: (datos.telefono || "").trim(),
        correo: (datos.correo || "").trim(),
        zona: (datos.zona || "").trim(),
        ayuda: (datos.ayuda || "").trim(),
        mensaje: (datos.mensaje || "").trim(),
        creado: new Date().toISOString()
      };

      escribir("usuario", persona);

      var locales = leer("registros", []);
      locales.push(persona);
      escribir("registros", locales);

      if (remoto) {
        return conRespaldo(api.post("registros", persona).then(function () { return persona; }), persona);
      }
      return Promise.resolve(persona);
    },

    salir: function () {
      try { localStorage.removeItem(NS + "usuario"); } catch (e) {}
    }
  };

  /* =========================================================
     ASISTENCIA A EVENTOS
     ========================================================= */
  var eventos = {
    lista: function () { return (SEED.eventos || []).slice(); },

    proximos: function () {
      var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
      return eventos.lista()
        .filter(function (e) { return new Date(e.fecha + "T00:00:00") >= hoy; })
        .sort(function (a, b) { return a.fecha.localeCompare(b.fecha); });
    },

    pasados: function () {
      var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
      return eventos.lista()
        .filter(function (e) { return new Date(e.fecha + "T00:00:00") < hoy; })
        .sort(function (a, b) { return b.fecha.localeCompare(a.fecha); });
    },

    confirmado: function (id) { return leer("asistencias", []).indexOf(id) >= 0; },

    confirmar: function (id, persona) {
      if (eventos.confirmado(id)) return Promise.resolve({ ok: false, motivo: "repetido" });

      var mias = leer("asistencias", []);
      mias.push(id);
      escribir("asistencias", mias);

      var conteo = leer("conteoAsistencias", {});
      conteo[id] = (conteo[id] || 0) + 1;
      escribir("conteoAsistencias", conteo);

      if (remoto) {
        return conRespaldo(
          api.post("asistencias", {
            evento_id: id,
            nombre: (persona && persona.nombre) || "",
            telefono: (persona && persona.telefono) || "",
            huella: huella()
          }).then(function () { return { ok: true }; }),
          function () { return { ok: true }; }
        );
      }
      return Promise.resolve({ ok: true });
    },

    asistentes: function (id) {
      var conteo = leer("conteoAsistencias", {});
      return conteo[id] || 0;
    }
  };

  /* =========================================================
     ENCUESTA RELÁMPAGO
     ========================================================= */
  var encuesta = {
    definicion: function () { return SEED.encuesta || null; },

    miVoto: function () {
      var q = encuesta.definicion();
      if (!q) return null;
      return (leer("votos", {}) || {})[q.id] || null;
    },

    votar: function (opcionId) {
      var q = encuesta.definicion();
      if (!q || encuesta.miVoto()) return Promise.resolve({ ok: false });

      var votos = leer("votos", {});
      votos[q.id] = opcionId;
      escribir("votos", votos);

      var conteo = leer("conteoVotos", {});
      conteo[q.id] = conteo[q.id] || {};
      conteo[q.id][opcionId] = (conteo[q.id][opcionId] || 0) + 1;
      escribir("conteoVotos", conteo);

      if (remoto) {
        conRespaldo(api.post("votos", { encuesta_id: q.id, opcion_id: opcionId, huella: huella() }), null);
      }
      return Promise.resolve({ ok: true });
    },

    resultados: function () {
      var q = encuesta.definicion();
      if (!q) return Promise.resolve([]);

      var local = (leer("conteoVotos", {})[q.id]) || {};

      /* Base de arranque para que las barras no salgan vacías en la demo.
         En modo remoto se usan los votos reales. */
      var semilla = { a: 34, b: 27, c: 22, d: 11 };

      var p = remoto
        ? conRespaldo(
            api.get("votos", "select=opcion_id&encuesta_id=eq." + encodeURIComponent(q.id)).then(function (filas) {
              var c = {};
              filas.forEach(function (f) { c[f.opcion_id] = (c[f.opcion_id] || 0) + 1; });
              return c;
            }),
            function () { return null; }
          )
        : Promise.resolve(null);

      return p.then(function (remotos) {
        var base = remotos || {};
        var usarSemilla = !remotos;
        var total = 0;
        var filas = q.opciones.map(function (o) {
          var n = (base[o.id] || 0) + (usarSemilla ? (semilla[o.id] || 0) + (local[o.id] || 0) : 0);
          total += n;
          return { id: o.id, texto: o.texto, votos: n };
        });
        return filas.map(function (f) {
          f.porcentaje = total ? Math.round((f.votos / total) * 100) : 0;
          f.total = total;
          return f;
        });
      });
    }
  };

  /* =========================================================
     TABLERO DE PARTICIPACIÓN
     ========================================================= */
  function estadisticas() {
    return reportes.listar().then(function (lista) {
      var zonas = {};
      var resueltos = 0;
      lista.forEach(function (r) {
        if (r.zona) zonas[r.zona.toLowerCase()] = true;
        if (r.estado === "cumplido" || r.estado === "compromiso") resueltos++;
      });
      return {
        reportes: lista.length,
        apoyos: lista.reduce(function (s, r) { return s + (r.apoyos || 0); }, 0),
        zonas: Object.keys(zonas).length,
        atendidos: resueltos,
        eventos: eventos.lista().length,
        registros: leer("registros", []).length
      };
    });
  }

  /* =========================================================
     UTILIDADES
     ========================================================= */
  var util = {
    /* Reduce la foto antes de guardarla: los celulares toman imágenes
       de varios MB y así el envío es rápido incluso con mala señal. */
    comprimirImagen: function (archivo, maxLado) {
      maxLado = maxLado || 1000;
      return new Promise(function (resolve, reject) {
        if (!archivo || !/^image\//.test(archivo.type)) return reject(new Error("Archivo no válido"));
        var lector = new FileReader();
        lector.onerror = function () { reject(new Error("No se pudo leer la imagen")); };
        lector.onload = function () {
          var img = new Image();
          img.onerror = function () { reject(new Error("Imagen dañada")); };
          img.onload = function () {
            var escala = Math.min(1, maxLado / Math.max(img.width, img.height));
            var lienzo = document.createElement("canvas");
            lienzo.width = Math.round(img.width * escala);
            lienzo.height = Math.round(img.height * escala);
            lienzo.getContext("2d").drawImage(img, 0, 0, lienzo.width, lienzo.height);
            resolve(lienzo.toDataURL("image/jpeg", 0.72));
          };
          img.src = lector.result;
        };
        lector.readAsDataURL(archivo);
      });
    },

    categoria: function (id) {
      var lista = CFG.categorias || [];
      for (var i = 0; i < lista.length; i++) if (lista[i].id === id) return lista[i];
      return { id: id, nombre: "Otro", icono: "i-flag", color: "#58637A" };
    },

    estado: function (id) {
      var lista = CFG.estados || [];
      for (var i = 0; i < lista.length; i++) if (lista[i].id === id) return lista[i];
      return { id: "recibido", nombre: "Recibido", color: "#8A94A8" };
    },

    fecha: function (iso, opciones) {
      var d = new Date(iso.length === 10 ? iso + "T12:00:00" : iso);
      return d.toLocaleDateString("es-CO", opciones || { day: "numeric", month: "long", year: "numeric" });
    },

    haceCuanto: function (iso) {
      var seg = Math.floor((Date.now() - new Date(iso)) / 1000);
      if (seg < 60) return "hace un momento";
      if (seg < 3600) return "hace " + Math.floor(seg / 60) + " min";
      if (seg < 86400) return "hace " + Math.floor(seg / 3600) + " h";
      var d = Math.floor(seg / 86400);
      if (d === 1) return "ayer";
      if (d < 30) return "hace " + d + " días";
      return util.fecha(iso, { day: "numeric", month: "short", year: "numeric" });
    },

    huella: huella,
    uid: uid
  };

  /* ---------- arranque ---------- */
  if (!remoto) sembrarReportes();

  return {
    modo: remoto ? "remoto" : "demo",
    reportes: reportes,
    usuario: usuario,
    eventos: eventos,
    encuesta: encuesta,
    estadisticas: estadisticas,
    util: util,
    _leer: leer,
    _escribir: escribir
  };
})();
