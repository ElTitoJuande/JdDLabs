import { proyecto } from '../content/copy';
import { Reveal } from '../components/Reveal';

/**
 * Seccion Proyecto destacado, en formato tarjeta (FR-004, FR-009).
 *
 * Rediseño del 2026-09-10 por decision del propietario: la seccion pasa de dos columnas
 * a una sola tarjeta — imagen, titulo, una linea de contexto y dos caminos. Todo el
 * detalle (stack, reto, solucion) se traslada a /caso-cristaleria, que deja de ser
 * opcional. El stack en concreto no vuelve a la tarjeta: se lee en el bloque
 * "Tecnologia utilizada" del caso de estudio (FR-004, principio 70/30).
 *
 * Tres ausencias deliberadas:
 *  - Sin fila de metricas de resultado: no existe analitica real que citar (principio V).
 *  - Sin testimonio: copy.js no exporta la clave `testimonio` y aqui no se reserva
 *    hueco ni marcador para el (FR-007, principio V).
 *  - Si `proyecto.captura` es null no se dibuja ni imagen ni marco vacio. La tarjeta se
 *    queda en texto y sigue siendo legible, en lugar de mostrar un placeholder.
 */
export function ProyectoDestacado() {
  const { captura } = proyecto;

  return (
    <section id="proyecto" className="border-t border-ink/10 py-20 sm:py-24">
      <div className="contenedor">
        <Reveal>
          <h2 className="text-3xl text-ink sm:text-4xl">{proyecto.eyebrow}</h2>
        </Reveal>

        <Reveal className="mt-8">
          <article className="overflow-hidden rounded-xl border border-ink/10">
            {/* La captura ya es un recorte real de la portada del cliente a 1356x904,
                asi que el marco 3:2 solo reserva el hueco y evita el salto de layout:
                no recorta nada por CSS ni hay que encuadrarla con `object-top`. */}
            {captura && (
              <div className="aspect-[3/2] w-full overflow-hidden border-b border-ink/10">
                <img
                  src={captura.src}
                  alt={captura.alt}
                  width={captura.ancho}
                  height={captura.alto}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="p-6 sm:p-8">
              <h3 className="text-2xl text-ink sm:text-3xl">{proyecto.titulo}</h3>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                {proyecto.contexto}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href={proyecto.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-base font-semibold text-bg hover:bg-accentHover"
                >
                  {proyecto.textoEnlace}
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>

                <a
                  href={proyecto.urlCaso}
                  className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-base font-semibold text-accent underline underline-offset-4 hover:text-accentHover"
                >
                  {proyecto.enlaceCaso}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export default ProyectoDestacado;
