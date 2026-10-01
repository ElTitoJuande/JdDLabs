/**
 * Intro de la portada: el monograma aparece sobre el fondo, un filete verde se llena
 * debajo como una barra de carga y se recoge, y el monograma vuela hasta su sitio en la
 * cabecera mientras la cortina sube (la persiana del menu movil, al reves). Unos 2 s.
 *
 * Por que asi y no de otra forma (principio VI, Lighthouse >= 90):
 * - La portada se pinta debajo desde el primer render, sin opacidad ni Reveal. LCP no
 *   tiene en cuenta lo que tapa a un elemento, asi que la cortina no lo retrasa; un hero
 *   en opacity 0 hasta el segundo 1,5 si lo haria.
 * - Vanilla y CSS, nada de estado de React: ni re-renders ni trabajo en el hilo
 *   principal durante la animacion. Solo se anima transform y clip-path.
 * - La cortina la crea este script. Sin JavaScript no existe y no tapa nada.
 *
 * No se muestra: con movimiento reducido, si la URL trae ancla (el usuario va a una
 * seccion concreta) ni mas de una vez por sesion. Cualquier clic, tecla, rueda o toque
 * la termina al momento. Los tiempos y keyframes, en index.css (`.intro`).
 */

const CLAVE = 'jdd-intro-vista';
// Comienzo del vuelo: el filete ya se ha recogido casi entero (1150-1450 ms).
const INICIO_VUELO = 1250;
// Si animationend no llega (pestaña en segundo plano, animacion cancelada), la intro
// se retira igualmente. Holgura sobre los 1950 ms de la secuencia.
const LIMITE = 2600;

function yaVista() {
  try {
    return sessionStorage.getItem(CLAVE) === '1';
  } catch {
    return false;
  }
}

function marcarVista() {
  try {
    sessionStorage.setItem(CLAVE, '1');
  } catch {
    // Sin almacenamiento (modo privado estricto): se vera en cada carga, sin mas.
  }
}

export function iniciarIntro() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  if (window.location.hash || yaVista()) return;
  marcarVista();

  const raiz = document.documentElement;
  const cortina = document.createElement('div');
  cortina.className = 'intro-cortina';
  cortina.setAttribute('aria-hidden', 'true');
  cortina.innerHTML = '<span class="intro-filete"><span class="intro-filete__relleno"></span></span>';

  // El monograma va fuera de la cortina: si fuera hijo suyo, el clip-path de la
  // persiana lo recortaria mientras vuela hacia arriba.
  const marca = document.createElement('span');
  marca.className = 'intro-marca';
  marca.setAttribute('aria-hidden', 'true');

  // Mientras dura, el monograma real de la cabecera se oculta (index.css): al aterrizar
  // se cambia uno por otro sin que se vean dos.
  raiz.setAttribute('data-intro', '');
  document.body.append(cortina, marca);

  let terminada = false;
  const eventos = ['pointerdown', 'keydown', 'wheel', 'touchstart'];

  const terminar = () => {
    if (terminada) return;
    terminada = true;
    clearTimeout(temporizadorVuelo);
    clearTimeout(temporizadorLimite);
    eventos.forEach((tipo) => window.removeEventListener(tipo, terminar, true));
    cortina.remove();
    marca.remove();
    raiz.removeAttribute('data-intro');
  };

  const volar = () => {
    const destino = document.querySelector('[data-monograma]');
    if (!destino) {
      terminar();
      return;
    }
    // El vuelo se calcula aqui y no al empezar: para entonces React ya ha pintado la
    // cabecera, y el ancho de la ventana es el de ahora.
    const a = marca.getBoundingClientRect();
    const b = destino.getBoundingClientRect();
    marca.style.setProperty('--dx', `${b.left + b.width / 2 - (a.left + a.width / 2)}px`);
    marca.style.setProperty('--dy', `${b.top + b.height / 2 - (a.top + a.height / 2)}px`);
    marca.style.setProperty('--s', String(b.width / a.width));
    raiz.setAttribute('data-intro', 'vuelo');
    marca.addEventListener('animationend', (e) => e.animationName === 'intro-vuelo' && terminar());
  };

  const temporizadorVuelo = setTimeout(volar, INICIO_VUELO);
  const temporizadorLimite = setTimeout(terminar, LIMITE);
  // En captura y pasivos: no se bloquea nada, y la tecla que la termina sigue su curso
  // (un Tab mueve el foco a la vez que retira la cortina).
  eventos.forEach((tipo) => window.addEventListener(tipo, terminar, { capture: true, passive: true }));
}
