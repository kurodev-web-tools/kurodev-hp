import { LegalPage } from "@/components/pages/legal-page";
import { loadApprovedLegalDocument } from "@/lib/legal/legal-loader.mjs";
import { buildPageMetadata } from "@/lib/seo.mjs";

const legalRoute = { locale: "en", route: "/en/privacy", equivalentLocales: ["ja", "en"] };

export const metadata = buildPageMetadata({
  locale: legalRoute.locale,
  pathname: "/privacy",
  title: "Privacy Policy | kurodev",
  description: "How Creator Platform handles personal information, inquiry data, technical data, and consent records.",
  equivalentLocales: legalRoute.equivalentLocales
});

export default function EnglishPrivacyRoute() {
  return <LegalPage document={loadApprovedLegalDocument(legalRoute.route)} />;
}
