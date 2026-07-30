import { SiteHeaderControls } from "@/components/layout/site-header-controls";
import { siteCopy } from "@/lib/content/site-copy.mjs";

export function SiteHeader({ locale }) {
  return <SiteHeaderControls locale={locale} navigation={siteCopy[locale].navigation} />;
}
