import { ProjectCard } from "@/components/ui/project-card";
import { PageHeader } from "@/components/ui/page-header";
import { webProjects } from "@/lib/site-data";

export default function WebPage() {
  return (
    <>
      <PageHeader
        icon="layout"
        title="Web Works"
        description="公開済みの制作基盤、テンプレート一覧、次期テンプレート計画をまとめています。"
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
            見た目だけでなく、公開後の更新、比較改善、導線整理まで回しやすい形を意識して制作します。
          </p>
        </div>
        <div className="border-t border-[var(--border)] pt-4 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
          <p className="section-kicker">delivery stance</p>
          <p className="mt-5 text-sm leading-7 text-[var(--text-soft)]">
            小さく確認しながら前に進め、必要な場面で表示確認や調整を重ねます。公開後の改善もしやすい進行を大切にします。
          </p>
        </div>
      </section>
    </>
  );
}
