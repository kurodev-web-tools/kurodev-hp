import { BentoCard } from "@/components/ui/bento-card";
import { Tag } from "@/components/ui/tag";

const statusTone = {
  Active: "text-emerald-500",
  "In Build": "text-sky-500",
  "Coming Soon": "text-amber-500",
  Planning: "text-violet-500"
};

export function ProjectCard({ project }) {
  return (
    <BentoCard
      className={`group relative overflow-hidden ${
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
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-faint)]">{project.category}</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--text)]">{project.title}</h3>
          </div>
          <span className={`text-xs font-semibold ${statusTone[project.status] ?? "text-[var(--accent)]"}`}>
            {project.status}
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-soft)]">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
