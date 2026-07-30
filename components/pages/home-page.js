import "@/app/styles/home-hero.css";
import "@/app/styles/home-sections.css";
import { EnglishSuggestion } from "@/components/layout/english-suggestion";
import { CreatorHero } from "@/components/sections/creator-hero";
import { CreatorServiceBridge } from "@/components/sections/creator-service-bridge";
import { FeaturedTools } from "@/components/sections/featured-tools";
import { FeaturedWork } from "@/components/sections/featured-work";
import { FinalActions } from "@/components/sections/final-actions";
import { GuideEntry } from "@/components/sections/guide-entry";
import { MakerIntroduction } from "@/components/sections/maker-introduction";
import { OwnedSiteNeed } from "@/components/sections/owned-site-need";
import { featuredHomeTools } from "@/lib/content/tool-content.mjs";
import { homeGuides } from "@/lib/content/guide-registry.mjs";
import { siteCopy } from "@/lib/content/site-copy.mjs";
import { getPublicationApprovedWorkBySlug } from "@/lib/content/work-content.mjs";

export function HomePage({ locale }) {
  const copy = siteCopy[locale].home;
  const flagship = getPublicationApprovedWorkBySlug("kuro-stream-kit");

  return (
    <>
      {locale === "ja" ? <EnglishSuggestion /> : null}
      <CreatorHero locale={locale} copy={copy.hero} flagship={flagship} tools={featuredHomeTools} />
      <FeaturedTools locale={locale} copy={copy.tools} tools={featuredHomeTools} />
      <OwnedSiteNeed locale={locale} copy={copy.ownedSite} />
      <CreatorServiceBridge locale={locale} copy={copy.service} />
      {flagship ? <FeaturedWork locale={locale} work={flagship} /> : null}
      <GuideEntry locale={locale} guides={homeGuides} />
      <MakerIntroduction locale={locale} copy={copy.maker} />
      <FinalActions locale={locale} copy={copy.final} />
    </>
  );
}
