import { ContactFlow } from "../components/ContactFlow";
import { contacto, titulares } from "../content/copy";
import { identity, enlaces } from "../content/identity";
import { TituloSeccion } from "../components/TituloSeccion";
import { ContactForm } from "../components/ContactForm";
import { Icon } from "../components/Icon";
export function Contacto() {
  return (
    <section id="contacto" className="section contact-section">
      <div className="contenedor contact-grid">
        <ContactFlow />
        <div className="contact-copy">
          <TituloSeccion
            eyebrow={titulares.contacto.eyebrow}
            enfasis={titulares.contacto.enfasis}
          >
            {contacto.titular}
          </TituloSeccion>
          <p className="contact-intro">{contacto.invitacion}</p>
          <div className="contact-email">
            <p className="eyebrow">Email</p>
            <a href={enlaces.email}>
              <span className="email-icon">
                <Icon name="mail" />
              </span>
              {identity.email}
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
export default Contacto;
