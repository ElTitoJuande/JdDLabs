import { Eyebrow } from "./Eyebrow";
export function conEnfasis(texto, enfasis) {
  if (typeof texto !== "string" || !enfasis || !texto.endsWith(enfasis))
    return texto;
  return (
    <>
      {texto.slice(0, -enfasis.length)}
      <span className="title-accent">{enfasis}</span>
    </>
  );
}
export function TituloSeccion({ eyebrow, enfasis, children, className = "" }) {
  return (
    <div className={"section-heading " + className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{conEnfasis(children, enfasis)}</h2>
    </div>
  );
}
export default TituloSeccion;
