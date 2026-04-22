export function BentoCard({ className = "", children }) {
  return <section className={`bento-card ${className}`.trim()}>{children}</section>;
}
