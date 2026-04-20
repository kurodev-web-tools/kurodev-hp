import { BentoCard } from "@/components/ui/bento-card";

const lines = [
  "const kurodev = {",
  "  role: 'portfolio + portal owner',",
  "  focus: ['Web制作', '運用改善', '業務ツール'],",
  "  style: '静かな設計と継続しやすい実装',",
  "  stance: 'AIを道具として扱い、最後は人間の設計で締める'",
  "};"
];

export function ProfileCodeCard() {
  return (
    <BentoCard className="h-full overflow-hidden">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#fb7185]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
      </div>
      <div className="mt-5 space-y-3 font-mono text-sm leading-7 text-[var(--text-soft)]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </BentoCard>
  );
}
