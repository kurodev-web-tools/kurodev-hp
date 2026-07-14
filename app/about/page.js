import { AboutPage } from "@/components/pages/about-page";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "ja",
  pathname: "/about",
  title: "kurodevについて | クリエイターの活動を支えるツールとWeb制作",
  description: "活動の流れを理解し、クリエイター向けツールとWeb制作を確認から改善まで進めるkurodevの考え方。",
  equivalentLocales: ["ja", "en"]
});

export default function JapaneseAboutRoute() {
  return <AboutPage locale="ja" />;
}
