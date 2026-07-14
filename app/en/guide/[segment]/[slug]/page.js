import { buildGuideRouteMetadata, GuideRoute } from "@/components/pages/guide-route";
import { getGuideInventory, getGuideStaticParams } from "@/lib/guides/guide-loader.mjs";

export const dynamicParams = false;

export async function generateStaticParams() {
  const guides = await getGuideInventory();
  return getGuideStaticParams(guides, "en", 2).map(({ category, slug }) => ({ segment: category, slug }));
}

export function generateMetadata({ params }) {
  return buildGuideRouteMetadata("en", [params.segment, params.slug]);
}

export default function Page({ params }) {
  return <GuideRoute locale="en" segments={[params.segment, params.slug]} />;
}
