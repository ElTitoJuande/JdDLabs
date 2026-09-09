import { hero } from '../content/copy';

/**
 * Seccion Inicio (FR-002). Titular, subtitulo y llamada a la accion deben verse sin
 * hacer scroll, tambien en movil.
 *
 * Es la unica banda oscura del sitio (referencia de tokens de la constitucion). El
 * texto va en el color de fondo claro sobre el oscuro, que es donde el contraste es
 * mas alto; el acento no se usa aqui porque sobre #15040D no alcanzaria el minimo AA.
 */
export function Hero() {
  return (
    <section id="inicio" className="bg-dark">
      <div className="contenedor flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center py-16 sm:py-24">
        <h1 className="max-w-3xl text-4xl leading-tight text-bg sm:text-5xl lg:text-6xl">
          {hero.titular}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bg/80 sm:text-xl">
          {hero.subtitulo}
        </p>

        <div className="mt-10">
          <a
            href="#contacto"
            className="inline-block rounded-md bg-bg px-6 py-3 text-base font-semibold text-dark hover:bg-accentTint"
          >
            {hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
