import { identity } from '../content/identity';

/**
 * Pie comun a las cinco paginas. Los enlaces legales son obligatorios en todas ellas
 * (FR-021b, principio XII), y por eso el pie es un unico componente compartido en vez
 * de marcado duplicado por pagina.
 *
 * El monograma va en blanco puro, con la misma mascara que la cabecera: nunca en
 * acento, nunca con resplandor (principio IV).
 */
export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer data-inert-target className="border-t border-border bg-bg-2">
      <div className="contenedor flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-14">
        <p className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-5 w-6 flex-none bg-fg"
            style={{
              WebkitMask: "url('/JdDLogo_marca.svg') center / contain no-repeat",
              mask: "url('/JdDLogo_marca.svg') center / contain no-repeat",
            }}
          />
          <span className="text-fs-300 font-medium tracking-tight text-fg">
            {identity.nombreComercial}
          </span>
        </p>

        <nav aria-label="Información legal">
          <ul className="flex flex-col gap-3 sm:flex-row sm:gap-7">
            <li>
              <a
                href="/aviso-legal"
                className="text-fs-200 text-fg-dim no-underline transition-colors duration-fast ease-out-soft hover:text-accent-2 motion-reduce:transition-none"
              >
                Aviso legal
              </a>
            </li>
            <li>
              <a
                href="/privacidad"
                className="text-fs-200 text-fg-dim no-underline transition-colors duration-fast ease-out-soft hover:text-accent-2 motion-reduce:transition-none"
              >
                Política de privacidad
              </a>
            </li>
          </ul>
        </nav>

        <p className="font-mono text-fs-100 tracking-[0.1em] text-fg-mute">
          © {anio} {identity.nombreComercial}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
