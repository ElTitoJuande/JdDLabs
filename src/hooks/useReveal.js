import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Devuelve true si el sistema pide movimiento reducido. Se consulta en el momento,
 * no se cachea, para que un cambio de preferencia no quede congelado.
 */
export function prefiereMovimientoReducido() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Aparicion al entrar en el area visible, con IntersectionObserver nativo
 * (research.md R-004).
 *
 * Dos garantias deliberadas:
 *  - El estado inicial es VISIBLE. Si el JavaScript falla o no llega a ejecutarse, la
 *    pagina queda legible en lugar de en blanco (FR-010, FR-011).
 *  - Con movimiento reducido el observador ni siquiera se crea y el contenido se queda
 *    en su estado final.
 *
 * @returns {[import('react').RefObject<HTMLElement>, boolean]} ref del elemento y visibilidad
 */
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  // useLayoutEffect y no useEffect: ocultar antes del primer pintado evita el parpadeo
  // que se veria si el elemento llegase a dibujarse visible y luego se escondiera.
  useLayoutEffect(() => {
    if (prefiereMovimientoReducido()) return undefined;
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const elemento = ref.current;
    if (!elemento) return undefined;

    // Lo que ya esta en pantalla al cargar no se anima: ocultarlo para revelarlo un
    // instante despues retrasaria justo el elemento que Lighthouse mide como LCP.
    const caja = elemento.getBoundingClientRect();
    const yaVisible = caja.top < window.innerHeight && caja.bottom > 0;
    if (yaVisible) return undefined;

    setVisible(false);

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            setVisible(true);
            observador.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return [ref, visible];
}

export default useReveal;
