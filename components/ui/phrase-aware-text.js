export function PhraseAwareText({ locale, text }) {
  const phrase = "見つけやすく";

  if (locale !== "ja" || !text.includes(phrase)) return text;

  const [before, after] = text.split(phrase);
  return <>{before}<span className="phrase-nowrap">{phrase}</span>{after}</>;
}
