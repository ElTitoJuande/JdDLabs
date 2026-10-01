import { useEffect, useRef, useState } from 'react';
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
 * rellena de `accent`. El fondo va sin radio: esquinas redondeadas contra filetes rectos
 * dejaban cuñas sin pintar donde la fila toca el separador. En movil la fila se apila y la flecha queda arriba a la derecha.
 *
 * En pantallas tactiles (sin hover) ese mismo estado lo da el scroll: la fila que cruza
 * la franja central de la pantalla queda `data-activo` y se enciende, una detras de
 * otra (propietario, 2026-09-24). Con raton no se observa nada y manda el hover.
 */
export function Servicios() {
  const numero = (i) => String(i + 1).padStart(2, '0');
  const filas = useRef([]);
  const [activo, setActivo] = useState(-1);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function' || !window.matchMedia('(hover: none)').matches) return;
    // Franja del 20 % central: solo cabe una fila a la vez.
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          const i = filas.current.indexOf(entrada.target);
          if (entrada.isIntersecting) setActivo(i);
          else setActivo((actual) => (actual === i ? -1 : actual));
        }
      },
      { rootMargin: '-40% 0px -40% 0px' },
    );
    filas.current.forEach((fila) => fila && observador.observe(fila));
    return () => observador.disconnect();
  }, []);

  return (
    <section id="servicios" className="seccion">
      <div className="contenedor">
        <TituloSeccion eyebrow={titulares.servicios.eyebrow} enfasis={titulares.servicios.enfasis}>
          {titulares.servicios.titulo}
        </TituloSeccion>

        <ul className="mt-10 border-b border-border md:mt-16">
          {servicios.map((servicio, i) => (
            <Reveal as="li" key={servicio.id} retardo={Math.min(80 * i, 240)} className="border-t border-border">
              <a
                ref={(el) => (filas.current[i] = el)}
                data-activo={activo === i || undefined}
                href="#contacto"
                className="group relative grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-5 gap-y-4 px-2 py-8 no-underline transition-colors duration-fast ease-out-soft hover:bg-bg-2 focus-visible:bg-bg-2 data-[activo]:bg-bg-2 motion-reduce:transition-none md:px-6 md:py-12 lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.1fr)_auto] lg:gap-x-10"
              >
                <span className="pt-2 font-mono text-fs-200 tracking-[0.16em] text-fg-mute transition-colors duration-fast group-hover:text-accent-2 group-focus-visible:text-accent-2 group-data-[activo]:text-accent-2 md:pt-3">
                  {numero(i)}
                </span>

                {/* La mono es ancha y "Aplicaciones" marca el minimo: fs-500 por debajo de
                    360px, fs-600 en la fila apilada, fs-700 desde md. En columnas (lg) la
                    pista baja a fs-600 hasta xl; a fs-700 se montaba sobre la descripcion
                    entre 1024 y 1100px. Barrido de 320 a 1440 sin desbordes. */}
                <h3 className="text-fs-500 text-fg min-[360px]:text-fs-600 md:text-fs-700 lg:text-fs-600 xl:text-fs-700">{servicio.titulo}</h3>

                <div className="col-span-3 lg:col-span-1 lg:col-start-3 lg:row-start-1">
                  <p className="max-w-[34rem] text-fs-300 leading-relaxed text-fg-dim">
                    {servicio.descripcion}
                  </p>
                  {/* Claves como lista con filetes: el mismo lenguaje de indice que las
                      filas. Dos columnas cuando la descripcion va a todo el ancho (sm-md) o
                      la columna ya es holgada (xl); entre lg y xl, una, porque a dos
                      "APIs e integraciones" se partia. Cuatro claves por servicio: las
                      dos columnas quedan siempre completas. */}
                  <ul className="mt-6 grid grid-cols-1 gap-x-6 border-t border-border sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {servicio.claves.map((clave) => (
                      <li
                        key={clave}
                        className="flex items-baseline gap-2.5 border-b border-border py-2.5 text-fs-300 text-fg"
                      >
                        {/* Almohadilla de acento en mono: decorativa. */}
                        <span aria-hidden="true" className="font-mono text-accent-2">
                          #
                        </span>
                        {clave}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Flecha en circulo: filete en reposo, relleno `accent` en hover y foco.
                    Decorativa: el nombre del enlace lo da el titulo y el sr-only. */}
                <span
                  aria-hidden="true"
                  className="col-start-3 row-start-1 flex h-12 w-12 items-center justify-center self-start rounded-full border border-border-strong text-fg transition-colors duration-fast ease-out-soft group-hover:border-accent group-hover:bg-accent group-focus-visible:border-accent group-focus-visible:bg-accent group-data-[activo]:border-accent group-data-[activo]:bg-accent md:h-14 md:w-14 lg:col-start-4"
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
