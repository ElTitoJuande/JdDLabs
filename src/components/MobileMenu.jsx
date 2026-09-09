import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { secciones, hero } from '../content/copy';

/**
 * Menu desplegable de movil (FR-009c a FR-009e, research.md R-005).
 *
 * Cubre las cuatro exigencias de accesibilidad: anuncia su estado con aria-expanded,
 * lleva el foco al primer enlace al abrir, lo mantiene dentro del panel mientras esta
 * abierto y lo devuelve al boton al cerrar. Escape cierra.
 */
export function MobileMenu({ base = '' }) {
  const [abierto, setAbierto] = useState(false);
  const panelRef = useRef(null);
  const botonRef = useRef(null);
  const primerEnlaceRef = useRef(null);
  const panelId = `menu-movil-${useId()}`;

  useFocusTrap(panelRef, abierto);

  // Cerrar devolviendo el foco al boton: es el camino de Escape y el de activar un
  // enlace. El cierre automatico al ensanchar la ventana NO usa esta via, porque alli
  // el boton ya no esta en pantalla.
  const cerrarYDevolverFoco = useCallback(() => {
    setAbierto(false);
    botonRef.current?.focus();
  }, []);

  // Escape cierra el menu (FR-009e).
  useEffect(() => {
    if (!abierto) return undefined;

    const alPulsar = (evento) => {
      if (evento.key === 'Escape') {
        evento.preventDefault();
        cerrarYDevolverFoco();
      }
    };

    document.addEventListener('keydown', alPulsar);
    return () => document.removeEventListener('keydown', alPulsar);
  }, [abierto, cerrarYDevolverFoco]);

  // El foco entra en el panel en cuanto se abre.
  useEffect(() => {
    if (abierto) primerEnlaceRef.current?.focus();
  }, [abierto]);

  // El resto de la pagina queda inerte mientras el panel esta abierto: ni foco, ni
  // clic, ni lectura por parte del lector de pantalla.
  useEffect(() => {
    const fuera = document.querySelectorAll('[data-inert-target]');
    fuera.forEach((el) => {
      if (abierto) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });

    document.body.style.overflow = abierto ? 'hidden' : '';

    return () => {
      fuera.forEach((el) => el.removeAttribute('inert'));
      document.body.style.overflow = '';
    };
  }, [abierto]);

  // Al pasar a escritorio el panel se cierra solo. Escuchar el ancho y no
  // orientationchange resuelve de paso el caso limite del giro de pantalla.
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;

    const consulta = window.matchMedia('(min-width: 768px)');
    const alCambiar = (evento) => {
      if (evento.matches) setAbierto(false);
    };

    consulta.addEventListener('change', alCambiar);
    return () => consulta.removeEventListener('change', alCambiar);
  }, []);

  return (
    <div className="md:hidden">
      <button
        ref={botonRef}
        type="button"
        aria-expanded={abierto}
        aria-controls={panelId}
        onClick={() => (abierto ? cerrarYDevolverFoco() : setAbierto(true))}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-accentTint"
      >
        <span className="sr-only">{abierto ? 'Cerrar menú' : 'Abrir menú'}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {abierto ? (
            <>
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </>
          ) : (
            <>
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </>
          )}
        </svg>
      </button>

      {abierto && (
        <div
          id={panelId}
          ref={panelRef}
          className="fixed inset-x-0 top-[var(--header-h)] z-40 max-h-[calc(100vh-var(--header-h))] overflow-y-auto border-t border-ink/10 bg-bg shadow-lg"
        >
          <nav aria-label="Secciones del sitio" className="contenedor py-4">
            <ul className="flex flex-col gap-1">
              {secciones.map((seccion, indice) => (
                <li key={seccion.id}>
                  <a
                    ref={indice === 0 ? primerEnlaceRef : undefined}
                    href={`${base}#${seccion.id}`}
                    onClick={cerrarYDevolverFoco}
                    className="block rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-accentTint"
                  >
                    {seccion.nombre}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={`${base}#contacto`}
              onClick={cerrarYDevolverFoco}
              className="mt-4 block rounded-md bg-accent px-4 py-3 text-center text-base font-semibold text-bg hover:bg-accentHover"
            >
              {hero.cta}
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
