/**
 * Pill de accion, en dos variantes.
 *
 *  - solido:   relleno `accent` con `accent-ink` encima. 4,8:1, pasa AA.
 *  - fantasma: sin relleno, filete `border`, texto `fg`, filete de acento en hover.
 *
 * El resplandor solo aparece en hover y solo en la variante solida: es lo que compensa
 * que el magenta tenga menos luminancia que el lima de la referencia visual.
 */
const VARIANTES = {
  solido: 'bg-accent text-accent-ink hover:shadow-glow',
  fantasma: 'border border-border text-fg hover:border-border-accent',
};

export function Boton({
  href,
  children,
  variante = 'solido',
  externo = false,
  className = '',
  ...resto
}) {
  // Sin `href` el control es un <button>: lo necesita el envio del formulario, que no
  // navega a ningun sitio. Un <a> sin href no es alcanzable por teclado.
  const Etiqueta = href ? 'a' : 'button';

  const props = href
    ? { href, ...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : { type: resto.type ?? 'submit' };

  return (
    <Etiqueta
      {...props}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full px-8 py-4',
        'text-fs-300 font-medium no-underline',
        'transition duration-fast ease-out-soft motion-reduce:transition-none',
        'disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTES[variante],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...resto}
    >
      {children}
      {externo && (
        <>
          <span aria-hidden="true">↗</span>
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </>
      )}
    </Etiqueta>
  );
}

export default Boton;
