import { useReveal } from '../hooks/useReveal';

/**
 * Envoltura de aparicion al hacer scroll (FR-010).
 *
 * El estado inicial del hook es visible, asi que si el JavaScript falla al cargar el
 * contenido sigue leyendose. Con movimiento reducido no se anima nada (FR-011).
 *
 * `retardo` escalona la aparicion de los elementos de una lista. Maximo util: 240ms.
 * Por encima se nota como lentitud, no como elegancia.
 *
 * 500ms (`duration-base`) y 16px de recorrido, no 900ms y 24px (propietario,
 * 2026-10-01): con la version lenta, al hacer scroll rapido quedaba un hueco vacio en
 * la parte baja de la pantalla esperando a que el contenido terminase de aparecer.
 */
export function Reveal({
  children,
  as: Etiqueta = 'div',
  className = '',
  retardo = 0,
  style,
  ...resto
}) {
  const [ref, visible] = useReveal();

  return (
    <Etiqueta
      ref={ref}
      style={retardo ? { transitionDelay: `${retardo}ms`, ...style } : style}
      className={[
        'transition duration-base ease-out-soft motion-reduce:transition-none',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...resto}
    >
      {children}
    </Etiqueta>
  );
}

export default Reveal;
