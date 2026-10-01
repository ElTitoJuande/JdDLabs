import { Brand } from "./Brand";
import { useRef, useEffect, useState } from "react";
import { secciones } from "../content/copy";
import { identity, enlaces } from "../content/identity";
import { Boton } from "./Boton";
import { Icon } from "./Icon";
export function MobileMenu({ base = "" }) {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const animation = useRef(null);
  const closing = useRef(false);
  const [open, setOpen] = useState(false);
  const duration = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 280;
  async function close() {
    if (!dialog.current?.open || closing.current) return;
    closing.current = true;
    animation.current?.cancel();
    dialog.current.dataset.closing = "true";
    animation.current = dialog.current.animate(
      [
        { transform: "translateY(0)", opacity: 1 },
        { transform: "translateY(-40px)", opacity: 0 },
      ],
      {
        duration: duration(),
        easing: "cubic-bezier(.4,0,1,1)",
        fill: "forwards",
      },
    );
    try {
      await animation.current.finished;
    } catch {
      return;
    }
    dialog.current?.close();
  }
  useEffect(() => {
    const query = window.matchMedia("(min-width:1024px)");
    const resize = () => {
      if (query.matches) close();
    };
    query.addEventListener("change", resize);
    return () => {
      query.removeEventListener("change", resize);
      animation.current?.cancel();
      document.body.style.overflow = "";
    };
  }, []);
  function show() {
    animation.current?.cancel();
    closing.current = false;
    delete dialog.current.dataset.closing;
    dialog.current.showModal();
    setOpen(true);
    document.body.style.overflow = "hidden";
    animation.current = dialog.current.animate(
      [
        { transform: "translateY(-40px)", opacity: 0 },
        { transform: "translateY(0)", opacity: 1 },
      ],
      {
        duration: duration(),
        easing: "cubic-bezier(.16,1,.3,1)",
        fill: "forwards",
      },
    );
  }
  function closed() {
    setOpen(false);
    closing.current = false;
    document.body.style.overflow = "";
    trigger.current?.focus();
  }
  return (
    <div className="mobile-menu">
      <button
        ref={trigger}
        type="button"
        className="menu-toggle"
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="navigation-dialog"
        onClick={show}
      >
        <span />
        <span />
        <span />
      </button>
      <dialog
        ref={dialog}
        id="navigation-dialog"
        className="menu-dialog"
        onClose={closed}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
        aria-label="Menú principal"
      >
        <div className="menu-panel">
          <div className="menu-top">
            <Brand />
            <button
              type="button"
              className="menu-close"
              onClick={close}
              aria-label="Cerrar menú"
              autoFocus
            >
              <Icon name="close" />
            </button>
          </div>
          <nav aria-label="Navegación móvil">
            <ul>
              {secciones.map((section) => (
                <li key={section.id}>
                  <a onClick={close} href={base + "#" + section.id}>
                    {section.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Boton href={base + "#contacto"} onClick={close} flecha>
            Hablemos
          </Boton>
          <div className="menu-footer">
            <a className="menu-contact-card" href={enlaces.email}>
              <span className="menu-contact-icon">
                <Icon name="mail" />
              </span>
              <span>
                <span className="menu-contact-label">Escríbeme</span>
                <span className="menu-contact-address">{identity.email}</span>
              </span>
              <Icon name="arrow" />
            </a>
            <div className="menu-social">
              <a
                href={enlaces.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <Icon name="arrow" />
              </a>
              <a
                href={enlaces.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <Icon name="arrow" />
              </a>
            </div>
            <div className="menu-bottom">
              <nav aria-label="Información legal del menú">
                <a href="/aviso-legal">Aviso legal</a>
                <a href="/privacidad">Política de privacidad</a>
              </nav>
              <small>
                © {new Date().getFullYear()} JdDLabs{" "}
                <span aria-hidden="true">·</span> Rute, Córdoba
              </small>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
