/**
 * Pill de accion, en tres variantes.
 *
 *  - solido:   relleno `accent` con `accent-ink` encima. 4,8:1, pasa AA.
 *  - fantasma: sin relleno, filete `border`, texto `fg`, filete de acento en hover.
 *  - brillo:   boton de cristal oscuro (`.boton-cristal` en index.css): `bg-3`, filete
 *              `border-accent`, brillos interiores en capas y, en hover, resplandor
 *              `accent-2` desde abajo. Icono de destellos y letras con una onda de
 *              brillo escalonada. Para los CTAs principales: cabecera, menu movil y
 *              hero.
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
  brillo: 'boton-cristal relative text-fg active:scale-[.97]',
};

// Icono de destellos (Heroicons "sparkles", MIT), el mismo trazo que el boton de
// referencia. Decorativo: el nombre del enlace lo da el texto.
const CHISPA =
  'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z';

// Letras sueltas para la onda de brillo, cada una con 80ms mas de retraso. Van ocultas
// al lector de pantalla, que lee el texto entero en un sr-only: letra a letra, algunos
// lectores deletrean. Los espacios pasan a no separables para que el inline-block no
// los colapse.
function Letras({ texto }) {
  return (
    <>
      <span aria-hidden="true" className="inline-flex">
        {[...texto].map((letra, i) => (
          <span
            key={i}
            className="boton-cristal__letra"
            style={{ animationDelay: `${(i * 0.08).toFixed(2)}s` }}
          >
            {letra === ' ' ? '\u00a0' : letra}
          </span>
        ))}
      </span>
      <span className="sr-only">{texto}</span>
    </>
  );
}

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
      {/* El texto va por encima del resplandor inferior (::after): sin z-10 lo tapa. */}
      <span className="relative z-10 inline-flex items-center gap-2">
        {variante === 'brillo' && (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="boton-cristal__chispa">
            <path strokeLinecap="round" strokeLinejoin="round" d={CHISPA} />
          </svg>
        )}
        {variante === 'brillo' && typeof children === 'string' ? <Letras texto={children} /> : children}
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
