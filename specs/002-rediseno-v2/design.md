# Rediseño v2 — Sistema visual

**Feature**: 002-rediseno-v2
**Fecha**: 2026-09-20
**Estado**: propuesta, pendiente de revisión por el propietario
**Referencia visual**: `https://domindez.com/` (Domindez Studio, Málaga), analizada el
2026-09-20 con navegador headless: DOM, estilos computados y variables CSS del `:root`.
**Constitución aplicable**: v3.0.0 (`.specify/memory/constitution.md`, ratificada el 2026-09-23)

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
| Énfasis del `h1` del hero | Instrument Serif, cursiva 400 | Tercera familia, enmienda 3.1.0 (2026-09-23), uso cerrado al hero |

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
descarta: el logo va en blanco puro. El resplandor magenta se reserva para botones y foco.

## 3. Inventario de secciones de la portada

Ocho secciones. La referencia tiene once y 15.710px de alto; esta tendrá siete u ocho y en
torno a 9.000px, porque no se rellenan huecos con contenido que no existe.

| # | Sección | Eyebrow | Fondo | Origen del contenido | Estado |
|---|---|---|---|---|---|
| 1 | Hero | `DESARROLLO WEB` · `RUTE, CÓRDOBA` | `bg` | `copy.js` → `hero` | Copy existente |
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

Contenido: logo + wordmark a la izquierda, navegación centrada en enlaces de `fs-200` color
`fg-dim` con padding 8/16 y radio pill en hover, y CTA pill a la derecha en tamaño `sm` (~46px)
con el texto «Hablemos →», variante `brillo` de `Boton`: relleno `accent` con un halo desenfocado
(`accent → accent-ink → accent`, opacidad 0,75) que oscurece el centro y gira sin parar, texto
`fg`. El disco mide `max(10rem, 110%)` para cubrir también el CTA del hero, más ancho. En hover
el halo encoge y aparece `shadow-glow`; la flecha se separa 4px en hover y foco. Con movimiento
reducido no gira nada. El menú móvil usa el mismo CTA.

### 4.2 Hero

Rehecho el 2026-09-23 sobre la referencia de Domindez, medida con navegador headless.

- Empieza en y=0 por detrás de la cabecera (`pt-header`) y **sin altura mínima**: con el
  contenido arriba, una altura de ventana dejaba un vacío que la referencia rellena con cifras
  que aquí no existen (principio V). El marquee sube justo debajo de los CTAs.
- Aire vertical con el token `spacing.hero` (`clamp(3rem, 5vw, 5rem)`: 48px a 375, 72px a 1440).
- Fila de eyebrows: raya de 28px en `accent` + posicionamiento a la izquierda, lugar a la derecha.
- `h1` a `fs-900` (117,6px a 1440, 40px a 375), peso 500, `letter-spacing: -0.05em`,
  `line-height: 0.9`, dos líneas desde 375 hasta 1920. Énfasis en Instrument Serif cursiva 400:
  «para» en `fg-dim`, «pymes y autónomos» en `accent-2`. El texto del `h1` no cambia.
- Subtítulo a `fs-400`, color `fg-dim`, `max-width: 38rem`, a la izquierda: «Tu negocio merece
  una web que venda, no una plantilla más. Diseño y desarrollo a medida, de principio a fin. De
  lo técnico me encargo yo; tú, de lo tuyo.» (copy del propietario, sustituye al de FR-002 de la
  spec 001). Las dos acciones a la derecha en la misma fila desde `md`: la principal con la
  variante `brillo`, igual que el CTA de cabecera, y la fantasma. En móvil, apilados.
- Halo radial de `accent-glow` como decoración de fondo, `pointer-events: none`.
- Verificado: CTAs sin scroll de 375×667 a 1920×1080. Única excepción, 320×568: el segundo CTA
  queda 2px por debajo del borde.

### 4.3 Marquee de capacidades

Banda a `bg-2`, padding vertical 32px, sin filete. Términos separados por `✦` en `accent-2`.
Animación `translateX` infinita, duración `60s`, `linear`. Dos copias del track para el bucle.
Pausa en `:hover` y anulada entera bajo `prefers-reduced-motion`.

### 4.4 Título de sección

```
EYEBROW MONO                    ← fs-100, mono, uppercase, ls .16em, fg-mute
Titular en dos líneas.          ← fs-800, peso 500, ls -.04em, lh .9, fg
```

El titular lleva punto final, como en la referencia. `margin-top` entre eyebrow y titular: 24px.

### 4.5 Bento de servicios

Rejilla de 3 columnas, `gap: 16px`. La primera celda ocupa `span 2 / span 2` (destacada):
fondo `bg-elev`, radio 22px, padding 36px, título a `fs-600`. Las demás: fondo `bg-3`, radio
22px, padding 28px, título a `fs-500`. Filete `border` en todas; en hover pasa a `border-accent`.

Con tres servicios: una celda destacada + dos normales. Por debajo de 768px, una columna y todas
las celdas iguales.

### 4.6 Tarjeta de proyecto

```
┌────────────────────────────┐
│  [imagen 3:2]        (01)  │  ← número: mono fs-100, accent-2,
│                            │     píldora rgba(0,0,0,.75), abs. arriba-dcha
├────────────────────────────┤
│  Cristalería Ruteña   2026 │  ← h3 fs-500 + año mono fg-mute
│  VIDRIO Y ALUMINIO         │  ← categoría mono fg-mute
│  Contexto en una línea…    │  ← fs-300 fg-dim
└────────────────────────────┘
```

Fondo `bg-3`, radio 22px, filete `border` → `border-accent` en hover. Marco de imagen con
`aspect-ratio: 3/2` y fondo `bg-elev` mientras carga.

**Cambio respecto a v1**: hoy la tarjeta tiene dos CTAs compitiendo ("Visitar en vivo" y "Ver
caso de estudio"). En v2 **toda la tarjeta es un enlace al caso de estudio**, y "Visitar en
vivo" pasa a ser un enlace secundario dentro de la página del caso. Un destino primario por
tarjeta.

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
- **AC-07**: el monograma se sirve en blanco puro, sin recolorear.
- **AC-08**: con `prefers-reduced-motion: reduce` no hay movimiento y todo el contenido es visible.
- **AC-09**: el sitio es navegable entero por teclado con foco visible en cada control.
- **AC-10**: ninguna cifra, testimonio o nombre de cliente que no estuviera ya en `copy.js`.
