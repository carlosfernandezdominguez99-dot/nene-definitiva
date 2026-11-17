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

  /* WhatsApp: número con prefijo de país, sin espacios ni "+" (ej. "34600000000").
     Mientras esté vacío, el botón se muestra pero no hace nada. */
  whatsapp: "",
  whatsappText: "Hola, quería información sobre NENEBARBER7",

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
      example: false,
      type: "Masterclass · Exclusiva",
      name: "Masterclass NENEBARBER7",
      /* Fecha: dejar day vacío mientras esté "por determinar".
         Cuando haya fecha: day: "18", month: "Enero", year: "2027" */
      day: "",
      month: "",
      year: "",
      place: "Barbería NeneBarber7 · Aracena",
      seats: "Plazas limitadas",
      duration: "Por confirmar",
      text: "¿Quieres llevar tu carrera profesional al siguiente nivel? Una formación exclusiva impartida por Nene en su propio salón.",
      topics: ["Técnicas de corte", "Styling", "Marketing", "Creación de contenido"],
      /* Cartel (opcional): imagen vertical 4:5 */
      poster: "assets/img/masterclass-cartel-sm.webp",
      posterFull: "assets/img/masterclass-cartel.webp",
      posterAlt: "Cartel de la masterclass exclusiva impartida por NENEBARBER7: técnicas de corte, styling, marketing y creación de contenido",
      bookLabel: "Quiero plaza",
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
