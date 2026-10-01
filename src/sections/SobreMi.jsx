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
    <section id="sobre-mi" className="seccion overflow-x-clip">
      <div className="contenedor">
        <TituloSeccion eyebrow={titulares.sobreMi.eyebrow} enfasis={titulares.sobreMi.enfasis} className="max-w-[68rem]">
          {titulares.sobreMi.titulo}
        </TituloSeccion>

        <div
          className={[
            'mt-8 grid gap-10 md:mt-14 md:items-center md:gap-14',
            foto ? 'md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]' : '',
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
            <Reveal retardo={80} className="justify-self-center md:justify-self-end">
              {/* Sin marco: la foto viene recortada. Un halo `accent-dim` amplio detras separa
                  el polo negro del fondo oscuro de la seccion. Sube 60px en escritorio
                  (propietario, 2026-09-24 y 2026-09-30); el desplazamiento va aqui y no en el Reveal,
                  que anima su propio transform. La caja toma la proporcion de la foto
                  (vertical) para no dejar hueco a los lados; 21rem de ancho la dejan a
                  unos 36rem de alto en escritorio. */}
              <div
                className="relative w-full max-w-[21rem] md:-translate-y-[60px]"
                style={{ aspectRatio: `${foto.ancho} / ${foto.alto}` }}
              >
                <div
                  aria-hidden="true"
                  className="absolute -inset-[6%] rounded-full bg-accent/25 blur-[110px]"
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
