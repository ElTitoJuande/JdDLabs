import { hero } from '../content/copy';
import { identity } from '../content/identity';
import { Eyebrow } from '../components/Eyebrow';
import { Boton } from '../components/Boton';

// Enfasis del titular (constitucion 3.1.0, principio II): Instrument Serif en cursiva,
// solo aqui. La palabra de enlace en `fg-dim`; la frase clave en `accent-2`, que es el
// acento de TEXTO (regla de los dos acentos).
const ENFASIS = {
  enlace: 'text-fg-dim',
  clave: 'text-accent-2',
};

/**
 * Hero (FR-002). Titular, subtitulo y llamadas a la accion se ven sin hacer scroll.
 *
 * Sin min-height: el titular a `fs-900` cabe en dos lineas y el parrafo comparte fila
 * con los CTAs, asi que el bloque entero entra en la primera pantalla incluso a
 * 1366x768 y la banda del marquee sube justo debajo. Con min-height de ventana quedaba
 * un vacio que la referencia rellena con cifras, y aqui no hay cifras (principio V).
 *
 * Empieza en y=0, por detras de la cabecera: `pt-header` compensa su alto dentro de la
 * seccion y el halo sube sin quedar recortado en el filete.
 */
export function Hero() {
  return (
    <section id="inicio" className="halo-hero relative overflow-hidden pt-header">
      <div className="contenedor relative py-hero">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Raya decorativa: `accent` como relleno, no como texto. */}
            <span aria-hidden="true" className="h-px w-7 flex-none bg-accent" />
            {/* Por debajo de sm el eyebrow no cabe en una linea: se parte por el punto,
                nombre arriba y rol abajo, en lugar de dejar que corte por cualquier sitio. */}
            <Eyebrow as="span">
              {hero.eyebrow.nombre}
              <span aria-hidden="true" className="hidden sm:inline">
                {' · '}
              </span>
              <br className="sm:hidden" />
              <span className="sr-only"> </span>
              {hero.eyebrow.rol}
            </Eyebrow>
          </div>
          {/* El lugar se oculta por debajo de md: junto al eyebrow no cabe hasta 768px, y
              Rute ya esta en el title, la meta description, el JSON-LD, Contacto y el pie. */}
          <Eyebrow as="span" className="hidden md:inline">
            {`${identity.localidad}, ${identity.provincia}`}
          </Eyebrow>
        </div>

        <h1 className="mt-5 text-fs-900 text-fg md:mt-9">
          {hero.titular.map(({ texto, enfasis }) =>
            enfasis ? (
              <span
                key={texto}
                className={`font-serif font-normal italic tracking-[-0.02em] ${ENFASIS[enfasis]}`}
              >
                {texto}
              </span>
            ) : (
              texto
            )
          )}
        </h1>

        <div className="mt-7 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[38rem] text-fs-400 leading-normal text-fg-dim">
            <span className="text-fg">{hero.subtitulo.destacado}</span> {hero.subtitulo.resto}
          </p>

          <div className="flex flex-none flex-col gap-3 sm:flex-row sm:items-center sm:gap-3.5">
            <Boton href="#contacto" variante="brillo" flecha>
              {hero.cta}
            </Boton>
            <Boton href="#proyecto" variante="fantasma">
              {hero.ctaSecundario}
            </Boton>
          </div>
        </div>

        {/* Compromisos: cifras mono con su etiqueta, separadas por filetes. Lista y no
            <dl>: cada item se lee de corrido, "1, Interlocutor, del primer café…". */}
        <ul className="mt-12 grid grid-cols-3 border-t border-border md:mt-16">
          {hero.compromisos.map(({ cifra, lectura, texto }, i) => (
            <li
              key={texto}
              className={[
                // Tres columnas en todos los anchos, cifra arriba y etiqueta debajo,
                // separadas por filete vertical. La estructura en filas (cifra a un lado,
                // texto al otro) la descarto el propietario en movil.
                'pt-6 sm:pt-8',
                i > 0 ? 'border-l border-border pl-3 sm:pl-6 md:pl-8' : '',
                i < hero.compromisos.length - 1 ? 'pr-3 sm:pr-6 md:pr-8' : '',
              ].join(' ')}
            >
              <p className="font-mono text-fs-600 leading-none text-accent-2">
                {lectura ? (
                  <>
                    <span aria-hidden="true">{cifra}</span>
                    <span className="sr-only">{lectura}</span>
                  </>
                ) : (
                  cifra
                )}
              </p>
              {/* En movil, texto corrido pequeño: en columnas de ~100px las versalitas
                  mono con tracking no caben. Desde sm, el eyebrow de siempre. */}
              <p className="mt-3 text-fs-200 leading-snug text-fg-dim sm:hidden">{texto}</p>
              <Eyebrow className="hidden max-w-[18rem] sm:mt-4 sm:block">{texto}</Eyebrow>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero;
