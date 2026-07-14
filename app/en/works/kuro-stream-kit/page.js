import { KuroStreamKitCaseStudy } from "@/components/pages/kuro-stream-kit-case-study";
import { getPublicationApprovedWorkBySlug } from "@/lib/content/work-content.mjs";
import { buildPageMetadata } from "@/lib/seo.mjs";
import { notFound } from "next/navigation";

export const metadata = buildPageMetadata({
  locale: "en",
  pathname: "/works/kuro-stream-kit",
  title: "Kuro Stream Kit case study | kurodev",
  description: "A case study covering product planning, information architecture, UI/UX, frontend implementation, accessibility, and continuous improvement for Kuro Stream Kit.",
  equivalentLocales: ["ja", "en"]
});

export default function EnglishKuroStreamKitCaseStudyRoute() {
  const work = getPublicationApprovedWorkBySlug("kuro-stream-kit");
  if (!work) notFound();
  return <KuroStreamKitCaseStudy locale="en" work={work} />;
}
