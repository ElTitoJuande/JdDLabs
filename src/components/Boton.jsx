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
      {children}
      {(flecha || externo) && <Icon name="arrow" />}
    </Tag>
  );
}
export default Boton;
