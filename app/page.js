import { PrimaryButton, GhostButton } from "@/components/ui/buttons";
import { SectionHeader } from "@/components/ui/section-header";
import { BentoCard } from "@/components/ui/bento-card";
import { ProjectCard } from "@/components/ui/project-card";
import { Tag } from "@/components/ui/tag";
import { featuredHighlights, webProjects } from "@/lib/site-data";

export const metadata = {
  title: "kurodev | Web制作・改善運用・業務ツール相談",
  description: "Web制作、運用改善、業務ツールの相談を、要件整理から実装後の改善まで一続きで扱う入口です。",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "kurodev | Web制作・改善運用・業務ツール相談",
    description: "Web制作、運用改善、業務ツールの相談を、要件整理から実装後の改善まで一続きで扱う入口です。",
    url: "/"
  },
  twitter: {
    title: "kurodev | Web制作・改善運用・業務ツール相談",
    description: "Web制作、運用改善、業務ツールの相談を、要件整理から実装後の改善まで一続きで扱う入口です。"
  }
};

export default function HomePage() {
  return (
    <>
      <section className="hero-surface panel-strong overflow-hidden rounded-[34px] px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="kurodev portal"
              title="kurodev Portal"
              body={[
                "小規模サイト制作、公開後の改善、問い合わせ整理の相談を、",
                "要件整理から実装後の調整まで一続きで扱う入口です。"
              ]}
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton href="/contact">相談する</PrimaryButton>
              <GhostButton href="/web">実績を見る</GhostButton>
            </div>
          </div>
          <BentoCard className="relative min-h-[260px] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.3),transparent_38%)] opacity-80" />
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border-strong)] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_54%)] shadow-[0_0_80px_rgba(124,58,237,0.22)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="section-kicker">current stance</p>
                <p className="mt-4 max-w-xs text-sm leading-7 text-[var(--text-soft)]">
                  目的、必要なページ、公開後の更新方法を先に整理し、無理なく運用できる形で組み立てます。
                </p>
              </div>
              <div className="max-w-[240px] border-t border-[var(--border)] pt-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-faint)]">focus</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Tag>Web制作</Tag>
                  <Tag>運用改善</Tag>
                  <Tag>業務整理</Tag>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      <section className="grid gap-6">
        <ProjectCard project={webProjects[0]} />
      </section>

      <section className="grid gap-10 border-t border-[var(--border)] pt-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:items-start">
        <div className="max-w-2xl">
          <p className="section-kicker">what this site handles</p>
          <div className="mt-5 space-y-5 text-sm leading-7 text-[var(--text-soft)]">
            {featuredHighlights.map((item) => (
              <div key={item.title}>
                <p className="text-base font-medium text-[var(--text)]">{item.title}</p>
                <p className="mt-2">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 border-t border-[var(--border)] pt-4 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
          <p className="section-kicker">next move</p>
          <div className="space-y-3 text-sm leading-7 text-[var(--text-soft)]">
            <p>制作や改善の相談は `Contact` から送れます。</p>
            <p>公開できる実績や制作基盤は `Web` にまとめています。</p>
            <p>準備中の業務ツールは `Tool` で順次整理します。</p>
          </div>
          <div className="pt-2">
            <GhostButton href="/contact">相談内容を整理する</GhostButton>
          </div>
        </div>
      </section>
    </>
  );
}
