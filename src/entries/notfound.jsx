import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

/**
 * Pagina 404 (FR-014). Cloudflare Pages sirve el 404.html de la raiz de dist ante
 * cualquier ruta no encontrada, con el codigo de estado correcto (research.md R-002).
 */
function NoEncontrada() {
  return (
    <>
      <Header base="/" />
      <main data-inert-target className="pt-[var(--header-h)]">
        <div className="contenedor flex min-h-[60vh] max-w-2xl flex-col justify-center py-20">
          <p className="font-display text-5xl text-accent">404</p>
          <h1 className="mt-4 text-3xl text-ink sm:text-4xl">Esta página no existe</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            La dirección que has abierto no corresponde a ninguna página del sitio.
          </p>
          <div className="mt-8">
            <a
              href="/"
              className="inline-block rounded-md bg-accent px-6 py-3 text-base font-semibold text-bg hover:bg-accentHover"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoEncontrada />
  </StrictMode>
);
