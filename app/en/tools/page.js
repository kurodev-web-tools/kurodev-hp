import { ToolsPage } from "@/components/pages/tools-page";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "en",
  pathname: "/tools",
  title: "Stream preparation tools | Kuro Stream Kit | kurodev",
  description: "Explore three publication-verified stream preparation tools: Schedule Calendar, Thumbnail Editor, and SNS Split Image Maker.",
  equivalentLocales: ["ja", "en"]
});

export default function EnglishToolsRoute() {
  return <ToolsPage locale="en" />;
}
