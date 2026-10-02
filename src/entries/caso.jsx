import { Breadcrumbs } from "../components/Breadcrumbs";
import { StrictMode } from "react";
import { mount } from "../components/mount";
import "../styles/index.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Boton } from "../components/Boton";
import { Eyebrow } from "../components/Eyebrow";
import { TituloSeccion } from "../components/TituloSeccion";
import { Icon } from "../components/Icon";
import { proyecto, casoEstudio } from "../content/copy";

const datos = [
  ["Cliente", casoEstudio.cliente],
  ["Sector", casoEstudio.industria],
  ["Año", casoEstudio.anio],
  ["Duración", casoEstudio.duracion],
  ["Servicios", casoEstudio.servicios],
  ["Mi papel", casoEstudio.rol],
].filter(([, valor]) => valor);
const imagen = casoEstudio.imagenHero ?? proyecto.captura;

export function CasoCristaleria() {
  return (
    <>
      <Header base="/" currentSection="proyecto" />
      <main id="contenido" className="case-study" data-inert-target>
        <section className="case-opening">
          <div className="contenedor">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Proyectos", href: "/#proyecto" },
                { label: casoEstudio.cliente },
              ]}
            />
            <div className="case-showcase">
              <div className="case-introduction">
                <Eyebrow>Caso de estudio · {casoEstudio.anio}</Eyebrow>
                <h1>
                  Cristalería <span className="title-accent">Ruteña.</span>
                </h1>
                <p className="case-lead">{casoEstudio.presentacion}</p>
                <Boton href={proyecto.url} externo>
                  {proyecto.textoEnlace}
                </Boton>
              </div>
              {imagen && (
                <figure className="case-cover">
                  <img
                    src={imagen.src}
                    alt={imagen.alt}
                    width={imagen.ancho}
                    height={imagen.alto}
                    fetchpriority="high"
                    decoding="async"
                  />
                  <figcaption>
                    <span>Rute, Córdoba</span>
                    <span>Desde 1977</span>
                  </figcaption>
                </figure>
              )}
            </div>
            <div className="case-brief">
              <div className="case-brief-intro">
                <Eyebrow>Ficha del proyecto</Eyebrow>
                <h2>
                  El proyecto,
                  <br />
                  de un vistazo.
                </h2>
                <p>{proyecto.contexto}</p>
              </div>
              <dl className="case-facts">
                {datos.map(([label, value]) => (
                  <div
                    key={label}
                    className={
                      label === "Año" || label === "Duración"
                        ? "case-fact-short"
                        : ""
                    }
                  >
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
        <section className="case-challenge">
          <div className="contenedor case-editorial">
            <TituloSeccion eyebrow="01 / El reto" enfasis="su trabajo.">
              Una web a la altura de su trabajo.
            </TituloSeccion>
            <div className="case-prose">
              <p>{casoEstudio.reto}</p>
              <div className="case-objective">
                <span className="eyebrow">El objetivo</span>
                <p>{casoEstudio.objetivo}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="case-solution">
          <div className="contenedor">
            <div className="case-editorial">
              <TituloSeccion eyebrow="02 / La solución" enfasis="contactar.">
                Entender, explorar y contactar.
              </TituloSeccion>
              <p className="case-prose">{casoEstudio.solucion}</p>
            </div>
            <div className="case-decisions">
              {casoEstudio.decisiones.map((item) => (
                <article key={item.titulo}>
                  <span className="case-decision-icon">
                    <Icon name={item.icono} />
                  </span>
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="case-details">
          <div className="contenedor case-editorial">
            <TituloSeccion eyebrow="03 / Los detalles" enfasis="presupuesto.">
              Antes de pedir presupuesto.
            </TituloSeccion>
            <ul className="case-highlights">
              {casoEstudio.highlights.map((text, i) => (
                <li key={text}>
                  <span aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="case-technology">
          <div className="contenedor case-editorial">
            <TituloSeccion eyebrow="04 / Desarrollo" enfasis="a medida.">
              Diseño y desarrollo a medida.
            </TituloSeccion>
            <div className="case-prose">
              <p>{casoEstudio.desarrollo}</p>
              <ul className="case-stack">
                {proyecto.tecnologias.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer base="/" />
    </>
  );
}
if (!import.meta.env.SSR) mount(
  <StrictMode>
    <CasoCristaleria />
  </StrictMode>,
);
