/* =========================================================================
   NENEBARBER7 — CONTENIDO EDITABLE
   Todo lo que cambia con frecuencia vive aquí: enlaces, próximas formaciones
   y logos de marcas. No hace falta tocar el HTML para actualizarlo.
   ========================================================================= */

window.NB = {
  /* Pantalla de contraseña para la fase de revisión privada.
     Cambiar a false el día que la web se publique. */
  gate: {
    enabled: true,
    password: "NENEBARBER0707"
  },

  booking: "https://clientes.iabeauty.ai/peluqueria/69a5ecde0d3faa74a1a619bf",
  instagram: "https://instagram.com/nenebarber7",

  /* -----------------------------------------------------------------------
     PRÓXIMAS FORMACIONES
     - example: true  → se muestra la etiqueta "Contenido de ejemplo".
       Borra estos ejemplos y añade las formaciones reales con example: false.
     - day / month / year: la fecha que se muestra en grande.
     - moreUrl / bookUrl: enlaces de "Más información" y "Reservar plaza".
       Si se dejan vacíos, apuntan al Instagram.
     ----------------------------------------------------------------------- */
  formaciones: [
    {
      example: true,
      type: "Grupal · Iniciación",
      name: "Fundamentos del fade",
      day: "18",
      month: "Octubre",
      year: "2026",
      place: "Salón NENEBARBER7 · Aracena",
      seats: "8 plazas",
      duration: "Jornada completa",
      text: "Para quien empieza: estructura, degradados limpios y el porqué de cada paso. Objetivo claro y mucha práctica.",
      moreUrl: "",
      bookUrl: ""
    },
    {
      example: true,
      type: "Individual · Profesional",
      name: "Técnica y criterio 1:1",
      day: "07",
      month: "Noviembre",
      year: "2026",
      place: "Salón NENEBARBER7 · Aracena",
      seats: "1 plaza",
      duration: "Sesión personalizada",
      text: "Uno a uno, sobre tu forma de trabajar: análisis, estructura, textura y acabado adaptados a tu nivel.",
      moreUrl: "",
      bookUrl: ""
    },
    {
      example: true,
      type: "Grupal · Competición",
      name: "Preparación para batallas",
      day: "12",
      month: "Diciembre",
      year: "2026",
      place: "Por confirmar",
      seats: "10 plazas",
      duration: "2 días",
      text: "Trabajar fuera de tu salón, con tiempo y bajo presión: organización, limpieza y ejecución, desde la mirada de un jurado.",
      moreUrl: "",
      bookUrl: ""
    }
  ],

  /* -----------------------------------------------------------------------
     MARCAS CON LAS QUE COLABORA
     - Para una marca real: { name: "Marca", logo: "assets/img/marcas/marca.svg" }
       (mejor SVG o PNG en blanco/negro con fondo transparente).
     - Sin logo: se muestra un hueco de prueba con el nombre.
     ----------------------------------------------------------------------- */
  marcas: [
    { name: "Marca 01", logo: "" },
    { name: "Marca 02", logo: "" },
    { name: "Marca 03", logo: "" },
    { name: "Marca 04", logo: "" },
    { name: "Marca 05", logo: "" },
    { name: "Marca 06", logo: "" }
  ]
};
