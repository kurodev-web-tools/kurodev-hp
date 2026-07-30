import { LegalPage } from "@/components/pages/legal-page";
import { loadApprovedLegalDocument } from "@/lib/legal/legal-loader.mjs";
import { buildPageMetadata } from "@/lib/seo.mjs";

const legalRoute = { locale: "en", route: "/en/terms", equivalentLocales: ["ja", "en"] };

export const metadata = buildPageMetadata({
  locale: legalRoute.locale,
  pathname: "/terms",
  title: "Terms of Service | kurodev",
  description: "Terms governing Creator Platform inquiries, contracts, production work, payments, and external services.",
  equivalentLocales: legalRoute.equivalentLocales
});

export default function EnglishTermsRoute() {
  return <LegalPage document={loadApprovedLegalDocument(legalRoute.route)} />;
}
