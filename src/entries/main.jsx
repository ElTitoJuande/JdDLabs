import { StrictMode } from 'react';
import { mount } from "../components/mount";
import '../styles/index.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Hero } from '../sections/Hero';
import { ProyectoDestacado } from '../sections/ProyectoDestacado';
import { Servicios } from '../sections/Servicios';
import { Stack } from '../sections/Stack';
import { LogosStack } from '../sections/LogosStack';
import { SobreMi } from '../sections/SobreMi';
import { Contacto } from '../sections/Contacto';
import { useAnclaInicial } from '../hooks/useAnclaInicial';

/** Portfolio según el diseño aprobado: inicio, servicios, proyecto, sobre mí, tecnología y contacto. */
export function Portada() {
  useAnclaInicial();

  return (
    <>
      <Header />
      <main id="contenido" data-inert-target>
        <Hero />
        <Servicios />
        <ProyectoDestacado />
        <SobreMi />
        <Stack />
        <LogosStack />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}



if (!import.meta.env.SSR) mount(
  <StrictMode>
    <Portada />
  </StrictMode>
);
