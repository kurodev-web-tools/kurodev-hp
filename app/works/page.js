import { WorksPage } from "@/components/pages/works-page";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "ja",
  pathname: "/works",
  title: "実績 | Kuro Stream Kitと公開制作基盤 | kurodev",
  description: "Kuro Stream Kitを旗艦プロダクトとして、公開範囲と根拠を確認できる制作実績を優先度ごとに紹介します。",
  equivalentLocales: ["ja", "en"]
});

export default function JapaneseWorksRoute() {
  return <WorksPage locale="ja" />;
}
