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
import { useAnclaInicial } from '../hooks/useAnclaInicial';

/**
 * Portada v2. Siete bloques, en el orden de la maqueta aprobada.
 *
 * Servicios va antes que Proyecto destacado por decision del propietario (2026-09-23),
 * que sustituye al orden de FR-001 de la spec 001. El marquee y la seccion de
 * tecnologia se intercalan sin alterar la secuencia de las cinco de la navegacion. La
 * seccion de Proceso que contemplaba design.md no existe aqui porque la maqueta no la
 * trae y su copy nunca llego a escribirse: era recortable por diseño.
 *
 * `data-inert-target` marca lo que el menu movil deja inerte mientras esta abierto.
 */
function Portada() {
  useAnclaInicial();

  return (
    <>
      <Header />
      {/* Sin pt-header: en la portada lo lleva el hero, que empieza en y=0 para que su
          halo pase por detras de la cabecera. */}
      <main data-inert-target>
        <Hero />
        <Marquee terminos={capacidades} />
        <Servicios />
        <ProyectoDestacado />
        <SobreMi />
        <Stack />
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
