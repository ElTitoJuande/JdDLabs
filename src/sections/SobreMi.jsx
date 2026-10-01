import { sobreMi, titulares } from "../content/copy";
import { TituloSeccion } from "../components/TituloSeccion";
export function SobreMi() {
  return (
    <section id="sobre-mi" className="section about-section">
      <div className="contenedor about-grid">
        <TituloSeccion
          eyebrow={titulares.sobreMi.eyebrow}
          enfasis={titulares.sobreMi.enfasis}
        >
          {titulares.sobreMi.titulo}
        </TituloSeccion>
        <div className="about-brand-panel" role="img" aria-label="JdDLabs: diseño y desarrollo web">
          <span className="about-brand-kicker" aria-hidden="true">Diseño + desarrollo</span>
          <div className="about-brand-art" aria-hidden="true">
            <svg className="about-brand-geometry" viewBox="0 0 500 500" fill="none">
              <path d="M70 0V500M250 0V500M430 0V500M0 70H500M0 250H500M0 430H500" stroke="currentColor" opacity=".16" />
              <rect x="90" y="90" width="320" height="320" rx="4" stroke="currentColor" opacity=".4" />
              <rect x="125" y="125" width="250" height="250" rx="4" transform="rotate(15 250 250)" fill="currentColor" fillOpacity=".07" stroke="currentColor" opacity=".6" />
              <path d="M70 90V70H90M410 70H430V90M430 410V430H410M90 430H70V410" stroke="currentColor" strokeWidth="2" />
              <path d="M410 90H430V110H410Z" fill="currentColor" />
            </svg>
            <img src="/JdDLogo_marca.svg" alt="" width="788" height="681" loading="lazy" decoding="async" />
          </div>
          <div className="about-brand-signature" aria-hidden="true"><span>JdD<strong>Labs</strong></span><span>Rute, Córdoba</span></div>
        </div>
        <div className="about-copy">
          <p>{sobreMi.parrafo}</p>
          <p className="about-statement">{sobreMi.refuerzo}</p>
        </div>
      </div>
    </section>
  );
}
export default SobreMi;
