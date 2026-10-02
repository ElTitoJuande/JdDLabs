import { PageMotion } from "./PageMotion";
import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { Boton } from "./Boton";
import { secciones } from "../content/copy";
import { Brand } from "./Brand";
export { Brand } from "./Brand";
export function Header({ base = "", currentSection }) {
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  // Fuera de lo alto de la página el header pasa a semitransparente.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (base) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerBottom =
        document.querySelector(".site-header")?.getBoundingClientRect()
          .bottom || 0;
      const probe =
        headerBottom +
        Math.min(180, (window.innerHeight - headerBottom) * 0.25);
      const sections = [...document.querySelectorAll("main > section[id]")];
      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probe && rect.bottom > probe;
      });
      // Tecnología has no navigation item: do not keep highlighting Sobre mí there.
      setActive(current?.id || null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.querySelector("main"));
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [base]);

  return (
    <>
      <PageMotion />
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header" data-scrolled={scrolled || undefined}>
        <div className="contenedor header-inner">
          <a href={base + "#inicio"} aria-label="JdDLabs, ir al inicio">
            <Brand />
          </a>
          <nav className="desktop-nav" aria-label="Secciones del sitio">
            <ul>
              {secciones.map((s) => (
                <li key={s.id}>
                  <a
                    href={base + "#" + s.id}
                    aria-current={
                      (currentSection ?? (!base ? active : null)) === s.id
                        ? "location"
                        : undefined
                    }
                  >
                    {s.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Boton
            href={base + "#contacto"}
            tamano="sm"
            flecha
            className="header-cta"
          >
            Hablemos
          </Boton>
          <MobileMenu base={base} />
        </div>
      </header>
    </>
  );
}
export default Header;
