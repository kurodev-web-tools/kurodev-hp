import { buildGuideRouteMetadata, GuideRoute } from "@/components/pages/guide-route";
import { getGuideInventory, getGuideStaticParams } from "@/lib/guides/guide-runtime.mjs";

export const dynamicParams = false;

export async function generateStaticParams() {
  const guides = await getGuideInventory();
  return getGuideStaticParams(guides, "en", 1).map(({ slug }) => ({ segment: slug }));
}

export function generateMetadata({ params }) {
  return buildGuideRouteMetadata("en", [params.segment]);
}

export default function Page({ params }) {
  return <GuideRoute locale="en" segments={[params.segment]} />;
}
