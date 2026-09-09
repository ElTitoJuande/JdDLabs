import { servicios } from '../content/copy';
import { Reveal } from '../components/Reveal';

/**
 * Seccion Servicios (FR-003): exactamente las tres tarjetas de copy.js, ni una mas.
 * Una sola columna por debajo de 768px (FR-012).
 */
export function Servicios() {
  return (
    <section id="servicios" className="border-t border-ink/10 py-20 sm:py-24">
      <div className="contenedor">
        <Reveal as="h2" className="text-3xl text-ink sm:text-4xl">
          Servicios
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {servicios.map((servicio) => (
            <Reveal
              as="li"
              key={servicio.id}
              className="rounded-lg border border-ink/10 bg-bg p-6"
            >
              <h3 className="text-xl text-ink">{servicio.titulo}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {servicio.descripcion}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Servicios;
