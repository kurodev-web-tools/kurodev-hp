import { ContactPage } from "@/components/pages/contact-page";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "en",
  pathname: "/contact",
  title: "Contact | kurodev",
  description: "Discuss a creator website, an existing-site improvement, or a tool or web-service production project.",
  equivalentLocales: ["ja", "en"]
});

export default function EnglishContactRoute() {
  return <ContactPage locale="en" />;
}
