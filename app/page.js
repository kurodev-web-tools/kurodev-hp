import { PrimaryButton, GhostButton } from "@/components/ui/buttons";
import { SectionHeader } from "@/components/ui/section-header";
import { BentoCard } from "@/components/ui/bento-card";
import { ProjectCard } from "@/components/ui/project-card";
import { SkillGroup } from "@/components/ui/skill-group";
import { StatCard } from "@/components/ui/stat-card";
import { Tag } from "@/components/ui/tag";
import { featuredHighlights, profileStats, skillGroups, webProjects } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="hero-surface panel-strong overflow-hidden rounded-[34px] px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="kurodev portal"
              title="アイデアを、最短距離で形にする。"
              body="ポートフォリオ、HP-portal、今後の業務ツールをひとつの窓口として整理するためのサイトです。静かな設計と継続しやすい実装で、公開後も更新しやすい面を作ります。"
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/web">View Projects</PrimaryButton>
              <GhostButton href="/contact">相談する</GhostButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <Tag>Next.js</Tag>
              <Tag>Portal Design</Tag>
              <Tag>HP-portal</Tag>
            </div>
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
              <div className="grid grid-cols-2 gap-3">
                {profileStats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-[var(--border)] bg-[var(--panel-muted)] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-faint)]">{stat.label}</p>
                    <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <div className="grid gap-6">
          <ProjectCard project={webProjects[0]} />
          <div className="grid gap-6 md:grid-cols-2">
            {featuredHighlights.map((item) => (
              <BentoCard key={item.title}>
                <p className="text-sm font-medium text-[var(--text)]">{item.title}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{item.body}</p>
              </BentoCard>
            ))}
          </div>
        </div>
        <div className="grid gap-6">
          {profileStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <SkillGroup key={group.title} {...group} />
        ))}
      </section>
    </>
  );
}
