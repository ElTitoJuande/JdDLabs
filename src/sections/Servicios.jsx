import { servicios, titulares } from "../content/copy";
import { TituloSeccion } from "../components/TituloSeccion";
import { Icon } from "../components/Icon";
const icons = ["web", "cart", "settings"];
const features = [
  ["pencil", "user", "phone", "search"],
  ["cart", "card", "box", "mail"],
  ["chart", "calendar", "link", "database"],
];
export function Servicios() {
  return (
    <section id="servicios" className="services-section">
      <div className="services-heading">
        <div className="contenedor">
          <TituloSeccion
            eyebrow={titulares.servicios.eyebrow}
            enfasis={titulares.servicios.enfasis}
          >
            {titulares.servicios.titulo}
          </TituloSeccion>
        </div>
      </div>
      <div className="contenedor services-body">
        <ul className="service-list">
          {servicios.map((s, i) => (
            <li key={s.id}>
              <article className="service-card">
                <div className="service-marker">
                  <span className="service-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="service-icon">
                    <Icon name={icons[i]} />
                  </span>
                </div>
                <div className="service-copy">
                  <h3>{s.titulo}</h3>
                  <p>{s.descripcion}</p>
                </div>
                <ul className="service-features">
                  {s.claves.map((feature, j) => (
                    <li key={feature}>
                      <Icon name={features[i][j]} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export default Servicios;
