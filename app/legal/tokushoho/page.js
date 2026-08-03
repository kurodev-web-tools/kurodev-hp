import { LegalPage } from "@/components/pages/legal-page";
import { loadApprovedLegalDocument } from "@/lib/legal/legal-loader.mjs";
import { buildPageMetadata } from "@/lib/seo.mjs";

const legalRoute = { locale: "ja", route: "/legal/tokushoho", equivalentLocales: ["ja"] };

export const metadata = buildPageMetadata({
  locale: legalRoute.locale,
  pathname: "/legal/tokushoho",
  title: "特定商取引法に基づく表記 | kurodev",
  description: "Creator Platformから案内するCustom制作に関する事業者情報、販売条件、支払および提供時期の表示です。",
  equivalentLocales: legalRoute.equivalentLocales
});

export default function JapaneseCommercialDisclosureRoute() {
  return <LegalPage document={loadApprovedLegalDocument(legalRoute.route)} />;
}
