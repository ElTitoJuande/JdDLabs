import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

/* ══ Label input ══════════════════════════════════════════
   Adaptado de "Label input" de Bencho (MIT, bencho.dev/licence).

   A field whose label is its placeholder until you are in it.
   On focus the label lifts into the top edge with a small hop
   running along its letters, the outline darkens in place, and
   the top line parts under the label from its middle outward.

   ── ONE THING MOVES ─────────────────────────────────────
   It used to DRAW its outline out of the notch, both ways
   round the field — and that was the field performing, which
   is too much for a thing you focus forty times a day. Now the
   outline is always whole; focus only changes its ink and
   opens the gap. The label is the event, and the line makes
   room for it.

   The gap is two short paths across the notch, each from the
   middle to one side, retracted from the middle outward by a
   negative dash offset.

   ── CAMBIOS RESPECTO AL ORIGINAL ─────────────────────────
   - El original mide 280 × 52 fijos. Aquí el campo es fluido y
     el textarea crece, así que el contorno se dibuja con el
     tamaño medido del propio campo.
   - Campos no controlados: el formulario los lee con FormData y
     los vacía con form.reset(), así que "relleno" se deduce del
     valor real (input, reset y autorrelleno del navegador).
   - Sin campo de contraseña ni botón de ojo (y sin lucide-react):
     este formulario no los tiene.
   - Admite textarea (multilinea): la etiqueta reposa en la
     primera línea, no en el centro. */

/* en el prerender no hay layout que medir: allí basta useEffect */
const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* the lifted label's size, against its resting one */
const S = 0.78;
/* the stroke sits half a stroke inside the box so none of it
   is clipped by the svg's own edge */
const IN = 0.75;
/* altura de una línea de campo: el centro de la primera línea
   del textarea queda a la misma altura que en un input */
const LINE = 52;

export function LabelInput({
  etiqueta,
  multilinea = false,
  /* the field's corner, px — at half the height it is a pill */
  corner = 10,
  className = "",
  onInput,
  ...props
}) {
  const generated = useId().replace(/:/g, "");
  const id = props.id || "lbi-" + generated;
  const Tag = multilinea ? "textarea" : "input";

  const [focus, setFocus] = useState(false);
  const [filled, setFilled] = useState(false);
  const field = useRef(null);

  /* the notch is the label's own width, so it is measured */
  const lab = useRef(null);
  const [lw, setLw] = useState(40);
  useBrowserLayoutEffect(() => {
    if (lab.current) setLw(lab.current.offsetWidth);
  }, [etiqueta]);

  /* el campo es fluido: su contorno sigue al tamaño real */
  const box = useRef(null);
  const [size, setSize] = useState({ w: 320, h: multilinea ? 124 : LINE });
  useBrowserLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () =>
      setSize({ w: el.offsetWidth || 320, h: el.offsetHeight || LINE });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* form.reset() vacía el campo sin disparar input; el valor
     puede llegar también restaurado o autorrellenado */
  useEffect(() => {
    const el = field.current;
    if (!el) return;
    setFilled(el.value.length > 0);
    const form = el.form;
    const onReset = () => setFilled(false);
    form?.addEventListener("reset", onReset);
    return () => form?.removeEventListener("reset", onReset);
  }, []);

  const up = focus || filled;
  const W = size.w;
  const H = size.h;
  const r = clamp(corner, 0, Math.min(H, LINE) / 2);

  /* ── where the label sits, and the gap it leaves ─────────
     Never inside the corner's curve: the notch has to open on
     the straight part of the top edge, so a rounder field
     starts its label further in. */
  const lx = Math.max(16, r + 4);
  const x0 = Math.max(r * 0.6, lx - 5);
  const x1 = Math.min(lx + lw * S + 5, W - r);
  const a = r - IN;
  const R = W - IN;
  const B = H - IN;
  const mid = W / 2;
  /* the gap, as two halves from its middle to each side */
  const nm = (x0 + x1) / 2;
  const gapL = `M${nm},${IN} L${x0},${IN}`;
  const gapR = `M${nm},${IN} L${x1},${IN}`;
  /* right: from the notch, clockwise, to the bottom middle */
  const right =
    r > 0
      ? `M${x1},${IN} L${W - r},${IN} A${a},${a} 0 0 1 ${R},${r} L${R},${H - r} A${a},${a} 0 0 1 ${W - r},${B} L${mid},${B}`
      : `M${x1},${IN} L${R},${IN} L${R},${B} L${mid},${B}`;
  /* left: from the notch, the other way round, to the same point */
  const left =
    r > 0
      ? `M${x0},${IN} L${r},${IN} A${a},${a} 0 0 0 ${IN},${r} L${IN},${H - r} A${a},${a} 0 0 0 ${r},${B} L${mid},${B}`
      : `M${x0},${IN} L${IN},${IN} L${IN},${B} L${mid},${B}`;

  /* la etiqueta reposa en el centro de una línea de campo y sube
     exactamente esa distancia, hasta el borde superior */
  const rest = Math.min(H, LINE) / 2;

  return (
    <div
      className={"lbi " + className}
      data-up={up}
      data-focus={focus}
      data-filled={filled}
      data-multi={multilinea}
    >
      <div
        className="lbi-box"
        ref={box}
        style={{
          borderRadius: r,
          "--lbi-x": `${lx}px`,
          "--lbi-rest": `${rest}px`,
        }}
      >
        <svg
          className="lbi-ring"
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden="true"
        >
          <path d={right} />
          <path d={left} />
          <path className="lbi-gap" d={gapL} pathLength={1} />
          <path className="lbi-gap" d={gapR} pathLength={1} />
        </svg>

        {/* letra a letra, el lector de pantalla deletrearía la etiqueta:
            el nombre accesible va entero y oculto, y las letras animadas
            quedan solo para la vista */}
        <label className="lbi-label" htmlFor={id} ref={lab}>
          <span className="lbi-sr">{etiqueta}</span>
          <span aria-hidden="true">
            {[...etiqueta].map((ch, i) => (
              <span key={i} style={{ "--i": i }}>
                {ch}
              </span>
            ))}
          </span>
        </label>

        <Tag
          {...props}
          ref={field}
          id={id}
          className="lbi-field"
          onInput={(e) => {
            setFilled(e.currentTarget.value.length > 0);
            onInput?.(e);
          }}
          onFocus={(e) => {
            setFocus(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            setFilled(e.currentTarget.value.length > 0);
            props.onBlur?.(e);
          }}
          /* el autorrelleno no dispara input en todos los navegadores:
             una animación vacía sobre :autofill avisa de que hay valor */
          onAnimationStart={(e) => {
            if (e.animationName === "lbi-autofill") setFilled(true);
          }}
        />
      </div>
    </div>
  );
}
export default LabelInput;
