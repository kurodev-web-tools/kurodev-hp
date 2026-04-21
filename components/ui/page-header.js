import { Icon } from "@/components/ui/icon";

export function PageHeader({ icon, title, description }) {
  return (
    <header className="border-b border-[var(--border)] pb-7">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <Icon name={icon} className="h-5 w-5" />
        </div>
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text)] md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-7 text-[var(--text-soft)] md:text-base">
            {description}
          </p>
        </div>
      </div>
    </header>
  );
}
