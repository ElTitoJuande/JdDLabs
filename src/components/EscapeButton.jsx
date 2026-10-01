import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Logo que se aparta del cursor, y luego se rinde. Adaptado de "Escape button" de
 * Bencho (MIT, bencho.dev/licence).
 *
 * ══ EL CHISTE TIENE QUE RESOLVERSE ══════════════════════════════════════════════
 * Un control que nunca se deja pulsar es friccion con una sonrisita encima. Uno que se
 * aparta cuatro veces y luego se rinde es una historia pequeña con final, y el final es
 * la razon de que merezca la pena, no un adorno encima de ella.
 *
 * De ahi una regla absoluta: no puede atrapar a nadie. Se rinde solo, en pocos
 * segundos, siempre; y desde el teclado funciona a la primera, porque la burla es un
 * fenomeno del puntero y quien no usa puntero no es su publico.
 *
 * LA NOTA QUE TIENE QUE LLEVAR: el objetivo que esquiva esta a un paso de un patron
 * oscuro de verdad. El mismo mecanismo apuntado al reves es un boton de cerrar que se
 * escurre bajo el dedo, un "rechazar" un poco mas dificil de acertar que el "aceptar".
 * Lo que lo deja en el lado bueno de la linea no es el gusto, es la cuenta: se rinde
 * solo, rapido, cada vez, y activarlo con el teclado nunca esquiva. Quita la cuenta y
 * ya no es un chiste, es el patron que imita.
 *
 * ── CAMBIOS RESPECTO AL ORIGINAL ────────────────────────────────────────────────
 * - Envuelve a sus hijos (el enlace del logo) en vez de pintar su propia pastilla con
 *   "Touch me" / "Fine.". El elemento que se mueve es un <span>, no un <button>: el
 *   interactivo es el <a> de dentro y un control dentro de otro no es HTML valido.
 * - El campo no ocupa sitio en la maqueta. En la cabecera no caben 360x240, asi que es
 *   una caja absoluta centrada en el logo que desborda la cabecera sin pintar nada.
 * - El recorrido es asimetrico: el logo vive pegado al borde izquierdo y al superior
 *   de la ventana, y no puede salirse de ella aunque el campo diga que hay sitio.
 * - El tactil no cuenta: un dedo no "se acerca", aparece. Solo raton y lapiz.
 */

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/* Se lee una vez. Es una preferencia, no una entrada en vivo: quien la cambie a mitad
   de sesion la tendra en el siguiente render, que es pronto y no cuesta nada fallar. */
const still = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ── proximidad ───────────────────────────────────────────────────────────────────
   El vector va del CENTRO del elemento al cursor, en los pixeles propios del
   elemento. Un rect llega en pixeles de pantalla y un transform se aplica en los del
   componente; dividir uno por otro (k) hace que un radio de 120px sean 120px de
   componente a cualquier zoom.

   Escuchar en el ancestro con scroll mas cercano y no en window no es limpieza: es lo
   que hace del SCROLL una fuente de proximidad. El cursor puede estar quieto mientras
   la pagina mueve el elemento bajo el, y eso no dispara ningun pointermove. Se guarda
   la ultima posicion para que un scroll pueda volver a preguntar con ella. */

const AWAY = { dx: 0, dy: 0, distance: Infinity, inside: false };

function scrollerOf(el) {
  for (let n = el.parentElement; n; n = n.parentElement) {
    const o = getComputedStyle(n);
    if (/auto|scroll/.test(o.overflowY) || /auto|scroll/.test(o.overflowX)) return n;
  }
  return document;
}

/* No se exporta: exportar un hook junto a componentes rompe Fast Refresh del modulo
   entero. El dia que otro componente lo quiera, se va a un fichero propio. */
function useProximity(ref, { radius }) {
  const [near, setNear] = useState(AWAY);
  /* la respuesta, y el frame que la publicara. Un pointermove salta por cada pixel de
     recorrido y esto mueve un transform: se lee al momento y se pinta una vez por
     frame. */
  const at = useRef(AWAY);
  const frame = useRef(0);
  const pt = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const host = scrollerOf(el);
    /* pointerleave no burbujea y el document no lo recibe nunca: salir de la ventana
       se escucha en <html>. */
    const edge = host === document ? document.documentElement : host;

    const publish = () => {
      frame.current = 0;
      setNear(at.current);
    };
    const push = (v) => {
      at.current = v;
      if (!frame.current) frame.current = requestAnimationFrame(publish);
    };

    const measure = () => {
      const p = pt.current;
      if (!p) return;
      const box = el.getBoundingClientRect();
      const k = box.width / (el.offsetWidth || box.width) || 1;
      const dx = (p.x - (box.left + box.width / 2)) / k;
      const dy = (p.y - (box.top + box.height / 2)) / k;
      const distance = Math.hypot(dx, dy);
      const inside = distance <= radius;
      /* fuera, y ya estaba fuera. La inmensa mayoria de pointermoves de una pagina son
         esto, y no pueden costar mas que un rect. */
      if (!inside && !at.current.inside) return;
      push({ dx, dy, distance, inside });
    };

    const read = (e) => {
      if (e.pointerType === 'touch') return;
      pt.current = { x: e.clientX, y: e.clientY };
      measure();
    };
    const gone = () => {
      pt.current = null;
      if (at.current.inside) push(AWAY);
    };

    host.addEventListener('pointermove', read, { passive: true });
    host.addEventListener('scroll', measure, { passive: true });
    /* salir del scroller es irse: un puntero en otro panel no esta cerca de nada de
       este */
    edge.addEventListener('pointerleave', gone);
    return () => {
      host.removeEventListener('pointermove', read);
      host.removeEventListener('scroll', measure);
      edge.removeEventListener('pointerleave', gone);
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [ref, radius]);

  return near;
}

/* ── el sitio que tiene para moverse ──────────────────────────────────────────────
   El logo se traslada dentro de un campo y nunca puede salirse de el. El limite se
   mide, no se supone: el campo lo fija la hoja de estilos, pero lo que se mueve mide
   lo que mida el logo.

   offsetWidth, nunca un rect, para las medidas propias. El rect solo se usa para la
   distancia a los bordes de la ventana, que es justo lo que si va en pantalla. */
function useRoom(field, moving, inset = 12) {
  const [room, setRoom] = useState({ left: 0, right: 0, up: 0, down: 0 });
  useLayoutEffect(() => {
    const f = field.current;
    const m = moving.current;
    if (!f || !m) return;
    const read = () => {
      const x = Math.max(0, (f.clientWidth - m.offsetWidth) / 2 - inset);
      const y = Math.max(0, (f.clientHeight - m.offsetHeight) / 2 - inset);
      /* la casa del logo en pantalla. El padre no se mueve con el transform del hijo,
         asi que su rect es la posicion de reposo aunque el logo este desplazado. */
      const home = m.parentElement.getBoundingClientRect();
      /* Lo que venga a su derecha en la misma fila (en la cabecera, el filete y el
         wordmark) es pared: solo se mueve el monograma, y montado sobre "JdDLabs" se
         leia como un logo roto, no como un chiste. */
      const next = m.parentElement.nextElementSibling;
      const wall = next ? next.getBoundingClientRect().left - 4 : window.innerWidth - inset;
      setRoom({
        left: clamp(home.left - inset, 0, x),
        right: clamp(wall - home.right, 0, x),
        up: clamp(home.top - inset / 2, 0, y),
        down: y,
      });
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(f);
    ro.observe(m);
    window.addEventListener('resize', read);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', read);
    };
  }, [field, moving, inset]);
  return room;
}

export function EscapeButton({
  children,
  className = '',
  /* cuanto empuja, 0..100 */
  skittishness = 55,
  /* esquives antes de rendirse */
  patience = 4,
  /* el campo de deteccion, px */
  radius = 120,
}) {
  const field = useRef(null);
  const btn = useRef(null);
  /* ── medido desde el CAMPO, no desde lo que se mueve ─────────────────────────
     El logo esta centrado en el campo y el campo no se mueve, asi que su centro es la
     CASA del logo, y es el unico marco en que esto se puede calcular honestamente.

     Medir desde el rect del propio logo es lo obvio y es un bucle: el desplazamiento
     es funcion de una posicion que el desplazamiento acaba de cambiar. Converge, pero
     converge OSCILANDO, al ritmo al que lleguen los pointermoves. Diez eventos con el
     cursor quieto daban 21, 35, 26, 32, 28, 30, 29, 30, 29, 29px: un temblor de ±6px
     que con el cursor en movimiento no para nunca.

     Desde casa es funcion pura de donde esta el cursor. Una respuesta por posicion,
     sin oscilar. */
  const near = useProximity(field, { radius });
  const room = useRoom(field, btn);
  const reduced = still();

  /* La direccion no existe con el cursor justo en casa, y se INVIERTE al cruzarla, que
     es lo bueno y no un fallo: el logo te rodea hacia el otro lado en vez de dejarse
     arrinconar. Se guarda para que el frame sin direccion conserve la ultima, y el
     salto viaja (ver el CSS) en vez de teletransportarse. */
  const dir = useRef({ x: 1, y: 0 });

  const [dodges, setDodges] = useState(0);
  /* el instante despues de pulsarlo, antes de olvidarlo todo y empezar de nuevo */
  const [gave, setGave] = useState(false);
  const off = useRef(0);
  /* Un esquive por acercamiento. Sin esto, un cursor apoyado en el borde cuenta uno
     por frame y el final llega antes que el chiste. Se rearma solo al salir del radio
     entero, asi que una pasada es un esquive por rapida que sea.

     La cuenta no se muestra. Rendirse sin avisar despues de tres o cuatro esquives ES
     el chiste; una barra de progreso hacia el es un spoiler con interfaz. */
  const armed = useRef(true);

  const caught = dodges >= patience;

  useEffect(() => () => window.clearTimeout(off.current), []);

  useEffect(() => {
    if (caught) return;
    if (near.distance < radius * 0.55) {
      if (armed.current) {
        armed.current = false;
        setDodges((d) => d + 1);
      }
    } else if (near.distance > radius) {
      armed.current = true;
    }
  }, [near.distance, radius, caught]);

  /* El desplazamiento se lee directamente de la distancia, sin muelle: un muelle le
     daria un amago, y todo el caracter de esto es que ya se ha ido cuando llegas.

     Lineal se alejaba de un cursor a dos habitaciones, y eso parece un fallo. El
     original iba al cuadrado: apenas se inmuta en el borde y sale disparado en el
     ultimo tercio. Aqui es smoothstep, que tambien arranca plano en el borde pero
     acelera y frena sin escalones: con el monograma solo, un objeto de 36px, el
     arranque brusco del cuadrado se leia como un tiron (propietario, 2026-10-01). */
  const t = caught || !near.inside || reduced ? 0 : 1 - near.distance / radius;
  const flee = t * t * (3 - 2 * t);
  const reach = 14 + (skittishness / 100) * 106;
  if (near.distance > 6 && near.distance < Infinity) {
    dir.current = { x: -near.dx / near.distance, y: -near.dy / near.distance };
  }
  const tx = dir.current.x * flee * reach;
  const ty = dir.current.y * flee * reach;
  let ox = clamp(tx, -room.left, room.right);
  let oy = clamp(ty, -room.up, room.down);
  /* ── se escurre por la pared (no esta en el original) ────────────────────────
     En el centro de su campo el clamp casi nunca actua. En la esquina de la cabecera
     actua siempre: el raton llega desde la pagina, por abajo, y huir es ir arriba a
     la izquierda, contra los dos bordes de la ventana. Sin esto el logo se encogia
     13px y ya. El recorrido que la pared se come pasa al otro eje: primero hacia donde
     ya iba, y si ahi tambien hay pared, hacia el otro lado, que es rodearte. */
  const slide = (o, lost, sign, lo, hi) => {
    if (lost < 0.5) return o;
    const s = sign >= 0 ? 1 : -1;
    const ahead = clamp(o + s * lost, lo, hi);
    return Math.abs(ahead - o) > lost / 2 ? ahead : clamp(o - s * lost, lo, hi);
  };
  const lostX = Math.abs(tx - ox);
  const lostY = Math.abs(ty - oy);
  ox = slide(ox, lostY, dir.current.x, -room.left, room.right);
  oy = slide(oy, lostX, dir.current.y, -room.up, room.down);

  /* Cualquier activacion lo resuelve, con cualquier cuenta. Quien lo alcanza de verdad
     merece el final, y a quien va con teclado, que nunca lo vio moverse, no se le
     puede dar un enlace que le ignora cuatro veces. El click burbujea desde el <a>, asi
     que la navegacion sigue siendo la suya. */
  const take = () => {
    setGave(true);
    window.clearTimeout(off.current);
    off.current = window.setTimeout(() => {
      setGave(false);
      setDodges(0);
      armed.current = true;
    }, 760);
  };

  return (
    /* Movimiento reducido quita el recorrido y deja el chiste: la cuenta sigue, se
       rinde en el mismo esquive, y el logo simplemente nunca sale de casa. */
    <span className={`esc ${className}`} data-flat={reduced || undefined}>
      <span ref={field} className="esc-field" aria-hidden="true" />
      <span
        ref={btn}
        className="esc-btn"
        data-caught={caught || gave}
        /* dos duraciones, un atributo. Huir es corto; volver a casa es lo suave. */
        data-fled={near.inside && !caught}
        style={{ transform: `translate(${ox.toFixed(2)}px, ${oy.toFixed(2)}px)` }}
        onClick={take}
      >
        {children}
      </span>
    </span>
  );
}

export default EscapeButton;
