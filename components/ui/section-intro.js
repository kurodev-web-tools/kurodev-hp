export function SectionIntro({ eyebrow, title, titleLines, body }) {
  return (
    <div className="section-intro">
      {eyebrow ? <p className="section-intro__eyebrow">{eyebrow}</p> : null}
      <h2>{titleLines ? titleLines.map((line) => <span key={line} className="display-line">{line}</span>) : title}</h2>
      {body ? <p className="section-intro__body">{body}</p> : null}
    </div>
  );
}
