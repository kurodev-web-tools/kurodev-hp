export function SectionHeader({ eyebrow, title, body, align = "left" }) {
  const isCentered = align === "center";
  const bodyLines = Array.isArray(body) ? body : [body];

  return (
    <div className={isCentered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--text)] md:text-5xl">
        {title}
      </h1>
      {body ? (
        <p className="mt-4 text-sm leading-7 text-[var(--text-soft)] md:text-base">
          {bodyLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}
