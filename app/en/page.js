import { HomePage } from "@/components/pages/home-page";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "en",
  pathname: "/",
  title: "kurodev | Creator tools and websites",
  description: "Kuro Stream Kit for stream preparation, plus creator websites that organize your work and contact routes.",
  equivalentLocales: ["ja", "en"]
});

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
