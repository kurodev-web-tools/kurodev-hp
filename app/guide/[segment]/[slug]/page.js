import { buildGuideRouteMetadata, GuideRoute } from "@/components/pages/guide-route";
import { getGuideInventory, getGuideStaticParams } from "@/lib/guides/guide-runtime.mjs";

export const dynamicParams = false;

export async function generateStaticParams() {
  const guides = await getGuideInventory();
  return getGuideStaticParams(guides, "ja", 2).map(({ category, slug }) => ({ segment: category, slug }));
}

export function generateMetadata({ params }) {
  return buildGuideRouteMetadata("ja", [params.segment, params.slug]);
}

export default function Page({ params }) {
  return <GuideRoute locale="ja" segments={[params.segment, params.slug]} />;
}
