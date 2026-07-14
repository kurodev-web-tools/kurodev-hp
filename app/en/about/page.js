import { AboutPage } from "@/components/pages/about-page";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "en",
  pathname: "/about",
  title: "About kurodev | Creator tools and web production",
  description: "How kurodev turns creator workflows into practical tools and websites through clarification, implementation, and improvement.",
  equivalentLocales: ["ja", "en"]
});

export default function EnglishAboutRoute() {
  return <AboutPage locale="en" />;
}
