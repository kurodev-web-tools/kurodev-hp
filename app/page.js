import { HomePage } from "@/components/pages/home-page";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "ja",
  pathname: "/",
  title: "kurodev | クリエイターツールとHP制作",
  description: "配信準備を支えるKuro Stream Kitと、クリエイターの活動を伝えるホームページ制作。",
  equivalentLocales: ["ja", "en"]
});

export default function JapaneseHomeRoute() {
  return <HomePage locale="ja" />;
}
