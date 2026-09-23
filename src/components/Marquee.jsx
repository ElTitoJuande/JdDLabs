/**
 * Banda de capacidades en bucle infinito.
 *
 * La pista se duplica para que el bucle no tenga costura: la animacion desplaza el 50%
 * exacto, que es justo una copia. `aria-hidden` en la segunda para que el lector de
 * pantalla no lea la lista dos veces.
 *
 * Dos cosas que la maqueta no puede enseñar y que aqui no son opcionales:
 *  - Pausa en :hover. WCAG 2.2.2 exige poder detener cualquier movimiento automatico
 *    que dure mas de cinco segundos, y este dura 80 y no para nunca.
 *  - `motion-reduce:animate-none`, que deja la banda quieta y legible — no la oculta.
 */
export function Marquee({ terminos }) {
  const pista = (duplicado) => (
    <ul
      className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10"
      aria-hidden={duplicado ? 'true' : undefined}
    >
      {terminos.map((termino, i) => (
        <li
          key={`${termino}-${i}`}
          className="flex items-center gap-6 whitespace-nowrap md:gap-10"
        >
          <span className="font-mono text-fs-600 uppercase tracking-[0.02em] text-fg-dim">
            {termino}
          </span>
          <span aria-hidden="true" className="text-fs-400 text-accent-2">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-t border-border bg-bg-2 py-7 md:py-10">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {pista(false)}
        {pista(true)}
      </div>
    </div>
  );
}

export default Marquee;
