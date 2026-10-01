import { useId, useLayoutEffect, useRef, useState } from 'react';

/**
 * Campo con etiqueta flotante. Adaptado de "Label input" de Bencho (MIT,
 * bencho.dev/licence).
 *
 * Un campo cuya etiqueta es su placeholder hasta que entras en el. Al enfocarlo la
 * etiqueta sube al borde superior con un pequeño salto que recorre sus letras, el
 * filete se oscurece en su sitio y la linea de arriba se abre bajo la etiqueta desde
 * su centro hacia fuera.
 *
 * ── UNA SOLA COSA SE MUEVE ──────────────────────────────────────────────────────
 * Antes DIBUJABA el filete desde la muesca, en los dos sentidos alrededor del campo, y
 * eso era el campo luciendose, demasiado para algo que se enfoca cuarenta veces al dia.
 * Ahora el filete esta siempre entero; el foco solo cambia su tinta y abre el hueco. La
 * etiqueta es el acontecimiento, y la linea le hace sitio.
 *
 * El hueco son dos trazos cortos sobre la muesca, cada uno del centro a un lado, que se
 * recogen del centro hacia fuera con un dash offset negativo.
 *
 * Cambios frente al original, por este proyecto:
 * - Ancho fluido: el original mide 280x52 fijos. Aqui el svg se recalcula con un
 *   ResizeObserver, porque los campos ocupan la columna del formulario.
 * - Sin estado controlado: los campos del formulario van sin controlar a proposito
 *   (FR-016). "Subida" y "rellena" las decide el CSS con :focus-within y
 *   :placeholder-shown, que tambien cubren el autorrelleno del navegador y el reset del
 *   formulario sin escuchar ningun evento.
 * - Admite `textarea`: la etiqueta reposa en la primera linea y no en el centro.
 * - Sin el campo de contraseña ni su ojo (y sin lucide-react): aqui no hay ninguno.
 * - Lector de pantalla: las letras sueltas van ocultas y el texto entero en un sr-only,
 *   igual que en las letras del CTA de cristal (Boton): letra a letra, algunos lectores
 *   deletrean.
 */

/* el tamaño de la etiqueta subida, frente al de reposo */
const S = 0.78;
/* el trazo va medio trazo hacia dentro de la caja para que el borde del propio svg no
   recorte nada */
const IN = 0.75;

export function LabelInput({
  etiqueta,
  multilinea = false,
  /* la esquina del campo, px; a media altura es una pildora. 8 = `rounded-lg`, la
     esquina que tenian los campos */
  esquina = 8,
  className = '',
  ...resto
}) {
  const id = resto.id ?? `lbi-${useId().replace(/:/g, '')}`;
  const caja = useRef(null);
  const campo = useRef(null);
  const lab = useRef(null);
  const [medidas, setMedidas] = useState(null);

  /* La muesca es el ancho de la propia etiqueta, asi que se mide; y con ella la caja,
     que es fluida, y la linea de reposo de la etiqueta, que en un textarea es la primera
     linea de texto y no el centro. El cuerpo de letra tambien es fluido (fs-300), asi
     que todo se vuelve a medir a cada cambio de tamaño. La etiqueta se observa aparte:
     cuando llega la Plex Sans cambia de ancho sin que la caja lo haga, y la muesca se
     quedaba con el ancho de la fuente de respaldo. */
  useLayoutEffect(() => {
    const medir = () => {
      if (!caja.current || !campo.current || !lab.current) return;
      const w = caja.current.offsetWidth;
      const h = caja.current.offsetHeight;
      const estilo = getComputedStyle(campo.current);
      const y = multilinea
        ? parseFloat(estilo.paddingTop) + parseFloat(estilo.lineHeight) / 2
        : h / 2;
      setMedidas({ w, h, y, lw: lab.current.offsetWidth });
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(caja.current);
    observador.observe(lab.current);
    return () => observador.disconnect();
  }, [multilinea, etiqueta]);

  /* ── donde va la etiqueta, y el hueco que deja ────────────────────────────────
     Nunca dentro de la curva de la esquina: la muesca tiene que abrirse en el tramo
     recto del borde superior, asi que un campo mas redondo empieza su etiqueta mas
     adentro. 16 y no 14 como minimo: el `px-4` que tenian los campos. */
  const H = medidas?.h ?? 0;
  const r = Math.min(Math.max(esquina, 0), H / 2);
  const lx = Math.max(16, r + 4);
  const Campo = multilinea ? 'textarea' : 'input';

  let trazos = null;
  if (medidas) {
    const { w: W, lw } = medidas;
    const x0 = Math.max(r * 0.6, lx - 5);
    const x1 = lx + lw * S + 5;
    const a = r - IN;
    const R = W - IN;
    const B = H - IN;
    const mid = W / 2;
    /* el hueco, como dos mitades de su centro a cada lado */
    const nm = (x0 + x1) / 2;
    const gapL = `M${nm},${IN} L${x0},${IN}`;
    const gapR = `M${nm},${IN} L${x1},${IN}`;
    /* derecha: desde la muesca, en el sentido de las agujas del reloj, hasta el centro
       de abajo */
    const derecha =
      r > 0
        ? `M${x1},${IN} L${W - r},${IN} A${a},${a} 0 0 1 ${R},${r} L${R},${H - r} A${a},${a} 0 0 1 ${W - r},${B} L${mid},${B}`
        : `M${x1},${IN} L${R},${IN} L${R},${B} L${mid},${B}`;
    /* izquierda: desde la muesca, al reves, hasta el mismo punto */
    const izquierda =
      r > 0
        ? `M${x0},${IN} L${r},${IN} A${a},${a} 0 0 0 ${IN},${r} L${IN},${H - r} A${a},${a} 0 0 0 ${r},${B} L${mid},${B}`
        : `M${x0},${IN} L${IN},${IN} L${IN},${B} L${mid},${B}`;
    trazos = (
      <svg
        className="lbi-ring"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
      >
        <path d={derecha} />
        <path d={izquierda} />
        <path className="lbi-gap" d={gapL} pathLength={1} />
        <path className="lbi-gap" d={gapR} pathLength={1} />
      </svg>
    );
  }

  return (
    <div className={`lbi ${className}`}>
      <div
        ref={caja}
        className="lbi-box"
        style={{
          borderRadius: r || esquina,
          '--lbi-x': `${lx}px`,
          '--lbi-y': `${medidas?.y ?? 0}px`,
        }}
      >
        {trazos}

        <label className="lbi-label" htmlFor={id} ref={lab}>
          <span aria-hidden="true">
            {[...etiqueta].map((letra, i) => (
              <span key={i} className="lbi-letra" style={{ '--i': i }}>
                {letra}
              </span>
            ))}
          </span>
          <span className="sr-only">{etiqueta}</span>
        </label>

        {/* El placeholder en blanco no se ve: solo existe para que :placeholder-shown
            diga si el campo esta vacio. */}
        <Campo
          ref={campo}
          id={id}
          placeholder=" "
          className={`lbi-field ${multilinea ? 'lbi-field--multi' : ''}`}
          {...resto}
        />
      </div>
    </div>
  );
}

export default LabelInput;
