<!--
PROPUESTA DE ENMIENDA — NO ES LA CONSTITUCIÓN VIGENTE

Este fichero es el texto completo que sustituirá a `.specify/memory/constitution.md`
cuando Juan lo apruebe. No se aplica solo: la tarea T001 del plan lo mueve a su sitio en
un único commit, tal como exige el procedimiento de enmienda de la sección Governance.

Sync Impact Report
- Cambio de versión: 2.0.0 → 3.0.0
- Motivo del MAJOR: la sección Governance tipifica "abrir la paleta del principio III"
  como MAJOR, y eso es exactamente lo que ocurre: la paleta clara de siete colores se
  retira entera y se sustituye por una paleta oscura de dieciséis tokens. Se redefinen
  además los principios II (familias tipográficas) y XI (fecha límite), y cualquiera de
  los tres por separado ya obligaría a MAJOR.
- Principios modificados:
  - II. Fuentes auto-alojadas: Fraunces e Inter se retiran; entran Space Grotesk
    (titulares y cuerpo) y JetBrains Mono (eyebrows, cifras y metadatos). La prohibición
    de peticiones a Google Fonts se mantiene intacta y sigue siendo NO NEGOCIABLE.
  - III. Paleta cerrada: nueva tabla de dieciséis tokens sobre fondo oscuro continuo.
    La regla de fondo —tokens en `tailwind.config.js` como única fuente de verdad, cero
    literales de color sueltos— no cambia.
  - IV. Integridad del logo: se fija el blanco puro como forma canónica sobre el fondo
    oscuro. Se mantiene expresamente la prohibición de recolorearlo con el acento.
  - VII. Accesibilidad: se añade la regla de los dos acentos y la tabla de contrastes
    verificados sobre las tres superficies oscuras.
  - XI. Fecha límite: 2026-09-21 → 2026-09-25, por decisión explícita del propietario el
    2026-09-20 al aprobar el rediseño v2.
- Principios añadidos: ninguno.
- Principios eliminados: ninguno.
- Secciones modificadas: "Referencia de tokens y assets" (tabla de color y bloque de
  tipografía rehechos; se añaden la escala tipográfica y el ritmo vertical como valores
  canónicos).
- Placeholders diferidos: ninguno.
- Templates dependientes: sin cambios; plan-template.md, spec-template.md y
  tasks-template.md leen esta constitución en tiempo de ejecución.

Historial
- 1.0.0 (2026-09-08): primera ratificación formal, once principios.
- 2.0.0 (2026-09-08): funciones serverless acotadas al formulario; principio XII.
- 3.0.0 (2026-09-21): rediseño v2. Paleta oscura, nuevas familias tipográficas, nueva
  fecha límite.
-->

# Constitución del Portfolio JdDLabs

## Core Principles

### I. Stack fijo

React + Vite + Tailwind CSS, en JavaScript. El frontend se sirve como assets estáticos: NO SE
DEBE introducir un framework meta (Next.js o equivalentes) ni React Router. El enrutado es el
multi-página nativo de Vite, declarando las entradas de build en `vite.config.js`.

Se admiten **funciones serverless puntuales** en Cloudflare Pages Functions, usadas
**únicamente** para el envío del formulario de contacto vía Resend. NO DEBE haber base de datos
ni backend persistente, ni ninguna otra función serverless con un propósito distinto de ese
envío. Cambiar cualquiera de estas piezas es una enmienda MAJOR de esta constitución.

Racional: un portfolio de una sola persona no necesita hidratación de servidor ni enrutado en
cliente, y cada capa añadida es peso de bundle que compite con el principio VI. La excepción
del formulario se acota de forma expresa para que no sea la grieta por la que acabe entrando un
backend completo.

### II. Fuentes auto-alojadas (RGPD, NO NEGOCIABLE)

Dos familias, ambas auto-alojadas vía paquete `@fontsource-variable`, ambas en corte variable
y subconjunto latino:

- **Space Grotesk** (`@fontsource-variable/space-grotesk`) para titulares y cuerpo.
- **JetBrains Mono** (`@fontsource-variable/jetbrains-mono`) para eyebrows de sección, cifras
  y metadatos.

NO DEBE existir ninguna petición a `fonts.googleapis.com` ni a `fonts.gstatic.com` en ninguna
página publicada. NO SE DEBE añadir una tercera familia sin enmienda MINOR.

Fraunces e Inter quedan retiradas en la v2. El fichero `public/fonts/fraunces-latin-700.woff2`
y la dependencia `@fontsource/inter` se eliminan del repositorio: una fuente que ya no se usa
pero se sigue sirviendo es peso muerto que compite con el principio VI.

Racional: la carga desde Google transfiere la IP del visitante sin consentimiento previo y ha
sido sancionada por tribunales europeos. Es un riesgo legal, no una preferencia técnica. El
corte variable se prefiere al estático porque un único fichero cubre todos los pesos que el
diseño usa, en lugar de uno por peso.

### III. Paleta cerrada

Solo se usan los dieciséis tokens de la tabla de la sección "Referencia de tokens y assets".
NO SE DEBE añadir ningún color fuera de esa lista; la única excepción son las capturas de
pantalla de proyectos de cliente, que conservan sus colores originales. Los tokens viven en
`tailwind.config.js` como única fuente de verdad: quedan prohibidos los literales de color
sueltos en JSX, CSS o SVG inline. El CSS que necesite un color para algo que Tailwind no
expresa —resplandores, degradados, máscaras— lo lee con `theme()`, nunca copiando el hexadecimal.

El sitio es de superficie oscura continua. NO SE DEBE introducir ninguna banda de fondo claro:
la separación entre secciones se hace alternando `bg` y `bg-2`, que se diferencian en tres
puntos de luminancia, más un filete de 1px a `border`.

### IV. Integridad del logo

El monograma `JdDLogo_marca.svg` se usa siempre en negro puro o en blanco puro. Sobre el fondo
oscuro de la v2 la forma canónica es el **blanco puro**. NO SE DEBE recolorear el propio logo
con el acento ni con ningún otro tono de la paleta, ni aplicarle resplandor, máscara de color o
degradado.

Racional: el acento cambia de versión a versión —ya ha cambiado una vez—, y un logo que lo
sigue deja de ser una marca estable. El resplandor magenta del prototipo `preview-v2` se
descarta por este motivo.

### V. Cero datos inventados (NO NEGOCIABLE)

Ninguna métrica de resultado, testimonio o cifra de cliente entra en el sitio sin que el usuario
la haya verificado explícitamente en el momento de implementar esa tarea. Si no hay dato
verificado, el bloque se omite entero: NO SE DEBE rellenar con un placeholder que pueda leerse
como un dato real (ni "+40 % de visitas", ni nombres de cliente ficticios, ni estrellas de
valoración de ejemplo).

Este principio gobierna expresamente el rediseño v2: la referencia visual de la que parte
—`domindez.com`— apoya buena parte de su estructura en una franja de cifras (7+ años, 150+
proyectos, 100+ clientes), un marquee de logos de clientes y un bloque de testimonios. Ninguno
de esos tres bloques se replica, porque JdDLabs no tiene los datos que los sostienen. Copiar la
estructura y rellenarla sería precisamente lo que este principio prohíbe.

Racional: un dato inventado en un portfolio de captación es una afirmación comercial falsa
frente a negocios reales de Rute.

### VI. Rendimiento y puntuación Lighthouse

Lighthouse DEBE puntuar 90 o más en Performance, Accessibility, Best Practices y SEO, tanto en
desktop como en móvil, antes de dar por completada cualquier tarea de UI. Una tarea con
cualquiera de las cuatro categorías por debajo de 90 no está terminada, en ninguna de las dos
plataformas.

### VII. Accesibilidad

Todo texto DEBE cumplir el contraste mínimo AA: 4,5:1 para texto normal y 3:1 para texto
grande (≥24px, o ≥18,66px en negrita). Todo control interactivo DEBE ser alcanzable y operable
por teclado, con foco visible. Las animaciones de scroll DEBEN respetar `prefers-reduced-motion`.

**Regla de los dos acentos** (NO NEGOCIABLE). El acento tiene dos tokens y no son
intercambiables:

- `accent` (`#F31A64`) se usa **como relleno**, siempre con `accent-ink` encima. Como texto
  solo se admite sobre `bg` y `bg-2`.
- `accent-2` (`#FF5C99`) es el acento **de texto** sobre cualquier superficie: enlaces, cifras,
  iconos, numeración de tarjetas, estados de foco.

Motivo: `accent` sobre las superficies elevadas `bg-3` y `bg-elev` cae a 4,35:1 y no llega a AA
para texto normal. `accent-2` pasa en las cuatro superficies. Confundir los dos tokens es un
fallo de accesibilidad, no una cuestión de gusto.

Los contrastes de la tabla de la sección "Referencia de tokens y assets" están verificados y se
vuelven a comprobar con una herramienta real ante cualquier cambio de un token.

### VIII. Despliegue automático

El despliegue es Cloudflare Pages conectado a un repositorio Git, con auto-deploy en cada push a
`main`. NO SE DEBEN usar comandos de despliegue manual: si el sitio en producción no se puede
reproducir desde `main`, el despliegue es inválido.

### IX. Sin analítica en el lanzamiento

En v1 no se instala ninguna herramienta de analítica. Cloudflare Web Analytics queda aparcado
para v2 y NO SE DEBE activar a medias por presión de plazo.

Racional: una analítica mal configurada añade superficie de cumplimiento RGPD sin aportar datos
fiables.

### X. Sin suite de tests automatizada

Al tratarse de un sitio estático de bajo riesgo, no se crea suite de tests. La puerta de calidad
es Lighthouse (principio VI) más la validación manual contra los criterios de aceptación de la
spec de cada feature. Añadir una suite de tests requiere enmienda MINOR.

### XI. Fecha límite dura: 2026-09-25

El sitio DEBE estar en producción el 25 de septiembre de 2026. Ante cualquier conflicto de
tiempo se recorta alcance —empezando por lo marcado como "recortable" en `tasks.md`— antes que
mover la fecha. Las puertas de calidad de los principios VI y VII no son recortables.

La fecha anterior era el 2026-09-21. Se movió cuatro días el 2026-09-20, por decisión explícita
del propietario, al aprobar el rediseño v2. Es el único motivo admisible por el que esta fecha
se ha movido y no sienta precedente: el siguiente conflicto de plazo se resuelve recortando.

### XII. Transparencia legal y RGPD

El sitio DEBE publicar una política de privacidad y un aviso legal accesibles desde el pie de
todas las páginas. El formulario de contacto DEBE exigir el consentimiento explícito del
visitante antes de permitir el envío, e informar del responsable, la finalidad del tratamiento,
los destinatarios y los derechos del interesado. Todos los encargados del tratamiento
—Cloudflare y Resend— DEBEN aparecer nombrados en la política de privacidad. Las credenciales
de Resend NO DEBEN viajar nunca al cliente.

Racional: es el mismo criterio que motiva el principio II, aplicado esta vez a los datos que el
propio sitio recoge. Un formulario de contacto sin esta información incumple el RGPD (art. 13) y
la LSSI desde el primer mensaje recibido.

## Referencia de tokens y assets

Valores canónicos. Los principios los referencian en lugar de repetirlos.

### Color

| Token | Valor | Rol |
|---|---|---|
| `bg` | `#0a0a0a` | Fondo base del documento |
| `bg-2` | `#111111` | Fondo de sección alterna |
| `bg-3` | `#181818` | Superficie de tarjeta |
| `bg-elev` | `#1f1f1f` | Superficie elevada (celda destacada del bento) |
| `fg` | `#F5F5F0` | Texto principal |
| `fg-dim` | `#A1A1A1` | Texto secundario, párrafos de apoyo |
| `fg-mute` | `#8A8A8A` | Eyebrows, metadatos, etiquetas |
| `fg-faint` | `#3A3A3A` | **Solo decorativo**: filetes, separadores. Nunca texto |
| `accent` | `#F31A64` | Relleno de acento (botones, badges). Ver principio VII |
| `accent-2` | `#FF5C99` | Acento de texto sobre cualquier superficie |
| `accent-ink` | `#0a0a0a` | Texto sobre relleno `accent` |
| `accent-dim` | `rgba(243,26,100,.15)` | Fondos tenues de badge |
| `accent-glow` | `rgba(243,26,100,.35)` | Resplandor de botón y foco |
| `border` | `rgba(255,255,255,.08)` | Filete estándar |
| `border-strong` | `rgba(255,255,255,.18)` | Filete de botón fantasma |
| `border-accent` | `rgba(243,26,100,.4)` | Filete en hover de tarjeta |

**Contrastes verificados** (calculados según WCAG 2.1 relative luminance el 2026-09-20; se
vuelven a comprobar con herramienta ante cualquier cambio de token):

| Par | `bg` `#0a0a0a` | `bg-2` `#111111` | `bg-3` `#181818` |
|---|---|---|---|
| `fg` `#F5F5F0` | 18,1:1 | 17,3:1 | 15,4:1 |
| `fg-dim` `#A1A1A1` | 7,7:1 | 7,3:1 | 6,9:1 |
| `fg-mute` `#8A8A8A` | 6,7:1 | 6,4:1 | 5,1:1 |
| `accent-2` `#FF5C99` | 6,8:1 | 6,5:1 | 6,1:1 |
| `accent` `#F31A64` | 4,8:1 | 4,6:1 | **4,4:1 ✗** |

`accent-ink` `#0a0a0a` sobre relleno `accent` `#F31A64`: **4,8:1** ✓ (AA texto normal).

La única celda que no pasa AA es `accent` como texto sobre `bg-3`, y es exactamente lo que la
regla de los dos acentos del principio VII prohíbe.

`fg-mute` es `#8A8A8A` y no el `#6B6B6B` de la referencia visual deliberadamente: ese valor da
3,7:1 sobre `#0a0a0a` y no llega a AA. La referencia lo usa igualmente en eyebrows a 13,6px;
aquí no se replica ese fallo.

### Tipografía

| Rol | Familia | Uso |
|---|---|---|
| Titulares y cuerpo | Space Grotesk Variable | `h1`–`h3`, párrafos, botones, navegación |
| Mono | JetBrains Mono Variable | Eyebrows de sección, cifras, metadatos, etiquetas de stack |

Escala fluida, en `tailwind.config.js` como única fuente de verdad:

| Paso | Valor |
|---|---|
| `fs-100` | `clamp(.75rem, .72rem + .15vw, .85rem)` |
| `fs-200` | `clamp(.85rem, .82rem + .18vw, .95rem)` |
| `fs-300` | `clamp(.95rem, .9rem + .25vw, 1.1rem)` |
| `fs-400` | `clamp(1.05rem, .98rem + .35vw, 1.25rem)` |
| `fs-500` | `clamp(1.25rem, 1.1rem + .7vw, 1.6rem)` |
| `fs-600` | `clamp(1.6rem, 1.3rem + 1.4vw, 2.4rem)` |
| `fs-700` | `clamp(2.2rem, 1.6rem + 2.8vw, 3.6rem)` |
| `fs-800` | `clamp(2.5rem, 1.44rem + 4.5vw, 5.5rem)` |
| `fs-900` | `clamp(3rem, 1.14rem + 8.45vw, 8.75rem)` |

Tratamiento de titular: peso 500, `letter-spacing: -0.04em` (−0.05em en `fs-900`),
`line-height: 0.9`, `text-wrap: balance`.
Tratamiento de eyebrow: mono 400, `fs-100`, `text-transform: uppercase`,
`letter-spacing: 0.16em`, color `fg-mute`.

### Ritmo y forma

| Token | Valor |
|---|---|
| `section-y` | `clamp(5rem, 9vw, 11rem)` |
| `gutter` | `clamp(1.25rem, 3.5vw, 4rem)` |
| `max-w` | `1440px` |
| `gap` | `clamp(.75rem, 1.2vw, 1.25rem)` |
| `radius-sm` | `8px` |
| `radius` | `14px` |
| `radius-lg` | `22px` |
| `radius-xl` | `32px` |
| `radius-pill` | `999px` |

### Movimiento

| Token | Valor |
|---|---|
| `ease-out` | `cubic-bezier(.22, 1, .36, 1)` |
| `ease-in-out` | `cubic-bezier(.65, 0, .35, 1)` |
| `ease-spring` | `cubic-bezier(.34, 1.56, .64, 1)` |
| `t-fast` | `.25s` |
| `t-base` | `.5s` |
| `t-slow` | `.9s` |

### Assets y build

- **Logo**: `JdDLogo_marca.svg`, en blanco puro sobre el fondo oscuro (principio IV).
- **Entradas de build Vite**: `index.html`, `caso-cristaleria.html`, `privacidad.html`,
  `aviso-legal.html` y `404.html`.

**Servicios externos** (los únicos admitidos; añadir otro es enmienda MINOR):

| Servicio | Uso |
|---|---|
| Cloudflare Pages | Hosting estático y auto-deploy desde `main` |
| Cloudflare Pages Functions | Endpoint del formulario de contacto, y nada más |
| Resend | Envío transaccional del mensaje del formulario |

**Datos de contacto canónicos** (verificados por el propietario; ninguna tarea debe adivinarlos
ni sustituirlos por un placeholder):

| Canal | Valor |
|---|---|
| Teléfono | `+34 666 67 78 38` |
| WhatsApp | `+34 666 67 78 38` |
| Domicilio | `Calle Francisco Salto 29, 1 Rute (Córdoba)` |
| Razón social | `Juan de Dios Pérez Moreno` |
| NIF | `50627812M` |
| Email | `hola@jddlabs.dev` |

## Puertas de calidad y flujo de trabajo

Definición de "hecho" para una tarea de UI. Se cumplen las siete, en orden:

1. `npm run build` termina sin errores ni warnings nuevos.
2. Lighthouse ≥ 90 en las cuatro categorías, en desktop y en móvil.
3. Repaso manual contra los criterios de aceptación de la spec de la feature.
4. La pestaña Red no muestra ninguna petición a dominios de Google Fonts.
5. Todo dato mostrado está verificado por el usuario (principio V).
6. Ninguna credencial de Resend ni de ningún otro servicio aparece en el bundle del cliente ni
   en el repositorio: el bundle publicado se inspecciona para confirmarlo.
7. Ningún literal de color fuera de `tailwind.config.js` (principio III): se comprueba con
   `grep -rnE '#[0-9a-fA-F]{3,8}' src/ --include=*.jsx --include=*.css`, cuya única salida
   admisible es la propia definición de tokens.

Reglas de proceso:

- El gate Constitution Check de `plan-template.md` DEBE evaluarse contra los doce principios
  antes de Phase 0 y de nuevo tras Phase 1.
- Toda violación consciente va a la tabla Complexity Tracking del plan, con la alternativa más
  simple descartada y el motivo. Sin fila, no hay violación admisible.
- Toda la comunicación del proyecto y todo el contenido del sitio, en español.
- Ante presión de plazo se recorta alcance, nunca una puerta de calidad.

## Governance

Esta constitución prevalece sobre cualquier otra práctica del proyecto.

**Procedimiento de enmienda**: la modificación se propone sobre este fichero, se documenta en el
Sync Impact Report de la cabecera, la aprueba Juan explícitamente y se aplica en un único commit.

**Política de versionado** (semántico):

- **MAJOR**: eliminar o redefinir un principio de forma incompatible, incluido cambiar el stack
  fijo del principio I o abrir la paleta del principio III.
- **MINOR**: añadir un principio o una sección, o ampliar la guía de forma material (por
  ejemplo, introducir una suite de tests, o añadir una tercera familia tipográfica).
- **PATCH**: aclaraciones de redacción, correcciones tipográficas y refinamientos no semánticos.

**Revisión de cumplimiento**: en cada ejecución de `/speckit-plan` y de `/speckit-analyze`.

**Version**: 3.0.0 | **Ratified**: 2026-09-08 | **Last Amended**: 2026-09-21
