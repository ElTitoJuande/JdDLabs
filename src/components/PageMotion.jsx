import { useEffect, useLayoutEffect } from "react";
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// One motion controller shared by every page through Header. No layout wrappers.
const SELECTORS = [
  ".hero-copy > *",
  ".hero-ilustracion",
  ".section-heading",
  ".service-card",
  ".project-photo",
  ".project-copy > *",
  ".about-brand-panel",
  ".about-copy > *",
  ".tech-node",
  ".contact-intro",
  ".contact-email",
  ".contact-form",
  ".case-back",
  ".case-introduction > *",
  ".case-cover",
  ".case-brief-intro",
  ".case-facts > div",
  ".case-prose",
  ".case-decisions > article",
  ".case-highlights > li",
  ".footer-cta-copy",
  ".footer-cta-action",
  ".footer-columns > *",
  ".footer-legal",
  "main > article > *",
  "main > .contenedor > *",
].join(",");

export function PageMotion() {
  useBrowserLayoutEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    const animations = new Map();
    let targets = [];
    const reset = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      targets.forEach((element) =>
        element.removeAttribute("data-motion-pending"),
      );
    };
    const show = (element, delay = 0) => {
      observer?.unobserve(element);
      element.removeAttribute("data-motion-pending");
      const animation = element.animate(
        [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 360,
          delay,
          easing: "cubic-bezier(.2,.75,.25,1)",
          fill: "both",
        },
      );
      animations.set(element, animation);
      animation.finished
        .then(() => {
          if (animations.get(element) === animation) {
            animation.cancel();
            animations.delete(element);
          }
        })
        .catch(() => {});
    };
    const start = () => {
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      const candidates = [...document.querySelectorAll(SELECTORS)];
      targets = candidates.filter(
        (element) =>
          !candidates.some(
            (parent) => parent !== element && parent.contains(element),
          ),
      );
      observer = new IntersectionObserver(
        (entries) => {
          const entering = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
            );
          entering.forEach((entry, index) =>
            show(entry.target, Math.min(index * 45, 135)),
          );
        },
        { threshold: 0, rootMargin: "0px 0px -16px 0px" },
      );
      let initialIndex = 0;
      targets.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          show(element, Math.min(initialIndex++ * 40, 120));
        } else if (rect.top >= window.innerHeight) {
          element.dataset.motionPending = "";
          observer.observe(element);
        }
      });
    };
    const revealFocus = (event) => {
      targets
        .filter((element) => element.contains(event.target))
        .forEach((element) => {
          observer?.unobserve(element);
          element.removeAttribute("data-motion-pending");
          animations.get(element)?.cancel();
          animations.delete(element);
        });
    };
    start();
    preference.addEventListener("change", start);
    document.addEventListener("focusin", revealFocus);
    return () => {
      reset();
      preference.removeEventListener("change", start);
      document.removeEventListener("focusin", revealFocus);
    };
  }, []);
  return null;
}
