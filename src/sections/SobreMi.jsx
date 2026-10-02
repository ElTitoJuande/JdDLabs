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
        <div className="about-brand-panel">
          <img
            className="about-brand-photo"
            src="/img/juan-de-dios-polo.webp"
            alt="Juan de Dios, de JdDLabs, con polo negro de la marca y los brazos cruzados."
            width="594"
            height="1024"
            loading="lazy"
            decoding="async"
          />
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
