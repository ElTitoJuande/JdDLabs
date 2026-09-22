/**
 * Eyebrow de seccion: la linea mono en versalitas que va sobre cada titular.
 *
 * Es el detalle mas barato del rediseño y el que mas cambia la percepcion. Va en
 * `fg-mute` y no en el gris de la referencia visual, que no llega a AA.
 */
export function Eyebrow({ as: Etiqueta = 'p', children, className = '' }) {
  return (
    <Etiqueta
      className={[
        'font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Etiqueta>
  );
}

export default Eyebrow;
