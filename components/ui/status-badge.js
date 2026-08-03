import { statusLabels } from "@/lib/content/status.mjs";

export function StatusBadge({ locale, status }) {
  return <span className="status-badge">{statusLabels[locale][status]}</span>;
}
