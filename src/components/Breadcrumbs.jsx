export function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Ruta de navegación">
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {index > 0 && (
              <span className="breadcrumb-divider" aria-hidden="true">
                /
              </span>
            )}
            {item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
