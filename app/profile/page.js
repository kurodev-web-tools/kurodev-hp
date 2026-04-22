import { ProfileCodeCard } from "@/components/profile-code-card";
import { BentoCard } from "@/components/ui/bento-card";
import { PageHeader } from "@/components/ui/page-header";
import { SkillGroup } from "@/components/ui/skill-group";
import { StatCard } from "@/components/ui/stat-card";
import { profileStats, skillGroups } from "@/lib/site-data";

const title = "Profile | kurodev";
const description = "要件整理、実装、公開後の改善を一続きで扱う制作実行者としてのプロフィールです。";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/profile"
  },
  openGraph: {
    title,
    description,
    url: "/profile"
  },
  twitter: {
    title,
    description
  }
};

function ProfileStatsAccordion() {
  return (
    <section className="space-y-3 md:hidden">
      {profileStats.map((stat, index) => (
        <details key={stat.label} className="bento-card p-0" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
            <span>
              <span className="block text-xs uppercase tracking-[0.24em] text-[var(--text-faint)]">{stat.label}</span>
              <span className="mt-1 block text-2xl font-semibold tracking-[-0.04em] text-[var(--text)]">{stat.value}</span>
            </span>
            <span className="text-lg text-[var(--accent)]">+</span>
          </summary>
          <p className="border-t border-[var(--border)] px-5 py-4 text-sm leading-7 text-[var(--text-soft)]">{stat.note}</p>
        </details>
      ))}
    </section>
  );
}

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        icon="user"
        title="Profile"
        description="要件整理、実装、公開後の改善を一続きで扱う制作実行者としてのプロフィールです。"
      />

      <ProfileStatsAccordion />

      <section className="hidden gap-6 md:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(340px,0.9fr)]">
        {profileStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <BentoCard>
          <p className="section-kicker">how I work</p>
          <div className="mt-5 space-y-5 text-sm leading-7 text-[var(--text-soft)]">
            <p>相談の入口では、目的、必要なページ、公開後の更新方法を先に整理します。</p>
            <p>方向性が固まったら、細かく止めすぎず、見える単位で実装と調整を進めます。</p>
            <p>未確定な導線や表現は、比較しやすい選択肢を用意してから現実の運用に寄せます。</p>
          </div>
        </BentoCard>
        <ProfileCodeCard />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <SkillGroup key={group.title} {...group} />
        ))}
      </section>
    </>
  );
}
