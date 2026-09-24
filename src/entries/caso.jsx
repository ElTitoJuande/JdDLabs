import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { Boton } from '../components/Boton';
import { Eyebrow } from '../components/Eyebrow';
import { TituloSeccion, conEnfasis } from '../components/TituloSeccion';
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
 * Estilo de la portada (propietario, 2026-09-24): halo magenta tras la cabecera, raya y
 * eyebrow en la apertura, bloques en filas numeradas como Servicios con el cierre del h2
 * en serif, tecnologia en texto con barras como Tecnologia, y el cierre con el patron de
 * Contacto y el CTA de cristal. El h1 va sin serif: la constitucion (3.2.0) solo la
 * admite en el h1 del hero de la portada y en el cierre de los h2 de seccion.
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
    <div className="border-t border-border pt-4">
      <dt className="font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute">{clave}</dt>
      <dd className="mt-2 text-fs-300 leading-snug text-fg">{valor}</dd>
    </div>
  );
}

// Cierre del h2 en serif: la ultima palabra del encabezado de copy.js, sin texto nuevo.
const ultimaPalabra = (texto) => texto.slice(texto.lastIndexOf(' ') + 1);

function Bloque({ numero, titulo, children }) {
  return (
    <Reveal
      as="section"
      className="grid gap-5 border-t border-border py-10 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-10 md:py-14"
    >
      <div>
        <span className="font-mono text-fs-200 tracking-[0.16em] text-accent-2">{numero}</span>
        <h2 className="mt-3 text-fs-600 text-fg md:text-fs-700">
          {conEnfasis(`${titulo}.`, `${ultimaPalabra(titulo)}.`)}
        </h2>
      </div>
      <div className="md:pt-9">{children}</div>
    </Reveal>
  );
}

function CasoCristaleria() {
  const bloques = [
    {
      titulo: casoEstudio.encabezados.reto,
      contenido: <p className="max-w-[40rem] text-fs-400 leading-relaxed text-fg-dim">{casoEstudio.reto}</p>,
    },
    {
      titulo: casoEstudio.encabezados.solucion,
      contenido: <p className="max-w-[40rem] text-fs-400 leading-relaxed text-fg-dim">{casoEstudio.solucion}</p>,
    },
    {
      titulo: casoEstudio.encabezados.highlights,
      // Sin numerar: son tres piezas del mismo proyecto, no los pasos de una secuencia.
      // El punto `accent-2` es el de las claves de Servicios.
      contenido: (
        <ul className="flex flex-col divide-y divide-border border-y border-border">
          {casoEstudio.highlights.map((highlight) => (
            <li key={highlight} className="flex items-baseline gap-4 py-4 text-fs-400 leading-snug text-fg">
              <span aria-hidden="true" className="h-1.5 w-1.5 flex-none -translate-y-1 rounded-full bg-accent-2" />
              {highlight}
            </li>
          ))}
        </ul>
      ),
    },
    {
      // El stack vive aqui y no en la tarjeta de la portada (FR-004, principio 70/30):
      // la lista simplificada de `proyecto.tecnologias`, en texto con barras como la
      // seccion Tecnologia de la portada.
      titulo: casoEstudio.encabezados.tecnologia,
      contenido: (
        <ul className="flex flex-wrap items-baseline gap-y-1 text-fs-600 font-medium leading-snug tracking-[-0.02em] text-fg">
          {proyecto.tecnologias.map((pieza, j) => (
            <li key={pieza} className="inline-flex items-baseline">
              {pieza}
              {j < proyecto.tecnologias.length - 1 && (
                <span aria-hidden="true" className="mx-3 font-light text-fg-faint md:mx-4">
                  /
                </span>
              )}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <>
      <Header base="/" />

      <main data-inert-target>
        {/* Apertura como el hero de la portada: empieza en y=0, por detras de la cabecera,
            para que el halo suba sin cortarse en el filete. */}
        <section className="halo-hero relative overflow-hidden pt-header">
          <div className="contenedor relative py-hero">
            <a
              href="/#proyecto"
              className="inline-flex items-center gap-2 text-fs-200 font-medium text-accent-2 no-underline transition-colors duration-fast ease-out-soft hover:text-fg motion-reduce:transition-none"
            >
              <span aria-hidden="true">←</span>
              {casoEstudio.volver}
            </a>

            <div className="mt-10 flex items-center justify-between gap-4 md:mt-14">
              <div className="flex items-center gap-4 sm:gap-5">
                <span aria-hidden="true" className="h-px w-7 flex-none bg-accent" />
                <Eyebrow as="span">{proyecto.eyebrow}</Eyebrow>
              </div>
              <Eyebrow as="span" className="hidden md:inline">
                {`${proyecto.categoria} · ${casoEstudio.anio}`}
              </Eyebrow>
            </div>

            <h1 className="mt-5 max-w-[62rem] text-fs-800 text-fg md:mt-8">{proyecto.titulo}</h1>

            <p className="mt-7 max-w-[46rem] text-fs-400 leading-relaxed text-fg-dim md:mt-10">
              {proyecto.descripcion}
            </p>
          </div>
        </section>

        <div className="contenedor pb-section">
          {/* Unico elemento visual de la pagina, igual que en la tarjeta de la portada.
              Aqui se ve entera: el marco toma la proporcion de la propia imagen, asi que
              reserva el hueco sin recortar nada por CSS. */}
          {imagenHero && (
            <div
              className="w-full overflow-hidden rounded-lg2 border border-border bg-bg-2"
              style={{ aspectRatio: `${imagenHero.ancho} / ${imagenHero.alto}` }}
            >
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

          <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {datos.map((dato) => (
              <Dato key={dato.clave} clave={dato.clave} valor={dato.valor} />
            ))}
          </dl>

          <div className="mt-16 border-b border-border md:mt-24">
            {bloques.map(({ titulo, contenido }, i) => (
              <Bloque key={titulo} numero={String(i + 1).padStart(2, '0')} titulo={titulo}>
                {contenido}
              </Bloque>
            ))}
          </div>
        </div>

        {/* Cierre con el patron de Contacto de la portada y sus mismos CTAs. */}
        <section className="seccion bg-bg-2">
          <div className="contenedor">
            <TituloSeccion eyebrow={titulares.contacto.eyebrow} enfasis={titulares.contacto.enfasis}>
              {contacto.titular}
            </TituloSeccion>
            <Reveal as="p" className="mt-4 max-w-[38rem] text-fs-400 leading-normal text-fg-dim sm:mt-6">
              {contacto.invitacion}
            </Reveal>
            <Reveal className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-12">
              <Boton href="/#contacto" variante="brillo" flecha>
                {hero.cta}
              </Boton>
              <Boton href={proyecto.url} variante="fantasma" externo>
                {proyecto.textoEnlace}
              </Boton>
            </Reveal>
          </div>
        </section>
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
