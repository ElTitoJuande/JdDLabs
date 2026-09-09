import { sobreMi } from '../content/copy';
import { Reveal } from '../components/Reveal';

/** Seccion Sobre mi (FR-005): parrafo principal mas la linea de refuerzo. */
export function SobreMi() {
  return (
    <section id="sobre-mi" className="border-t border-ink/10 py-20 sm:py-24">
      <div className="contenedor max-w-3xl">
        <Reveal as="h2" className="text-3xl text-ink sm:text-4xl">
          Sobre mí
        </Reveal>

        <Reveal>
          <p className="mt-8 text-lg leading-relaxed text-ink">{sobreMi.parrafo}</p>
          <p className="mt-6 border-l-2 border-accent pl-5 text-lg leading-relaxed text-muted">
            {sobreMi.refuerzo}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default SobreMi;
