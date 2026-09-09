import { useEffect } from 'react';

// Elementos que pueden recibir foco dentro del panel. Se consulta en cada pulsacion
// de Tab en lugar de una sola vez, porque el contenido del panel puede cambiar.
const ENFOCABLES = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Cicla el tabulador entre los elementos enfocables de un contenedor mientras esta
 * activo. Son ~30 lineas frente a una dependencia externa (plan.md, Complexity
 * Tracking; research.md R-005).
 *
 * @param {import('react').RefObject<HTMLElement>} ref contenedor a acotar
 * @param {boolean} activo si el atrapado de foco debe estar en vigor
 */
export function useFocusTrap(ref, activo) {
  useEffect(() => {
    if (!activo) return undefined;

    const contenedor = ref.current;
    if (!contenedor) return undefined;

    const alPulsar = (evento) => {
      if (evento.key !== 'Tab') return;

      const enfocables = Array.from(contenedor.querySelectorAll(ENFOCABLES)).filter(
        (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement
      );

      if (enfocables.length === 0) {
        evento.preventDefault();
        return;
      }

      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];
      const actual = document.activeElement;

      if (evento.shiftKey && (actual === primero || !contenedor.contains(actual))) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && (actual === ultimo || !contenedor.contains(actual))) {
        evento.preventDefault();
        primero.focus();
      }
    };

    contenedor.addEventListener('keydown', alPulsar);
    return () => contenedor.removeEventListener('keydown', alPulsar);
  }, [ref, activo]);
}

export default useFocusTrap;
