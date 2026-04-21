import { ProjectCard } from "@/components/ui/project-card";
import { PageHeader } from "@/components/ui/page-header";
import { webProjects } from "@/lib/site-data";

export default function WebPage() {
  return (
    <>
      <PageHeader
        icon="layout"
        title="Web Works"
        description="HP-portal を軸に、制作実績とテンプレート系の取り組みをまとめます。"
      />

      <section className="grid gap-6 xl:grid-cols-3">
        {webProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>

      <section className="grid gap-10 border-t border-[var(--border)] pt-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:items-start">
        <div className="max-w-2xl">
          <p className="section-kicker">what matters</p>
          <p className="mt-5 text-sm leading-7 text-[var(--text-soft)]">
            ただ見た目を整えるだけではなく、次の更新や比較改善が回しやすい状態まで設計します。構造、文言、再利用できる運用ルールを一緒に整えるのが前提です。
          </p>
        </div>
        <div className="border-t border-[var(--border)] pt-4 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
          <p className="section-kicker">delivery stance</p>
          <p className="mt-5 text-sm leading-7 text-[var(--text-soft)]">
            ブラウザ確認を毎回重く回すより、まず静的検証や差分の確認で前へ進める進行を好みます。必要になった場面でだけ視覚確認を増やします。
          </p>
        </div>
      </section>
    </>
  );
}
