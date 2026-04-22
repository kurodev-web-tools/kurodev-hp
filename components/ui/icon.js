const paths = {
  home: "M3.5 10.5 12 3l8.5 7.5v9a1 1 0 0 1-1 1h-5.5v-6h-3v6H5a1 1 0 0 1-1-1z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
  layout: "M4 5h16v5H4zm0 9h9v5H4zm12 0h4v5h-4z",
  terminal: "M5 6h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm2 3 3 3-3 3m5 0h4",
  mail: "M4 7h16v10H4zm0 0 8 6 8-6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  sun: "M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  moon: "M18 14.5A6.5 6.5 0 0 1 9.5 6a7.5 7.5 0 1 0 8.5 8.5Z",
  arrow: "M5 12h14m-5-5 5 5-5 5",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"
};

export function Icon({ name, className = "h-4 w-4", stroke = 1.8 }) {
  const path = paths[name] ?? paths.spark;
  const isStrokeIcon = ["sun", "moon", "arrow", "mail", "terminal", "menu", "close"].includes(name);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill={isStrokeIcon ? "none" : "currentColor"}
      stroke={isStrokeIcon ? "currentColor" : "none"}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={path} />
    </svg>
  );
}
