import { proyecto } from '../content/copy';
import { Reveal } from '../components/Reveal';

/**
 * Seccion Proyecto destacado (FR-004, FR-009).
 *
 * El badge de tecnologias es deliberadamente corto: en la capa principal no entra
 * jerga tecnica (principio 70/30). El stack ampliado vive solo en la pagina opcional
 * de caso de estudio.
 *
 * Dos ausencias deliberadas:
 *  - No hay bloque de testimonio. copy.js no exporta la clave `testimonio` y aqui no se
 *    reserva hueco ni marcador para el (FR-007, principio V).
 *  - Si `capturas` esta vacio no se renderiza ninguna imagen ni ningun marco vacio,
 *    en lugar de dejar un placeholder.
 */
export function ProyectoDestacado() {
  const tieneCapturas = proyecto.capturas.length > 0;

  return (
    <section id="proyecto" className="border-t border-ink/10 py-20 sm:py-24">
      <div className="contenedor">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            {proyecto.eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl text-ink sm:text-4xl">
            {proyecto.titulo}
          </h2>
        </Reveal>

        <Reveal className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-base leading-relaxed text-muted">{proyecto.descripcion}</p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías empleadas">
              {proyecto.tecnologias.map((tecnologia) => (
                <li
                  key={tecnologia}
                  className="rounded-full bg-accentTint px-3 py-1 text-sm font-medium text-accent"
                >
                  {tecnologia}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-muted">{proyecto.firma}</p>

            <a
              href={proyecto.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-md bg-accent px-5 py-3 text-base font-semibold text-bg hover:bg-accentHover"
            >
              {proyecto.textoEnlace}
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </div>

          {tieneCapturas && (
            <ul className="grid grid-cols-1 gap-4">
              {proyecto.capturas.map((captura) => (
                <li key={captura.src}>
                  <img
                    src={captura.src}
                    alt={captura.alt}
                    width={captura.ancho}
                    height={captura.alto}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-lg border border-ink/10"
                  />
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export default ProyectoDestacado;
