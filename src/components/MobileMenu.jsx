import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { Boton } from './Boton';
import { secciones, cabecera } from '../content/copy';

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

    const consulta = window.matchMedia('(min-width: 1024px)');
    const alCambiar = (evento) => {
      if (evento.matches) setAbierto(false);
    };

    consulta.addEventListener('change', alCambiar);
    return () => consulta.removeEventListener('change', alCambiar);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        ref={botonRef}
        type="button"
        aria-expanded={abierto}
        aria-controls={panelId}
        onClick={() => (abierto ? cerrarYDevolverFoco() : setAbierto(true))}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors duration-fast ease-out-soft hover:text-accent-2 motion-reduce:transition-none"
      >
        <span className="sr-only">{abierto ? 'Cerrar menú' : 'Abrir menú'}</span>
        {/* Dos filetes de 1px, no el icono de tres barras de v1: es el trazo de la
            maqueta y pesa lo mismo que el filete de la cabecera. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="icono-menu h-6 w-6"
          data-abierto={abierto || undefined}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        >
          {/* Las dos lineas son siempre las mismas y se giran hasta la X (index.css,
              .icono-menu): cambiar unas por otras era un salto seco. */}
          <line className="icono-menu__linea" x1="3" y1="9.5" x2="21" y2="9.5" />
          <line className="icono-menu__linea" x1="3" y1="14.5" x2="21" y2="14.5" />
        </svg>
      </button>

      {/* El panel esta siempre montado para poder animar tambien el cierre. Cerrado
          queda con visibility: hidden (index.css, .menu-movil), que lo saca del foco
          y del lector de pantalla igual que no renderizarlo, pero despues de la
          animacion de salida y no antes.

          Ocupa la pantalla entera, cabecera incluida: queda por detras de ella (z-40
          frente a z-50) y la rellena con su fondo, que arriba del todo es
          transparente, asi que el logo y la X siguen a la vista. Va en un portal a
          <body> porque con la pagina desplazada la cabecera lleva backdrop-filter, y un
          ancestro con filtro es el bloque contenedor de sus hijos fixed: dentro de ella,
          inset-0 seria la caja de la cabecera y no la pantalla. En <body> ademas queda
          fuera de lo que se vuelve inert. */}
      {createPortal(
        <div
          id={panelId}
          ref={panelRef}
          data-abierto={abierto || undefined}
          className="menu-movil fixed inset-0 z-40 overflow-y-auto bg-bg-2 pt-[var(--header-h)] lg:hidden"
        >
          <nav aria-label="Secciones del sitio" className="contenedor py-4">
            <ul className="flex flex-col gap-1">
              {secciones.map((seccion, indice) => (
                <li key={seccion.id} className="menu-movil__item" style={{ '--i': indice }}>
                  <a
                    ref={indice === 0 ? primerEnlaceRef : undefined}
                    href={`${base}#${seccion.id}`}
                    onClick={cerrarYDevolverFoco}
                    className="block rounded-full px-3 py-3 text-fs-500 text-fg no-underline transition-colors duration-fast ease-out-soft hover:text-accent-2 motion-reduce:transition-none"
                  >
                    {seccion.nombre}
                  </a>
                </li>
              ))}
            </ul>

            {/* Envuelto: Boton trae su propia transicion de utilidad y pisaria la de
                entrada. */}
            <div className="menu-movil__item mt-6" style={{ '--i': secciones.length }}>
              <Boton
                href={`${base}#contacto`}
                onClick={cerrarYDevolverFoco}
                variante="brillo"
                flecha
                className="w-full"
              >
                {cabecera.cta}
              </Boton>
            </div>
          </nav>
        </div>,
        document.body,
      )}
    </div>
  );
}

export default MobileMenu;
