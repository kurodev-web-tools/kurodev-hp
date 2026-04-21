import { ProjectCard } from "@/components/ui/project-card";
import { PageHeader } from "@/components/ui/page-header";
import { toolProjects } from "@/lib/site-data";

export default function ToolPage() {
  return (
    <>
      <PageHeader
        icon="terminal"
        title="Tools"
        description="業務整理、見積り前の要件整理、ページ監査などのツールを順にまとめます。"
      />

      <section className="grid gap-6 xl:grid-cols-3">
        {toolProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>

      <section className="grid gap-10 border-t border-[var(--border)] pt-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:items-start">
        <div className="max-w-2xl">
          <p className="section-kicker">release policy</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--text-soft)]">
            <p>未公開のものを無理に完成品として見せず、`Planning` や `Coming Soon` の状態で扱います。</p>
            <p>最初は内部運用で効くものから作り、公開できる粒度になった時点でこの窓口へ載せていきます。</p>
          </div>
        </div>
        <div className="border-t border-[var(--border)] pt-4 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
          <p className="section-kicker">next wave</p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--text-soft)]">
            <li>見積り前の要件整理</li>
            <li>ページ品質の監査補助</li>
            <li>問い合わせ導線の整理</li>
          </ul>
        </div>
      </section>
    </>
  );
}
