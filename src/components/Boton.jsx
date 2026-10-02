import { Icon } from "./Icon";
export function Boton({
  href,
  children,
  variante = "solido",
  tamano = "md",
  externo = false,
  flecha = false,
  className = "",
  ...props
}) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      {...(href
        ? {
            href,
            ...(externo
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {}),
          }
        : { type: "submit" })}
      className={`button ${variante === "fantasma" ? "button-outline" : "button-primary"} ${tamano === "sm" ? "button-small" : ""} ${className}`}
      {...props}
    >
      {/* Destellos del borde (StarBorder de React Bits, adaptado): solo en el CTA principal. */}
      {variante !== "fantasma" && (
        <>
          <span className="star-border-bottom" aria-hidden="true" />
          <span className="star-border-top" aria-hidden="true" />
          <span className="star-border-bottom star-glow" aria-hidden="true" />
          <span className="star-border-top star-glow" aria-hidden="true" />
        </>
      )}
      {children}
      {(flecha || externo) && <Icon name="arrow" />}
    </Tag>
  );
}
export default Boton;
