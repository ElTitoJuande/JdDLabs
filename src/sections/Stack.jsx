import { stack, titulares } from "../content/copy";
import { TituloSeccion } from "../components/TituloSeccion";
import { Icon } from "../components/Icon";
const icons = ["code", "layers", "pencil", "server", "database", "cloud", "plug", "workflow"];
const paths = ["M120 320 C60 320 80 72 0 72", "M120 320 C180 320 160 72 240 72", "M120 320 C60 320 80 237 0 237", "M120 320 C180 320 160 237 240 237", "M120 320 C60 320 80 403 0 403", "M120 320 C180 320 160 403 240 403", "M120 320 C60 320 80 568 0 568", "M120 320 C180 320 160 568 240 568"];
export function Stack() {
  return (
    <section id="stack" className="section stack-section">
      <div className="contenedor">
        <TituloSeccion eyebrow={titulares.stack.eyebrow} enfasis={titulares.stack.enfasis}>{titulares.stack.titulo}</TituloSeccion>
        <div className="tech-network">
          <svg className="tech-connections" viewBox="0 0 240 640" preserveAspectRatio="none" fill="none" aria-hidden="true">
            {paths.map((d,i)=><g key={d}><path d={d} className="tech-wire"/><path d={d} className="tech-signal" style={{animationDelay: i * -.65 + 's'}} /></g>)}
          </svg>
          <div className="tech-hub" aria-hidden="true"><img src="/JdDLogo_marca.svg" alt="" width="788" height="681"/><span>JdD<strong>Labs</strong></span></div>
          <ol className="tech-nodes">
            {stack.map((group,i)=><li key={group.id} className="tech-node">
              <div className="tech-node-heading"><span className="tech-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><Icon name={icons[i]}/><h3>{group.categoria}</h3></div>
              <ul className="tech-tools">{group.items.map(item=><li key={item}>{item}</li>)}</ul>
            </li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
export default Stack;
