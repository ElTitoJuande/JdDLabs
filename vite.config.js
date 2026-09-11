import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { verificarIdentidad } from './src/content/identity.js';

// Sitio multi-pagina nativo de Vite (research.md R-001): cada HTML de la raiz es una
// entrada de build. No hay enrutado en cliente (principio I de la constitucion).
const entry = (file) => fileURLToPath(new URL(file, import.meta.url));

// Salvaguarda del principio V: si falta razon social, NIF o domicilio, el build se
// detiene aqui y el Aviso Legal incompleto nunca llega a publicarse (data-model.md §2).
const guardaIdentidad = {
  name: 'jddlabs-guarda-identidad',
  buildStart() {
    verificarIdentidad();
  },
};

export default defineConfig({
  plugins: [react(), guardaIdentidad],
  build: {
    rollupOptions: {
      input: {
        index: entry('./index.html'),
        avisoLegal: entry('./aviso-legal.html'),
        privacidad: entry('./privacidad.html'),
        casoCristaleria: entry('./caso-cristaleria.html'),
        notFound: entry('./404.html'),
      },
    },
  },
});
