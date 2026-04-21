import { PrimaryButton, GhostButton } from "@/components/ui/buttons";
import { SectionHeader } from "@/components/ui/section-header";
import { BentoCard } from "@/components/ui/bento-card";
import { ProjectCard } from "@/components/ui/project-card";
import { Tag } from "@/components/ui/tag";
import { featuredHighlights, webProjects } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="hero-surface panel-strong overflow-hidden rounded-[34px] px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="kurodev portal"
              title="kurodev Portal"
              body="アイデアを、最短距離で形にする。ポートフォリオ、HP-portal、今後の業務ツールをひとつの窓口として整理するためのサイトです。"
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/web">View Projects</PrimaryButton>
              <GhostButton href="/contact">相談する</GhostButton>
            </div>
            <p className="mt-8 max-w-xl text-sm leading-7 text-[var(--text-soft)]">
              制作の入口はこのページ、詳細なプロフィールや扱う技術は <span className="font-medium text-[var(--text)]">Profile</span>
              、進行中の実績は <span className="font-medium text-[var(--text)]">Web</span> と
              <span className="font-medium text-[var(--text)]"> Tool</span> に分けて整理しています。
            </p>
          </div>
          <BentoCard className="relative min-h-[260px] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.3),transparent_38%)] opacity-80" />
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border-strong)] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_54%)] shadow-[0_0_80px_rgba(124,58,237,0.22)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="section-kicker">current stance</p>
                <p className="mt-4 max-w-xs text-sm leading-7 text-[var(--text-soft)]">
                  AI を魔法として見せるより、制作と改善を回すための熟練した道具として扱います。
                </p>
              </div>
              <div className="max-w-[240px] border-t border-[var(--border)] pt-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-faint)]">focus</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Tag>Portal Design</Tag>
                  <Tag>HP-portal</Tag>
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
            <p>制作スタンスや扱う技術を見たい場合は `Profile` へ。</p>
            <p>進行中の実績や公開中の導線は `Web` を起点に確認できます。</p>
            <p>今後公開する内部ツールや運用補助ツールは `Tool` にまとめていきます。</p>
          </div>
          <div className="pt-2">
            <GhostButton href="/profile">Profile を見る</GhostButton>
          </div>
        </div>
      </section>
    </>
  );
}
