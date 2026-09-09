import { contacto } from '../content/copy';
import { identity, enlaces } from '../content/identity';
import { ContactForm } from '../components/ContactForm';
import { Reveal } from '../components/Reveal';

// Los tres canales directos son anclas normales: no dependen del formulario ni de
// ninguna logica de envio (FR-006, FR-025). index.html repite estos mismos enlaces
// dentro de un <noscript> para el caso de que el script no llegue a ejecutarse.
const canales = [
  { id: 'telefono', etiqueta: 'Teléfono', valor: identity.telefono, href: enlaces.telefono, externo: false },
  { id: 'whatsapp', etiqueta: 'WhatsApp', valor: identity.whatsapp, href: enlaces.whatsapp, externo: true },
  { id: 'email', etiqueta: 'Correo', valor: identity.email, href: enlaces.email, externo: false },
];

/** Seccion Contacto (FR-006): los cuatro canales, tres directos y el formulario. */
export function Contacto() {
  return (
    <section id="contacto" className="border-t border-ink/10 py-20 sm:py-24">
      <div className="contenedor">
        <Reveal as="h2" className="text-3xl text-ink sm:text-4xl">
          Contacto
        </Reveal>

        <Reveal as="p" className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {contacto.invitacion}
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
          <div>
            <h3 className="text-xl text-ink">Canales directos</h3>
            <ul className="mt-6 space-y-4">
              {canales.map((canal) => (
                <li key={canal.id}>
                  <a
                    href={canal.href}
                    {...(canal.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex flex-col rounded-md border border-ink/10 px-4 py-3 hover:border-accent"
                  >
                    <span className="text-sm font-medium text-muted">{canal.etiqueta}</span>
                    <span className="text-base text-ink group-hover:text-accent">
                      {canal.valor}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl text-ink">Escríbeme un mensaje</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
