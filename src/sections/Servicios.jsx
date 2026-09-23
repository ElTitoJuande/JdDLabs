import { servicios, titulares } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/**
 * Servicios (FR-003): exactamente los tres de copy.js, ni uno mas.
 *
 * Indice editorial y no bento: con tres servicios, la celda doble del bento quedaba con
 * ~300px vacios y las dos pequeñas no se distinguian entre si. Aqui cada servicio es una
 * fila a todo el ancho — numero, titulo, descripcion con sus claves y flecha — separada
 * por filetes, y la fila entera lleva a Contacto: el servicio que interesa es el atajo
 * para pedirlo.
 *
 * Hover y foco: la fila gana fondo `bg-2`, el numero pasa a `accent-2` y la flecha se
 * rellena de `accent`. En movil la fila se apila y la flecha queda arriba a la derecha.
 */
export function Servicios() {
  const numero = (i) => String(i + 1).padStart(2, '0');

  return (
    <section id="servicios" className="seccion">
      <div className="contenedor">
        <TituloSeccion eyebrow={titulares.servicios.eyebrow}>
          {titulares.servicios.titulo}
        </TituloSeccion>

        <ul className="mt-10 border-b border-border md:mt-16">
          {servicios.map((servicio, i) => (
            <Reveal as="li" key={servicio.id} retardo={80 * i} className="border-t border-border">
              <a
                href="#contacto"
                className="group relative grid grid-cols-[auto_1fr_auto] gap-x-5 gap-y-4 rounded-lg2 px-2 py-8 no-underline transition-colors duration-fast ease-out-soft hover:bg-bg-2 focus-visible:bg-bg-2 motion-reduce:transition-none md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.1fr)_auto] md:gap-x-10 md:px-6 md:py-12"
              >
                <span className="pt-2 font-mono text-fs-200 tracking-[0.16em] text-fg-mute transition-colors duration-fast group-hover:text-accent-2 group-focus-visible:text-accent-2 md:pt-3">
                  {numero(i)}
                </span>

                <h3 className="text-fs-700 text-fg">{servicio.titulo}</h3>

                <div className="col-span-3 md:col-span-1 md:row-start-1 md:col-start-3">
                  <p className="max-w-[34rem] text-fs-300 leading-relaxed text-fg-dim">
                    {servicio.descripcion}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {servicio.claves.map((clave) => (
                      <li
                        key={clave}
                        className="inline-flex items-center gap-2 rounded-full border border-border-accent bg-accent-dim px-3.5 py-1.5 font-mono text-fs-100 text-fg"
                      >
                        {/* Punto de acento: relleno `accent-2`, decorativo. */}
                        <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rounded-full bg-accent-2" />
                        {clave}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Flecha en circulo: filete en reposo, relleno `accent` en hover y foco.
                    Decorativa: el nombre del enlace lo da el titulo y el sr-only. */}
                <span
                  aria-hidden="true"
                  className="col-start-3 row-start-1 flex h-12 w-12 items-center justify-center self-start rounded-full border border-border-strong text-fg transition-colors duration-fast ease-out-soft group-hover:border-accent group-hover:bg-accent group-focus-visible:border-accent group-focus-visible:bg-accent md:col-start-4 md:h-14 md:w-14"
                >
                  <span className="flecha" />
                </span>
                <span className="sr-only">. Hablemos de {servicio.titulo.toLowerCase()}</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Servicios;
