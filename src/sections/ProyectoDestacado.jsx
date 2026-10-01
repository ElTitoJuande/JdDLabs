import { proyecto, casoEstudio, titulares } from "../content/copy";
import { TituloSeccion } from "../components/TituloSeccion";
import { Boton } from "../components/Boton";
export function ProyectoDestacado() {
  return (
    <section id="proyecto" className="section project-section">
      <div className="contenedor">
        <TituloSeccion
          eyebrow={titulares.proyecto.eyebrow}
          enfasis={titulares.proyecto.enfasis}
        >
          {titulares.proyecto.titulo}
        </TituloSeccion>
        <article className="project-grid">
          {proyecto.captura && (
            <img
              className="project-photo"
              src={proyecto.captura.src}
              alt={proyecto.captura.alt}
              width={proyecto.captura.ancho}
              height={proyecto.captura.alto}
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="project-copy">
            <p className="eyebrow">
              {casoEstudio.anio} / {proyecto.categoria}
            </p>
            <h3>
              Nueva presencia digital para{" "}
              <span className="title-accent">{proyecto.cliente}</span>
            </h3>
            <p>{proyecto.descripcion}</p>
            <div className="button-row">
              <Boton href={proyecto.url} externo>
                {proyecto.textoEnlace}
              </Boton>
              <Boton href={proyecto.urlCaso} variante="fantasma" flecha>
                {proyecto.enlaceCaso}
              </Boton>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
export default ProyectoDestacado;
