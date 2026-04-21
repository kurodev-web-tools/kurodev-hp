import { ProfileCodeCard } from "@/components/profile-code-card";
import { BentoCard } from "@/components/ui/bento-card";
import { PageHeader } from "@/components/ui/page-header";
import { SkillGroup } from "@/components/ui/skill-group";
import { StatCard } from "@/components/ui/stat-card";
import { profileStats, skillGroups } from "@/lib/site-data";

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        icon="user"
        title="Profile"
        description="制作、改善、運用整理を切り離さずに扱うためのプロフィールと作業スタンスです。"
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(340px,0.9fr)]">
        {profileStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <BentoCard>
          <p className="section-kicker">how I work</p>
          <div className="mt-5 space-y-5 text-sm leading-7 text-[var(--text-soft)]">
            <p>方向性が固まったあとは、細かく止めずにまとまった単位で実装を進めます。</p>
            <p>一方で、デザインや導線が未確定な段階では、比較しやすい選択肢を先に用意してから絞り込みます。</p>
            <p>公開向けのページでは、テンプレートっぽさやデモ感を避け、現実の運用に馴染む言葉に寄せます。</p>
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
