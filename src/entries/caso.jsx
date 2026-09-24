import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { Boton } from '../components/Boton';
import { Eyebrow } from '../components/Eyebrow';
import { proyecto, casoEstudio, hero, contacto, titulares } from '../content/copy';

/**
 * Caso de estudio ampliado de Cristaleria Ruteña (US5, Fase 8).
 *
 * Es la unica pagina que admite profundidad tecnica: la portada se queda en la tarjeta
 * y el 70/30 se respeta porque la jerga vive aqui, no alli.
 *
 * La forma es la de la referencia: una sola imagen de apertura y, debajo, texto —
 * datos del cliente, reto, solucion, highlights y tecnologia. No hay galeria de
 * capturas: quien quiera ver el sitio real tiene el enlace "Visitar en vivo".
 *
 * Dos bloques que NO existen y que no se dejan a medias (principio V):
 *  - Fila de metricas de resultado. No hay analitica real del sitio del cliente.
 *  - Testimonio. Sin cita verificada no se reserva ni el hueco (FR-007). El dia que
 *    llegue se añade el bloque entero, no se rellena un marcador.
 */

// El hero cae por encima del pliegue, asi que nunca lleva carga perezosa (FR-023).
const imagenHero = casoEstudio.imagenHero ?? proyecto.captura;

// Orden del formato de referencia. Las seis filas estan completas desde el 2026-09-11.
// El filtro se queda igual: si una clave se retira de copy.js su fila desaparece sola,
// sin dejar un hueco ni un valor a medias (principio V).
const datos = [
  { clave: 'Cliente', valor: casoEstudio.cliente },
  { clave: 'Industria', valor: casoEstudio.industria },
  { clave: 'Año', valor: casoEstudio.anio },
  { clave: 'Duración', valor: casoEstudio.duracion },
  { clave: 'Servicios', valor: casoEstudio.servicios },
  { clave: 'Rol', valor: casoEstudio.rol },
].filter((dato) => dato.valor);

function Dato({ clave, valor }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4">
      <dt className="w-44 shrink-0 font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute">
        {clave}
      </dt>
      <dd className="text-fs-300 text-fg">{valor}</dd>
    </div>
  );
}

function Bloque({ titulo, children }) {
  return (
    <Reveal as="section" className="mt-14 border-t border-border pt-10">
      <h2 className="text-fs-600 text-fg">{titulo}</h2>
      {children}
    </Reveal>
  );
}

function CasoCristaleria() {
  return (
    <>
      <Header base="/" />

      <main data-inert-target className="pt-header">
        <article className="contenedor max-w-3xl py-section">
          <a
            href="/#proyecto"
            className="inline-flex items-center gap-2 text-fs-200 font-medium text-accent-2 no-underline transition-colors duration-fast ease-out-soft hover:text-fg motion-reduce:transition-none"
          >
            <span aria-hidden="true">←</span>
            {casoEstudio.volver}
          </a>

          <h1 className="mt-7 text-fs-700 text-fg">{proyecto.titulo}</h1>

          <p className="mt-7 text-fs-300 leading-relaxed text-fg-dim">{proyecto.descripcion}</p>

          {/* Unico elemento visual de la pagina, igual que en la tarjeta de la portada.
              Ya viene recortada a 1356x904, asi que el marco solo reserva la proporcion
              3:2 y evita el salto de layout: aqui no se recorta nada por CSS. */}
          {imagenHero && (
            <div className="mt-10 aspect-[3/2] w-full overflow-hidden rounded-lg2 border border-border bg-bg-2">
              <img
                src={imagenHero.src}
                alt={imagenHero.alt}
                width={imagenHero.ancho}
                height={imagenHero.alto}
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <dl className="mt-12 divide-y divide-border border-y border-border">
            {datos.map((dato) => (
              <Dato key={dato.clave} clave={dato.clave} valor={dato.valor} />
            ))}
          </dl>

          <Bloque titulo={casoEstudio.encabezados.reto}>
            <p className="mt-5 text-fs-300 leading-relaxed text-fg-dim">{casoEstudio.reto}</p>
          </Bloque>

          <Bloque titulo={casoEstudio.encabezados.solucion}>
            <p className="mt-5 text-fs-300 leading-relaxed text-fg-dim">{casoEstudio.solucion}</p>
          </Bloque>

          <Bloque titulo={casoEstudio.encabezados.highlights}>
            {/* Sin numerar: son tres piezas del mismo proyecto, no los pasos de una
                secuencia, y numerarlas insinuaria un orden que no existe. */}
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {casoEstudio.highlights.map((highlight) => (
                <li key={highlight} className="py-3.5 text-fs-300 leading-relaxed text-fg">
                  {highlight}
                </li>
              ))}
            </ul>
          </Bloque>

          {/* El stack vive aqui y no en la tarjeta de la portada (FR-004, principio
              70/30). Es la lista simplificada de `proyecto.tecnologias`, sin segunda
              copia: cuatro tags y ni una linea de jerga mas. */}
          <Bloque titulo={casoEstudio.encabezados.tecnologia}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {proyecto.tecnologias.map((pieza) => (
                <li
                  key={pieza}
                  className="rounded-full border border-border bg-bg-3 px-5 py-2.5 font-mono text-fs-200 text-fg-dim"
                >
                  {pieza}
                </li>
              ))}
            </ul>
          </Bloque>

          <Reveal as="section" className="mt-14 rounded-lg2 border border-border bg-bg-3 p-6 sm:p-9">
            <Eyebrow>{titulares.contacto.eyebrow}</Eyebrow>
            <p className="mt-4 text-fs-500 font-medium tracking-tight text-fg">
              {contacto.titular}
            </p>
            <p className="mt-3 text-fs-300 leading-relaxed text-fg-dim">{contacto.invitacion}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Boton href="/#contacto">{hero.cta}</Boton>

              <Boton href={proyecto.url} variante="fantasma" externo>
                {proyecto.textoEnlace}
              </Boton>
            </div>
          </Reveal>
        </article>
      </main>

      <Footer base="/" />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CasoCristaleria />
  </StrictMode>
);
