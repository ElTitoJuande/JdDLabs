import { useEffect } from 'react';

/**
 * Baja al fragmento de la URL una vez montada la portada. Cubre la llegada desde otra
 * pagina (/#proyecto desde legal, caso o 404); las anclas dentro de la portada siguen
 * siendo nativas y no pasan por aqui.
 *
 * Solo actua si la pagina sigue arriba del todo: si scrollY ya no es 0, o el navegador
 * ha restaurado la posicion (atras, recarga) o el usuario se ha movido, y en los dos
 * casos manda su posicion. `instant` no anima nada, asi que respeta el movimiento
 * reducido; `scroll-margin-top` deja el titulo por debajo de la cabecera.
 */
export function useAnclaInicial() {
  // El navegador busca el fragmento al terminar de parsear, antes de que React monte
  // las secciones: no lo encuentra y no vuelve a intentarlo.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const bajar = () => {
      if (window.scrollY !== 0) return;
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    };

    // Tras las fuentes: el cambio a Space Grotesk puede mover unos px lo que hay encima.
    (document.fonts?.ready ?? Promise.resolve()).then(bajar);
  }, []);
}

export default useAnclaInicial;
