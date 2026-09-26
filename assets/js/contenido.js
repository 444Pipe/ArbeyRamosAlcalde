/* =========================================================
   CONTENIDO EDITABLE DEL SITIO
   Noticias, eventos, trayectoria y encuesta. El equipo puede
   editar este archivo sin tocar nada más.

   IMPORTANTE: todo lo que está marcado con  demo: true  es
   contenido de EJEMPLO. El sitio le pone una etiqueta visible
   "Ejemplo" para que nadie lo confunda con información real.
   Al reemplazarlo por contenido verdadero, borra esa línea.
   ========================================================= */

window.CONTENIDO = {

  /* ---------------------------------------------------------
     PERFIL DE ARBEY
     El texto largo de la biografía está en perfil.html.
     Esto es solo el resumen que aparece en la portada.
     --------------------------------------------------------- */
  perfil: {
    titular: "Restrepense de nacimiento, padre de familia y hombre de trabajo",
    resumen: "Arbey Ramos Gómez es oriundo de Restrepo y padre de familia. Contador " +
             "Público y estudiante de Administración Pública, ha sido concejal del " +
             "municipio por tres periodos y hoy es el Presidente del Concejo de Restrepo " +
             "y del Directorio Municipal del Partido Conservador.",
    valores: [
      { titulo: "Cercanía real",   texto: "Tres periodos recorriendo los barrios y las veredas, escuchando a la gente donde vive." },
      { titulo: "Manejo técnico",  texto: "Contador Público: los recursos del municipio se revisan con rigor y se explican con claridad." },
      { titulo: "Trabajo que se ve", texto: "Gestiones con seguimiento público: aquí queda registrado qué se pidió y en qué va." }
    ]
  },

  /* ---------------------------------------------------------
     GESTIÓN COMO CONCEJAL
     Los frentes de trabajo de tres periodos en el Concejo.
     Cada frente tiene su propio bloque en gestion.html.
     "acciones" es el trabajo adelantado en ese frente.

     EDITAR: afinar cada punto con los acuerdos, debates y
     gestiones reales (número de acuerdo, año y resultado).
     --------------------------------------------------------- */
  gestion: [
    {
      id: "hacienda",
      icono: "i-chart",
      titulo: "Hacienda y recursos públicos",
      resumen: "Las cuentas del municipio revisadas con ojos de Contador Público.",
      detalle: "El presupuesto de Restrepo no es un papel: es la plata de la gente. " +
               "Como contador, Arbey ha estudiado peso a peso cada presupuesto que pasa " +
               "por el Concejo, para que los recursos rindan y se sepa en qué se van.",
      acciones: [
        "Estudio y debate técnico del presupuesto municipal en cada vigencia.",
        "Control político a la ejecución de los recursos y a la contratación pública.",
        "Seguimiento a los informes de la administración con criterio contable.",
        "Explicación de las cuentas públicas a la comunidad en lenguaje claro."
      ]
    },
    {
      id: "campo",
      icono: "i-sprout",
      titulo: "El campo y las veredas",
      resumen: "La zona rural de Restrepo presente en cada debate del Concejo.",
      detalle: "Casi siete mil restrepenses viven en las veredas. Arbey ha llevado sus " +
               "necesidades al recinto del Concejo una y otra vez: las vías terciarias, " +
               "los acueductos veredales y el apoyo al que produce la comida.",
      acciones: [
        "Debates sobre el estado y el mantenimiento de las vías terciarias.",
        "Gestión y seguimiento a los acueductos veredales y al saneamiento rural.",
        "Respaldo desde el Concejo a los productores y a la asistencia técnica agropecuaria.",
        "Acompañamiento a las comunidades veredales en sus solicitudes ante la administración."
      ]
    },
    {
      id: "comunidad",
      icono: "i-users",
      titulo: "Comunidad y acción comunal",
      resumen: "El trabajo codo a codo con las juntas de acción comunal.",
      detalle: "Las JAC son la primera puerta que toca un vecino cuando algo falta. " +
               "Por eso el trabajo de Arbey empieza ahí: escuchando a los líderes " +
               "comunales y ayudándolos a mover sus necesidades ante quien corresponde.",
      acciones: [
        "Acompañamiento permanente a las juntas de acción comunal de barrios y veredas.",
        "Gestión de necesidades puntuales de la comunidad ante la administración municipal.",
        "Impulso a la participación ciudadana en las sesiones del Concejo.",
        "Presencia constante en los sectores: los problemas se conocen caminándolos."
      ]
    },
    {
      id: "educacion",
      icono: "i-graduation",
      titulo: "Educación, deporte y juventud",
      resumen: "Oportunidades para que los jóvenes no tengan que irse del municipio.",
      detalle: "En tres periodos, Arbey ha defendido en el Concejo lo que las familias " +
               "más piden para sus hijos: sedes educativas dignas, transporte escolar " +
               "que llegue a las veredas y espacios para el deporte y la cultura.",
      acciones: [
        "Debates y seguimiento al transporte escolar rural y a la alimentación escolar.",
        "Gestión por el mejoramiento de las sedes educativas del municipio.",
        "Apoyo a las escuelas deportivas y a los espacios para la juventud.",
        "Respaldo a las actividades culturales y a las tradiciones restrepenses."
      ]
    },
    {
      id: "salud",
      icono: "i-salud",
      titulo: "Salud y bienestar",
      resumen: "Que la atención llegue a tiempo y también a la zona rural.",
      detalle: "La salud se mide en cuánto tarda una persona en ser atendida. Desde el " +
               "Concejo, Arbey ha insistido en fortalecer el centro de salud y en que " +
               "las jornadas de atención lleguen hasta las veredas.",
      acciones: [
        "Control político a la prestación del servicio de salud en el municipio.",
        "Gestión por la dotación y el personal del centro de salud.",
        "Impulso a las jornadas de salud en la zona rural.",
        "Seguimiento a los programas del adulto mayor y de la primera infancia."
      ]
    },
    {
      id: "concejo",
      icono: "i-flag",
      titulo: "Un Concejo abierto y cercano",
      resumen: "Como presidente, una corporación con las puertas abiertas.",
      detalle: "Presidir el Concejo es un encargo de confianza: dirigir el debate con " +
               "respeto, darle la palabra a la comunidad y hacer de la corporación una " +
               "casa donde cualquier restrepense pueda entrar, hablar y ser escuchado.",
      acciones: [
        "Sesiones públicas y abiertas: cualquier ciudadano puede asistir y participar.",
        "Vocería del Concejo ante la administración y las demás instituciones.",
        "Trámite ordenado y transparente de los proyectos de acuerdo.",
        "Atención directa a la ciudadanía desde la presidencia de la corporación."
      ]
    }
  ],

  /* ---------------------------------------------------------
     NOTICIAS  ·  las más recientes primero
     categoria: "Concejo" | "Territorio" | "Comunicado" | "Prensa"
     --------------------------------------------------------- */
  noticias: [
    {
      id: "n1",
      demo: true,
      fecha: "2026-08-12",
      categoria: "Territorio",
      titulo: "Arbey Ramos recorrió la zona rural escuchando a los productores",
      resumen: "Durante toda la jornada, el presidente del Concejo visitó fincas y escuchó las dificultades para sacar los productos al mercado por el estado de las vías terciarias.",
      cuerpo: "Texto completo de la noticia. Reemplaza este contenido por la nota real, con los nombres de las veredas visitadas, las personas que acompañaron y las gestiones concretas que salieron del recorrido.",
      destacada: true,
      imagen: ""
    },
    {
      id: "n2",
      demo: true,
      fecha: "2026-08-05",
      categoria: "Concejo",
      titulo: "Balance del periodo de sesiones: los debates que le importan a la gente",
      resumen: "Resumen de los proyectos de acuerdo tramitados y de los debates de control político adelantados por la corporación en el último periodo.",
      cuerpo: "Texto completo de la noticia.",
      destacada: false,
      imagen: ""
    },
    {
      id: "n3",
      demo: true,
      fecha: "2026-07-28",
      categoria: "Comunicado",
      titulo: "Así va la gestión: cuentas claras ante la comunidad",
      resumen: "Informe periódico del trabajo adelantado desde el Concejo: qué se ha debatido, qué se ha gestionado y en qué va cada compromiso.",
      cuerpo: "Texto completo del comunicado.",
      destacada: false,
      imagen: ""
    },
    {
      id: "n4",
      demo: true,
      fecha: "2026-07-19",
      categoria: "Prensa",
      titulo: "Entrevista en la emisora local: el trabajo del Concejo Municipal",
      resumen: "Arbey Ramos habló sobre las prioridades de la corporación y sobre los reportes que la ciudadanía deja en esta plataforma.",
      cuerpo: "Texto completo o enlace a la entrevista.",
      destacada: false,
      imagen: ""
    }
  ],

  /* ---------------------------------------------------------
     EVENTOS  ·  la agenda pública de Arbey
     fecha: "AAAA-MM-DD"   hora: "HH:MM" (24h)
     --------------------------------------------------------- */
  eventos: [
    {
      id: "e1",
      demo: true,
      fecha: "2026-09-05",
      hora: "09:00",
      titulo: "Encuentro veredal: vías y comercialización",
      lugar: "Caseta comunal · zona rural",
      descripcion: "Escuchamos a las juntas de acción comunal sobre el estado de las vías terciarias y el transporte de la cosecha.",
      cupo: 120
    },
    {
      id: "e2",
      demo: true,
      fecha: "2026-09-14",
      hora: "17:30",
      titulo: "Conversatorio con jóvenes: educación y oportunidades",
      lugar: "Parque principal",
      descripcion: "Un espacio abierto para hablar de estudio, deporte y oportunidades para quedarse en el municipio.",
      cupo: 200
    },
    {
      id: "e3",
      demo: true,
      fecha: "2026-09-27",
      hora: "08:00",
      titulo: "Jornada de atención ciudadana",
      lugar: "Recinto del Concejo Municipal",
      descripcion: "Atención directa: trae tu caso, tu solicitud o la necesidad de tu sector y le hacemos seguimiento.",
      cupo: 60
    },
    {
      id: "e4",
      demo: true,
      fecha: "2026-07-11",
      hora: "10:00",
      titulo: "Rendición de cuentas del trabajo en el Concejo",
      lugar: "Salón comunal del Centro",
      descripcion: "Presentamos el balance de la gestión y explicamos cómo cualquier habitante puede reportar desde su celular.",
      cupo: 150
    }
  ],

  /* ---------------------------------------------------------
     TRAYECTORIA  ·  línea de tiempo (lo más reciente primero)
     --------------------------------------------------------- */
  logros: [
    {
      id: "l1",
      icono: "i-flag",
      anio: "2024–2027",
      titulo: "Presidente del Concejo de Restrepo",
      texto: "Elegido por la corporación para presidirla: dirigir el debate, darle la palabra a la comunidad y ser la vocería del Concejo ante las instituciones."
    },
    {
      id: "l2",
      icono: "i-star",
      anio: "Hoy",
      titulo: "Presidente del Directorio del Partido Conservador",
      texto: "Al frente del directorio municipal del Partido Conservador Colombiano en Restrepo."
    },
    {
      id: "l3",
      icono: "i-users",
      anio: "3 periodos",
      titulo: "Concejal de Restrepo",
      texto: "Elegido y reelegido por voto popular durante tres periodos: años de escuchar a la gente y llevar su voz a los debates del Concejo."
    },
    {
      id: "l4",
      icono: "i-graduation",
      anio: "Formación",
      titulo: "Contador Público · Est. de Administración Pública",
      texto: "Profesional en Contaduría Pública y estudiante de Administración Pública: números claros y lo público manejado con seriedad."
    },
    {
      id: "l5",
      icono: "i-pin",
      anio: "Raíces",
      titulo: "Restrepense de nacimiento y padre de familia",
      texto: "Nació y creció en Restrepo. Padre de familia, orgulloso de su pueblo y de su gente."
    }
  ],

  /* ---------------------------------------------------------
     ENCUESTA RELÁMPAGO  ·  la pregunta de la semana
     --------------------------------------------------------- */
  encuesta: {
    id: "q-2026-39",
    pregunta: "¿Qué tema debería priorizar el Concejo en los próximos debates?",
    opciones: [
      { id: "a", texto: "Arreglo de las vías rurales" },
      { id: "b", texto: "Agua potable en toda la zona rural" },
      { id: "c", texto: "Más seguridad y alumbrado" },
      { id: "d", texto: "Centro de salud mejor dotado" }
    ]
  },

  /* ---------------------------------------------------------
     REPORTES DE EJEMPLO  ·  solo se usan en modo demo, para que
     el mapa no aparezca vacío la primera vez que alguien entra.
     En cuanto conectes Supabase, estos desaparecen.
     --------------------------------------------------------- */
  reportesDemo: [
    {
      categoria: "vias",
      titulo: "La vía a la vereda quedó intransitable tras las lluvias",
      descripcion: "Después del invierno el carreteable quedó lleno de huecos y los camiones ya no suben. Los productores tienen que sacar la carga en moto.",
      zona: "Zona rural",
      autor: "Vecino de la vereda",
      estado: "compromiso",
      apoyos: 47,
      offset: [0.012, -0.018]
    },
    {
      categoria: "luz",
      titulo: "Cuatro cuadras sin alumbrado desde hace meses",
      descripcion: "El sector queda completamente oscuro a las 6 de la tarde y la gente no se siente segura caminando.",
      zona: "Centro",
      autor: "Comunidad del Centro",
      estado: "revision",
      apoyos: 33,
      offset: [-0.004, 0.006]
    },
    {
      categoria: "agua",
      titulo: "El acueducto veredal se queda sin presión en verano",
      descripcion: "En temporada seca el agua no llega a las casas de la parte alta y toca recogerla en la quebrada.",
      zona: "Zona rural",
      autor: "Junta de acción comunal",
      estado: "recibido",
      apoyos: 28,
      offset: [0.02, 0.014]
    },
    {
      categoria: "espacio",
      titulo: "El parque infantil está deteriorado",
      descripcion: "Los juegos están oxidados y con partes rotas. Los niños del barrio no tienen dónde jugar seguros.",
      zona: "Centro",
      autor: "Madres del barrio",
      estado: "cumplido",
      apoyos: 21,
      offset: [0.006, 0.002]
    },
    {
      categoria: "seguridad",
      titulo: "Piden más presencia policial en las noches del fin de semana",
      descripcion: "Los comerciantes de la zona reportan riñas y hurtos los viernes y sábados en la madrugada.",
      zona: "Centro",
      autor: "Comerciantes",
      estado: "revision",
      apoyos: 19,
      offset: [-0.009, -0.005]
    },
    {
      categoria: "ambiente",
      titulo: "Basuras acumuladas junto a la quebrada",
      descripcion: "La gente deja escombros y basura cerca del cauce. Cuando llueve todo se va al agua.",
      zona: "Zona rural",
      autor: "Vecino preocupado",
      estado: "recibido",
      apoyos: 14,
      offset: [0.016, 0.008]
    }
  ]
};
