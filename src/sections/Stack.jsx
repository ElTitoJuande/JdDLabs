import { stack, titulares } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/**
 * Tecnologia: las herramientas de trabajo, en tres grupos bajo un filete.
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
        <TituloSeccion eyebrow={titulares.stack.eyebrow}>
          {titulares.stack.titulo}
        </TituloSeccion>

        <ul className="mt-8 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-3 md:gap-5">
          {stack.map((grupo, i) => (
            <Reveal
              as="li"
              key={grupo.id}
              retardo={80 * i}
              className="border-t border-border pt-5 md:pt-6"
            >
              <p className="font-mono text-fs-100 uppercase tracking-[0.16em] text-accent-2">
                {grupo.categoria}
              </p>

              <ul className="mt-5 flex flex-col gap-3 text-fs-400 text-fg md:mt-7 md:gap-4">
                {grupo.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 flex-none rounded-full bg-fg-mute"
                    />
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
