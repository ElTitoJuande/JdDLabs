import { contacto, titulares } from '../content/copy';
import { identity, enlaces } from '../content/identity';
import { ContactForm } from '../components/ContactForm';
import { Reveal } from '../components/Reveal';
import { TituloSeccion } from '../components/TituloSeccion';

// Los tres canales directos son anclas normales: no dependen del formulario ni de
// ninguna logica de envio (FR-006, FR-025). index.html repite estos mismos enlaces
// dentro de un <noscript> para el caso de que el script no llegue a ejecutarse.
//
// WhatsApp y telefono comparten numero, asi que van en una sola fila: el numero se ve
// una vez y debajo van las dos acciones. Siguen siendo tres anclas. Si algun dia los
// numeros difieren, la fila vuelve a partirse en dos.
const numeroCompartido = identity.whatsapp === identity.telefono;

const accion =
  'inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-fs-200 text-fg no-underline transition-colors duration-fast ease-out-soft hover:border-accent hover:text-accent-2 motion-reduce:transition-none';

/** Fila de un canal: etiqueta mono y valor, la fila entera es el enlace. */
function FilaCanal({ etiqueta, valor, href, externo = false }) {
  return (
    <li>
      <a
        href={href}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group flex flex-col gap-1.5 border-t border-border py-5 no-underline transition-colors duration-fast ease-out-soft hover:border-border-accent motion-reduce:transition-none sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-7"
      >
        <span className="font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute">
          {etiqueta}
        </span>
        <span className="text-fs-500 font-medium tracking-tight text-fg transition-colors duration-fast ease-out-soft group-hover:text-accent-2 motion-reduce:transition-none">
          {valor}
        </span>
      </a>
    </li>
  );
}

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
          {/* Fija mientras el formulario, mas largo, sigue haciendo scroll (solo desde lg,
              donde van en columnas). Queda bajo la cabecera con el mismo aire de 2rem. */}
          <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <h3 className="sr-only">Canales directos</h3>
            <ul className="flex flex-col border-b border-border">
              {numeroCompartido ? (
                <li className="flex flex-col gap-4 border-t border-border py-6 sm:py-8">
                  <span className="font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute">
                    WhatsApp y teléfono
                  </span>
                  <span className="text-fs-500 font-medium tracking-tight text-fg">
                    {identity.telefono}
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    <a href={enlaces.whatsapp} target="_blank" rel="noopener noreferrer" className={accion}>
                      Escribir por WhatsApp
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only"> (se abre en una pestaña nueva)</span>
                    </a>
                    <a href={enlaces.telefono} className={accion}>
                      Llamar
                    </a>
                  </div>
                </li>
              ) : (
                <>
                  <FilaCanal etiqueta="WhatsApp" valor={identity.whatsapp} href={enlaces.whatsapp} externo />
                  <FilaCanal etiqueta="Teléfono" valor={identity.telefono} href={enlaces.telefono} />
                </>
              )}
              <FilaCanal etiqueta="Email" valor={identity.email} href={enlaces.email} />
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
