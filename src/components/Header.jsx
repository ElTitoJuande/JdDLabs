import { MobileMenu } from './MobileMenu';
import { Boton } from './Boton';
import { secciones, hero } from '../content/copy';
import { identity } from '../content/identity';

/**
 * Cabecera fija, visible durante todo el scroll (FR-009a).
 *
 * @param {string} base prefijo de los enlaces de ancla. Vacio en la portada; '/' en las
 *   paginas legales y en la 404, para que el ancla salte a la portada correcta.
 */
export function Header({ base = '' }) {
  // El alto sale del token `spacing.header`, el mismo que compensa `main` y las anclas
  // (research.md R-006, FR-009b). No se mide: el border-b suma 1px a la altura medida y
  // una medida que alimenta su propia altura crece 1px por frame sin fin. Con
  // border-box el filete queda dentro de los 72px.
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-header border-b border-border bg-bg/75 backdrop-blur-lg">
      <div className="contenedor flex h-full items-center justify-between gap-4">
        <a
          href={`${base}#inicio`}
          className="flex items-center gap-2.5 no-underline"
          aria-label={`${identity.nombreComercial}, ir al inicio`}
        >
          {/*
            El monograma va en blanco puro (principio IV). El SVG pinta con
            currentColor y dentro de un <img> resolveria a negro, invisible sobre el
            fondo base: se sirve como mascara sobre el token `fg`. Sin resplandor, sin
            recolorear con el acento y sin degradado.
          */}
          <span
            aria-hidden="true"
            className="h-6 w-7 flex-none bg-fg md:h-7 md:w-8"
            style={{
              WebkitMask: "url('/JdDLogo_marca.svg') center / contain no-repeat",
              mask: "url('/JdDLogo_marca.svg') center / contain no-repeat",
            }}
          />
          <span className="text-fs-400 font-medium tracking-tight text-fg">
            {identity.nombreComercial}
          </span>
        </a>

        <nav aria-label="Secciones del sitio" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {secciones.map((seccion) => (
              <li key={seccion.id}>
                <a
                  href={`${base}#${seccion.id}`}
                  className="rounded-full text-fs-200 text-fg-dim no-underline transition-colors duration-fast ease-out-soft hover:text-fg motion-reduce:transition-none"
                >
                  {seccion.nombre}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* El desplazamiento suave lo hace scroll-behavior en CSS: ni una linea de
              JavaScript de scroll (FR-008, research.md R-006). */}
          <Boton href={`${base}#contacto`} tamano="sm" className="hidden md:inline-flex">
            {hero.cta}
          </Boton>
          <MobileMenu base={base} />
        </div>
      </div>
    </header>
  );
}

export default Header;
