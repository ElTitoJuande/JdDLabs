/** @type {import('tailwindcss').Config} */

// Unica fuente de verdad de los tokens (principio III). Prohibido el literal de color
// suelto en JSX o CSS: todo color se referencia por su token, y el CSS que necesite uno
// lo lee con theme().
const paleta = {
  // PRUEBA paleta verde (temporal, se deshace)
  bg: '#0B2A22',
  'bg-2': '#12382F',
  'bg-3': '#174539',
  'bg-elev': '#1B4A3E',
  fg: '#F5F6F1',
  'fg-dim': '#BAC3BD', // light al 75% sobre bg
  'fg-mute': '#97A49E', // light al 60% sobre bg
  'fg-faint': 'rgba(69,224,176,.25)',
  accent: '#45E0B0',
  'accent-2': '#45E0B0',
  'accent-ink': '#15201C',
  'accent-dim': 'rgba(69,224,176,.15)',
  'accent-glow': 'rgba(69,224,176,.35)',
  border: 'rgba(69,224,176,.15)',
  'border-strong': 'rgba(69,224,176,.3)',
  'border-accent': 'rgba(69,224,176,.4)',
};

export default {
  content: ['./*.html', './src/**/*.{js,jsx}'],
  // Las utilidades hover: solo en dispositivos con raton. En tactil el toque dejaba
  // filas "encendidas" al hacer scroll; alli el estado lo da `data-activo` (Servicios).
  future: { hoverOnlyWhenSupported: true },
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
        // Solo para el enfasis del h1 del hero y el cierre de los h2 de seccion
        // (constitucion 3.2.0, principio II).
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      // Escala fluida de nueve pasos. Ninguna seccion escribe un tamaño en pixeles:
      // la maqueta de Claude Design esta exportada en px porque es un HTML estatico,
      // y aqui cada uno de esos px se resuelve al paso mas cercano de esta escala.
      fontSize: {
        'fs-100': 'clamp(.75rem, .72rem + .15vw, .85rem)',
        'fs-200': 'clamp(.85rem, .82rem + .18vw, .95rem)',
        'fs-300': 'clamp(.95rem, .9rem + .25vw, 1.1rem)',
        'fs-400': 'clamp(1.05rem, .98rem + .35vw, 1.25rem)',
        'fs-500': 'clamp(1.25rem, 1.1rem + .7vw, 1.6rem)',
        'fs-600': 'clamp(1.6rem, 1.3rem + 1.4vw, 2.4rem)',
        'fs-700': 'clamp(2.2rem, 1.6rem + 2.8vw, 3.6rem)',
        // fs-800 y fs-900 se recalibran contra los DOS artboards de la maqueta
        // aprobada (375 y 1440), que son la referencia visual del propietario:
        //   fs-800 -> h2 de seccion:  40px a 375,  88px a 1440
        //   fs-900 -> h1 del hero:    40px a 375, 117,6px a 1440
        // fs-900 baja en la constitucion 3.1.0 para que el titular quepa en dos
        // lineas: a 140px "pymes y autónomos" mide 1253px y saltaba a tres.
        'fs-800': 'clamp(2.5rem, 1.44rem + 4.5vw, 5.5rem)',
        'fs-900': 'clamp(2.5rem, .79rem + 7.29vw, 7.35rem)',
      },
      spacing: {
        section: 'clamp(5rem, 9vw, 11rem)',
        gutter: 'clamp(1.25rem, 3.5vw, 4rem)',
        // Alto de la cabecera fija: los 72px de los dos artboards de la maqueta (375 y
        // 1440). Es fijo y no se mide: medirlo entraba en bucle con el border-b.
        header: '4.5rem',
        // Aire vertical del hero, arriba y abajo: 48px a 375, 72px a 1440. Menor que
        // `section` porque el hero ya empieza bajo la cabecera y no tiene altura minima.
        hero: 'clamp(3rem, 5vw, 5rem)',
      },
      maxWidth: { site: '1440px' },
      borderRadius: { lg2: '22px', xl2: '32px' },
      // El resplandor del boton solido sale del token, no de un literal (principio III).
      boxShadow: { glow: `0 0 24px ${paleta['accent-glow']}` },
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
      // 130s: la maqueta pedia 38s con 8 terminos a 13,6px. Con la banda a fs-600 y 14
      // terminos cada copia mide 5538px a 1440; 130s la mantiene a ~42px/s, la
      // velocidad de la version original. Si cambia la lista, se recalcula.
      animation: {
        marquee: 'marquee 130s linear infinite',
        // CTAs de cristal (variante `brillo` de Boton): onda de brillo de las letras,
        // escalonada 80ms por letra, y parpadeo del icono. Sus @keyframes, en index.css.
        letra: 'letra 2s ease-in-out infinite',
        chispa: 'chispa 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
