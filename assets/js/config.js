/* =========================================================
   CONFIGURACIÓN GENERAL DE LA CAMPAÑA
   Este es el único archivo que el equipo necesita tocar para
   cambiar datos básicos del sitio.
   ========================================================= */

window.CAMPANA = {
  /* ---- Identidad ---- */
  candidato: "Arbey Ramos Gómez",
  candidatoCorto: "Arbey Ramos",
  cargo: "Alcaldía de Restrepo",
  periodo: "2027–2030",
  partido: "Partido Conservador Colombiano",
  eslogan: "Restrepo lo hacemos entre todos",   // se muestra en el hero de index.html

  /* ---- Municipio ----
     CONFIRMADO: Restrepo, Meta. La "Capital Salinera del Meta".
     20.430 habitantes: 13.518 en el casco urbano y 6.912 en la zona rural,
     repartidos en 30 barrios y 20 veredas.
  */
  municipio: "Restrepo",
  departamento: "Meta",

  mapa: {
    centro: [4.2606, -73.5624],
    zoom: 14,
    zoomMin: 11
  },

  /* ---- Contacto (EDITAR con los datos reales) ---- */
  whatsapp: "573000000000",          // solo dígitos, con indicativo país
  telefono: "+57 300 000 0000",
  correo: "contacto@arbeyramos.co",
  sede: "Restrepo · Dirección por confirmar",

  redes: {
    facebook: "#",
    instagram: "#",
    tiktok: "#",
    youtube: "#"
  },

  /* ---- Backend ----
     Vacío = MODO DEMO: todo funciona pero los datos se guardan solo en
     este navegador (localStorage). Perfecto para mostrar y probar.

     Para producción, crear un proyecto gratuito en supabase.com,
     ejecutar el SQL que está en README.md y pegar aquí las dos claves.
     El sitio pasa solo a modo remoto: los datos quedan compartidos
     entre todos los visitantes.
  */
  supabase: {
    url: "",       // ej. "https://xxxxxxxx.supabase.co"
    anonKey: ""    // la clave pública "anon", nunca la "service_role"
  },

  /* ---- Categorías de las problemáticas ciudadanas ----
     Escala azul de oscuro a claro para que los pines se distingan en el mapa. */
  categorias: [
    { id: "seguridad", nombre: "Seguridad",          icono: "i-shield",    color: "#061A3E" },
    { id: "vias",      nombre: "Vías y movilidad",   icono: "i-road",      color: "#0E3374" },
    { id: "educacion", nombre: "Educación",          icono: "i-graduation", color: "#12448F" },
    { id: "agua",      nombre: "Agua y saneamiento", icono: "i-water",     color: "#1A5FBF" },
    { id: "ambiente",  nombre: "Ambiente y basuras", icono: "i-tree",      color: "#1F7FA8" },
    { id: "salud",     nombre: "Salud",              icono: "i-salud",     color: "#4A6FA5" },
    { id: "luz",       nombre: "Alumbrado público",  icono: "i-bulb",      color: "#3D7FD8" },
    { id: "espacio",   nombre: "Espacio público",    icono: "i-users",     color: "#5C6BC0" },
    { id: "otro",      nombre: "Otro",               icono: "i-flag",      color: "#7A8CA6" }
  ],

  /* ---- Estados del semáforo de compromisos ---- */
  /* De más claro a más oscuro: el avance se lee como el azul se intensifica. */
  estados: [
    { id: "recibido",   nombre: "Recibido",              icono: "i-megaphone", color: "#8A94A8" },
    { id: "revision",   nombre: "En estudio",            icono: "i-search",    color: "#6BA3E8" },
    { id: "compromiso", nombre: "Compromiso adquirido",  icono: "i-flag",      color: "#1A5FBF" },
    { id: "cumplido",   nombre: "Cumplido",              icono: "i-check",     color: "#0A2559" }
  ]
};
