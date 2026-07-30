import Link from "next/link";

export function LegalPage({ document }) {
  const dateLabel = document.locale === "ja" ? "施行日・更新日" : "Effective and updated";
  const languageLabel = document.locale === "ja" ? "English version" : "日本語版";

  return (
    <div className={`legal-page legal-page--${document.locale}`}>
      <header className="legal-page__header">
        <div className="site-container legal-page__header-layout">
          <p>{document.locale === "ja" ? "Legal" : "LEGAL"}</p>
          <p>{dateLabel}: <time dateTime={document.effectiveDate}>{document.effectiveDate}</time></p>
          {document.equivalent ? <Link href={document.equivalent.route} prefetch={false}>{languageLabel}</Link> : null}
        </div>
      </header>
      <main className="legal-page__main">
        <article
          className="site-container legal-page__document"
          dangerouslySetInnerHTML={{ __html: document.html }}
        />
      </main>
    </div>
  );
}
