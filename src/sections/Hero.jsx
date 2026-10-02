import { hero } from "../content/copy";
import { Boton } from "../components/Boton";
import { Icon } from "../components/Icon";
export function Hero() {
  return (
    <>
    <section id="inicio" className="hero-section">
      <div className="contenedor hero-grid">
        <div className="hero-copy">
          {/* tres piezas que no se parten por dentro: en escritorio van
              nombre · rol en una línea; en móvil, una por línea */}
          <p className="eyebrow hero-eyebrow">
            <span>{hero.eyebrow.nombre}</span>
            <span className="hero-eyebrow-sep" aria-hidden="true"> · </span>{" "}
            <span>{hero.eyebrow.rol}</span>
            <br />
            <span>Rute, Córdoba</span>
          </p>
          <h1>
            Desarrollo web{" "}
            <span>
              para{" "}
              <span className="hero-subrayado">
                pymes
                <br className="desktop-break" /> y{"\u00a0"}autónomos
              </span>
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
        {/* Ilustración del escritorio (propuesta E, 2026-10-02): sustituye al logo
            eléctrico. Imagen estática con srcset; sin WebGL en la portada. */}
        <figure className="hero-ilustracion">
          <img
            src={hero.ilustracion.src}
            srcSet={hero.ilustracion.srcSet}
            sizes="(min-width: 768px) 46vw, calc(100vw - 40px)"
            width="1165"
            height="1350"
            alt={hero.ilustracion.alt}
            fetchpriority="high"
            decoding="async"
          />
        </figure>
      </div>
    </section>
    {/* Fuera del hero a proposito: el hero ocupa la primera pantalla y la banda
        aparece al hacer scroll, no en el primer viewport. */}
    <div className="hero-trust-band">
      <ul className="contenedor hero-trust">
        {hero.confianza.map((item) => (
          <li key={item.titulo}>
            <span className="hero-trust-icon">
              <Icon name={item.icono} />
            </span>
            <p>
              <strong>{item.titulo}</strong>
              <span>{item.texto}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
export default Hero;
