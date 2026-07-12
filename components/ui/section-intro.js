import { Fragment } from "react";

export function SectionIntro({ eyebrow, title, titleLines, body }) {
  return (
    <div className="section-intro">
      {eyebrow ? <p className="section-intro__eyebrow">{eyebrow}</p> : null}
      <h2>
        {titleLines
          ? titleLines.map((line, index) => <Fragment key={line}><span className="display-line">{line}</span>{index < titleLines.length - 1 ? " " : null}</Fragment>)
          : title}
      </h2>
      {body ? <p className="section-intro__body">{body}</p> : null}
    </div>
  );
}
