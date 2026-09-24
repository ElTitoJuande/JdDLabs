import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Boton } from '../components/Boton';

/**
 * Pagina 404 (FR-014). Cloudflare Pages sirve el 404.html de la raiz de dist ante
 * cualquier ruta no encontrada, con el codigo de estado correcto (research.md R-002).
 */
function NoEncontrada() {
  return (
    <>
      <Header base="/" />
      <main data-inert-target className="pt-header">
        <div className="contenedor flex min-h-[60vh] max-w-2xl flex-col justify-center py-section">
          <p className="font-mono text-fs-600 text-accent-2">404</p>
          <h1 className="mt-6 text-fs-700 text-fg">Esta página no existe</h1>
          <p className="mt-6 text-fs-400 leading-relaxed text-fg-dim">
            La dirección que has abierto no corresponde a ninguna página del sitio.
          </p>
          <div className="mt-10">
            <Boton href="/">Volver al inicio</Boton>
          </div>
        </div>
      </main>
      <Footer base="/" />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoEncontrada />
  </StrictMode>
);
