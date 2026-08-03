import { SectionIntro } from "@/components/ui/section-intro";

const topics = {
  ja: ["プロフィールと活動方針", "配信予定と活動記録", "依頼条件とお問い合わせ"],
  en: ["Profile and creative direction", "Schedules and activity archive", "Commission terms and contact"]
};

export function OwnedSiteNeed({ locale, copy }) {
  return (
    <section className="section-block section-rule owned-site">
      <div className="site-container owned-site__grid">
        <SectionIntro title={copy.title} titleLines={copy.titleLines} body={copy.body} />
        <ol className="owned-site__list">
          {topics[locale].map((topic, index) => <li key={topic}><span>0{index + 1}</span>{topic}</li>)}
        </ol>
      </div>
    </section>
  );
}
