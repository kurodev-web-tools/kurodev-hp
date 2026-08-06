import { Fragment } from "react";
import { breakOffsets, validatedLinePlan } from "@/lib/heading-lines.mjs";

function OriginalDisplayLines({ lines }) {
  return lines.map((line, index) => (
    <Fragment key={line}>
      <span className="display-line">{line}</span>
      {index < lines.length - 1 ? " " : null}
    </Fragment>
  ));
}

export function DisplayLines({ lines, mobileLines, tabletLines, desktopBreakAfter, desktopLines, mobileLocked = true }) {
  const validatedMobileLines = validatedLinePlan(lines, mobileLines);
  const validatedTabletLines = validatedLinePlan(lines, tabletLines);
  const hasDesktopPlan = Boolean(desktopLines) || Number.isInteger(desktopBreakAfter);

  if (validatedMobileLines && !validatedTabletLines && !hasDesktopPlan) {
    return (
      <>
        <span className={`display-lines display-lines--mobile-only${lines.length > 1 && mobileLocked ? " display-lines--mobile-locked" : ""}`}>
          {validatedMobileLines.map((line, index) => (
            <Fragment key={line}>
              <span className="display-line">{line}</span>
              {index < validatedMobileLines.length - 1 ? <br className="heading-line-break heading-line-break--mobile" aria-hidden="true" /> : null}
            </Fragment>
          ))}
        </span>
        <span className="display-lines--mobile-only-fallback"><OriginalDisplayLines lines={lines} /></span>
      </>
    );
  }

  if (validatedMobileLines || validatedTabletLines) {
    const text = lines.join("");
    const mobileBreaks = new Set(breakOffsets(validatedMobileLines ?? lines));
    const tabletBreaks = new Set(breakOffsets(validatedTabletLines ?? lines));
    const desktopBreaks = new Set(desktopLines
      ? breakOffsets(desktopLines)
      : Number.isInteger(desktopBreakAfter)
        ? [lines.slice(0, desktopBreakAfter + 1).join("").length]
        : []);
    const offsets = [...new Set([...mobileBreaks, ...tabletBreaks, ...desktopBreaks])].sort((left, right) => left - right);
    let start = 0;

    return (
      <span className={`display-lines display-lines--tablet${lines.length > 1 && mobileLocked ? " display-lines--mobile-locked" : ""}${hasDesktopPlan ? " display-lines--desktop-locked" : ""}`}>
        {offsets.map((offset) => {
          const segment = text.slice(start, offset);
          start = offset;

          return (
            <Fragment key={offset}>
              <span className="display-line">{segment}</span>
              {mobileBreaks.has(offset) ? <br className="heading-line-break heading-line-break--mobile" aria-hidden="true" /> : null}
              {tabletBreaks.has(offset) ? <br className="heading-line-break heading-line-break--tablet" aria-hidden="true" /> : null}
              {desktopBreaks.has(offset) ? <br className="heading-line-break heading-line-break--desktop" aria-hidden="true" /> : null}
            </Fragment>
          );
        })}
        <span className="display-line">{text.slice(start)}</span>
      </span>
    );
  }

  if (Number.isInteger(desktopBreakAfter)) {
    const desktopLines = [lines.slice(0, desktopBreakAfter + 1), lines.slice(desktopBreakAfter + 1)];

    return desktopLines.map((desktopLine) => (
      <span className="desktop-title-line" key={desktopLine.join("")}>
        {desktopLine.map((line) => <span className="display-line" key={line}>{line}</span>)}
      </span>
    ));
  }

  return <OriginalDisplayLines lines={lines} />;
}

export function SectionIntro({ eyebrow, title, titleLines, mobileLines, tabletLines, desktopBreakAfter, mobileLocked, body }) {
  return (
    <div className="section-intro">
      {eyebrow ? <p className="section-intro__eyebrow">{eyebrow}</p> : null}
      <h2>
        {titleLines ? <DisplayLines lines={titleLines} mobileLines={mobileLines} tabletLines={tabletLines} desktopBreakAfter={desktopBreakAfter} mobileLocked={mobileLocked} /> : title}
      </h2>
      {body ? <p className="section-intro__body">{body}</p> : null}
    </div>
  );
}
