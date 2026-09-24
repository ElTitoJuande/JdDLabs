import { sobreMi, titulares } from '../content/copy';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

/**
 * Sobre mi (FR-005): parrafo principal mas la linea de refuerzo y, a la derecha, la foto
 * del propietario. Si `sobreMi.foto` es null la seccion queda en una columna.
 */
export function SobreMi() {
  const { foto } = sobreMi;

  return (
    <section id="sobre-mi" className="seccion bg-bg-2">
      <div className="contenedor">
        <TituloSeccion eyebrow={titulares.sobreMi.eyebrow} enfasis={titulares.sobreMi.enfasis} className="max-w-[68rem]">
          {titulares.sobreMi.titulo}
        </TituloSeccion>

        <div
          className={[
            'mt-8 grid gap-10 md:mt-14 md:items-center md:gap-14',
            foto ? 'md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]' : '',
          ].join(' ')}
        >
          <Reveal>
            <p className="max-w-[34rem] text-fs-400 leading-relaxed text-fg-dim">
              {sobreMi.parrafo}
            </p>
            {/* El filete de acento es relleno, no texto: la regla de los dos acentos no
                le afecta y puede ir en `accent`. */}
            <p className="mt-8 max-w-[34rem] border-l-2 border-accent pl-5 text-fs-500 font-medium leading-snug tracking-[-0.02em] text-fg md:mt-12 md:pl-7">
              {sobreMi.refuerzo}
            </p>
          </Reveal>

          {foto && (
            <Reveal retardo={80} className="md:justify-self-end">
              {/* Sin marco: la foto viene recortada. Un halo `accent-dim` detras separa el
                  polo negro del fondo oscuro de la seccion. */}
              <div className="relative aspect-square w-full max-w-[26rem]">
                <div
                  aria-hidden="true"
                  className="absolute inset-[12%] rounded-full bg-accent-dim blur-3xl"
                />
                <img
                  src={foto.src}
                  alt={foto.alt}
                  width={foto.ancho}
                  height={foto.alto}
                  loading="lazy"
                  decoding="async"
                  className="relative h-full w-full object-contain"
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export default SobreMi;
