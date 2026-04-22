import { BentoCard } from "@/components/ui/bento-card";

const lines = [
  [
    { text: "export const", tone: "keyword" },
    { text: " kurodev", tone: "identifier" },
    { text: " = {" }
  ],
  [
    { text: "  role", tone: "property" },
    { text: ": " },
    { text: "\"web builder / implementation partner\"", tone: "string" },
    { text: "," }
  ],
  [
    { text: "  focus", tone: "property" },
    { text: ": [" },
    { text: "\"Web制作\"", tone: "string" },
    { text: ", " },
    { text: "\"運用改善\"", tone: "string" },
    { text: ", " },
    { text: "\"業務ツール\"", tone: "string" },
    { text: "]," }
  ],
  [
    { text: "  style", tone: "property" },
    { text: ": " },
    { text: "\"整理して、作って、改善する\"", tone: "string" },
    { text: "," }
  ],
  [
    { text: "  principle", tone: "property" },
    { text: ": " },
    { text: "\"AIは道具、判断は設計で締める\"", tone: "string" },
    { text: "," }
  ],
  [{ text: "};" }]
];

const toneClass = {
  keyword: "text-[var(--accent)]",
  identifier: "text-[var(--text)]",
  property: "text-sky-600 dark:text-sky-300",
  string: "text-emerald-700 dark:text-emerald-300"
};

export function ProfileCodeCard() {
  return (
    <BentoCard className="h-full overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#fb7185]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
        </div>
        <p className="font-mono text-xs text-[var(--text-faint)]">profile.ts</p>
      </div>
      <div className="px-5 py-5 font-mono text-[13px] leading-7 text-[var(--text-soft)]">
        {lines.map((line, index) => (
          <div key={index} className="grid grid-cols-[2ch_minmax(0,1fr)] gap-4">
            <span className="select-none text-right text-[var(--text-faint)] opacity-60">{index + 1}</span>
            <p className="whitespace-pre-wrap">
              {line.map((part, partIndex) => (
                <span key={`${index}-${partIndex}`} className={toneClass[part.tone] ?? undefined}>
                  {part.text}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
