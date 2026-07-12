import { CreatorSitePage } from "@/components/pages/creator-site-page";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "ja",
  pathname: "/creator-site",
  title: "クリエイター向けHP制作 | kurodev",
  description: "プロフィール、配信情報、活動記録、依頼や連絡の入口を、ひとつのホームページで伝わる順序に整えます。",
  equivalentLocales: ["ja", "en"]
});

export default function JapaneseCreatorSiteRoute() {
  return <CreatorSitePage locale="ja" />;
}
