/**
 * Pill de accion, en tres variantes.
 *
 *  - solido:   relleno `accent` con `accent-ink` encima. 4,8:1, pasa AA.
 *  - fantasma: sin relleno, filete `border`, texto `fg`, filete de acento en hover.
 *  - brillo:   relleno `accent` con un sombreado oscuro que deriva al azar (una capa
 *              base y tres manchas, en index.css). Para los CTAs principales:
 *              cabecera, menu movil y hero. Texto `fg`: sobre el magenta oscurecido
 *              pasa AA, mientras que `accent-ink` no.
 *
 * El resplandor solo aparece en hover y solo en la variante solida: es lo que compensa
 * que el magenta tenga menos luminancia que el lima de la referencia visual.
 *
 * `flecha` añade una flecha dibujada en CSS (`.flecha` en index.css): en reposo es solo
 * la punta; en hover y foco aparece el asta y la punta avanza. Sin glifo: el lector de
 * pantalla no la lee.
 *
 * El tamaño va por prop y no por `className`: dos utilidades de la misma propiedad no
 * las decide el orden en el atributo sino el del CSS generado, y ahi `px-8` va despues
 * de `px-6`. Un override de padding o de cuerpo desde fuera no se aplica nunca.
 */
const VARIANTES = {
  solido: 'bg-accent text-accent-ink hover:shadow-glow',
  fantasma: 'border border-border text-fg hover:border-border-accent',
  brillo:
    'relative isolate overflow-hidden bg-accent text-fg hover:shadow-glow active:scale-[.97]',
};

const TAMANOS = {
  md: 'px-8 py-4 text-fs-300',
  // Para la cabecera: ~46px de alto dentro de sus 72, los 13/24 a 15px de la maqueta.
  sm: 'px-6 py-3 text-fs-200',
};

export function Boton({
  href,
  children,
  variante = 'solido',
  tamano = 'md',
  externo = false,
  flecha = false,
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
        'group inline-flex items-center justify-center gap-2 rounded-full',
        'font-medium no-underline',
        TAMANOS[tamano],
        'transition duration-fast ease-out-soft motion-reduce:transition-none',
        'disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTES[variante],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...resto}
    >
      {variante === 'brillo' && (
        <span aria-hidden="true" className="boton-brillo">
          <span />
          <span />
          <span />
        </span>
      )}
      {/* El texto va por encima del halo: sin z-10 el halo lo tapa. */}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {flecha && <span aria-hidden="true" className="flecha" />}
      </span>
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
