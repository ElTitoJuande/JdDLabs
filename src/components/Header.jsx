import { useLayoutEffect, useRef } from 'react';
import { MobileMenu } from './MobileMenu';
import { secciones, hero } from '../content/copy';
import { identity } from '../content/identity';

/**
 * Cabecera fija, visible durante todo el scroll (FR-009a).
 *
 * @param {string} base prefijo de los enlaces de ancla. Vacio en la portada; '/' en las
 *   paginas legales y en la 404, para que el ancla salte a la portada correcta.
 */
export function Header({ base = '' }) {
  const ref = useRef(null);

  // La altura real de la cabecera alimenta --header-h, que es lo que consume
  // scroll-margin-top (research.md R-006). Un solo valor gobierna las dos cosas, asi
  // que ningun encabezado de seccion puede quedar tapado (FR-009b).
  useLayoutEffect(() => {
    const elemento = ref.current;
    if (!elemento) return undefined;

    const sincronizar = () => {
      document.documentElement.style.setProperty('--header-h', `${elemento.offsetHeight}px`);
    };

    sincronizar();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', sincronizar);
      return () => window.removeEventListener('resize', sincronizar);
    }

    const observador = new ResizeObserver(sincronizar);
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-bg/95 backdrop-blur"
    >
      <div className="contenedor flex h-16 items-center justify-between gap-4">
        {/* PENDIENTE DE ASSET: cuando se aporte JdDLogo_marca.svg se sustituye este
            logotipo de texto por la imagen, servida en negro o blanco puros y sin
            recolorear (principio IV). No se genera un logo provisional a proposito. */}
        <a
          href={`${base}#inicio`}
          className="font-display text-xl tracking-tight text-ink"
          aria-label={`${identity.nombreComercial}, ir al inicio`}
        >
          {identity.nombreComercial}
        </a>

        <nav aria-label="Secciones del sitio" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {secciones.map((seccion) => (
              <li key={seccion.id}>
                <a
                  href={`${base}#${seccion.id}`}
                  className="text-sm font-medium text-ink hover:text-accent"
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
          <a
            href={`${base}#contacto`}
            className="hidden rounded-md bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accentHover md:inline-block"
          >
            {hero.cta}
          </a>
          <MobileMenu base={base} />
        </div>
      </div>
    </header>
  );
}

export default Header;
