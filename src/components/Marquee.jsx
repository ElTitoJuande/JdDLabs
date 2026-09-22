/**
 * Banda de capacidades en bucle infinito.
 *
 * La pista se duplica para que el bucle no tenga costura: la animacion desplaza el 50%
 * exacto, que es justo una copia. `aria-hidden` en la segunda para que el lector de
 * pantalla no lea la lista dos veces.
 *
 * Dos cosas que la maqueta no puede enseñar y que aqui no son opcionales:
 *  - Pausa en :hover. WCAG 2.2.2 exige poder detener cualquier movimiento automatico
 *    que dure mas de cinco segundos, y este dura 38 y no para nunca.
 *  - `motion-reduce:animate-none`, que deja la banda quieta y legible — no la oculta.
 */
export function Marquee({ terminos }) {
  const pista = (duplicado) => (
    <ul
      className="flex shrink-0 items-center gap-5 pr-5 md:gap-[1.875rem] md:pr-[1.875rem]"
      aria-hidden={duplicado ? 'true' : undefined}
    >
      {terminos.map((termino, i) => (
        <li
          key={`${termino}-${i}`}
          className="flex items-center gap-5 whitespace-nowrap md:gap-[1.875rem]"
        >
          <span className="font-mono text-fs-100 uppercase tracking-[0.1em] text-fg-dim">
            {termino}
          </span>
          <span aria-hidden="true" className="text-accent-2">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-t border-border bg-bg-2 py-5 md:py-6">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {pista(false)}
        {pista(true)}
      </div>
    </div>
  );
}

export default Marquee;
