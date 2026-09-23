import { proyecto, casoEstudio, titulares } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/**
 * Proyecto destacado (FR-004, FR-009), en formato tarjeta.
 *
 * Tres ausencias deliberadas que vienen de v1 y siguen vigentes:
 *  - Sin metricas de resultado: no hay analitica real que citar (principio V).
 *  - Sin testimonio: `copy.js` no exporta `testimonio` y aqui no se reserva hueco.
 *  - Si `proyecto.captura` es null no se dibuja ni imagen ni marco vacio.
 *
 * Novedad de v2: la tarjeta entera es un enlace al caso de estudio. "Visitar en vivo"
 * deja de competir aqui y vive dentro del caso. Un destino primario por tarjeta.
 */
export function ProyectoDestacado() {
  const { captura } = proyecto;

  return (
    <section id="proyecto" className="seccion bg-bg-2">
      <div className="contenedor">
        <TituloSeccion eyebrow={titulares.proyecto.eyebrow}>
          {titulares.proyecto.titulo}
        </TituloSeccion>

        <Reveal className="mt-8 md:mt-14">
          <article className="group overflow-hidden rounded-lg2 border border-border bg-bg-3 transition-colors duration-fast ease-out-soft hover:border-border-accent motion-reduce:transition-none">
            <a href={proyecto.urlCaso} className="block no-underline">
              {/* La captura ya es un recorte real de la portada del cliente a
                  1356x904, asi que el marco 3:2 solo reserva el hueco y evita el
                  salto de layout: no recorta nada por CSS. */}
              {captura && (
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-bg-2">
                  <img
                    src={captura.src}
                    alt={captura.alt}
                    width={captura.ancho}
                    height={captura.alto}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                  <span className="absolute left-3.5 top-3.5 rounded-full border border-border bg-bg/60 px-3.5 py-1.5 font-mono text-fs-100 tracking-[0.14em] text-accent-2 backdrop-blur-md md:left-6 md:top-6 md:px-4">
                    01
                  </span>
                </div>
              )}

              <div className="px-6 pb-8 pt-7 md:grid md:grid-cols-[1fr_minmax(0,32.5rem)] md:items-start md:gap-16 md:px-14 md:pb-12 md:pt-12">
                <div>
                  <h3 className="text-fs-600 text-fg">{proyecto.titulo}</h3>

                  <div className="mt-4 flex items-center gap-3.5 font-mono text-fs-100 uppercase tracking-[0.14em] text-fg-mute md:mt-5 md:gap-4">
                    <span>{casoEstudio.anio}</span>
                    <span aria-hidden="true" className="text-fg-faint">
                      /
                    </span>
                    <span>{proyecto.categoria}</span>
                  </div>
                </div>

                <div className="mt-6 md:mt-0">
                  <p className="text-fs-300 leading-relaxed text-fg-dim">
                    {proyecto.contexto}
                  </p>

                  <p className="mt-6 inline-flex items-center gap-2 text-fs-300 font-medium text-accent-2 md:mt-7">
                    {proyecto.enlaceCaso}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-fast ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </p>
                </div>
              </div>
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export default ProyectoDestacado;
