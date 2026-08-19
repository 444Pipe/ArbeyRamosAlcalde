/* =========================================================
   CONTENIDO EDITABLE DEL SITIO
   Noticias, eventos, logros y encuesta. El equipo de campaña
   puede editar este archivo sin tocar nada más.

   IMPORTANTE: todo lo que está marcado con  demo: true  es
   contenido de EJEMPLO. El sitio le pone una etiqueta visible
   "Ejemplo" para que nadie lo confunda con información real.
   Al reemplazarlo por contenido verdadero, borra esa línea.
   ========================================================= */

window.CONTENIDO = {

  /* ---------------------------------------------------------
     PERFIL DEL CANDIDATO
     El texto largo de la biografía está en candidato.html.
     Esto es solo el resumen que aparece en la portada.
     --------------------------------------------------------- */
  perfil: {
    demo: true,
    titular: "Un liderazgo cercano, con los pies en el territorio",
    resumen: "Arbey Ramos Gómez es un hombre de trabajo, formado en los valores de la " +
             "familia, la fe y el esfuerzo honesto. Su compromiso con Restrepo nace de " +
             "recorrer sus calles y sus veredas, y de escuchar a quienes nunca son escuchados.",
    valores: [
      { titulo: "Cercanía real",  texto: "Despacho abierto y presencia permanente en barrios y veredas." },
      { titulo: "Manejo honesto", texto: "Cada peso público se informa y se explica a la comunidad." },
      { titulo: "Obras que se ven", texto: "Metas claras, plazos definidos y seguimiento público." }
    ]
  },

  /* ---------------------------------------------------------
     PROGRAMA DE GOBIERNO
     Cada eje tiene su propio bloque en propuestas.html.
     "acciones" son los compromisos concretos de ese eje.
     --------------------------------------------------------- */
  propuestas: [
    {
      id: "seguridad",
      icono: "i-shield",
      titulo: "Seguridad y convivencia",
      resumen: "Que la gente pueda salir tranquila de su casa y volver tranquila, de día y de noche.",
      detalle: "La seguridad no se resuelve solo con discursos. Se resuelve con presencia " +
               "institucional constante, con iluminación donde hoy hay oscuridad y con una " +
               "comunidad organizada que se conoce y se cuida.",
      acciones: [
        "Plan de alumbrado público priorizando los puntos que la comunidad reporte como críticos.",
        "Mesas de seguridad periódicas con la Policía, las JAC y los comerciantes.",
        "Cámaras de vigilancia en los accesos al municipio y en los puntos de mayor afluencia.",
        "Apoyo real a los frentes de seguridad de barrios y veredas."
      ]
    },
    {
      id: "empleo",
      icono: "i-briefcase",
      titulo: "Empleo y emprendimiento",
      resumen: "Que quien quiera trabajar en Restrepo encuentre cómo, sin tener que irse.",
      detalle: "El empleo se genera acompañando al que ya está produciendo: el comerciante, " +
               "el campesino, la mujer que vende desde su casa. Menos trámite y más apoyo.",
      acciones: [
        "Ventanilla única para abrir y formalizar un negocio en el municipio.",
        "Ferias productivas periódicas para que el comercio local venda directo.",
        "Formación para el trabajo articulada con el SENA, enfocada en jóvenes y mujeres.",
        "Compras públicas del municipio con preferencia por proveedores locales."
      ]
    },
    {
      id: "educacion",
      icono: "i-graduation",
      titulo: "Educación y juventud",
      resumen: "Que ningún joven tenga que irse del municipio para poder estudiar.",
      detalle: "La educación es la única política que cambia una familia de raíz. Necesitamos " +
               "sedes dignas, conectividad de verdad y una ruta clara después del grado once.",
      acciones: [
        "Mejoramiento de las sedes educativas rurales: baños, techos, comedores y pupitres.",
        "Conectividad en las instituciones y puntos de internet comunitario.",
        "Transporte escolar garantizado para la zona rural.",
        "Fondo de becas municipal para educación técnica y universitaria."
      ]
    },
    {
      id: "salud",
      icono: "i-salud",
      titulo: "Salud y bienestar",
      resumen: "Atención oportuna y cerca, sin tener que viajar para todo.",
      detalle: "La salud del municipio se mide en cuánto tiempo tarda una persona en ser " +
               "atendida. Ese es el indicador que vamos a mejorar.",
      acciones: [
        "Jornadas médicas y odontológicas periódicas en la zona rural.",
        "Fortalecimiento del centro de salud en dotación y personal.",
        "Programa de atención al adulto mayor y a la primera infancia.",
        "Atención en salud mental y prevención del consumo en jóvenes."
      ]
    },
    {
      id: "vias",
      icono: "i-road",
      titulo: "Vías e infraestructura",
      resumen: "Vías transitables todo el año y agua potable en cada casa.",
      detalle: "Sin vías no hay cosecha que salga, ni enfermo que llegue a tiempo, ni niño " +
               "que llegue al colegio. Es la base de todo lo demás.",
      acciones: [
        "Plan de mantenimiento permanente de vías terciarias, no solo en época de lluvias.",
        "Banco de maquinaria propio del municipio para no depender de terceros.",
        "Mejoramiento de acueductos veredales y del sistema de saneamiento.",
        "Recuperación de parques, polideportivos y espacio público."
      ]
    },
    {
      id: "campo",
      icono: "i-sprout",
      titulo: "Campo, turismo y ambiente",
      resumen: "Que producir en el campo vuelva a ser rentable, cuidando lo que tenemos.",
      detalle: "El campesino no necesita que le regalen nada: necesita vías, asistencia " +
               "técnica y un comprador justo. Y necesita que protejamos el agua.",
      acciones: [
        "Asistencia técnica agropecuaria permanente y gratuita.",
        "Apoyo a la comercialización directa, eliminando intermediarios innecesarios.",
        "Protección de las fuentes hídricas y reforestación de nacimientos.",
        "Ruta turística municipal que deje ingresos en manos de las familias locales."
      ]
    }
  ],

  /* ---------------------------------------------------------
     NOTICIAS  ·  las más recientes primero
     categoria: "Comunicado" | "Prensa" | "Territorio" | "Propuesta"
     --------------------------------------------------------- */
  noticias: [
    {
      id: "n1",
      demo: true,
      fecha: "2026-08-12",
      categoria: "Territorio",
      titulo: "Arbey Ramos recorrió la zona rural escuchando a los productores",
      resumen: "Durante toda la jornada el precandidato visitó fincas y escuchó las dificultades para sacar los productos al mercado por el mal estado de las vías terciarias.",
      cuerpo: "Texto completo de la noticia. Reemplaza este contenido por la nota real, con los nombres de las veredas visitadas, las personas que acompañaron y los compromisos concretos que salieron del recorrido.",
      destacada: true,
      imagen: ""
    },
    {
      id: "n2",
      demo: true,
      fecha: "2026-08-05",
      categoria: "Propuesta",
      titulo: "Presentamos el primer borrador del programa de gobierno",
      resumen: "Seis ejes construidos a partir de los reportes ciudadanos recibidos en esta plataforma y de los encuentros barriales realizados hasta hoy.",
      cuerpo: "Texto completo de la noticia.",
      destacada: false,
      imagen: ""
    },
    {
      id: "n3",
      demo: true,
      fecha: "2026-07-28",
      categoria: "Comunicado",
      titulo: "Nuestro compromiso con la transparencia en la campaña",
      resumen: "Publicaremos periódicamente el origen de los aportes y los gastos de la campaña, más allá de lo que exige la ley.",
      cuerpo: "Texto completo del comunicado.",
      destacada: false,
      imagen: ""
    },
    {
      id: "n4",
      demo: true,
      fecha: "2026-07-19",
      categoria: "Prensa",
      titulo: "Entrevista en la emisora local: seguridad y empleo",
      resumen: "Arbey Ramos habló sobre las dos preocupaciones que más aparecen en los reportes ciudadanos del municipio.",
      cuerpo: "Texto completo o enlace a la entrevista.",
      destacada: false,
      imagen: ""
    }
  ],

  /* ---------------------------------------------------------
     EVENTOS  ·  la agenda pública de la campaña
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
      titulo: "Conversatorio con jóvenes: educación y empleo",
      lugar: "Parque principal",
      descripcion: "Un espacio abierto para hablar de becas, conectividad y oportunidades para no tener que irse del municipio.",
      cupo: 200
    },
    {
      id: "e3",
      demo: true,
      fecha: "2026-09-27",
      hora: "08:00",
      titulo: "Jornada puerta a puerta en el casco urbano",
      lugar: "Punto de encuentro: sede de campaña",
      descripcion: "Convocatoria abierta a voluntarios. Llevamos el mensaje casa por casa y recogemos problemáticas.",
      cupo: 60
    },
    {
      id: "e4",
      demo: true,
      fecha: "2026-07-11",
      hora: "10:00",
      titulo: "Lanzamiento de la plataforma ciudadana",
      lugar: "Salón comunal del Centro",
      descripcion: "Presentamos el mapa de problemáticas y explicamos cómo cualquier habitante puede reportar desde su celular.",
      cupo: 150
    }
  ],

  /* ---------------------------------------------------------
     TRAYECTORIA Y LOGROS  ·  línea de tiempo
     --------------------------------------------------------- */
  logros: [
    {
      id: "l1",
      demo: true,
      icono: "i-map",
      anio: "2026",
      titulo: "Plataforma ciudadana de problemáticas",
      texto: "Pusimos en marcha el primer mapa abierto donde cualquier habitante del municipio reporta lo que necesita su barrio o su vereda."
    },
    {
      id: "l2",
      demo: true,
      icono: "i-pin",
      anio: "2025",
      titulo: "Recorrido por todas las veredas",
      texto: "Completamos la visita a la zona rural del municipio escuchando de primera mano a las comunidades."
    },
    {
      id: "l3",
      demo: true,
      icono: "i-users",
      anio: "2024",
      titulo: "Acompañamiento a las juntas de acción comunal",
      texto: "Trabajo conjunto con líderes comunales para gestionar necesidades puntuales ante la administración."
    },
    {
      id: "l4",
      demo: true,
      icono: "i-star",
      anio: "2023",
      titulo: "Trabajo social y comunitario",
      texto: "Reemplaza este punto con los hitos reales de la trayectoria de Arbey: estudios, cargos, gestiones y reconocimientos."
    }
  ],

  /* ---------------------------------------------------------
     ENCUESTA RELÁMPAGO  ·  la pregunta de la semana
     --------------------------------------------------------- */
  encuesta: {
    id: "q-2026-33",
    pregunta: "¿Cuál debería ser la primera obra del próximo alcalde?",
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
