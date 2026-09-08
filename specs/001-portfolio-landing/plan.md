# Implementation Plan: Portfolio de una página JdDLabs

**Branch**: `001-portfolio-landing` | **Date**: 2026-09-08 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-portfolio-landing/spec.md`

## Summary

Portfolio de una página para captar PYMEs y autónomos de Rute. Cinco secciones en `index.html`
(Inicio, Proyecto destacado, Servicios, Sobre mí, Contacto), cabecera fija con menú hamburguesa
accesible en móvil, y un formulario de contacto que hace POST a una única Cloudflare Pages
Function que envía el email vía Resend. Se añaden dos páginas legales obligatorias y una 404.

El enfoque técnico es deliberadamente plano: aplicación Vite multi-página con React 18, sin
enrutado en cliente, sin estado global, sin base de datos y con una sola función serverless.
Toda la complejidad que existe está en tres sitios concretos —accesibilidad del menú móvil,
filtros anti-spam que no expulsen a usuarios legítimos, y las puertas de Lighthouse— y el plan
se organiza alrededor de eso.

## Technical Context

**Language/Version**: JavaScript ES2022. Node.js 20 LTS para el build.

**Primary Dependencies**: React 18 + react-dom, Vite 5, Tailwind CSS 3 (+ postcss, autoprefixer),
`@fontsource/inter`. Ninguna librería de animación, de formularios ni de focus trap: todo con
API nativas del navegador. La Function habla con la API HTTP de Resend mediante `fetch`; no se
instala su SDK.

**Storage**: N/A. Sin base de datos ni persistencia; el mensaje viaja a Resend y el sitio no
conserva copia (principio I).

**Testing**: sin suite automatizada (principio X). La puerta de calidad es Lighthouse más la
validación manual documentada en `quickstart.md`.

**Target Platform**: navegadores modernos de móvil y escritorio. Hosting en Cloudflare Pages;
la Function corre en el runtime de Cloudflare Workers (Web APIs estándar, no Node).

**Project Type**: sitio web estático multi-página con una única función serverless.

**Performance Goals**: Lighthouse ≥ 90 en Performance, Accessibility, Best Practices y SEO, en
desktop y en móvil (principio VI). Objetivo interno de trabajo: JS de la página principal por
debajo de 100 KB comprimido, y una sola fuente auto-alojada precargada.

**Constraints**: sin peticiones a Google Fonts; sin analítica; sin captcha de terceros; paleta
cerrada de siete colores; sin React Router ni framework meta; `RESEND_API_KEY` solo como
variable de entorno de Cloudflare, nunca en el repositorio ni en el bundle.

**Scale/Scope**: 4 entradas HTML obligatorias (`index`, `aviso-legal`, `privacidad`, `404`) más
`caso-cristaleria` opcional; 5 secciones de contenido; 1 endpoint; 1 formulario de 5 campos.

**Datos de identidad legal**: resueltos el 2026-09-08. `constitution.md` recoge razón social
`Juan de Dios Pérez Moreno`, NIF `50627812M` y domicilio `Calle Francisco Salto 29, 1 Rute
(Córdoba)`. No queda ningún NEEDS CLARIFICATION abierto en este plan.

## Constitution Check

*GATE: evaluado contra la constitución v2.0.0 antes de Phase 0 y de nuevo tras Phase 1.*

| # | Principio | Cómo lo satisface este plan | Estado |
|---|---|---|---|
| I | Stack fijo | React 18 + Vite 5 + Tailwind 3 en JavaScript; MPA nativo de Vite vía `rollupOptions.input`; sin React Router ni framework meta. Una única Function, `functions/api/contact.js`, dedicada al envío del formulario. Sin base de datos. | PASA |
| II | Fuentes auto-alojadas | Fraunces en `public/fonts/*.woff2` con `@font-face` propio; Inter vía `@fontsource/inter`. Ninguna referencia a dominios de Google. Verificable en la pestaña Red. | PASA |
| III | Paleta cerrada | Los siete colores viven en `theme.extend.colors` de `tailwind.config.js` (`bg`, `ink`, `dark`, `accent`, `accentHover`, `accentTint`, `muted`). Prohibido el literal de color en JSX y CSS. | PASA |
| IV | Integridad del logo | `JdDLogo_marca.svg` se sirve tal cual y se recolorea solo entre negro y blanco puros mediante dos variantes o `currentColor` limitado a esos dos valores. | PASA |
| V | Cero datos inventados | Todo el copy sale de `src/content/copy.js`, alimentado por el texto cerrado de la spec. El bloque de testimonio no se construye salvo que exista cita verificada. El Aviso Legal queda bloqueado hasta disponer de nombre fiscal y NIF. | PASA con bloqueo acotado |
| VI | Lighthouse ≥ 90 | Sin librerías de animación; una sola familia auto-alojada precargada; imágenes en formato moderno con dimensiones explícitas y carga perezosa; JS mínimo por página. Medición obligatoria por tarea de UI. | PASA |
| VII | Accesibilidad | Menú móvil con `aria-expanded`, foco contenido, retorno de foco y cierre con Escape; foco visible en toda la interfaz; animaciones supeditadas a `prefers-reduced-motion`; contraste ya verificado en 8,76:1. | PASA |
| VIII | Despliegue automático | Repositorio en GitHub conectado a Cloudflare Pages; build `npm run build`, salida `dist`; auto-deploy en cada push a `main`. Ningún comando de despliegue manual. | PASA |
| IX | Sin analítica | Ninguna herramienta de analítica en el bundle ni en la Function. | PASA |
| X | Sin tests automatizados | No se crea suite. La validación es `quickstart.md` más Lighthouse. | PASA |
| XI | Fecha límite 2026-09-21 | `caso-cristaleria.html` va marcada como opcional y es lo primero que se recorta. Las puertas VI y VII no se recortan. | PASA |
| XII | Transparencia legal y RGPD | `aviso-legal.html` y `privacidad.html` enlazadas desde el pie de todas las páginas; casilla de consentimiento no premarcada que bloquea el envío; Cloudflare y Resend nombrados como encargados; la clave vive solo en la variable de entorno. | PASA |

**Resultado: 12/12. Sin violaciones que justificar.** La única salvedad es el dato fiscal
pendiente, que no es una violación del plan sino una dependencia externa ya registrada.

*Re-evaluación tras Phase 1: sin cambios. El diseño de `data-model.md` y del contrato no
introduce persistencia, terceros nuevos ni dependencias fuera de las tres autorizadas.*

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-landing/
├── plan.md              # Este fichero
├── spec.md              # Especificación (43 FR, 12 SC)
├── research.md          # Phase 0 — decisiones técnicas
├── data-model.md        # Phase 1 — entidades y validación
├── quickstart.md        # Phase 1 — guía de validación manual
├── contracts/
│   └── contact-api.md   # Contrato del endpoint POST /api/contact
├── checklists/
│   └── requirements.md
└── tasks.md             # Lo genera /speckit-tasks
```

### Source Code (repository root)

```text
index.html                  # Entrada principal, 5 secciones
aviso-legal.html            # Entrada legal (LSSI)
privacidad.html             # Entrada legal (RGPD)
404.html                    # Cloudflare Pages la sirve automáticamente
caso-cristaleria.html       # OPCIONAL — primera candidata a recorte

vite.config.js              # rollupOptions.input con las entradas de arriba
tailwind.config.js          # theme.extend.colors + fontFamily
postcss.config.js
package.json

public/
├── fonts/                  # Fraunces .woff2 auto-alojada
├── JdDLogo_marca.svg
├── favicon.svg
├── og-image.png            # Previsualización al compartir
└── img/                    # Capturas de Cristalería Ruteña

functions/
└── api/
    └── contact.js          # ÚNICA función serverless (principio I)

src/
├── entries/                # Un punto de montaje por HTML
│   ├── main.jsx
│   ├── legal.jsx
│   ├── notfound.jsx
│   └── caso.jsx            # OPCIONAL
├── components/
│   ├── Header.jsx          # Cabecera fija
│   ├── MobileMenu.jsx      # Menú hamburguesa accesible
│   ├── Footer.jsx          # Enlaces legales
│   ├── Reveal.jsx          # Fade-in con IntersectionObserver
│   └── ContactForm.jsx     # Formulario + honeypot + trampa temporal
├── sections/
│   ├── Hero.jsx
│   ├── ProyectoDestacado.jsx
│   ├── Servicios.jsx
│   ├── SobreMi.jsx
│   └── Contacto.jsx
├── content/
│   ├── copy.js             # Copy cerrado de las 5 secciones
│   └── identity.js         # Fuente única: contacto, domicilio, fiscal
├── hooks/
│   ├── useFocusTrap.js
│   └── useReveal.js
└── styles/
    └── index.css           # @font-face, tokens, scroll-margin-top
```

**Structure Decision**: aplicación Vite multi-página. Cada fichero HTML de la raíz es una
entrada declarada en `rollupOptions.input`, y cada una monta su propio árbol React desde
`src/entries/`. Se descarta el enrutado en cliente porque el principio I lo prohíbe y porque
cuatro páginas independientes dan mejor SEO y mejor Lighthouse que una SPA con rutas.

`src/content/identity.js` es la pieza que merece atención: centraliza teléfono, WhatsApp, email,
domicilio y datos fiscales en un solo módulo, del que beben el Aviso Legal, la Política de
Privacidad, el JSON-LD de SEO y la sección de Contacto. Es la garantía estructural de que el
domicilio se escribe una vez y aparece idéntico en los cuatro sitios, como pediste.

## Complexity Tracking

> Sin violaciones de la constitución. Tabla vacía a propósito.

Dos decisiones que sí merecen quedar registradas, aunque no sean violaciones:

| Decisión | Por qué | Alternativa descartada y motivo |
|---|---|---|
| React también en las páginas legales | Reutilizar `Header` y `Footer` evita que el pie legal se desincronice entre páginas | HTML plano en las legales: ahorra unos KB pero duplica el marcado de cabecera y pie, que es justo donde viven los enlaces obligatorios del principio XII |
| Focus trap propio en lugar de librería | Son ~30 líneas con `querySelectorAll` sobre elementos enfocables | `focus-trap-react`: añade dependencia y peso al bundle de la única página que compite por el Performance de Lighthouse |
