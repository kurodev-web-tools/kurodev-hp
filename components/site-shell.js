import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";

export function SiteShell({ children }) {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-4 md:px-6 lg:px-6">
      <MobileNav />
      <div className="mt-4 flex gap-6 lg:mt-0">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <div className="space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
