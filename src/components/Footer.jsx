import { identity, enlaces } from "../content/identity";
import { secciones, pie } from "../content/copy";
import { Brand } from "./Header";
import { Boton } from "./Boton";
import { Icon } from "./Icon";
export function Footer({ base = "" }) {
  return (
    <footer data-inert-target>
      <div className="footer-cta">
        <div className="contenedor footer-cta-layout">
          <div className="footer-cta-copy">
            <p className="eyebrow">{pie.eyebrow}</p>
            <h2>
              Hablemos <Icon name="arrow" className="footer-heading-arrow" />
            </h2>
            <p className="footer-cta-description">
              {pie.propuesta}
            </p>
          </div>
          <div className="footer-cta-action">
            <Boton href={base + "#contacto"} flecha>
              Hablemos de tu proyecto
            </Boton>
          </div>
        </div>
      </div>
      <div className="footer-base">
        <div className="contenedor">
          <div className="footer-columns">
            <div className="footer-location">
              <a href={base + "#inicio"} aria-label="JdDLabs, ir al inicio">
                <Brand />
              </a>
              <h3 className="footer-place">
                {identity.localidad}, {identity.provincia}
              </h3>
              <p className="footer-description">
                {pie.descripcion}
              </p>
            </div>
            <div>
              <p className="eyebrow">Conecta</p>
              <ul>
                <li>
                  <a
                    href={enlaces.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram <Icon name="arrow" />
                  </a>
                </li>
                <li>
                  <a
                    href={enlaces.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub <Icon name="arrow" />
                  </a>
                </li>
                <li>
                  <a
                    href={enlaces.email}
                    aria-label={"Correo electrónico: " + identity.email}
                  >
                    Correo <Icon name="arrow" />
                  </a>
                </li>
              </ul>
            </div>
            <nav aria-label="Navegación del pie">
              <p className="eyebrow">Navegación</p>
              <ul>
                {secciones.map((s) => (
                  <li key={s.id}>
                    <a href={base + "#" + s.id}>{s.nombre}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="footer-legal">
            <p>
              <span>© {new Date().getFullYear()} JdDLabs.</span>{" "}
              <span>Todos los derechos reservados.</span>
            </p>
            <nav aria-label="Información legal">
              <a href="/aviso-legal">Aviso legal</a>
              <a href="/privacidad">Política de privacidad</a>
            </nav>
            <span>RUTE, ES</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
