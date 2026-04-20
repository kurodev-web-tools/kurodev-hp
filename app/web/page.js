import { SectionHeader } from "@/components/ui/section-header";
import { ProjectCard } from "@/components/ui/project-card";
import { BentoCard } from "@/components/ui/bento-card";
import { webProjects } from "@/lib/site-data";

export default function WebPage() {
  return (
    <>
      <section className="hero-surface panel-strong rounded-[34px] px-6 py-8 md:px-10 md:py-10">
        <SectionHeader
          eyebrow="web works"
          title="受託制作、テンプレート改善、公開導線をまとめて扱う。"
          body="まずは HP-portal を軸に、実装中のポータルとテンプレート系の取り組みを一覧で見せます。今後、外向け実績が増えたらここを拡張していきます。"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {webProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <BentoCard>
          <p className="section-kicker">what matters</p>
          <p className="mt-5 text-sm leading-7 text-[var(--text-soft)]">
            ただ見た目を整えるだけではなく、次の更新や比較改善が回しやすい状態まで設計します。構造、文言、再利用できる運用ルールを一緒に整えるのが前提です。
          </p>
        </BentoCard>
        <BentoCard>
          <p className="section-kicker">delivery stance</p>
          <p className="mt-5 text-sm leading-7 text-[var(--text-soft)]">
            ブラウザ確認を毎回重く回すより、まず静的検証や差分の確認で前へ進める進行を好みます。必要になった場面でだけ視覚確認を増やします。
          </p>
        </BentoCard>
      </section>
    </>
  );
}
