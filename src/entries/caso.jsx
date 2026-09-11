import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { proyecto, casoEstudio, hero, contacto } from '../content/copy';

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

// Orden del formato de referencia. Las claves que el propietario aun no ha aportado
// —`anio`, `duracion`, `servicios`— no existen en copy.js: el filtro las descarta y el
// bloque no muestra ninguna fila vacia. Basta con declararlas alli para que aparezcan.
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
      <dt className="w-40 shrink-0 text-sm font-medium text-ink">{clave}</dt>
      <dd className="text-base text-muted">{valor}</dd>
    </div>
  );
}

function Bloque({ titulo, children }) {
  return (
    <Reveal as="section" className="mt-14 border-t border-ink/10 pt-10">
      <h2 className="text-2xl text-ink sm:text-3xl">{titulo}</h2>
      {children}
    </Reveal>
  );
}

function CasoCristaleria() {
  return (
    <>
      <Header base="/" />

      <main data-inert-target className="pt-[var(--header-h)]">
        <article className="contenedor max-w-3xl py-16 sm:py-20">
          <a
            href="/#proyecto"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accentHover"
          >
            <span aria-hidden="true">←</span>
            {casoEstudio.volver}
          </a>

          <h1 className="mt-6 text-3xl text-ink sm:text-4xl">{proyecto.titulo}</h1>

          <p className="mt-5 text-base leading-relaxed text-muted">{proyecto.descripcion}</p>

          {/* Unico elemento visual de la pagina, igual que en la tarjeta de la portada.
              Ya viene recortada a 1356x904, asi que el marco solo reserva la proporcion
              3:2 y evita el salto de layout: aqui no se recorta nada por CSS. */}
          {imagenHero && (
            <div className="mt-10 aspect-[3/2] w-full overflow-hidden rounded-xl border border-ink/10">
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

          <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {datos.map((dato) => (
              <Dato key={dato.clave} clave={dato.clave} valor={dato.valor} />
            ))}
          </dl>

          <Bloque titulo={casoEstudio.encabezados.reto}>
            <p className="mt-4 text-base leading-relaxed text-muted">{casoEstudio.reto}</p>
          </Bloque>

          <Bloque titulo={casoEstudio.encabezados.solucion}>
            <p className="mt-4 text-base leading-relaxed text-muted">{casoEstudio.solucion}</p>
          </Bloque>

          <Bloque titulo={casoEstudio.encabezados.highlights}>
            {/* Sin numerar: son tres piezas del mismo proyecto, no los pasos de una
                secuencia, y numerarlas insinuaria un orden que no existe. */}
            <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {casoEstudio.highlights.map((highlight) => (
                <li key={highlight} className="py-3 text-base leading-relaxed text-ink">
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
                  className="rounded-full bg-accentTint px-4 py-1.5 text-sm font-medium text-accent"
                >
                  {pieza}
                </li>
              ))}
            </ul>
          </Bloque>

          <Reveal as="section" className="mt-14 rounded-xl border border-ink/10 p-6 sm:p-8">
            <p className="text-base leading-relaxed text-ink">{contacto.invitacion}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="/#contacto"
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-base font-semibold text-bg hover:bg-accentHover"
              >
                {hero.cta}
              </a>

              <a
                href={proyecto.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-base font-semibold text-accent underline underline-offset-4 hover:text-accentHover"
              >
                {proyecto.textoEnlace}
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </div>
          </Reveal>
        </article>
      </main>

      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CasoCristaleria />
  </StrictMode>
);
