import { LegalPage } from "@/components/pages/legal-page";
import { loadApprovedLegalDocument } from "@/lib/legal/legal-loader.mjs";
import { buildPageMetadata } from "@/lib/seo.mjs";

const legalRoute = { locale: "ja", route: "/terms", equivalentLocales: ["ja", "en"] };

export const metadata = buildPageMetadata({
  locale: legalRoute.locale,
  pathname: "/terms",
  title: "利用規約 | kurodev",
  description: "Creator Platformの利用条件、問い合わせ、契約、制作および外部サービスに関する利用規約です。",
  equivalentLocales: legalRoute.equivalentLocales
});

export default function JapaneseTermsRoute() {
  return <LegalPage document={loadApprovedLegalDocument(legalRoute.route)} />;
}
