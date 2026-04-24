import { BentoCard } from "@/components/ui/bento-card";
import { Tag } from "@/components/ui/tag";

const statusTone = {
  Active: "text-emerald-500",
  Live: "text-emerald-500",
  "In Build": "text-sky-500",
  "Coming Soon": "text-amber-500",
  Planning: "text-violet-500"
};

export function ProjectCard({ project, headingLevel = "h2" }) {
  const summaryLines = Array.isArray(project.summary) ? project.summary : [project.summary];
  const hasProjectLink = project.href && project.href !== "#";
  const detailItems = project.details || [];
  const Heading = headingLevel;

  return (
    <BentoCard
      className={`group relative flex h-full flex-col overflow-hidden ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-px rounded-[23px] ${
          project.featured
            ? "bg-[radial-gradient(circle_at_18%_16%,var(--card-tint-strong),transparent_42%),linear-gradient(145deg,var(--card-tint),transparent_62%)]"
            : "bg-[linear-gradient(145deg,var(--card-tint),transparent_68%)]"
        }`}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-faint)]">{project.category}</p>
            <Heading className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--text)]">{project.title}</Heading>
          </div>
          <span className={`text-xs font-semibold ${statusTone[project.status] ?? "text-[var(--accent)]"}`}>
            {project.status}
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-soft)]">
          {summaryLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        {detailItems.length > 0 ? (
          <dl className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[var(--text-soft)]">
            {detailItems.map((item) => (
              <div key={item} className="inline-flex max-w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--panel-muted)] px-3 py-2">
                <dt className="sr-only">実績の特徴</dt>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                <dd>{item}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          {hasProjectLink ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-md border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--accent)] transition hover:border-[var(--border-strong)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              {project.linkLabel || "詳しく見る"}
            </a>
          ) : null}
        </div>
      </div>
    </BentoCard>
  );
}
