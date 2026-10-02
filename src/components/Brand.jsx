export function Brand({ monograma = false }) {
  return (
    <span className="brand">
      <img
        className="brand-mark"
        src="/JdDLogo_marca.svg"
        width="56"
        height="48"
        alt=""
        aria-hidden="true"
        data-monograma={monograma || undefined}
      />
      <span className="brand-word">
        JdD<span className="brand-accent">Labs</span>
      </span>
    </span>
  );
}
