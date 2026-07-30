import { LegalPage } from "@/components/pages/legal-page";
import { loadApprovedLegalDocument } from "@/lib/legal/legal-loader.mjs";
import { buildPageMetadata } from "@/lib/seo.mjs";

const legalRoute = { locale: "ja", route: "/privacy/foreign-processing", equivalentLocales: ["ja", "en"] };

export const metadata = buildPageMetadata({
  locale: legalRoute.locale,
  pathname: "/privacy/foreign-processing",
  title: "国外での個人データの取扱い | kurodev",
  description: "Creator Platformが利用する国外事業者、処理目的、保存・処理地域および公表された保護措置の説明です。",
  equivalentLocales: legalRoute.equivalentLocales
});

export default function JapaneseForeignProcessingRoute() {
  return <LegalPage document={loadApprovedLegalDocument(legalRoute.route)} />;
}
