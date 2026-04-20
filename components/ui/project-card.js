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
      className={`group relative overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-[var(--border-strong)] ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-28 opacity-90 ${
          project.featured
            ? "bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.28),transparent_45%),linear-gradient(180deg,rgba(99,102,241,0.16),transparent)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_50%),linear-gradient(180deg,rgba(59,130,246,0.08),transparent)]"
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
