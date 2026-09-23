import { proyecto, casoEstudio, titulares } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';
import { Boton } from '../components/Boton';

/**
 * Proyecto destacado (FR-004, FR-009), en dos columnas: captura a un lado y, al otro,
 * datos, titulo, descripcion y los dos destinos — la web en vivo y el caso de estudio.
 *
 * Tres ausencias deliberadas que vienen de v1 y siguen vigentes:
 *  - Sin metricas de resultado: no hay analitica real que citar (principio V).
 *  - Sin testimonio: `copy.js` no exporta `testimonio` y aqui no se reserva hueco.
 *  - Si `proyecto.captura` es null no se dibuja ni imagen ni marco vacio, y el texto
 *    ocupa el ancho entero.
 *
 * La captura no es un enlace: los dos destinos ya estan en la columna de texto, y un
 * tercer enlace repetido solo alargaria el recorrido con el tabulador.
 */
export function ProyectoDestacado() {
  const { captura } = proyecto;

  return (
    <section id="proyecto" className="seccion bg-bg-2">
      <div className="contenedor">
        <TituloSeccion eyebrow={titulares.proyecto.eyebrow}>
          {titulares.proyecto.titulo}
        </TituloSeccion>

        <Reveal
          as="article"
          className={[
            'mt-10 grid gap-8 md:mt-16 md:items-center md:gap-14',
            captura ? 'md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]' : '',
          ].join(' ')}
        >
          {/* La captura ya es un recorte real de la portada del cliente a 1356x904, asi
              que el marco 3:2 solo reserva el hueco y evita el salto de layout: no
              recorta nada por CSS. */}
          {captura && (
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg2 border border-border bg-bg-3">
              <img
                src={captura.src}
                alt={captura.alt}
                width={captura.ancho}
                height={captura.alto}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
              <span className="absolute bottom-3.5 right-3.5 rounded-full border border-border bg-bg/60 px-3.5 py-1.5 font-mono text-fs-100 tracking-[0.14em] text-accent-2 backdrop-blur-md md:bottom-5 md:right-5 md:px-4">
                01
              </span>
            </div>
          )}

          <div>
            <div className="flex items-center gap-3.5 font-mono text-fs-100 uppercase tracking-[0.14em] text-fg-mute md:gap-4">
              <span>{casoEstudio.anio}</span>
              <span aria-hidden="true" className="text-fg-faint">
                /
              </span>
              <span>{proyecto.categoria}</span>
            </div>

            <h3 className="mt-4 text-fs-700 text-fg md:mt-5">{proyecto.titulo}</h3>

            <p className="mt-5 text-fs-300 leading-relaxed text-fg-dim md:mt-6">
              {proyecto.descripcion}
            </p>

            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7 md:mt-10">
              {/* Indicador "en vivo": punto `accent-2` con un pulso que se expande. Con
                  movimiento reducido el pulso no se anima y queda solo el punto. */}
              <Boton href={proyecto.url} variante="fantasma" tamano="sm" externo>
                <span aria-hidden="true" className="relative flex h-2 w-2 flex-none">
                  <span className="absolute inset-0 rounded-full bg-accent-2 opacity-75 motion-safe:animate-ping" />
                  <span className="relative h-2 w-2 rounded-full bg-accent-2" />
                </span>
                {proyecto.textoEnlace}
              </Boton>

              <a
                href={proyecto.urlCaso}
                className="group inline-flex items-center gap-2.5 text-fs-300 font-medium text-accent-2 no-underline"
              >
                {proyecto.enlaceCaso}
                <span aria-hidden="true" className="flecha" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ProyectoDestacado;
