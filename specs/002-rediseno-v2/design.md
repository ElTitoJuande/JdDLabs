# Rediseño v2 — Sistema visual

**Feature**: 002-rediseno-v2
**Fecha**: 2026-09-20
**Estado**: propuesta, pendiente de revisión por el propietario
**Referencia visual**: `https://domindez.com/` (Domindez Studio, Málaga), analizada el
2026-09-20 con navegador headless: DOM, estilos computados y variables CSS del `:root`.
**Constitución aplicable**: v3.2.0 (`.specify/memory/constitution.md`, última enmienda 2026-09-24)

---

## 1. Decisión de partida

El propietario ha decidido el 2026-09-20: **mantener la apariencia de la referencia,
sustituyendo su acento lima `#C3FF00` por el magenta de marca `#F31A64`**.

Eso fija tres cosas que en la conversación previa estaban abiertas:

| Decisión | Valor | Consecuencia |
|---|---|---|
| Acento | Magenta `#F31A64` + rosa `#FF5C99` | Enmienda del principio III |
| Titulares y cuerpo | Space Grotesk Variable | Fraunces e Inter se retiran (principio II) |
| Eyebrows y cifras | JetBrains Mono Variable | Sustituye a Inter |
| Énfasis de titulares | Instrument Serif, cursiva 400 | Tercera familia (3.1.0); desde 3.2.0, `h1` del hero y cierre de los `h2` de sección |

## 2. Qué se toma de la referencia y qué no

### Se toma (es sistema de diseño, no contenido)

- Superficie oscura continua con alternancia `#0a0a0a` / `#111111`.
- Escala de grises de cuatro niveles en lugar de dos.
- Escala tipográfica fluida de nueve pasos con `clamp()`.
- Titulares grandes en peso 500 con tracking negativo y `line-height: 0.9`.
- Eyebrow monoespaciado en versalitas sobre cada título de sección.
- Ritmo vertical `clamp(5rem, 9vw, 11rem)`.
- Contenedor de 1440px con gutter fluido.
- Botones pill, radios de 8/14/22/32/999.
- Bento asimétrico para los servicios.
- Tarjeta de proyecto con número superpuesto, categoría y año.
- Marquee de capacidades.
- Tokens de easing y duración con nombre.

### Tokens de espaciado

| Token | Valor | Uso |
|---|---|---|
| `spacing.section` | `clamp(5rem, 9vw, 11rem)` | Ritmo vertical de sección: 80px a 375, 130px a 1440 |
| `spacing.gutter` | `clamp(1.25rem, 3.5vw, 4rem)` | Gutter del contenedor: 20px a 375, 64px a 1440 |
| `spacing.header` | `4.5rem` (72px) | Alto de la cabecera fija y compensación de `main` y anclas; fijo, no se mide |

### No se toma (choca con el principio V: cero datos inventados)

| Bloque de la referencia | Por qué no |
|---|---|
| Franja de cifras (7+ años, 150+ proyectos, 100+ clientes) | JdDLabs no tiene esas cifras verificadas |
| Marquee de logos de clientes | Un cliente publicable |
| Bloque de testimonios | `copy.js` documenta que `testimonio` no existe a propósito |
| Rejilla de 8 proyectos + "Ver más proyectos" | Un proyecto |

### No se toma (choca con el principio VII: accesibilidad)

| Detalle de la referencia | Por qué no | Qué se hace en su lugar |
|---|---|---|
| `--fg-mute: #6b6b6b` en eyebrows a 13,6px | 3,7:1 sobre `#0a0a0a`, no llega a AA | `fg-mute: #8A8A8A`, 6,7:1 |
| Acento como texto sobre tarjetas | 4,4:1 sobre `#181818` | Regla de los dos acentos (principio VII) |

### No se toma (choca con el principio IV: integridad del logo)

El prototipo `preview-v2` pinta el monograma en magenta con `mask-image` y `drop-shadow`. Se
descarta: el logo va en blanco puro. El color de marca del bloque lo lleva un filete vertical
`accent` entre monograma y wordmark (constitución 3.2.0), que no es parte del logo. El
resplandor magenta se reserva para botones y foco.

## 3. Inventario de secciones de la portada

Ocho secciones. La referencia tiene once y 15.710px de alto; esta tendrá siete u ocho y en
torno a 9.000px, porque no se rellenan huecos con contenido que no existe.

| # | Sección | Eyebrow | Fondo | Origen del contenido | Estado |
|---|---|---|---|---|---|
| 1 | Hero | `JUAN DE DIOS · DESARROLLADOR INDEPENDIENTE` · `RUTE, CÓRDOBA` | `bg` | `copy.js` → `hero` | Copy existente |
| 2 | Marquee de capacidades | — | `bg-2` | Derivado de `servicios` | Copy existente |
| 3 | Proyecto destacado | `TRABAJO SELECCIONADO` | `bg` | `copy.js` → `proyecto` | Copy existente |
| 4 | Servicios (bento) | `SERVICIOS` | `bg-2` | `copy.js` → `servicios` | Copy existente |
| 5 | Stack | `TECNOLOGÍA` | `bg` | `copy.js` → `proyecto.tecnologias` | Copy existente |
| 6 | Proceso | `PROCESO` | `bg-2` | **No existe** | ⚠️ Requiere copy nuevo |
| 7 | Sobre mí | `SOBRE MÍ` | `bg` | `copy.js` → `sobreMi` | Copy existente |
| 8 | Contacto | `CONTACTO` | `bg-2` | `copy.js` → `contacto` | Copy existente |

**Orden vigente (decisión del propietario, 2026-09-23)**: Inicio → Servicios → Proyecto
destacado → Sobre mí → Contacto, en la portada y en la navegación (`secciones` en `copy.js`).
Sustituye al orden de FR-001 de la spec 001, que abría con el proyecto. Los fondos se
intercambian con el orden para que la alternancia `bg` / `bg-2` siga intacta tras el marquee:
Servicios pasa a `bg` y Proyecto destacado a `bg-2`.

**La sección 6 es la única que necesita contenido nuevo y es recortable.** Son tres o cuatro
pasos del proceso real de trabajo de Juan (p. ej. "Hablamos" → "Propuesta y presupuesto" →
"Diseño y desarrollo" → "Publicación y acompañamiento"). No es un dato verificable en el sentido
del principio V —es una descripción de cómo trabaja, no una métrica—, pero **lo tiene que
escribir Juan**: ninguna tarea del plan lo inventa. Si el viernes llega sin ese copy, la sección
se cae y el sitio publica con siete.

## 4. Anatomía de los componentes

Medidas tomadas de los estilos computados de la referencia a 1440px de viewport.

### 4.1 Cabecera

Fija, altura `spacing.header` (4,5rem). Tiene dos estados:

- **Arriba del todo**: transparente y sin filete. El hero empieza en y=0 por detrás de ella,
  así que el halo pasa sin quedar cortado.
- **Con scroll**: `bg/75`, `backdrop-blur` y filete inferior `border`.

Contenido: a la izquierda, monograma blanco de 32px, filete vertical de 1px en `accent` y
wordmark («JdD» bold `fg`, «Labs» regular `fg` al 60 %), sin cambios de estado; navegación centrada en enlaces de `fs-200` color
`fg-dim` con padding 8/16 y radio pill en hover, y CTA pill a la derecha en tamaño `sm` (~46px)
con el texto «Hablemos» y flecha, variante `brillo` de `Boton`: botón de cristal oscuro
(2026-09-24, adaptado de un componente de referencia del propietario). `bg-3` con filete
`border-accent`, brillos interiores de `fg` en capas y anillo exterior de sombras; icono de
destellos en `accent-2` que parpadea, y letras con una onda de brillo escalonada 80ms (de
`fg-dim` a `fg` con destello `accent-2`). En hover y foco: filete `accent`, brillos interiores
teñidos de `accent-2` desde abajo y resplandor fino en el borde inferior. Contraste medido de
la letra en su punto más apagado: 5,72:1 en el peor caso. Con movimiento reducido no hay onda
ni parpadeo. La flecha es CSS (`.flecha`): en reposo solo la punta, «›»; en hover y foco
aparece el asta y la punta avanza 3px hasta formar «→». El menú móvil y el hero usan el mismo
CTA.

### 4.2 Hero

Rehecho el 2026-09-23 sobre la referencia de Domindez, medida con navegador headless.

- Empieza en y=0 por detrás de la cabecera (`pt-header`) y **sin altura mínima**: con el
  contenido arriba, una altura de ventana dejaba un vacío que la referencia rellena con cifras
  que aquí no existen (principio V). El marquee sube justo debajo de los CTAs.
- Aire vertical con el token `spacing.hero` (`clamp(3rem, 5vw, 5rem)`: 48px a 375, 72px a 1440).
- Fila de eyebrows: raya de 28px en `accent` + «Juan de Dios · Desarrollador independiente» a la
  izquierda, lugar a la derecha. Por debajo de `sm` el eyebrow se parte por el punto (nombre y
  rol en dos líneas); por debajo de `md` el lugar se oculta, porque junto al eyebrow no cabe
  hasta 768px y Rute ya está en el title, la meta description, el JSON-LD, Contacto y el pie.
- `h1` a `fs-900` (117,6px a 1440, 40px a 375), peso 500, `letter-spacing: -0.05em`,
  `line-height: 0.9`, dos líneas desde 375 hasta 1920. Énfasis en Instrument Serif cursiva 400:
  «para» en `fg-dim`, «pymes y autónomos» en `accent-2`. El texto del `h1` no cambia.
- Subtítulo a `fs-400`, color `fg-dim`, `max-width: 38rem`, a la izquierda: «Tu negocio merece
  una web que venda, no una plantilla más. Diseño y desarrollo a medida, de principio a fin. De
  lo técnico me encargo yo; tú, de lo tuyo.» (copy del propietario, sustituye al de FR-002 de la
  spec 001). Las dos acciones a la derecha en la misma fila desde `md`: la principal con la
  variante `brillo`, igual que el CTA de cabecera, y la fantasma. En móvil, apilados.
- Bajo los CTAs, tras un filete: tres compromisos con cifra mono `fs-600` en `fg` y etiqueta
  eyebrow — «1 · Interlocutor, del primer café al lanzamiento», «0 · Plantillas. Código escrito
  para tu negocio», «<24 h · Respuesta por WhatsApp». Cifras dadas y verificadas por el
  propietario el 2026-09-23 (principio V). Tres columnas con filete vertical desde `sm`; en
  móvil, filas con la cifra a la izquierda. «<24 h» se lee como «Menos de 24 horas».
- Halo radial de `accent-glow` como decoración de fondo, `pointer-events: none`.
- Verificado: CTAs sin scroll de 375×667 a 1920×1080. Única excepción, 320×568: el segundo CTA
  queda 2px por debajo del borde.

### 4.3 Marquee de capacidades

Banda a `bg-2`, catorce términos en mono `fs-600` (38px a 1440) en `fg`, separados por `✦` en
`accent-2`; 139px de alto a 1440 (antes 73px, con letra de 13,6px). Animación `translateX`
infinita, `130s`, `linear`: con catorce términos cada copia mide 5538px y 130s la mantiene a
~42px/s, la velocidad de la versión original. Dos copias del track para el bucle.
Pausa en `:hover` y anulada entera bajo `prefers-reduced-motion`.

### 4.4 Título de sección

```
—— EYEBROW MONO                 ← raya 28px en accent + fs-100, mono, uppercase, ls .16em, fg-mute
Titular en dos líneas.          ← fs-800, peso 500, ls -.04em, lh .9, fg
```

El titular lleva punto final, como en la referencia. `margin-top` entre eyebrow y titular: 24px.
El cierre de cada titular va en Instrument Serif cursiva `accent-2` (constitución 3.2.0): «Lo que
*hago.*», «Un proyecto, *contado entero.*», «Las herramientas *que uso.*», «La misma persona, *de
principio a fin.*», «¿Hablamos de *tu proyecto?*». El cierre vive en `titulares.*.enfasis`.
La raya `accent` delante del eyebrow (2026-09-23) es la misma del hero: el indicador de marca de
cada apertura, en `TituloSeccion` y en un solo sitio.

### 4.5 Servicios: índice editorial

Rehecho el 2026-09-23. Con tres servicios el bento dejaba ~300px vacíos en la celda doble, así
que cada servicio pasa a ser una fila a todo el ancho, separada por filetes: número mono
(`fg-mute`, `accent-2` en hover), título `fs-700`, descripción `fs-300` en `fg-dim` con sus
claves, y flecha en círculo que se rellena de `accent` en hover y foco. La fila entera enlaza a
Contacto. Claves: recortes literales de la descripción, en píldora `accent-dim` con filete
`border-accent`, punto `accent-2` y texto `fg`. En móvil, apilado con la flecha arriba.

### 4.6 Proyecto destacado

Rehecho el 2026-09-23 en dos columnas (`1.15fr / 1fr` desde `md`, apilado en móvil):

- **Izquierda**: captura 3:2 con radio 22px y filete `border`; número `01` mono `accent-2` en
  píldora abajo a la derecha, donde no tapa nada de la captura. La imagen no es enlace.
- **Derecha**: año / categoría en mono `fg-mute`, título `fs-700`, descripción completa en
  `fg-dim`, y los dos destinos: «Visitar en vivo» (botón fantasma con un punto `accent-2` que
  late, externo) y «Ver caso de estudio» (enlace `accent-2` con la flecha de los CTAs).

**Cambio respecto a la primera v2**: la tarjeta entera enlazaba al caso de estudio y «Visitar
en vivo» vivía solo dentro del caso. El propietario pide el indicador de en vivo aquí, así que
vuelven los dos destinos, cada uno con su peso.

### 4.7 Stack

Lista de etiquetas mono a `fs-200`, color `fg-dim`, sobre píldoras `bg-3` con filete `border`.
Lee `proyecto.tecnologias` (React, Vite, Tailwind, Cloudflare). Sustituye funcionalmente a la
franja de cifras de la referencia: ocupa ese hueco del ritmo sin afirmar nada que no sea cierto.

### 4.8 Contacto

Dos columnas. Izquierda: los tres canales directos como filas con filete, etiqueta mono
`fg-mute` y valor `fg` que pasa a `accent-2` en hover. Derecha: el formulario, con campos de
fondo `bg-3`, filete `border` → `accent` en `:focus`, radio 8px, y botón de envío pill `accent`.

## 5. Movimiento

| Efecto | Alcance | Recortable |
|---|---|---|
| Reveal on scroll con stagger | Ya existe `Reveal.jsx`; se le añade retardo escalonado | No |
| Marquee | Sección 2 | No |
| Hover de filete en tarjetas | Bento y proyecto | No |
| Botones magnetic | Los cuatro CTAs principales | Sí |
| Grain overlay | Documento entero | Sí |
| Cursor personalizado | Documento entero, solo puntero fino | Sí |

Todo bajo `prefers-reduced-motion: reduce` se anula. El contenido **nunca** queda invisible
esperando una animación: ésa es la regla que ya cumple `Reveal.jsx` en v1 y que se conserva.

## 6. Alcance de páginas

El rediseño alcanza las cinco páginas, no solo la portada. `caso-cristaleria.html`,
`privacidad.html`, `aviso-legal.html` y `404.html` comparten cabecera, pie y tokens, así que
heredan el sistema; lo que necesitan es revisión, no rediseño propio.

## 7. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Space Grotesk + JetBrains Mono variables pesan más que Inter | Performance < 90 | Subconjunto latino, `font-display: swap`, medir en T003 antes de seguir |
| Titulares a `fs-900` desbordan en móvil | Layout roto | La escala es `clamp()`; se comprueba a 320px en cada tarea |
| El magenta a 4,8:1 rinde menos que el lima a 17:1 | El sitio "grita" menos que la referencia | `accent-glow` compensa la luminancia; `accent-2` para texto |
| El copy del proceso no llega | Sección 6 vacía | Es recortable por diseño; se publica con siete secciones |
| Un token de color se cuela como literal | Incumple principio III | Gate 7 de la constitución: `grep` en cada cierre de tarea |

## 8. Criterios de aceptación

- **AC-01**: ninguna página publicada presenta fondo claro; el documento es oscuro continuo.
- **AC-02**: `grep -rnE '#[0-9a-fA-F]{3,8}' src/` solo devuelve la definición de tokens.
- **AC-03**: no hay ninguna petición a `fonts.googleapis.com` ni a `fonts.gstatic.com`.
- **AC-04**: no queda ninguna referencia a Fraunces ni a Inter en el repositorio ni en el bundle.
- **AC-05**: Lighthouse ≥ 90 en las cuatro categorías, desktop y móvil, en las cinco páginas.
- **AC-06**: todos los pares de color en uso pasan AA, verificado con herramienta.
- **AC-07**: el monograma se sirve en blanco puro, sin recolorear; el acento solo en el filete
  entre monograma y wordmark, nunca en el wordmark.
- **AC-08**: con `prefers-reduced-motion: reduce` no hay movimiento y todo el contenido es visible.
- **AC-09**: el sitio es navegable entero por teclado con foco visible en cada control.
- **AC-10**: ninguna cifra, testimonio o nombre de cliente que no estuviera ya en `copy.js`.
