import { servicios, titulares } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/**
 * Servicios (FR-003): exactamente las tres tarjetas de copy.js, ni una mas.
 *
 * Bento asimetrico: la primera celda ocupa el doble de ancho y de alto sobre la
 * superficie mas elevada de la paleta, con titular a fs-700; las otras dos van a
 * fs-600 sobre `bg-3`. Tres cajas identicas no jerarquizan nada, que es lo que
 * fallaba en v1.
 *
 * Una sola columna por debajo de 768px (FR-012). La celda destacada conserva alli su
 * superficie elevada, como en la maqueta: es lo unico que la sigue distinguiendo
 * cuando ya no puede ser mas grande.
 */
export function Servicios() {
  const [destacado, ...resto] = servicios;

  const numero = (i) => String(i + 1).padStart(2, '0');

  return (
    <section id="servicios" className="seccion bg-bg-2">
      <div className="contenedor">
        <TituloSeccion eyebrow={titulares.servicios.eyebrow}>
          {titulares.servicios.titulo}
        </TituloSeccion>

        <ul className="mt-8 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-5 md:[grid-auto-rows:minmax(15rem,auto)]">
          <Reveal
            as="li"
            className="flex flex-col justify-between gap-7 rounded-lg2 border border-border bg-bg-elev p-7 transition-colors duration-fast ease-out-soft hover:border-border-accent motion-reduce:transition-none md:col-span-2 md:row-span-2 md:p-12"
          >
            <p className="font-mono text-fs-100 uppercase tracking-[0.16em] text-accent-2">
              {numero(0)}
            </p>
            <div>
              <h3 className="text-fs-700 text-fg">{destacado.titulo}</h3>
              <p className="mt-4 max-w-[34rem] text-fs-300 leading-relaxed text-fg-dim md:mt-5">
                {destacado.descripcion}
              </p>
            </div>
          </Reveal>

          {resto.map((servicio, i) => (
            <Reveal
              as="li"
              key={servicio.id}
              retardo={80 * (i + 1)}
              className="flex flex-col justify-between gap-7 rounded-lg2 border border-border bg-bg-3 p-7 transition-colors duration-fast ease-out-soft hover:border-border-accent motion-reduce:transition-none md:p-9"
            >
              <p className="font-mono text-fs-100 uppercase tracking-[0.16em] text-accent-2">
                {numero(i + 1)}
              </p>
              <div>
                <h3 className="text-fs-600 text-fg">{servicio.titulo}</h3>
                <p className="mt-4 text-fs-300 leading-relaxed text-fg-dim">
                  {servicio.descripcion}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Servicios;
