import { useId } from "react";
export function LabelInput({
  etiqueta,
  multilinea = false,
  className = "",
  ...props
}) {
  const generated = useId();
  const id = props.id || generated;
  const Tag = multilinea ? "textarea" : "input";
  return (
    <div className={"form-field " + className}>
      <label htmlFor={id}>{etiqueta}</label>
      <Tag {...props} id={id} />
    </div>
  );
}
export default LabelInput;
