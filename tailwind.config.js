/** @type {import('tailwindcss').Config} */

// Unica fuente de verdad de los tokens (principio III). Prohibido el literal de color
// suelto en JSX o CSS: todo color se referencia por su token, y el CSS que necesite uno
// lo lee con theme().
const paleta = {
  bg: '#F5F6F1', 'bg-2': '#E9EFEB', 'bg-3': '#FFFFFF', 'bg-elev': '#FFFFFF',
  fg: '#15201C', 'fg-dim': '#5D6963', 'fg-mute': '#5D6963', 'fg-faint': '#A6B6AC',
  accent: '#45E0B0', 'accent-2': '#08765A', 'accent-ink': '#15201C',
  'accent-dim': '#CFF3E5', 'accent-glow': 'rgba(69,224,176,.25)',
  border: '#D4DDD7', 'border-strong': '#A6B6AC', 'border-accent': '#08765A'
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
      // Las dos familias de la web (2026-10-02): Roboto para el texto, Inter para
      // titulares y cifras grandes. Se cargan en src/styles/index.css.
      fontFamily: {
        sans: ['"Roboto Variable"', 'Arial', 'sans-serif'],
        display: ['"Inter Variable"', 'Arial', 'sans-serif'],
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
        // fs-800 y fs-900 se fijaron en la etapa de IBM Plex Mono (constitucion 3.3.0),
        // ya retirada; se conservan los valores: la mono era mas ancha, y a los
        // 117,6px de antes el h1 aplastaba el resto del hero. Los valores salen de la
        // comparativa de tipografias que aprobo el propietario el 2026-09-30:
        //   fs-800 -> h2 de seccion:  35px a 375, 65px a 1440
        //   fs-900 -> h1 del hero:    40px a 375, 88px a 1440
        'fs-800': 'clamp(2.2rem, 1.53rem + 2.82vw, 4.05rem)',
        'fs-900': 'clamp(2.5rem, 1.44rem + 4.5vw, 5.5rem)',
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
      // 90s: la maqueta pedia 38s con 8 terminos a 13,6px. Con la banda a fs-600 y 14
      // terminos cada copia mide 5538px a 1440; 90s la lleva a ~62px/s, algo mas viva
      // que los ~42px/s de la version original (130s). Si cambia la lista, se recalcula.
      animation: {
        marquee: 'marquee 90s linear infinite',
        // CTAs de cristal (variante `brillo` de Boton): onda de brillo de las letras,
        // escalonada 80ms por letra, y parpadeo del icono. Sus @keyframes, en index.css.
        letra: 'letra 2s ease-in-out infinite',
        chispa: 'chispa 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
