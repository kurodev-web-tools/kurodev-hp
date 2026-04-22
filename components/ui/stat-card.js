import { BentoCard } from "@/components/ui/bento-card";

export function StatCard({ label, value, note }) {
  return (
    <BentoCard className="min-h-[180px]">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-faint)]">{label}</p>
      <p className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[var(--text)]">{value}</p>
      <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{note}</p>
    </BentoCard>
  );
}
