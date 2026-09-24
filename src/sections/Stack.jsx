import { stack, titulares } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/**
 * Tecnologia: las herramientas de trabajo como un indice editorial, sin pildoras
 * (propietario, 2026-09-24: la portada ya tiene bastantes en servicios).
 *
 * Una fila por categoria bajo un filete: numero y categoria en mono a la izquierda y
 * las herramientas como texto corrido a la derecha, separadas por barras en `border`.
 * Desde md las dos columnas van lado a lado; en movil, apiladas. Al pasar el raton por
 * una fila su texto pasa de `fg-dim` a `fg` y el numero se enciende en `accent-2`.
 *
 * Ocupa en el ritmo vertical el hueco que la referencia visual rellena con una franja
 * de cifras (7+ años, 150+ proyectos, 100+ clientes). No se copian esas cifras porque
 * JdDLabs no las tiene y el principio V prohibe inventarlas: en su lugar se enseña
 * algo que si es cierto y no afirma nada sobre resultados.
 */
export function Stack() {
  return (
    <section id="stack" className="seccion bg-bg-2">
      <div className="contenedor">
        <TituloSeccion eyebrow={titulares.stack.eyebrow} enfasis={titulares.stack.enfasis}>
          {titulares.stack.titulo}
        </TituloSeccion>

        <ol className="mt-8 border-b border-border md:mt-14">
          {stack.map((grupo, i) => (
            <Reveal
              as="li"
              key={grupo.id}
              retardo={Math.min(30 * i, 240)}
              className="group grid gap-3 border-t border-border py-6 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-10 md:py-8"
            >
              <p className="flex items-baseline gap-4 font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-dim">
                <span
                  aria-hidden="true"
                  className="text-fg-mute transition-colors duration-fast ease-out-soft group-hover:text-accent-2 motion-reduce:transition-none"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {grupo.categoria}
              </p>

              <ul className="flex flex-wrap items-baseline gap-y-1 text-fs-500 font-medium leading-snug tracking-[-0.02em] text-fg-dim transition-colors duration-fast ease-out-soft group-hover:text-fg motion-reduce:transition-none">
                {grupo.items.map((item, j) => (
                  <li key={item} className="inline-flex items-baseline">
                    {item}
                    {j < grupo.items.length - 1 && (
                      <span aria-hidden="true" className="mx-3 font-light text-fg-faint md:mx-4">
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Stack;
