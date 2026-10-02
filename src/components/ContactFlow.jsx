import { useEffect, useRef, useState } from "react";

/* Trazo que sale de debajo del correo y entra en la tarjeta del formulario, con el
   mismo destello que los flujos de Tecnología. Se dibuja midiendo las posiciones
   reales dentro de .contact-grid: solo existe cuando el formulario va a la derecha
   de la columna de texto; con las columnas apiladas (móvil) no hay nada que unir. */
export function ContactFlow() {
  const ref = useRef(null);
  const [geo, setGeo] = useState(null);

  useEffect(() => {
    const svg = ref.current;
    const grid = svg?.parentElement;
    const email = grid?.querySelector(".contact-email > a");
    const form = grid?.querySelector(".contact-form");
    if (!grid || !email || !form) return;

    /* posición respecto a la rejilla con offset*: a diferencia de
       getBoundingClientRect, no la altera el desplazamiento de la entrada animada */
    const box = (el) => {
      let x = 0;
      let y = 0;
      for (let n = el; n && n !== grid; n = n.offsetParent) {
        x += n.offsetLeft;
        y += n.offsetTop;
      }
      return { left: x, top: y, right: x + el.offsetWidth, bottom: y + el.offsetHeight, height: el.offsetHeight };
    };

    let frame = 0;
    const measure = () => {
      frame = 0;
      const e = box(email);
      const f = box(form);
      if (f.left < e.right) {
        setGeo(null);
        return;
      }
      const x0 = e.left + 24;
      const y0 = e.bottom + 44;
      /* entra por el borde izquierdo de la tarjeta, a la altura del último campo */
      const x1 = f.left + 2;
      const y1 = Math.min(y0 - 70, f.top + f.height * 0.62);
      const k = (x1 - x0) * 0.45;
      setGeo({
        w: grid.offsetWidth,
        h: grid.offsetHeight,
        x0,
        y0,
        d: `M${x0} ${y0} C${x0 + k} ${y0}, ${x1 - k} ${y1}, ${x1} ${y1}`,
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(grid);
    observer.observe(form);
    /* las fuentes cambian el ancho del correo al cargar */
    document.fonts?.ready.then(schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg
      ref={ref}
      className="contact-flow"
      width={geo?.w ?? 0}
      height={geo?.h ?? 0}
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : "0 0 0 0"}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {geo && (
        <>
          <path className="contact-flow-wire" d={geo.d} />
          <path className="contact-flow-signal" d={geo.d} pathLength={100} />
          <circle className="contact-flow-dot" cx={geo.x0} cy={geo.y0} r="4" />
        </>
      )}
    </svg>
  );
}
export default ContactFlow;
