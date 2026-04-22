import { BentoCard } from "@/components/ui/bento-card";

export function SkillGroup({ title, items }) {
  return (
    <BentoCard className="h-full">
      <p className="text-sm font-medium text-[var(--text)]">{title}</p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[var(--border)] bg-[var(--panel-muted)] px-3 py-2 text-sm text-[var(--text-soft)]"
          >
            {item}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}
