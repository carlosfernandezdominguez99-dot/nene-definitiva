# NENEBARBER7 — web v2

Web de marca personal de NENEBARBER7 (barbero, formador y jurado · Aracena, Huelva).
Sitio estático: HTML + CSS + JS, sin frameworks ni build step. Se despliega tal cual en Vercel.

## Ver en local

```
node server.js
```

Abre `http://localhost:4500`. La contraseña de la vista previa privada es la misma de antes.

## Estructura

```
index.html              → home (todas las secciones)
aviso-legal.html        → legal (borrador con huecos marcados)
privacidad.html
cookies.html
assets/css/main.css     → sistema visual: tokens de color, tipografía, layout, animaciones
assets/js/content.js    → CONTENIDO EDITABLE: enlace de reserva, gate, próximas formaciones, marcas
assets/js/main.js       → interacciones (reveals, scroll horizontal, contadores, cookies, galería…)
assets/img/             → fotografía optimizada (WebP, 800 y 1600 px), logo en SVG (sprite.svg)
assets/video/           → clips cortos, sin audio, en bucle
sitemap.xml, robots.txt, vercel.json, favicon.svg
```

## Qué se edita y dónde

| Quiero cambiar…                      | Dónde                                                          |
|-------------------------------------|----------------------------------------------------------------|
| Próximas formaciones                | `assets/js/content.js` → `formaciones` (poner `example: false`) |
| Logos de marcas                     | `assets/js/content.js` → `marcas` (SVG/PNG en `assets/img/marcas/`) |
| Quitar la contraseña al publicar    | `assets/js/content.js` → `gate.enabled: false`                 |
| Enlace de reservas                  | `assets/js/content.js` → `booking` (se aplica a todos los botones) |
| Fotos y nombres del equipo          | `index.html` → sección `#equipo` (sustituir cada `.ph` por `<img>`) |
| Foto de la fachada                  | `index.html` → sección `#espacio`, bloque "Fachada"            |
| Dominio definitivo                  | Buscar `nene-barber.vercel.app` en `index.html`, `sitemap.xml`, `robots.txt` y páginas legales |

## Pendiente de datos reales

Todo lo que no venía confirmado en el briefing está marcado en la web con una etiqueta morada ("Foto pendiente", "Contenido de ejemplo", "Logo pendiente"…):

- Nombres, roles, descripciones y fotos de los 4 compañeros del equipo.
- Foto de la fachada.
- Logos de las marcas con las que colabora.
- Formaciones reales (las 3 actuales son ejemplos).
- Dirección exacta del salón, email/teléfono de contacto.
- Datos del titular (nombre/razón social, NIF, domicilio, email) para las páginas legales.
- Dominio definitivo (ahora `nene-barber.vercel.app`).

## Notas técnicas

- Tipografías: Big Shoulders Display (titulares), Geist (texto), Geist Mono (etiquetas), Instrument Serif (acentos), desde Google Fonts.
- Smooth scroll con Lenis (cdnjs). Si no carga, la web funciona igual con scroll nativo.
- `prefers-reduced-motion` desactiva animaciones, parallax y scroll horizontal.
- En móvil, las secciones horizontales pasan a carrusel táctil con snap y aparece una barra fija de reserva.
- Sin analítica ni cookies de terceros. El banner guarda la elección en `localStorage` (`nb_consent`).
- Las fotos se han pasado a blanco y negro para unificar la estética (negro · blanco · morado).
