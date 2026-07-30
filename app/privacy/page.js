import { LegalPage } from "@/components/pages/legal-page";
import { loadApprovedLegalDocument } from "@/lib/legal/legal-loader.mjs";
import { buildPageMetadata } from "@/lib/seo.mjs";

const legalRoute = { locale: "ja", route: "/privacy", equivalentLocales: ["ja", "en"] };

export const metadata = buildPageMetadata({
  locale: legalRoute.locale,
  pathname: "/privacy",
  title: "プライバシーポリシー | kurodev",
  description: "Creator Platformにおける個人情報、問い合わせ情報、技術情報および同意記録の取扱いです。",
  equivalentLocales: legalRoute.equivalentLocales
});

export default function JapanesePrivacyRoute() {
  return <LegalPage document={loadApprovedLegalDocument(legalRoute.route)} />;
}
