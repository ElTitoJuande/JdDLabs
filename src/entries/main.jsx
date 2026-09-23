import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Hero } from '../sections/Hero';
import { Marquee } from '../components/Marquee';
import { ProyectoDestacado } from '../sections/ProyectoDestacado';
import { Servicios } from '../sections/Servicios';
import { Stack } from '../sections/Stack';
import { SobreMi } from '../sections/SobreMi';
import { Contacto } from '../sections/Contacto';
import { capacidades } from '../content/copy';

/**
 * Portada v2. Siete bloques, en el orden de la maqueta aprobada.
 *
 * El orden respeta FR-001 (Inicio, Proyecto destacado, Servicios, Sobre mi, Contacto):
 * el marquee y la seccion de tecnologia se intercalan sin alterar esa secuencia. La
 * seccion de Proceso que contemplaba design.md no existe aqui porque la maqueta no la
 * trae y su copy nunca llego a escribirse: era recortable por diseño.
 *
 * `data-inert-target` marca lo que el menu movil deja inerte mientras esta abierto.
 */
function Portada() {
  return (
    <>
      <Header />
      <main data-inert-target className="pt-header">
        <Hero />
        <Marquee terminos={capacidades} />
        <ProyectoDestacado />
        <Servicios />
        <Stack />
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
