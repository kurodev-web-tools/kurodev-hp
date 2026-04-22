import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export function PrimaryButton({ href, children }) {
  return (
    <Link href={href} className="button-primary">
      <span>{children}</span>
      <Icon name="arrow" className="h-4 w-4" />
    </Link>
  );
}

export function GhostButton({ href, children }) {
  return (
    <Link href={href} className="button-ghost">
      {children}
    </Link>
  );
}
