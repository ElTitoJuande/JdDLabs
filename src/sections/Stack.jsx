import { stack, titulares } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/**
 * Tecnologia: las herramientas de trabajo, en nueve categorias bajo un filete.
 *
 * Rejilla de 3x3 desde lg (2 columnas desde sm, 1 en movil) y cada herramienta en una
 * pildora que se reparte en lineas: con 44 herramientas, las listas verticales de la
 * primera version medirian mas de mil pixeles de alto.
 *
 * Ocupa en el ritmo vertical el hueco que la referencia visual rellena con una franja
 * de cifras (7+ años, 150+ proyectos, 100+ clientes). No se copian esas cifras porque
 * JdDLabs no las tiene y el principio V prohibe inventarlas: en su lugar se enseña
 * algo que si es cierto y no afirma nada sobre resultados.
 */
export function Stack() {
  return (
    <section id="stack" className="seccion">
      <div className="contenedor">
        <TituloSeccion eyebrow={titulares.stack.eyebrow} enfasis={titulares.stack.enfasis}>
          {titulares.stack.titulo}
        </TituloSeccion>

        <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 lg:gap-y-12">
          {stack.map((grupo, i) => (
            <Reveal
              as="li"
              key={grupo.id}
              retardo={40 * (i % 3)}
              className="border-t border-border pt-5 md:pt-6"
            >
              <p className="font-mono text-fs-100 uppercase tracking-[0.16em] text-accent-2">
                {grupo.categoria}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2 md:mt-6">
                {grupo.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-bg-2 px-3.5 py-1.5 text-fs-200 text-fg transition-colors duration-fast ease-out-soft hover:border-border-accent motion-reduce:transition-none"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Stack;
