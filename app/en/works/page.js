import { WorksPage } from "@/components/pages/works-page";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "en",
  pathname: "/works",
  title: "Works | Kuro Stream Kit and published foundations | kurodev",
  description: "Explore Kuro Stream Kit as the flagship product and published work presented within verified public boundaries.",
  equivalentLocales: ["ja", "en"]
});

export default function EnglishWorksRoute() {
  return <WorksPage locale="en" />;
}
