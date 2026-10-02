<!--
Sync Impact Report
- Cambio de versión: 3.5.0 → 3.6.0
- Motivo del MINOR: se sustituyen las familias tipográficas, como en la 3.3.0.
- Principios modificados:
  - II. Fuentes auto-alojadas: IBM Plex (Sans, Mono, Serif) → Inter Variable (titulares) y
    Roboto Variable (texto), solo subconjunto latino. Ratifica lo que ya publicaba el
    rediseño de a5ca955; el propietario decide el 2026-10-02 que prevalece la web.
- Secciones modificadas: "Referencia de tokens y assets" → Tipografía.
- Pendiente (no tocado en esta enmienda): principios III y IV siguen describiendo la paleta
  oscura continua y el wordmark sin acento, que la web publicada tampoco cumple.

Historial
- 1.0.0 (2026-09-08): primera ratificación formal, once principios.
- 2.0.0 (2026-09-08): funciones serverless acotadas al formulario; principio XII.
- 3.0.0 (2026-09-23): rediseño v2. Paleta oscura, nuevas familias tipográficas, nueva
  fecha límite. Propuesta el 2026-09-21 y ratificada por Juan el 2026-09-23 (T001).
- 3.1.0 (2026-09-23): tercera familia, Instrument Serif, solo para el énfasis del titular
  del hero; `fs-900` baja a 7,35rem para que el titular quepa en dos líneas.
- 3.2.0 (2026-09-24): la serif de énfasis llega al cierre de los `h2` de sección; guía del
  wordmark y del filete `accent` junto al monograma, que sigue en blanco puro.
- 3.3.0 (2026-09-30): las tres familias pasan a IBM Plex (Sans, Mono y Serif); los
  titulares van en Plex Mono.
- 3.4.0 (2026-10-01): paleta verde en lugar de la magenta; contrastes recalculados y
  `fg-mute` subido a `#A5B1AB` para pasar AA en las cuatro superficies.
- 3.5.0 (2026-10-01): la serif de énfasis llega al nombre del cliente en el `h3` de
  Proyecto destacado; se retira la Plex Mono cursiva 500.
- 3.6.0 (2026-10-02): Inter + Roboto sustituyen a IBM Plex; se retira la serif de énfasis.
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

Dos familias, auto-alojadas a partir de los ficheros de `@fontsource-variable` y declaradas
en `src/styles/index.css` con `@font-face` propio, **solo en subconjunto latino** (cubre el
español entero):

- **Inter Variable** (`@fontsource-variable/inter`) para titulares `h1`–`h3`, el wordmark y
  las cifras grandes. Clase Tailwind `font-display`.
- **Roboto Variable** (`@fontsource-variable/roboto`) para cuerpo, botones, navegación,
  formularios y etiquetas. Clase Tailwind `font-sans`.

NO DEBE existir ninguna petición a `fonts.googleapis.com` ni a `fonts.gstatic.com` en ninguna
página publicada. NO SE DEBE añadir una tercera familia sin enmienda MINOR, ni importar los
ficheros `wght.css` completos de `@fontsource`, que arrastran cirílico, griego y vietnamita.

IBM Plex (Sans, Mono y Serif) queda retirada en la 3.6.0 y sus dependencias se eliminan del
repositorio, como antes Space Grotesk, JetBrains Mono, Instrument Serif y Fraunces en
versiones anteriores. Una fuente que ya no se usa pero se sigue sirviendo es peso muerto que compite con el
principio VI.

Racional: la carga desde Google transfiere la IP del visitante sin consentimiento previo y ha
sido sancionada por tribunales europeos. Es un riesgo legal, no una preferencia técnica. El
corte variable se prefiere al estático porque un único fichero cubre todos los pesos que el
diseño usa.

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

Wordmark junto al monograma: "JdD" en bold y `fg`; "Labs" en regular y `fg` al 60 % de
opacidad. Entre ambos, un filete vertical de 1px en `accent`: es el único punto de color de
marca del bloque y no forma parte del logo, así que el monograma sigue sin recolorear. NO SE
DEBE colorear el wordmark con el acento.

Racional: el acento cambia de versión a versión —ya ha cambiado una vez—, y un logo que lo
sigue deja de ser una marca estable. El resplandor magenta del prototipo `preview-v2` se
descarta por este motivo. El filete lleva el color sin tocar el logo: si el acento cambia, el
monograma no.

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

- `accent` se usa **como relleno**, siempre con `accent-ink` encima.
- `accent-2` es el acento **de texto** sobre cualquier superficie: enlaces, cifras, iconos,
  numeración de tarjetas, estados de foco.

Con la paleta verde los dos tokens valen lo mismo (`#45E0B0`), que como texto pasa AA en las
cuatro superficies (6,0:1 en el peor caso, `bg-elev`). La regla se mantiene igual: el código
declara la intención con el token y no con el valor, y una paleta futura puede volver a
separarlos sin tocar componentes. La paleta magenta los separaba porque su relleno caía a
4,4:1 sobre `bg-3`.

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
| `bg` | `#0B2A22` | Fondo base del documento |
| `bg-2` | `#12382F` | Fondo de sección alterna |
| `bg-3` | `#174539` | Superficie de tarjeta |
| `bg-elev` | `#1B4A3E` | Superficie elevada (celda destacada del bento) |
| `fg` | `#F5F6F1` | Texto principal |
| `fg-dim` | `#BAC3BD` | Texto secundario, párrafos de apoyo |
| `fg-mute` | `#A5B1AB` | Eyebrows, metadatos, etiquetas |
| `fg-faint` | `rgba(69,224,176,.25)` | **Solo decorativo**: filetes, separadores. Nunca texto |
| `accent` | `#45E0B0` | Relleno de acento (botones, badges). Ver principio VII |
| `accent-2` | `#45E0B0` | Acento de texto sobre cualquier superficie |
| `accent-ink` | `#15201C` | Texto sobre relleno `accent` |
| `accent-dim` | `rgba(69,224,176,.15)` | Fondos tenues de badge |
| `accent-glow` | `rgba(69,224,176,.35)` | Resplandor de botón y foco |
| `border` | `rgba(69,224,176,.15)` | Filete estándar |
| `border-strong` | `rgba(69,224,176,.3)` | Filete de botón fantasma |
| `border-accent` | `rgba(69,224,176,.4)` | Filete en hover de tarjeta |

**Contrastes verificados** (calculados según WCAG 2.1 relative luminance el 2026-10-01; se
vuelven a comprobar con herramienta ante cualquier cambio de token):

| Par | `bg` `#0B2A22` | `bg-2` `#12382F` | `bg-3` `#174539` | `bg-elev` `#1B4A3E` |
|---|---|---|---|---|
| `fg` `#F5F6F1` | 14,1:1 | 11,8:1 | 9,9:1 | 9,2:1 |
| `fg-dim` `#BAC3BD` | 8,5:1 | 7,1:1 | 6,0:1 | 5,5:1 |
| `fg-mute` `#A5B1AB` | 6,9:1 | 5,8:1 | 4,9:1 | 4,5:1 |
| `accent` / `accent-2` `#45E0B0` | 9,2:1 | 7,7:1 | 6,4:1 | 6,0:1 |

`accent-ink` `#15201C` sobre relleno `accent` `#45E0B0`: **10:1** ✓ (AA texto normal).

Todas las celdas pasan AA para texto normal. La más justa es `fg-mute` sobre `bg-elev`
(4,5:1): `fg-mute` es el texto claro al 66 % sobre `bg` y no al 60 % (`#97A49E`), que daba
4,2:1 sobre `bg-3` y 3,9:1 sobre `bg-elev`.

`border` (el acento al 15 %) es solo decorativo: queda a 1,4:1 sobre el fondo y no sirve como
borde de un control de formulario, que necesita 3:1 (WCAG 1.4.11). Los campos usan `fg-mute`.

### Tipografía

| Rol | Familia | Uso |
|---|---|---|
| Titulares | Inter Variable | `h1`–`h3`, wordmark «JdDLabs», cifras grandes |
| Texto | Roboto Variable | Párrafos, botones, navegación, formularios, eyebrows y etiquetas |

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
| `fs-800` | `clamp(2.2rem, 1.53rem + 2.82vw, 4.05rem)` |
| `fs-900` | `clamp(2.5rem, 1.44rem + 4.5vw, 5.5rem)` |

Los tratamientos concretos (peso, tracking, interlineado) viven en `src/styles/index.css`;
el tracking de titular no baja de −0.06em.

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

- **Logo**: `JdDLogo_marca.svg`, en blanco puro sobre el fondo oscuro, con filete `accent` y
  wordmark en la cabecera (principio IV).
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

**Version**: 3.6.0 | **Ratified**: 2026-09-08 | **Last Amended**: 2026-10-02
