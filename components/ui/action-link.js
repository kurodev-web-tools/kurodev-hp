import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export function ActionLink({ href, children, variant = "primary", external = false, className = "" }) {
  const classes = `action-link action-link--${variant} ${className}`.trim();
  const content = <>{children}<Icon name="arrow" className="h-4 w-4" /></>;

  if (external) {
    return <a className={classes} href={href} target="_blank" rel="noreferrer">{content}<span className="sr-only"> (opens in a new tab)</span></a>;
  }

  return <Link className={classes} href={href} prefetch={false}>{content}</Link>;
}
