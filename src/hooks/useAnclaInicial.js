import { useEffect, useLayoutEffect } from "react";
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Resolve cross-page section links before the first paint, then compensate for fonts.
export function useAnclaInicial() {
  useBrowserLayoutEffect(() => {
    let id;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const navigation = performance.getEntriesByType("navigation")[0];
    // Back/forward owns its scroll restoration.
    if (navigation?.type === "back_forward") return;
    target.scrollIntoView({ behavior: "instant", block: "start" });
    const position = window.scrollY;
    let cancelled = false;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (!cancelled && Math.abs(window.scrollY - position) < 2)
        target.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => {
      cancelled = true;
    };
  }, []);
}
export default useAnclaInicial;
