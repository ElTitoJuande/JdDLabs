const paths = {
  arrow: "M5 19 19 5M5 5h14v14",
  close: "M6 6l12 12M18 6 6 18",
  mail: "M3 5h18v14H3z M3 6l9 7 9-7",
  web: "M3 4h18v16H3z M3 9h18 M7 6.5h.01 M10 6.5h.01",
  cart: "M2 3h3l3 12h10l3-9H6 M9 20h.01 M18 20h.01",
  code: "m8 5-6 7 6 7 M16 5l6 7-6 7 M14 3l-4 18",
  grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  phone: "M7 2h10v20H7z M10 18h4",
  search: "M16 16l5 5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  user: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 21v-2a8 8 0 0 1 16 0v2z",
  pencil: "m3 16 13-13 5 5L8 21H3z M13 6l5 5",
  card: "M2 5h20v14H2z M2 10h20 M6 15h4",
  box: "m12 2 10 5v10l-10 5-10-5V7z M2 7l10 5 10-5 M12 12v10",
  chart: "M3 13h4v8H3z M10 8h4v13h-4z M17 3h4v18h-4z",
  calendar: "M3 5h18v16H3z M7 2v6 M17 2v6 M3 10h18 M7 14h3 M14 14h3",
  link: "m10 14 4-4 M9 15l-2 2a3.5 3.5 0 0 1-5-5l5-5a3.5 3.5 0 0 1 5 0 M15 9l2-2a3.5 3.5 0 0 1 5 5l-5 5a3.5 3.5 0 0 1-5 0",
  database:
    "M3 5c0-4 18-4 18 0s-18 4-18 0v14c0 4 18 4 18 0V5 M3 12c0 4 18 4 18 0",
  layers: "m12 2 10 5-10 5L2 7z M2 12l10 5 10-5 M2 17l10 5 10-5",
  server: "M3 3h18v7H3z M3 14h18v7H3z M7 6h.01 M7 17h.01",
  cloud: "M7 19a5 5 0 0 1-1-9.9 6.5 6.5 0 0 1 12.5-1.6A5.8 5.8 0 0 1 18 19Z",
  plug: "M8 2v5 M16 2v5 M5 7h14v4a7 7 0 0 1-14 0z M12 18v4",
  workflow: "M8 3h8v5H8z M2 17h7v5H2z M15 17h7v5h-7z M12 8v5 M5.5 17v-4h13v4",
  settings:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M9 2h6l1 4 4 1 2 5-2 5-4 1-1 4H9l-1-4-4-1-2-5 2-5 4-1z",
};
export function Icon({ name = "code", className = "" }) {
  return (
    <svg
      className={"icon " + className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.code} />
    </svg>
  );
}
