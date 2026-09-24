import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

/**
 * Patron unico de apertura de seccion: eyebrow mono + titular a fs-800.
 *
 * Ninguna seccion vuelve a escribir su propio <h2>: si el tratamiento de titular
 * cambia, cambia aqui y en un solo sitio. El punto final del titular viene de la
 * maqueta y es deliberado.
 *
 * La raya magenta delante del eyebrow es la misma del hero: el indicador de marca de
 * cada apertura. `accent` como relleno, nunca como texto.
 *
 * `enfasis`: el cierre del titular, que va en Instrument Serif cursiva y `accent-2`
 * (constitucion 3.2.0). Si no coincide con el final del texto, el titular sale entero
 * en Space Grotesk: mejor sin enfasis que con el enfasis en la palabra equivocada.
 */
function conEnfasis(texto, enfasis) {
  if (typeof texto !== 'string' || !enfasis || !texto.endsWith(enfasis)) return texto;
  return (
    <>
      {texto.slice(0, -enfasis.length)}
      <span className="font-serif font-normal italic tracking-[-0.02em] text-accent-2">
        {enfasis}
      </span>
    </>
  );
}

export function TituloSeccion({ eyebrow, enfasis, children, className = '' }) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-4 sm:gap-5">
        <span aria-hidden="true" className="h-px w-7 flex-none bg-accent" />
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 className="mt-4 text-fs-800 text-fg sm:mt-6">{conEnfasis(children, enfasis)}</h2>
    </Reveal>
  );
}

export default TituloSeccion;
