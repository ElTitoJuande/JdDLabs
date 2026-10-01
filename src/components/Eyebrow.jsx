export function Eyebrow({ as: Tag = "p", children, className = "" }) {
  return <Tag className={"eyebrow " + className}>{children}</Tag>;
}
