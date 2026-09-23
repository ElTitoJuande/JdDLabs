# Rediseño v2 — Plan de implementación

> **Para quien ejecute esto (persona o agente):** las tareas van en orden y cada una acaba en un
> commit. No se empieza una tarea sin haber cerrado la anterior con su puerta de calidad.

**Objetivo**: llevar el portfolio de JdDLabs de la paleta clara de v1 a un sistema visual oscuro
con acento magenta, tomando la apariencia de `domindez.com` y sustituyendo su lima por
`#F31A64`, sin incorporar ni un dato que JdDLabs no tenga verificado.

**Arquitectura**: no cambia el stack. Sigue siendo React + Vite + Tailwind multi-página, con las
mismas cinco entradas de build. El rediseño es un cambio de tokens en `tailwind.config.js`, una
capa base nueva en `src/styles/index.css`, tres componentes compartidos nuevos y la reescritura
del marcado de las secciones existentes. Ni un fichero nuevo en `functions/`, ni una dependencia
de runtime nueva más allá de las dos fuentes.

**Stack**: React 18, Vite 5, Tailwind 3, `@fontsource-variable/space-grotesk`,
`@fontsource-variable/jetbrains-mono`, Cloudflare Pages.

**Spec**: `specs/002-rediseno-v2/design.md`
**Enmienda constitucional**: `specs/002-rediseno-v2/constitution-v3-propuesta.md`

## Nota sobre TDD

El flujo de trabajo estándar pide test antes de implementación. **Aquí no aplica**: el principio
X de la constitución prohíbe expresamente crear una suite de tests en este proyecto, y la puerta
de calidad es `npm run build` + Lighthouse + repaso manual. Cada tarea cierra con esa puerta en
lugar de con un ciclo rojo-verde. Es una desviación consciente y está autorizada por la propia
constitución, no un olvido.

## Global Constraints

Aplican a **todas** las tareas. Copiadas literalmente de la constitución v3.0.0:

- **Paleta cerrada**: solo los dieciséis tokens de la tabla. Cero literales de color en JSX o
  CSS. El CSS que necesite un color lo lee con `theme()`.
- **Regla de los dos acentos**: `accent` (`#F31A64`) solo como relleno, con `accent-ink` encima;
  como texto, solo sobre `bg` y `bg-2`. `accent-2` (`#FF5C99`) para todo acento de texto.
- **Logo**: blanco puro. Nunca recoloreado, nunca con resplandor.
- **Fuentes**: solo Space Grotesk y JetBrains Mono, auto-alojadas. Cero peticiones a
  `fonts.googleapis.com` o `fonts.gstatic.com`.
- **Cero datos inventados**: ninguna cifra, testimonio ni nombre de cliente que no esté ya en
  `src/content/copy.js` o `src/content/identity.js`.
- **Contraste AA**: 4,5:1 texto normal, 3:1 texto grande.
- **`prefers-reduced-motion`**: todo movimiento se anula y el contenido queda visible.
- **Idioma**: todo el contenido y todos los mensajes de commit, en español.
- **Fecha límite**: 2026-09-25.

**Puerta de calidad de cada tarea** (las siete, en orden):

1. `npm run build` sin errores ni warnings nuevos.
2. Lighthouse ≥ 90 en las cuatro categorías, desktop y móvil.
3. Repaso manual contra los criterios de aceptación de `design.md`.
4. Pestaña Red: ninguna petición a dominios de Google Fonts.
5. Todo dato mostrado, verificado.
6. Ninguna credencial en el bundle.
7. `grep -rnE '#[0-9a-fA-F]{3,8}' src/ --include=*.jsx --include=*.css` solo devuelve la
   definición de tokens.

En las tareas intermedias basta con las puertas 1, 3 y 7; las siete completas se pasan al cierre
de cada día.

---

## Estructura de ficheros

| Fichero | Responsabilidad | Acción |
|---|---|---|
| `.specify/memory/constitution.md` | Reglas del proyecto | Reemplazar (T001) |
| `tailwind.config.js` | Única fuente de verdad de tokens | Reescribir (T002) |
| `package.json` | Dependencias de fuentes | Modificar (T003) |
| `src/styles/index.css` | Capa base, fuentes, utilidades que Tailwind no expresa | Reescribir (T003, T004) |
| `src/components/Eyebrow.jsx` | Eyebrow mono en versalitas | Crear (T004) |
| `src/components/TituloSeccion.jsx` | Eyebrow + titular, patrón único | Crear (T004) |
| `src/components/Boton.jsx` | Pill `accent` y pill fantasma | Crear (T004) |
| `src/components/Header.jsx` | Cabecera fija | Modificar (T005) |
| `src/components/MobileMenu.jsx` | Menú móvil | Modificar (T005) |
| `src/sections/Hero.jsx` | Hero | Reescribir (T006) |
| `src/components/Marquee.jsx` | Banda de capacidades | Crear (T007) |
| `src/sections/ProyectoDestacado.jsx` | Tarjeta de proyecto | Reescribir (T008) |
| `src/sections/Servicios.jsx` | Bento asimétrico | Reescribir (T009) |
| `src/sections/Stack.jsx` | Etiquetas de tecnología | Crear (T010) |
| `src/sections/Proceso.jsx` | Pasos del proceso | Crear (T011, recortable) |
| `src/sections/SobreMi.jsx` | Sobre mí | Reescribir (T012) |
| `src/sections/Contacto.jsx` | Canales + formulario | Reescribir (T013) |
| `src/components/ContactForm.jsx` | Campos del formulario | Modificar (T013) |
| `src/components/Footer.jsx` | Pie común | Reescribir (T014) |
| `src/entries/caso.jsx` | Página de caso de estudio | Modificar (T015) |
| `src/entries/legal.jsx`, `notfound.jsx` | Legales y 404 | Modificar (T015) |
| `src/components/Reveal.jsx` | Aparición al scroll | Modificar (T016) |
| `src/entries/preview-v2.jsx`, `preview-v2.html`, `src/styles/preview-v2.css` | Prototipo | Borrar (T018) |

---

# DÍA 1 — Lunes 2026-09-21 · Fundamentos

Al final del día el sitio es oscuro y usa las fuentes nuevas, aunque el layout siga siendo el de
v1. Es el día de mayor riesgo: si la puerta de Lighthouse cae aquí, cae por las fuentes.

## T001: Ratificar la constitución v3.0.0

**Ficheros:**
- Modificar: `.specify/memory/constitution.md`
- Borrar: `specs/002-rediseno-v2/constitution-v3-propuesta.md`

**Produce:** las reglas que las diecisiete tareas siguientes dan por supuestas.

- [ ] **Paso 1: Leer la propuesta entera**

Léela de arriba abajo, no en diagonal. Presta atención a los cinco principios que cambian
(II, III, IV, VII, XI) y a la tabla de contrastes.

- [ ] **Paso 2: Aprobar explícitamente**

El procedimiento de enmienda de la sección Governance exige aprobación explícita de Juan. Si
algo no encaja, **se corrige ahora**: el resto del plan depende de este documento.

- [ ] **Paso 3: Aplicar en un único commit**

```bash
cd /home/juande00/projects/JdDLabs
cp specs/002-rediseno-v2/constitution-v3-propuesta.md .specify/memory/constitution.md
# quitar de la cabecera el bloque "PROPUESTA DE ENMIENDA — NO ES LA CONSTITUCIÓN VIGENTE"
# (las 5 primeras líneas del comentario), dejando el Sync Impact Report
rm specs/002-rediseno-v2/constitution-v3-propuesta.md
git add .specify/memory/constitution.md specs/002-rediseno-v2/
git commit -m "docs: constitucion v3.0.0 - paleta oscura, Space Grotesk, fecha limite 2026-09-25"
```

## T002: Tokens en `tailwind.config.js`

**Ficheros:**
- Modificar: `tailwind.config.js` (reescritura completa)

**Consume:** los valores canónicos de la constitución v3.0.0.
**Produce:** las clases `bg-bg`, `bg-bg-2`, `bg-bg-3`, `bg-bg-elev`, `text-fg`, `text-fg-dim`,
`text-fg-mute`, `text-fg-faint`, `text-accent`, `text-accent-2`, `bg-accent`, `text-accent-ink`,
`border-border`, `border-border-strong`, `border-border-accent`, `text-fs-100` … `text-fs-900`,
`py-section`, `rounded-lg2`, `rounded-xl2`, `ease-out-soft`, `ease-spring`, y la función
`theme()` para el CSS.

- [ ] **Paso 1: Reescribir el fichero entero**

```js
/** @type {import('tailwindcss').Config} */

// Unica fuente de verdad de los tokens (principio III). Prohibido el literal de color
// suelto en JSX o CSS: todo color se referencia por su token, y el CSS que necesite uno
// lo lee con theme().
const paleta = {
  bg: '#0a0a0a',
  'bg-2': '#111111',
  'bg-3': '#181818',
  'bg-elev': '#1f1f1f',
  fg: '#F5F5F0',
  'fg-dim': '#A1A1A1',
  // #8A8A8A y no el #6B6B6B de la referencia: ese valor da 3,7:1 sobre #0a0a0a y no
  // llega a AA. Aqui pasa en las tres superficies (6,7 / 6,4 / 5,1).
  'fg-mute': '#8A8A8A',
  // Solo decorativo: filetes y separadores. Nunca texto.
  'fg-faint': '#3A3A3A',
  // Regla de los dos acentos (principio VII): `accent` solo como relleno o como texto
  // sobre bg/bg-2; `accent-2` para todo acento de texto.
  accent: '#F31A64',
  'accent-2': '#FF5C99',
  'accent-ink': '#0a0a0a',
  'accent-dim': 'rgba(243,26,100,.15)',
  'accent-glow': 'rgba(243,26,100,.35)',
  border: 'rgba(255,255,255,.08)',
  'border-strong': 'rgba(255,255,255,.18)',
  'border-accent': 'rgba(243,26,100,.4)',
};

export default {
  content: ['./*.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ...paleta,
        // El preflight de Tailwind emite gray.400 para el placeholder. Se reasigna al
        // token `fg-mute` para que ningun gris ajeno llegue al CSS publicado.
        gray: { 400: paleta['fg-mute'] },
      },
      borderColor: { DEFAULT: paleta.border },
      ringColor: { DEFAULT: paleta['accent-2'] },
      fontFamily: {
        sans: ['"Space Grotesk Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SF Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'fs-100': 'clamp(.75rem, .72rem + .15vw, .85rem)',
        'fs-200': 'clamp(.85rem, .82rem + .18vw, .95rem)',
        'fs-300': 'clamp(.95rem, .9rem + .25vw, 1.1rem)',
        'fs-400': 'clamp(1.05rem, .98rem + .35vw, 1.25rem)',
        'fs-500': 'clamp(1.25rem, 1.1rem + .7vw, 1.6rem)',
        'fs-600': 'clamp(1.6rem, 1.3rem + 1.4vw, 2.4rem)',
        'fs-700': 'clamp(2.2rem, 1.6rem + 2.8vw, 3.6rem)',
        'fs-800': 'clamp(3rem, 2rem + 4.5vw, 5.5rem)',
        'fs-900': 'clamp(4rem, 2.5rem + 7vw, 9rem)',
      },
      spacing: {
        section: 'clamp(5rem, 9vw, 11rem)',
        gutter: 'clamp(1.25rem, 3.5vw, 4rem)',
      },
      maxWidth: { site: '1440px' },
      borderRadius: { lg2: '22px', xl2: '32px' },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(.22, 1, .36, 1)',
        'in-out-soft': 'cubic-bezier(.65, 0, .35, 1)',
        spring: 'cubic-bezier(.34, 1.56, .64, 1)',
      },
      transitionDuration: { fast: '250ms', base: '500ms', slow: '900ms' },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: { marquee: 'marquee 60s linear infinite' },
    },
  },
  plugins: [],
};
```

- [ ] **Paso 2: Verificar que el build sigue en pie**

```bash
npm run build
```

Esperado: compila. El sitio se verá **roto** —las clases `bg-bg` ahora son negras y las
`text-ink` ya no existen—, y es lo correcto en este punto.

- [ ] **Paso 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat(tokens): paleta oscura, escala fluida y tokens de movimiento v2"
```

## T003: Sustituir las fuentes

**Ficheros:**
- Modificar: `package.json`
- Modificar: `src/styles/index.css` (bloque de `@import` y `@font-face`)
- Borrar: `public/fonts/fraunces-latin-700.woff2`

**Produce:** las familias `font-sans` (Space Grotesk) y `font-mono` (JetBrains Mono) resueltas.

- [ ] **Paso 1: Cambiar las dependencias**

```bash
npm uninstall @fontsource/inter
npm install @fontsource-variable/space-grotesk @fontsource-variable/jetbrains-mono
```

- [ ] **Paso 2: Sustituir la cabecera de `src/styles/index.css`**

Quita los cuatro `@import` de Inter y el bloque `@font-face` de Fraunces enteros. En su lugar:

```css
/* Dos familias variables, auto-alojadas via @fontsource (principio II). Un unico fichero
   por familia cubre todos los pesos que el diseño usa. Ninguna peticion a Google. */
@import '@fontsource-variable/space-grotesk';
@import '@fontsource-variable/jetbrains-mono';
```

- [ ] **Paso 3: Borrar la fuente muerta**

```bash
git rm public/fonts/fraunces-latin-700.woff2
```

- [ ] **Paso 4: Verificar que no queda rastro**

```bash
grep -rni "fraunces\|fontsource/inter\|@fontsource/inter" src/ *.html *.js public/ 2>/dev/null
```

Esperado: **sin resultados**. Si aparece `src/styles/preview-v2.css`, déjalo: ese fichero muere
entero en T018.

- [ ] **Paso 5: Build y medida de peso**

```bash
npm run build
ls -la dist/assets/*.woff2 2>/dev/null || find dist -name "*.woff2" -exec ls -la {} \;
```

Apunta el peso total de las fuentes. Si supera los 120 KB, párate y reduce el subconjunto antes
de seguir: es lo que tumbaría la puerta de Performance.

- [ ] **Paso 6: Commit**

```bash
git add package.json package-lock.json src/styles/index.css
git commit -m "feat(fuentes): Space Grotesk y JetBrains Mono variables, retirar Fraunces e Inter"
```

## T004: Capa base y componentes compartidos

**Ficheros:**
- Modificar: `src/styles/index.css` (bloques `@layer base` y `@layer components`)
- Crear: `src/components/Eyebrow.jsx`
- Crear: `src/components/TituloSeccion.jsx`
- Crear: `src/components/Boton.jsx`

**Consume:** tokens de T002.
**Produce:**
- `<Eyebrow>{texto}</Eyebrow>` → `<p>` mono en versalitas.
- `<TituloSeccion eyebrow="SERVICIOS">Titular.</TituloSeccion>` → eyebrow + `<h2>`.
- `<Boton href variante="solido"|"fantasma" externo>` → pill. `variante` por defecto `solido`.

- [ ] **Paso 1: Reescribir `@layer base` de `src/styles/index.css`**

```css
@layer base {
  :root {
    --header-h: 4.5rem;
  }

  html {
    scroll-behavior: smooth;
    color-scheme: dark;
  }

  section[id],
  [id].scroll-anchor {
    scroll-margin-top: var(--header-h);
  }

  body {
    @apply bg-bg text-fg font-sans antialiased;
  }

  /* Tratamiento unico de titular: peso 500 y no 700, tracking cerrado y line-height
     por debajo de 1. Es lo que separa un titular grande de un titular caro. */
  h1, h2, h3 {
    @apply font-sans font-medium;
    letter-spacing: -0.04em;
    line-height: 0.9;
    text-wrap: balance;
  }

  h1 {
    letter-spacing: -0.05em;
  }

  /* Foco siempre visible. Va en accent-2 y no en accent: sobre las superficies de
     tarjeta accent no llega a AA (principio VII). */
  :focus-visible {
    @apply outline-none ring-2 ring-accent-2 ring-offset-2 ring-offset-bg rounded-sm;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

- [ ] **Paso 2: Reescribir `@layer components`**

```css
@layer components {
  /* Contenedor comun. 1440px y no 64rem: con fondo oscuro y titulares a fs-900, un
     contenedor estrecho asfixia. */
  .contenedor {
    @apply mx-auto w-full max-w-site px-gutter;
  }

  /* Ritmo vertical unico de todas las secciones. */
  .seccion {
    @apply border-t border-border py-section;
  }

  /* Campo trampa: fuera de pantalla, nunca display:none (research.md R-008). */
  .campo-trampa {
    position: absolute;
    left: -9999px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  /* Halo ambiental del hero. Decoracion pura: el color sale del token, no de un
     literal (principio III). */
  .halo-hero::before {
    content: '';
    position: absolute;
    top: -20%;
    left: -10%;
    width: 46rem;
    height: 46rem;
    max-width: 120vw;
    border-radius: 50%;
    background: radial-gradient(circle, theme('colors.accent-glow') 0%, transparent 68%);
    pointer-events: none;
  }
}
```

- [ ] **Paso 3: Crear `src/components/Eyebrow.jsx`**

```jsx
/**
 * Eyebrow de seccion: la linea mono en versalitas que va sobre cada titular.
 *
 * Es el detalle mas barato del rediseño y el que mas cambia la percepcion. Va en
 * `fg-mute` (#8A8A8A) y no en el gris de la referencia, que no llega a AA.
 */
export function Eyebrow({ children, className = '' }) {
  return (
    <p
      className={[
        'font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </p>
  );
}

export default Eyebrow;
```

- [ ] **Paso 4: Crear `src/components/TituloSeccion.jsx`**

```jsx
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

/**
 * Patron unico de apertura de seccion: eyebrow mono + titular a fs-800.
 *
 * Ninguna seccion vuelve a escribir su propio <h2>: si el tratamiento de titular
 * cambia, cambia aqui y en un solo sitio.
 */
export function TituloSeccion({ eyebrow, children, className = '' }) {
  return (
    <Reveal className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-6 max-w-3xl text-fs-800 text-fg">{children}</h2>
    </Reveal>
  );
}

export default TituloSeccion;
```

- [ ] **Paso 5: Crear `src/components/Boton.jsx`**

```jsx
/**
 * Pill de accion, en dos variantes.
 *
 *  - solido:   relleno `accent` con `accent-ink` encima. 4,8:1, pasa AA.
 *  - fantasma: sin relleno, filete `border-strong`, texto `fg`.
 *
 * El resplandor solo aparece en hover y solo en la variante solida: es lo que compensa
 * que el magenta tenga menos luminancia que el lima de la referencia.
 */
const VARIANTES = {
  solido:
    'bg-accent text-accent-ink hover:shadow-[0_0_22px_theme(colors.accent-glow)]',
  fantasma: 'border border-border-strong text-fg hover:border-fg',
};

export function Boton({
  href,
  children,
  variante = 'solido',
  externo = false,
  className = '',
  ...resto
}) {
  // Sin `href` el control es un <button>: lo necesita el envio del formulario, que no
  // navega a ningun sitio. Un <a> sin href no es alcanzable por teclado.
  const Etiqueta = href ? 'a' : 'button';

  const props = href
    ? { href, ...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : { type: resto.type ?? 'submit' };

  return (
    <Etiqueta
      {...props}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full px-7 py-4',
        'text-fs-200 font-medium no-underline',
        'transition duration-fast ease-out-soft motion-reduce:transition-none',
        VARIANTES[variante],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...resto}
    >
      {children}
      {externo && (
        <>
          <span aria-hidden="true">↗</span>
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </>
      )}
    </Etiqueta>
  );
}

export default Boton;
```

- [ ] **Paso 6: Build**

```bash
npm run build
```

Esperado: compila. Las secciones siguen con clases de v1 y se verán mal; normal.

- [ ] **Paso 7: Commit**

```bash
git add src/styles/index.css src/components/Eyebrow.jsx src/components/TituloSeccion.jsx src/components/Boton.jsx
git commit -m "feat(base): capa base oscura y componentes compartidos de eyebrow, titulo y boton"
```

## Cierre del día 1

- [ ] Pasar **las siete puertas** de calidad.
- [ ] Anotar el peso de las fuentes y la puntuación de Performance en `dist`.
- [ ] Si Performance < 90, **parar y resolverlo hoy**. Arrastrarlo a mañana es lo que hace que
      este plan no llegue al viernes.

---

# DÍA 2 — Martes 2026-09-22 · Cabecera, hero y marquee

Al final del día la mitad superior de la portada está terminada.

## T005: Cabecera

**Ficheros:**
- Modificar: `src/components/Header.jsx`
- Modificar: `src/components/MobileMenu.jsx`

**Consume:** `Boton` de T004.

- [ ] **Paso 1: Altura desde el token `spacing.header`**

La altura de la cabecera sale del token `spacing.header` (4,5rem = 72px, igual en los dos
artboards de la maqueta, 375 y 1440). En la capa base, `--header-h: theme('spacing.header')`: la
variable existe solo para los `calc()` y `scroll-margin-top`, y los `<main>` usan `pt-header`.

**La altura no se mide.** `Header.jsx` no lleva `ResizeObserver` ni lee `offsetHeight`: esa
medida incluye el `border-b`, y si alimenta `--header-h` y la fila interior la consume, cada
vuelta suma 1px y la cabecera crece sin fin (corregido en `fix(cabecera)`, 2026-09-23).

- [ ] **Paso 2: Sustituir las clases del `<header>`**

```jsx
className="fixed inset-x-0 top-0 z-50 h-header border-b border-border bg-bg/85 backdrop-blur-xl"
```

Y la fila interior pasa de `h-16` a `h-full`. Con `border-box` el filete queda dentro de los 72px.

- [ ] **Paso 3: Poner el logo en blanco puro**

El SVG usa `currentColor` y dentro de un `<img>` resuelve a negro, invisible sobre `#0a0a0a`.
Se sirve con máscara, **en blanco puro, sin resplandor** (principio IV):

```jsx
<span
  aria-hidden="true"
  className="h-8 w-[37px] flex-none bg-fg"
  style={{
    WebkitMask: "url('/JdDLogo_marca.svg') center / contain no-repeat",
    mask: "url('/JdDLogo_marca.svg') center / contain no-repeat",
  }}
/>
```

- [ ] **Paso 4: Navegación y CTA**

Enlaces: `text-fs-200 text-fg-dim hover:text-fg rounded-full px-4 py-2 transition duration-fast`.
CTA: `<Boton href={...} className="hidden md:inline-flex px-5 py-2.5 text-fs-100">`.
Wordmark: `text-fs-400 font-medium tracking-tight text-fg`.

- [ ] **Paso 5: Menú móvil**

Panel a `bg-bg-2`, filete `border-border`, enlaces `text-fs-500 text-fg`. La trampa de foco de
`useFocusTrap` **no se toca**: solo cambian las clases.

- [ ] **Paso 6: Verificar con teclado**

Recorre la cabecera entera con Tab. Cada control debe mostrar el anillo `accent-2`. Abre y
cierra el menú móvil con teclado y comprueba que el foco queda atrapado dentro.

- [ ] **Paso 7: Build y commit**

```bash
npm run build
git add src/components/Header.jsx src/components/MobileMenu.jsx
git commit -m "feat(cabecera): cabecera oscura, logo en blanco puro y CTA pill"
```

## T006: Hero

**Ficheros:**
- Modificar: `src/sections/Hero.jsx` (reescritura completa)

**Consume:** `Eyebrow`, `Boton` de T004.

- [ ] **Paso 1: Reescribir el componente**

```jsx
import { hero } from '../content/copy';
import { Eyebrow } from '../components/Eyebrow';
import { Boton } from '../components/Boton';

/**
 * Hero (FR-002). Titular, subtitulo y llamada a la accion se ven sin hacer scroll,
 * tambien en movil.
 *
 * Deja de ser "la unica banda oscura del sitio": en v2 el documento entero es oscuro y
 * el hero se distingue por el halo, no por el fondo.
 */
export function Hero() {
  return (
    <section id="inicio" className="halo-hero relative overflow-hidden">
      <div className="contenedor relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center pb-6 pt-20">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <Eyebrow>Desarrollo web</Eyebrow>
          <Eyebrow>Rute, Córdoba</Eyebrow>
        </div>

        <h1 className="mt-8 max-w-4xl text-fs-900 text-fg">{hero.titular}</h1>

        <p className="mt-8 max-w-[38rem] text-fs-400 leading-relaxed text-fg-dim">
          {hero.subtitulo}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Boton href="#contacto">{hero.cta}</Boton>
          <Boton href="#proyecto" variante="fantasma">
            Ver trabajo
          </Boton>
        </div>
      </div>
    </section>
  );
}

export default Hero;
```

**Nota sobre el copy**: "Desarrollo web", "Rute, Córdoba" y "Ver trabajo" son cadenas nuevas,
pero **no son datos**: son etiquetas de navegación y de lugar, y el lugar ya consta en
`identity.domicilio`. Ningún principio lo impide. Si Juan prefiere que vivan en `copy.js`, se
mueven ahí en T017.

- [ ] **Paso 2: Comprobar a 320px**

Abre las herramientas de desarrollo a 320px de ancho. El titular a `fs-900` arranca en `4rem`:
confirma que no desborda ni parte palabras. Si desborda, baja el mínimo del `clamp` en
`tailwind.config.js`, **no** añadas una clase suelta.

- [ ] **Paso 3: Build y commit**

```bash
npm run build
git add src/sections/Hero.jsx
git commit -m "feat(hero): titular a escala fs-900, eyebrows mono y doble CTA"
```

## T007: Marquee de capacidades

**Ficheros:**
- Crear: `src/components/Marquee.jsx`
- Modificar: `src/entries/main.jsx` (insertar tras `<Hero />`)

**Produce:** `<Marquee terminos={[...]} />`.

- [ ] **Paso 1: Crear el componente**

```jsx
/**
 * Banda de capacidades en bucle infinito.
 *
 * El track se duplica para que el bucle no tenga costura: la animacion desplaza el 50%
 * exacto, que es justo una copia. `aria-hidden` en la segunda copia para que el lector
 * de pantalla no lea la lista dos veces.
 *
 * Son capacidades, no clientes ni cifras: nada que verificar (principio V).
 */
export function Marquee({ terminos }) {
  const pista = (duplicado) => (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={duplicado ? 'true' : undefined}
    >
      {terminos.map((termino, i) => (
        <li key={`${termino}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-mono text-fs-200 uppercase tracking-[0.16em] text-fg-dim">
            {termino}
          </span>
          <span aria-hidden="true" className="text-accent-2">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-border bg-bg-2 py-8">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {pista(false)}
        {pista(true)}
      </div>
    </div>
  );
}

export default Marquee;
```

- [ ] **Paso 2: Insertarlo en `main.jsx`**

```jsx
import { Marquee } from '../components/Marquee';

const CAPACIDADES = [
  'Web corporativa',
  'Tiendas online',
  'Aplicaciones web',
  'Paneles de gestión',
  'Reservas',
  'Integraciones',
  'Rendimiento',
  'Accesibilidad',
];
```

Y en el `<main>`, entre `<Hero />` y `<ProyectoDestacado />`:

```jsx
<Marquee terminos={CAPACIDADES} />
```

Los ocho términos salen de los tres `servicios` de `copy.js` y de su texto
("paneles de gestión, reservas, integraciones con lo que ya usas"). No hay término inventado.

- [ ] **Paso 3: Verificar movimiento reducido**

En DevTools → Rendering → `prefers-reduced-motion: reduce`. La banda debe quedarse **quieta y
legible**, no desaparecer.

- [ ] **Paso 4: Build y commit**

```bash
npm run build
git add src/components/Marquee.jsx src/entries/main.jsx
git commit -m "feat(marquee): banda de capacidades en bucle con pausa en hover"
```

## Cierre del día 2

- [ ] Las siete puertas.
- [ ] Repaso visual a 320px, 768px y 1440px.

---

# DÍA 3 — Miércoles 2026-09-23 · Proyecto, servicios y stack

El día del contenido principal. Es el que más cambia la percepción del sitio.

## T008: Tarjeta de proyecto

**Ficheros:**
- Modificar: `src/sections/ProyectoDestacado.jsx` (reescritura completa)

**Consume:** `TituloSeccion` de T004.

**Cambio de comportamiento**: la tarjeta pasa a tener **un solo destino**. Hoy tiene dos CTAs
compitiendo; en v2 toda la tarjeta enlaza al caso de estudio y "Visitar en vivo" se queda dentro
del caso, que es donde tiene sentido.

- [ ] **Paso 1: Reescribir el componente**

```jsx
import { proyecto } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/**
 * Proyecto destacado (FR-004, FR-009), en formato tarjeta.
 *
 * Tres ausencias deliberadas que vienen de v1 y siguen vigentes:
 *  - Sin metricas de resultado: no hay analitica real que citar (principio V).
 *  - Sin testimonio: `copy.js` no exporta `testimonio` y aqui no se reserva hueco.
 *  - Si `proyecto.captura` es null no se dibuja ni imagen ni marco vacio.
 *
 * Novedad de v2: la tarjeta entera es un enlace al caso de estudio. "Visitar en vivo"
 * deja de competir aqui y vive dentro del caso.
 */
export function ProyectoDestacado() {
  const { captura } = proyecto;

  return (
    <section id="proyecto" className="seccion">
      <div className="contenedor">
        <TituloSeccion eyebrow="Trabajo seleccionado">
          Un proyecto, contado entero.
        </TituloSeccion>

        <Reveal className="mt-14">
          <article className="group overflow-hidden rounded-lg2 border border-border bg-bg-3 transition-colors duration-fast hover:border-border-accent">
            <a href={proyecto.urlCaso} className="block no-underline">
              {captura && (
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-bg-elev">
                  <img
                    src={captura.src}
                    alt={captura.alt}
                    width={captura.ancho}
                    height={captura.alto}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-bg/75 px-3 py-1 font-mono text-fs-100 text-accent-2">
                    01
                  </span>
                </div>
              )}

              <div className="p-7 sm:p-9">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="text-fs-500 text-fg">{proyecto.titulo}</h3>
                  <span className="font-mono text-fs-100 text-fg-mute">2026</span>
                </div>

                <p className="mt-2 font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute">
                  Vidrio y aluminio
                </p>

                <p className="mt-5 max-w-2xl text-fs-300 leading-relaxed text-fg-dim">
                  {proyecto.contexto}
                </p>

                <p className="mt-7 inline-flex items-center gap-2 font-mono text-fs-100 uppercase tracking-[0.16em] text-accent-2">
                  {proyecto.enlaceCaso}
                  <span aria-hidden="true" className="transition-transform duration-fast group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </div>
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export default ProyectoDestacado;
```

**Datos usados**: `2026` sale de `casoEstudio.anio`; `Vidrio y aluminio` es el recorte de
`casoEstudio.industria` ("Vidrio, aluminio y carpintería a medida"). Ambos ya estaban
verificados en `copy.js`. Si prefieres leerlos directamente de `casoEstudio`, impórtalo y
sustituye las dos cadenas — es más limpio y evita que se desincronicen.

- [ ] **Paso 2: Mover "Visitar en vivo" al caso de estudio**

En `src/entries/caso.jsx`, comprueba que el enlace a `proyecto.url` sigue presente y visible. Si
no lo estaba, añádelo con `<Boton href={proyecto.url} externo>{proyecto.textoEnlace}</Boton>`.
**No cierres esta tarea sin comprobarlo**: si no está, acabas de dejar el sitio sin ningún
enlace al sitio real del cliente.

- [ ] **Paso 3: Build y commit**

```bash
npm run build
git add src/sections/ProyectoDestacado.jsx src/entries/caso.jsx
git commit -m "feat(proyecto): tarjeta con numero, categoria y destino unico al caso"
```

## T009: Bento de servicios

**Ficheros:**
- Modificar: `src/sections/Servicios.jsx` (reescritura completa)

- [ ] **Paso 1: Reescribir el componente**

```jsx
import { servicios } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/**
 * Servicios (FR-003): exactamente las tres tarjetas de copy.js, ni una mas.
 *
 * Bento asimetrico: la primera celda ocupa el doble de ancho y de alto, con titular a
 * fs-600; las otras dos van a fs-500 sobre una superficie un punto mas baja. Tres cajas
 * identicas no jerarquizan nada, que es lo que fallaba en v1.
 *
 * Una sola columna por debajo de 768px, con todas las celdas iguales (FR-012).
 */
export function Servicios() {
  const [destacado, ...resto] = servicios;

  return (
    <section id="servicios" className="seccion bg-bg-2">
      <div className="contenedor">
        <TituloSeccion eyebrow="Servicios">Lo que hago.</TituloSeccion>

        <ul className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          <Reveal
            as="li"
            className="rounded-lg2 border border-border bg-bg-elev p-8 transition-colors duration-fast hover:border-border-accent md:col-span-2 md:row-span-2 md:p-9"
          >
            <h3 className="text-fs-600 text-fg">{destacado.titulo}</h3>
            <p className="mt-5 max-w-xl text-fs-300 leading-relaxed text-fg-dim">
              {destacado.descripcion}
            </p>
          </Reveal>

          {resto.map((servicio) => (
            <Reveal
              as="li"
              key={servicio.id}
              className="rounded-lg2 border border-border bg-bg-3 p-7 transition-colors duration-fast hover:border-border-accent"
            >
              <h3 className="text-fs-500 text-fg">{servicio.titulo}</h3>
              <p className="mt-4 text-fs-300 leading-relaxed text-fg-dim">
                {servicio.descripcion}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Servicios;
```

- [ ] **Paso 2: Comprobar el bento a 768px y a 1440px**

A 1440px: celda grande de 2×2 a la izquierda, dos celdas apiladas a la derecha. A 767px: tres
celdas iguales en columna. Si la celda grande se ve vacía por abajo, el texto de
`web-corporativa` es corto para ese tamaño: reduce el padding a `p-8` en lugar de `p-9`.

- [ ] **Paso 3: Build y commit**

```bash
npm run build
git add src/sections/Servicios.jsx
git commit -m "feat(servicios): bento asimetrico con celda destacada"
```

## T010: Sección de stack

**Ficheros:**
- Crear: `src/sections/Stack.jsx`
- Modificar: `src/entries/main.jsx`

**Nota**: esta sección ocupa en el ritmo el hueco que en la referencia ocupa la franja de cifras
(7+/150+/100+). No copia las cifras porque JdDLabs no las tiene (principio V); enseña las
tecnologías, que sí están verificadas en `copy.js`.

- [ ] **Paso 1: Crear el componente**

```jsx
import { proyecto } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/**
 * Tecnologia utilizada.
 *
 * Lee `proyecto.tecnologias`, que es la lista ya verificada de v1. NO hay franja de
 * cifras (años, proyectos, clientes): la referencia visual la tiene, JdDLabs no tiene
 * esos numeros y el principio V prohibe inventarlos.
 */
export function Stack() {
  return (
    <section id="stack" className="seccion">
      <div className="contenedor">
        <TituloSeccion eyebrow="Tecnología">
          Las herramientas que uso.
        </TituloSeccion>

        <Reveal className="mt-12">
          <ul className="flex flex-wrap gap-3">
            {proyecto.tecnologias.map((tecnologia) => (
              <li
                key={tecnologia}
                className="rounded-full border border-border bg-bg-3 px-5 py-2.5 font-mono text-fs-200 text-fg-dim"
              >
                {tecnologia}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default Stack;
```

- [ ] **Paso 2: Insertarlo en `main.jsx` tras `<Servicios />`**

- [ ] **Paso 3: Build y commit**

```bash
npm run build
git add src/sections/Stack.jsx src/entries/main.jsx
git commit -m "feat(stack): seccion de tecnologia con etiquetas mono"
```

## Cierre del día 3

- [ ] Las siete puertas.
- [ ] **Punto de control de alcance.** Si vas retrasado, lo que se recorta mañana es T011
      (Proceso) y pasado el bloque de movimiento opcional de T016. Decídelo hoy, no el viernes.

---

# DÍA 4 — Jueves 2026-09-24 · Proceso, sobre mí, contacto y pie

## T011: Proceso — RECORTABLE

**Ficheros:**
- Crear: `src/sections/Proceso.jsx`
- Modificar: `src/content/copy.js`
- Modificar: `src/entries/main.jsx`

**Bloqueada por:** el copy lo escribe Juan. **Ninguna tarea lo inventa.** Si a primera hora de
hoy no existe, se salta la tarea entera y el sitio publica con siete secciones.

- [ ] **Paso 1: Juan escribe los pasos**

Tres o cuatro pasos de su proceso real, con título y una o dos frases cada uno. No es una
métrica, así que no requiere verificación externa, pero **sí tiene que salir de él**.

- [ ] **Paso 2: Añadirlos a `copy.js`**

```js
// Pasos del proceso de trabajo, aportados por el propietario el 2026-09-24.
// No son metricas: son la descripcion de como trabaja. Si esta clave se retira, la
// seccion Proceso desaparece entera y no deja hueco (principio V).
export const proceso = [
  { id: 'hablamos', titulo: '…', descripcion: '…' },
  // …
];
```

- [ ] **Paso 3: Crear el componente**

```jsx
import { proceso } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/**
 * Proceso de trabajo. Rejilla de dos columnas por paso: numero mono a la izquierda,
 * contenido a la derecha, filete entre pasos.
 */
export function Proceso() {
  return (
    <section id="proceso" className="seccion bg-bg-2">
      <div className="contenedor">
        <TituloSeccion eyebrow="Proceso">Cómo trabajo, paso a paso.</TituloSeccion>

        <ol className="mt-14">
          {proceso.map((paso, i) => (
            <Reveal
              as="li"
              key={paso.id}
              className="grid grid-cols-[3rem_1fr] gap-6 border-t border-border py-8 sm:grid-cols-[7.5rem_1fr] sm:gap-12"
            >
              <span className="font-mono text-fs-200 text-accent-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-fs-500 text-fg">{paso.titulo}</h3>
                <p className="mt-3 max-w-2xl text-fs-300 leading-relaxed text-fg-dim">
                  {paso.descripcion}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Proceso;
```

- [ ] **Paso 4: Insertarlo en `main.jsx` tras `<Stack />`**

- [ ] **Paso 5: Build y commit**

```bash
npm run build
git add src/sections/Proceso.jsx src/content/copy.js src/entries/main.jsx
git commit -m "feat(proceso): seccion de proceso de trabajo en cuatro pasos"
```

## T012: Sobre mí

**Ficheros:**
- Modificar: `src/sections/SobreMi.jsx`

- [ ] **Paso 1: Reescribir el cuerpo**

```jsx
import { sobreMi } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/** Sobre mi (FR-005): parrafo principal mas la linea de refuerzo. */
export function SobreMi() {
  return (
    <section id="sobre-mi" className="seccion">
      <div className="contenedor max-w-3xl">
        <TituloSeccion eyebrow="Sobre mí">La misma persona, de principio a fin.</TituloSeccion>

        <Reveal className="mt-12">
          <p className="text-fs-400 leading-relaxed text-fg">{sobreMi.parrafo}</p>
          <p className="mt-8 border-l-2 border-accent pl-6 text-fs-400 leading-relaxed text-fg-dim">
            {sobreMi.refuerzo}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default SobreMi;
```

El filete de `border-accent` es **relleno**, no texto: la regla de los dos acentos no le afecta.

- [ ] **Paso 2: Build y commit**

```bash
npm run build
git add src/sections/SobreMi.jsx
git commit -m "feat(sobre-mi): tratamiento oscuro con titulo de seccion compartido"
```

## T013: Contacto y formulario

**Ficheros:**
- Modificar: `src/sections/Contacto.jsx`
- Modificar: `src/components/ContactForm.jsx`

**Cuidado**: la lógica de envío, el campo trampa y el consentimiento RGPD **no se tocan**. Esta
tarea es solo de clases. Tocar la lógica aquí pondría en riesgo el principio XII a un día del
cierre.

- [ ] **Paso 1: Sección**

Sustituir el `<h2>` por `<TituloSeccion eyebrow="Contacto">¿Hablamos de tu proyecto?</TituloSeccion>`.
Invitación a `text-fs-400 text-fg-dim`. Rejilla `mt-14 grid gap-12 md:grid-cols-2`.

- [ ] **Paso 2: Canales directos**

```jsx
className="group flex flex-col gap-0.5 rounded-lg border border-border bg-bg-3 px-5 py-4 no-underline transition-colors duration-fast hover:border-border-accent"
```

Etiqueta: `font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute`.
Valor: `text-fs-300 text-fg group-hover:text-accent-2`.

- [ ] **Paso 3: Campos del formulario**

```jsx
className="mt-2 block w-full rounded-lg border border-border bg-bg-3 px-4 py-3 text-fs-300 text-fg placeholder:text-fg-mute focus:border-accent focus:outline-none"
```

Etiquetas: `text-fs-200 font-medium text-fg`. Texto de consentimiento: `text-fs-100 text-fg-dim`,
con el enlace a privacidad en `text-accent-2 underline underline-offset-2`.
Checkbox: `accent-accent` (la utilidad `accent-color` de Tailwind sobre el token `accent`).
Botón de envío: `<Boton>Enviar mensaje</Boton>` **sin `href`** — `Boton` renderiza un `<button
type="submit">` cuando no se le pasa `href` (T004 paso 5). No repliques sus clases a mano.

- [ ] **Paso 4: Probar el envío de verdad**

Envía un mensaje real y comprueba que llega a `hola@jddlabs.dev`. Si no llega, **es un fallo de
esta tarea**: lo has roto tú al reescribir el marcado.

- [ ] **Paso 5: Verificar el consentimiento**

Sin marcar la casilla, el envío debe seguir bloqueado. Es el principio XII y no es recortable.

- [ ] **Paso 6: Build y commit**

```bash
npm run build
git add src/sections/Contacto.jsx src/components/ContactForm.jsx
git commit -m "feat(contacto): canales y formulario sobre superficie oscura"
```

## T014: Pie

**Ficheros:**
- Modificar: `src/components/Footer.jsx`

- [ ] **Paso 1: Clases**

`<footer>`: `border-t border-border bg-bg`. Textos a `text-fs-200 text-fg-dim`, enlaces
`text-fg hover:text-accent-2`. Logo con la misma máscara en `bg-fg` de T005, **nunca** en acento.
Línea de copyright: `border-t border-border py-6 text-fs-100 text-fg-mute`.

- [ ] **Paso 2: Comprobar que los enlaces legales siguen en las cinco páginas**

Es el principio XII (FR-021b). Abre las cinco y confírmalo una por una.

- [ ] **Paso 3: Build y commit**

```bash
npm run build
git add src/components/Footer.jsx
git commit -m "feat(pie): pie oscuro con enlaces legales intactos"
```

## Cierre del día 4

- [ ] Las siete puertas en **las cinco páginas**, no solo en la portada.
- [ ] La portada está completa. Lo que queda mañana es acabado y verificación.

---

# DÍA 5 — Viernes 2026-09-25 · Páginas interiores, movimiento y publicación

## T015: Páginas interiores

**Ficheros:**
- Modificar: `src/entries/caso.jsx`
- Modificar: `src/entries/legal.jsx`
- Modificar: `src/entries/notfound.jsx`
- Modificar: `src/content/legal.js` (solo si tiene clases embebidas)

Heredan tokens, cabecera y pie, así que esto es revisión, no rediseño.

- [ ] **Paso 1: Caso de estudio**

Titulares al patrón nuevo. El bloque "Datos del proyecto" pasa a rejilla de definición con
etiquetas mono `fg-mute` y valores `fg`. "Tecnología utilizada" reutiliza las píldoras de T010.
Confirma que "Visitar en vivo" está presente (viene de T008 paso 2).

- [ ] **Paso 2: Legales y 404**

Cuerpo de texto a `text-fs-300 text-fg-dim`, titulares `text-fs-700 text-fg`, enlaces
`text-accent-2`. Ancho de lectura `max-w-3xl`.

- [ ] **Paso 3: Recorrer las cinco páginas a 320px**

- [ ] **Paso 4: Build y commit**

```bash
npm run build
git add src/entries/ src/content/legal.js
git commit -m "feat(paginas): caso de estudio, legales y 404 al sistema v2"
```

## T016: Movimiento

**Ficheros:**
- Modificar: `src/components/Reveal.jsx`
- Modificar: `src/styles/index.css`

- [ ] **Paso 1: Stagger en `Reveal`** (no recortable)

Añade una prop `retardo` que se traduzca a `transitionDelay` en línea:

```jsx
export function Reveal({ children, as: Etiqueta = 'div', className = '', retardo = 0, ...resto }) {
  const [ref, visible] = useReveal();

  return (
    <Etiqueta
      ref={ref}
      style={retardo ? { transitionDelay: `${retardo}ms` } : undefined}
      className={[
        'transition duration-slow ease-out-soft motion-reduce:transition-none',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...resto}
    >
      {children}
    </Etiqueta>
  );
}
```

Pásalo en las listas: en `Servicios.jsx`, `retardo={80 * i}`; en `Proceso.jsx`, igual. Máximo
240ms: por encima se nota como lentitud, no como elegancia.

**Comprueba que sigue cumpliéndose la garantía de `useReveal`**: estado inicial visible, y con
movimiento reducido el observador ni se crea. Esa lógica no se toca.

- [ ] **Paso 2: Grano** (RECORTABLE)

```css
@layer components {
  .grano::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 100;
    pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E");
  }
}
```

Se aplica en `<body>` vía la clase `grano` en las cinco páginas HTML. Si Lighthouse Performance
baja aunque sea un punto, **quítalo**: no vale lo que cuesta.

- [ ] **Paso 3: Botones magnetic** (RECORTABLE)

Solo si el reloj lo permite. Es el último de la lista por una razón: es el efecto más vistoso y
el menos importante. Si llegas aquí con dudas, **no lo hagas**.

- [ ] **Paso 4: Verificar movimiento reducido en todo el sitio**

DevTools → Rendering → `prefers-reduced-motion: reduce`. Recorre las cinco páginas. Nada se
mueve, nada queda invisible.

- [ ] **Paso 5: Build y commit**

```bash
npm run build
git add src/components/Reveal.jsx src/styles/index.css src/sections/ *.html
git commit -m "feat(movimiento): aparicion escalonada y grano ambiental"
```

## T017: Verificación final

**Ficheros:** ninguno, salvo las correcciones que surjan.

- [ ] **Paso 1: Contraste con herramienta real**

No te fíes de la tabla de la constitución: compruébalo. En DevTools, inspecciona un texto de
cada par de la tabla y lee el ratio que da el propio navegador. Los cinco pares, en las tres
superficies.

- [ ] **Paso 2: Auditoría de literales de color**

```bash
grep -rnE '#[0-9a-fA-F]{3,8}' src/ --include=*.jsx --include=*.css
```

Esperado: solo `tailwind.config.js` (que no está en `src/`) y el `data:` del grano, que es una
URL y no un color. Cualquier otra línea es una violación del principio III: córrígela.

- [ ] **Paso 3: Auditoría de fuentes**

```bash
npm run build
grep -rni "googleapis\|gstatic\|fraunces\|inter" dist/ | grep -v "\.map:"
```

Esperado: sin resultados.

- [ ] **Paso 4: Lighthouse en las cinco páginas, desktop y móvil**

Diez pasadas. Todas ≥ 90 en las cuatro categorías. Apunta los números.

- [ ] **Paso 5: Recorrido completo por teclado**

Las cinco páginas, solo con Tab, Shift+Tab, Enter y Escape. Foco visible siempre. El menú móvil
atrapa el foco y lo devuelve al cerrarse.

- [ ] **Paso 6: Envío real del formulario**

Un mensaje de verdad a `hola@jddlabs.dev`. Que llegue.

- [ ] **Paso 7: Auditoría del principio V**

Lee la portada entera como si fueras un cliente. **Cualquier cifra, nombre o afirmación que no
puedas respaldar, fuera.** Es el principio no negociable que la referencia visual más tienta a
romper.

## T018: Limpieza y publicación

- [ ] **Paso 1: Borrar el prototipo**

```bash
rm preview-v2.html src/entries/preview-v2.jsx src/styles/preview-v2.css
```

Ya cumplió su función. Dejarlo es dejar una segunda fuente de verdad de la paleta.

`rm` y no `git rm`: los tres ficheros nunca se versionaron, así que `git rm` falla y el
borrado no genera commit. `git status` queda limpio sin nada que commitear.

- [ ] **Paso 2: Confirmar que no era una entrada de build**

```bash
grep -n "preview" vite.config.js
```

Esperado: sin resultados. Si aparece, quita esa entrada.

- [ ] **Paso 3: Build limpio**

```bash
rm -rf dist && npm run build
```

- [ ] **Paso 4: Commit y fusión**

```bash
git add -A
git commit -m "chore: retirar el prototipo preview-v2"
git checkout main
git merge v2-preview-magenta
```

- [ ] **Paso 5: Publicar**

```bash
git push origin main
```

Cloudflare Pages despliega solo (principio VIII). **No ejecutes ningún comando de despliegue
manual.**

- [ ] **Paso 6: Verificar en producción**

Abre `https://jddlabs.dev` y pasa Lighthouse una última vez sobre el sitio publicado, no sobre
`dist`. Es la única medida que cuenta.

---

## Resumen de recortables

Por orden de sacrificio, si el viernes aprieta:

1. **T016 paso 3** — botones magnetic.
2. **T016 paso 2** — grano.
3. **T011** — sección Proceso (además, depende de copy que puede no llegar).
4. **T015 paso 1** — el refinamiento del caso de estudio, que hereda tokens y es legible sin él.

Lo que **no** se recorta, en ningún escenario: las puertas de Lighthouse y accesibilidad
(principios VI y VII), el consentimiento RGPD (XII) y la auditoría del principio V.

## Cobertura de los criterios de aceptación

| Criterio | Tarea que lo cubre |
|---|---|
| AC-01 fondo oscuro continuo | T002, T004 |
| AC-02 sin literales de color | T017 paso 2 |
| AC-03 sin Google Fonts | T003, T017 paso 3 |
| AC-04 sin Fraunces ni Inter | T003 paso 4, T017 paso 3 |
| AC-05 Lighthouse ≥ 90 | T017 paso 4 |
| AC-06 contraste AA | T017 paso 1 |
| AC-07 logo en blanco puro | T005 paso 3, T014 paso 1 |
| AC-08 movimiento reducido | T007 paso 3, T016 paso 4 |
| AC-09 navegación por teclado | T005 paso 6, T017 paso 5 |
| AC-10 cero datos nuevos | T017 paso 7 |

## Backlog post-lanzamiento

Fuera del alcance del 2026-09-25. Ninguna bloquea la publicación.

| Entrada | Por qué | Qué desbloquea |
|---|---|---|
| **Prerender del HTML** de cada entrada en el build | Hoy `#root` llega vacío y React monta las secciones después de que el navegador busque el fragmento de la URL | Las anclas entre páginas (`/#proyecto` desde legal, caso o 404) funcionarían de forma nativa y `src/hooks/useAnclaInicial.js` podría retirarse. Mejora de paso el primer pintado |
| **Subir vite 5 → 8** (y `@vitejs/plugin-react` con él) | `npm audit`: [GHSA-4w7w-66w2-5vf9](https://github.com/advisories/GHSA-4w7w-66w2-5vf9), [GHSA-fx2h-pf6j-xcff](https://github.com/advisories/GHSA-fx2h-pf6j-xcff), [GHSA-v6wh-96g9-6wx3](https://github.com/advisories/GHSA-v6wh-96g9-6wx3) (vite) y [GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99) (esbuild, transitiva) | Cierra las cuatro. Afectan **solo al servidor de desarrollo**, nunca al `dist` publicado. Son tres versiones mayores: rama propia, build y Lighthouse de nuevo. Mientras tanto, no exponer `npm run dev` con `--host` |
