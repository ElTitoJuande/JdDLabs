import { hero } from '../content/copy';
import { identity } from '../content/identity';
import { Eyebrow } from '../components/Eyebrow';
import { Boton } from '../components/Boton';

/**
 * Hero (FR-002). Titular, subtitulo y llamada a la accion se ven sin hacer scroll,
 * tambien en movil: de ahi el min-height, que la maqueta resuelve con un padding fijo
 * porque su artboard no tiene altura de ventana real.
 *
 * Deja de ser "la unica banda oscura del sitio": en v2 el documento entero es oscuro y
 * el hero se distingue por el halo, no por el fondo.
 */
export function Hero() {
  return (
    <section id="inicio" className="halo-hero relative overflow-hidden">
      <div className="contenedor relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center py-section">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <Eyebrow as="span">{hero.eyebrow}</Eyebrow>
          {/* Separador decorativo, no texto: va al token `fg-faint`, que es el unico
              de la paleta reservado a filetes y separadores. */}
          <span aria-hidden="true" className="hidden text-fg-faint sm:inline">
            /
          </span>
          <Eyebrow as="span">{`${identity.localidad}, ${identity.provincia}`}</Eyebrow>
        </div>

        <h1 className="mt-6 max-w-[74rem] text-fs-900 text-fg sm:mt-8">{hero.titular}</h1>

        <p className="mt-7 max-w-[38rem] text-fs-400 leading-normal text-fg-dim sm:mt-10">
          {hero.subtitulo}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-3.5">
          <Boton href="#contacto">{hero.cta}</Boton>
          <Boton href="#proyecto" variante="fantasma">
            {hero.ctaSecundario}
          </Boton>
        </div>
      </div>
    </section>
  );
}

export default Hero;
