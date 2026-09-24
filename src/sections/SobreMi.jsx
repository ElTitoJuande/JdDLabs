import { sobreMi, titulares } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/** Sobre mi (FR-005): parrafo principal mas la linea de refuerzo. */
export function SobreMi() {
  return (
    <section id="sobre-mi" className="seccion bg-bg-2">
      <div className="contenedor">
        <TituloSeccion eyebrow={titulares.sobreMi.eyebrow} enfasis={titulares.sobreMi.enfasis} className="max-w-[68rem]">
          {titulares.sobreMi.titulo}
        </TituloSeccion>

        <Reveal className="mt-8 md:mt-14">
          <p className="max-w-[34rem] text-fs-400 leading-relaxed text-fg-dim">
            {sobreMi.parrafo}
          </p>
          {/* El filete de acento es relleno, no texto: la regla de los dos acentos no
              le afecta y puede ir en `accent`. */}
          <p className="mt-8 max-w-[34rem] border-l-2 border-accent pl-5 text-fs-500 font-medium leading-snug tracking-[-0.02em] text-fg md:mt-12 md:pl-7">
            {sobreMi.refuerzo}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default SobreMi;
