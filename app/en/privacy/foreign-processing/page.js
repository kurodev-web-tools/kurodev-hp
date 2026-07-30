import { LegalPage } from "@/components/pages/legal-page";
import { loadApprovedLegalDocument } from "@/lib/legal/legal-loader.mjs";
import { buildPageMetadata } from "@/lib/seo.mjs";

const legalRoute = { locale: "en", route: "/en/privacy/foreign-processing", equivalentLocales: ["ja", "en"] };

export const metadata = buildPageMetadata({
  locale: legalRoute.locale,
  pathname: "/privacy/foreign-processing",
  title: "Processing Personal Data Outside Japan | kurodev",
  description: "Providers, purposes, processing locations, and published safeguards for Creator Platform processing outside Japan.",
  equivalentLocales: legalRoute.equivalentLocales
});

export default function EnglishForeignProcessingRoute() {
  return <LegalPage document={loadApprovedLegalDocument(legalRoute.route)} />;
}
