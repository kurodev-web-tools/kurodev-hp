import { ContactPage } from "@/components/pages/contact-page";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "ja",
  pathname: "/contact",
  title: "お問い合わせ | kurodev",
  description: "クリエイターサイト、既存サイト改善、ツール・Webサービス制作について相談できます。",
  equivalentLocales: ["ja", "en"]
});

export default function JapaneseContactRoute() {
  return <ContactPage locale="ja" />;
}
