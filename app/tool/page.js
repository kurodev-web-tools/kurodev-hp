import { SectionHeader } from "@/components/ui/section-header";
import { ProjectCard } from "@/components/ui/project-card";
import { BentoCard } from "@/components/ui/bento-card";
import { toolProjects } from "@/lib/site-data";

export default function ToolPage() {
  return (
    <>
      <section className="hero-surface panel-strong rounded-[34px] px-6 py-8 md:px-10 md:py-10">
        <SectionHeader
          eyebrow="tool desk"
          title="これから公開していくツールの窓口。"
          body="業務整理、見積り前の要件整理、ページ監査など、制作の周辺で効くものから順に公開していく想定です。未公開分は状態を明示して扱います。"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {toolProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <BentoCard>
          <p className="section-kicker">release policy</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--text-soft)]">
            <p>未公開のものを無理に完成品として見せず、`Planning` や `Coming Soon` の状態で扱います。</p>
            <p>最初は内部運用で効くものから作り、公開できる粒度になった時点でこの窓口へ載せていきます。</p>
          </div>
        </BentoCard>
        <BentoCard>
          <p className="section-kicker">next wave</p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--text-soft)]">
            <li>見積り前の要件整理</li>
            <li>ページ品質の監査補助</li>
            <li>問い合わせ導線の整理</li>
          </ul>
        </BentoCard>
      </section>
    </>
  );
}
