import { identity, enlaces } from '../content/identity';
import { secciones, cabecera, pie } from '../content/copy';

/**
 * Pie comun a las cinco paginas, adaptado del de la referencia visual (2026-09-24):
 * llamada a la accion, wordmark gigante, tres columnas y barra legal. Email, telefono y
 * WhatsApp viven en la seccion Contacto; el pie solo enlaza a Instagram ("Sígueme").
 *
 * Los enlaces legales son obligatorios en todas las paginas (FR-021b, principio XII), y
 * por eso el pie es un unico componente compartido en vez de marcado duplicado.
 *
 * Tres adaptaciones que la referencia no tiene y aqui no son opcionales:
 *  - El wordmark gigante lleva el tratamiento del de la cabecera ("JdD" bold `fg`,
 *    "Labs" regular `fg` al 60 %) y nunca el acento (principio IV).
 *  - Es un SVG que se escala al ancho del contenedor: asi no hace falta un paso nuevo
 *    en la escala tipografica, que la constitucion fija en nueve.
 *  - "Hablemos" va en Space Grotesk: la serif esta acotada al h1 del hero y al cierre
 *    de los h2 de seccion (constitucion 3.2.0).
 *
 * @param {string} base prefijo de las anclas: vacio en la portada, '/' en el resto.
 */
export function Footer({ base = '' }) {
  const anio = new Date().getFullYear();

  const enlace =
    'text-fs-200 text-fg-dim no-underline transition-colors duration-fast ease-out-soft hover:text-accent-2 motion-reduce:transition-none';

  const columnas = [
    {
      titulo: 'Estudio',
      contenido: (
        <>
          <p className="text-fs-200 font-medium text-fg">
            {identity.localidad}, {identity.provincia}
          </p>
          <p className="mt-2 max-w-[18rem] text-fs-200 leading-relaxed text-fg-dim">
            {pie.descripcion}
          </p>
        </>
      ),
    },
    {
      titulo: 'Sígueme',
      contenido: (
        <ul className="flex flex-col gap-2.5">
          <li>
            <a href={enlaces.instagram} target="_blank" rel="noopener noreferrer" className={enlace}>
              Instagram <span aria-hidden="true">↗</span>
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </li>
        </ul>
      ),
    },
    {
      titulo: 'Navegación',
      contenido: (
        <ul className="flex flex-col gap-2.5">
          {secciones.map((seccion) => (
            <li key={seccion.id}>
              <a href={`${base}#${seccion.id}`} className={enlace}>
                {seccion.nombre}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <footer data-inert-target className="border-t border-border bg-bg">
      <div className="contenedor pt-section">
        {/* Llamada a la accion */}
        <div className="flex items-center gap-4 sm:gap-5">
          <span aria-hidden="true" className="h-px w-7 flex-none bg-accent" />
          <p className="font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute">
            {pie.eyebrow}
          </p>
        </div>
        <a
          href={`${base}#contacto`}
          className="group mt-4 inline-flex items-center gap-4 text-fs-800 font-medium tracking-[-0.04em] text-fg no-underline transition-colors duration-fast ease-out-soft hover:text-accent-2 motion-reduce:transition-none sm:mt-6"
        >
          {cabecera.cta}
          <span
            aria-hidden="true"
            className="text-fs-600 text-accent-2 transition-transform duration-fast ease-out-soft motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
          >
            ↗
          </span>
        </a>

        {/* Wordmark gigante: decorativo, el nombre ya esta en la barra inferior. El
            viewBox recorta la caja del texto medida a 100px (383 de ancho). */}
        <svg
          aria-hidden="true"
          viewBox="-2 126 387 78"
          className="mt-14 block w-full md:mt-20"
        >
          <text
            x="0"
            y="200"
            className="fill-fg font-sans"
            style={{ fontSize: '100px', letterSpacing: '-0.05em' }}
          >
            <tspan fontWeight="700">{identity.nombreComercial.slice(0, 3)}</tspan>
            <tspan fontWeight="400" className="fill-fg/60">
              {identity.nombreComercial.slice(3)}
            </tspan>
          </text>
        </svg>

        {/* Columnas */}
        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-border pt-10 sm:grid-cols-3 md:mt-20 md:pt-12">
          {columnas.map(({ titulo, contenido }) => (
            <div key={titulo}>
              <p className="font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute">
                {titulo}
              </p>
              <div className="mt-4">{contenido}</div>
            </div>
          ))}
        </div>

        {/* Barra legal: los dos enlaces obligatorios del principio XII */}
        <div className="mt-12 flex flex-col gap-5 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <p className="text-fs-100 text-fg-mute">
            © {anio} {identity.nombreComercial}. Todos los derechos reservados.
          </p>
          <nav aria-label="Información legal">
            <ul className="flex gap-6">
              <li>
                <a href="/aviso-legal" className={enlace}>
                  Aviso legal
                </a>
              </li>
              <li>
                <a href="/privacidad" className={enlace}>
                  Política de privacidad
                </a>
              </li>
            </ul>
          </nav>
          <p className="font-mono text-fs-100 uppercase tracking-[0.1em] text-fg-mute">
            {identity.localidad}, ES
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
