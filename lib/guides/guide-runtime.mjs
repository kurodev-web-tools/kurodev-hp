import { guideRuntimeInventory } from "./guide-runtime-inventory.generated.mjs";

export {
  getGuideAlternates,
  getGuideByRoute,
  getGuideCatchAllParams,
  getGuideLanguageTarget,
  getGuideStaticParams
} from "./guide-selectors.mjs";

export function getGuideInventory() {
  return Promise.resolve(guideRuntimeInventory);
}
