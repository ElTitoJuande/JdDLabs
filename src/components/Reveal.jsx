import { useReveal } from '../hooks/useReveal';

/**
 * Envoltura de aparicion al hacer scroll (FR-010).
 *
 * El estado inicial del hook es visible, asi que si el JavaScript falla al cargar el
 * contenido sigue leyendose. Con movimiento reducido no se anima nada (FR-011).
 */
export function Reveal({ children, as: Etiqueta = 'div', className = '', ...resto }) {
  const [ref, visible] = useReveal();

  return (
    <Etiqueta
      ref={ref}
      className={[
        'transition duration-700 ease-out motion-reduce:transition-none',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
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
