import { identity, enlaces } from '../content/identity';

/**
 * Pie comun a las cuatro paginas. Los enlaces legales son obligatorios en todas ellas
 * (FR-021b, principio XII), y por eso el pie es un unico componente compartido en vez
 * de marcado duplicado por pagina.
 */
export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer data-inert-target className="border-t border-ink/10 bg-bg">
      <div className="contenedor flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-sm text-muted">
          <p className="flex items-center gap-2">
            <img
              src="/JdDLogo_marca.svg"
              alt=""
              width={28}
              height={24}
              className="h-6 w-auto"
            />
            <span className="font-display text-base text-ink">{identity.nombreComercial}</span>
          </p>
          <p className="mt-1">{identity.razonSocial}</p>
          <p>{identity.domicilio}</p>
        </div>

        <div className="text-sm text-muted">
          <p>
            <a href={enlaces.telefono} className="hover:text-accent">
              {identity.telefono}
            </a>
          </p>
          <p>
            <a href={enlaces.email} className="hover:text-accent">
              {identity.email}
            </a>
          </p>
        </div>

        <nav aria-label="Información legal" className="text-sm">
          <ul className="flex flex-col gap-2">
            <li>
              <a href="/aviso-legal" className="text-ink hover:text-accent">
                Aviso legal
              </a>
            </li>
            <li>
              <a href="/privacidad" className="text-ink hover:text-accent">
                Política de privacidad
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="contenedor border-t border-ink/10 py-6 text-xs text-muted">
        © {anio} {identity.razonSocial}
      </div>
    </footer>
  );
}

export default Footer;
