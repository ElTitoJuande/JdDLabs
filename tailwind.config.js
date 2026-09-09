/** @type {import('tailwindcss').Config} */

// Unica fuente de verdad de la paleta (principio III). Prohibido el literal de color
// suelto en JSX o CSS: todo color se referencia por su token.
const paleta = {
  bg: '#FAF9F6',
  ink: '#1A1A18',
  dark: '#15040D',
  accent: '#93002c',
  accentHover: '#780024',
  accentTint: '#f4e5e9',
  muted: '#6B6B66',
};

export default {
  content: ['./*.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ...paleta,
        // El preflight de Tailwind emite gray.400 para el placeholder. Se reasigna al
        // token `muted` para que ningun gris ajeno llegue al CSS publicado.
        gray: { 400: paleta.muted },
      },
      // Mismo motivo: los valores por defecto del borde y del anillo de foco son
      // colores de Tailwind, no de la paleta. Se fijan aqui, antes de generarse.
      borderColor: { DEFAULT: paleta.ink },
      ringColor: { DEFAULT: paleta.accent },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
