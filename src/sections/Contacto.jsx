import { contacto, titulares } from '../content/copy';
import { identity, enlaces } from '../content/identity';
import { ContactForm } from '../components/ContactForm';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

// Los tres canales directos son anclas normales: no dependen del formulario ni de
// ninguna logica de envio (FR-006, FR-025). index.html repite estos mismos enlaces
// dentro de un <noscript> para el caso de que el script no llegue a ejecutarse.
// El orden es el de la maqueta: WhatsApp primero, que es por donde llega casi todo.
const canales = [
  { id: 'whatsapp', etiqueta: 'WhatsApp', valor: identity.whatsapp, href: enlaces.whatsapp, externo: true },
  { id: 'telefono', etiqueta: 'Teléfono', valor: identity.telefono, href: enlaces.telefono, externo: false },
  { id: 'email', etiqueta: 'Email', valor: identity.email, href: enlaces.email, externo: false },
];

/** Seccion Contacto (FR-006): los cuatro canales, tres directos y el formulario. */
export function Contacto() {
  return (
    <section id="contacto" className="seccion">
      <div className="contenedor">
        <TituloSeccion eyebrow={titulares.contacto.eyebrow} enfasis={titulares.contacto.enfasis}>
          {contacto.titular}
        </TituloSeccion>

        <Reveal
          as="p"
          className="mt-4 max-w-[38rem] text-fs-400 leading-normal text-fg-dim sm:mt-6"
        >
          {contacto.invitacion}
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-[1fr_minmax(0,38.75rem)] lg:gap-16 lg:items-start">
          <Reveal>
            <h3 className="sr-only">Canales directos</h3>
            <ul className="flex flex-col border-b border-border">
              {canales.map((canal) => (
                <li key={canal.id}>
                  <a
                    href={canal.href}
                    {...(canal.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex flex-col gap-1.5 border-t border-border py-5 no-underline transition-colors duration-fast ease-out-soft hover:border-border-accent motion-reduce:transition-none sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-7"
                  >
                    <span className="font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute">
                      {canal.etiqueta}
                    </span>
                    <span className="text-fs-500 font-medium tracking-tight text-fg transition-colors duration-fast ease-out-soft group-hover:text-accent-2 motion-reduce:transition-none">
                      {canal.valor}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal retardo={80}>
            <h3 className="sr-only">Escríbeme un mensaje</h3>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
