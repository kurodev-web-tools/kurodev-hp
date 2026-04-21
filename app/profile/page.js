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
        description="要件整理、実装、公開後の改善を一続きで扱う制作実行者としてのプロフィールです。"
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
