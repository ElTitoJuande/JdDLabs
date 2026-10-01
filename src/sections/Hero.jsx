import { hero } from "../content/copy";
import { Boton } from "../components/Boton";
export function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <div className="contenedor hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            {hero.eyebrow.nombre} · {hero.eyebrow.rol}
            <br />
            Rute, Córdoba
          </p>
          <h1>
            Desarrollo web{" "}
            <span>
              para pymes
              <br className="desktop-break" /> y autónomos
            </span>
          </h1>
          <p className="hero-description">
            {hero.subtitulo.destacado} {hero.subtitulo.resto}
          </p>
          <div className="button-row">
            <Boton href="#contacto" flecha>
              {hero.cta}
            </Boton>
            <Boton href="#proyecto" variante="fantasma">
              {hero.ctaSecundario}
            </Boton>
          </div>
        </div>
        <picture className="hero-photo">
          <source
            type="image/webp"
            srcSet="/img/estudio-desarrollo-640.webp 640w, /img/estudio-desarrollo.webp 1200w"
            sizes="(max-width: 767px) calc(100vw - 48px), 46vw"
          />
          <img
            src="/img/estudio-desarrollo.webp"
            alt="Espacio de desarrollo web con un portátil, un monitor y una mesa de trabajo iluminada con luz natural."
            width="1200"
            height="1500"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  );
}
export default Hero;
