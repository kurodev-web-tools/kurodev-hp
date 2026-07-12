import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function SiteShell({ children }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="site-main">{children}</main>
      <SiteFooter />
    </>
  );
}
