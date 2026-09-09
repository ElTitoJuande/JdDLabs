import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Hero } from '../sections/Hero';
import { ProyectoDestacado } from '../sections/ProyectoDestacado';
import { Servicios } from '../sections/Servicios';
import { SobreMi } from '../sections/SobreMi';
import { Contacto } from '../sections/Contacto';

/**
 * Portada. Las cinco secciones van en el orden exacto de FR-001:
 * Inicio, Proyecto destacado, Servicios, Sobre mi, Contacto.
 *
 * `data-inert-target` marca lo que el menu movil deja inerte mientras esta abierto.
 */
function Portada() {
  return (
    <>
      <Header />
      <main data-inert-target className="pt-[var(--header-h)]">
        <Hero />
        <ProyectoDestacado />
        <Servicios />
        <SobreMi />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Portada />
  </StrictMode>
);
