import { KuroStreamKitCaseStudy } from "@/components/pages/kuro-stream-kit-case-study";
import { getPublicationApprovedWorkBySlug } from "@/lib/content/work-content.mjs";
import { buildPageMetadata } from "@/lib/seo.mjs";
import { notFound } from "next/navigation";

export const metadata = buildPageMetadata({
  locale: "ja",
  pathname: "/works/kuro-stream-kit",
  title: "Kuro Stream Kit ケーススタディ | kurodev",
  description: "配信準備を支えるKuro Stream Kitの製品計画、情報設計、UI/UX、フロントエンド、アクセシビリティ、継続改善を紹介します。",
  equivalentLocales: ["ja", "en"]
});

export default function JapaneseKuroStreamKitCaseStudyRoute() {
  const work = getPublicationApprovedWorkBySlug("kuro-stream-kit");
  if (!work) notFound();
  return <KuroStreamKitCaseStudy locale="ja" work={work} />;
}
