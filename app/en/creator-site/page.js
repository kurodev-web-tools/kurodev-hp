import { CreatorSitePage } from "@/components/pages/creator-site-page";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "en",
  pathname: "/creator-site",
  title: "Creator websites | kurodev",
  description: "Organize your profile, stream information, work archive, and inquiry route into one clear creator website.",
  equivalentLocales: ["ja", "en"]
});

export default function EnglishCreatorSiteRoute() {
  return <CreatorSitePage locale="en" />;
}
