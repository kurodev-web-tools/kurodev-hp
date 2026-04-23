import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { HexagonBackground } from "@/components/hexagon-background";

export function SiteShell({ children }) {
  return (
    <div className="min-h-screen lg:flex lg:h-screen lg:overflow-hidden">
      <div className="px-4 py-4 md:px-6 lg:hidden">
        <MobileNav />
      </div>
      <div className="hidden lg:block lg:w-[296px] lg:shrink-0">
        <Sidebar />
      </div>
      <main className="relative isolate min-w-0 flex-1 overflow-hidden lg:min-h-0">
        <HexagonBackground />
        <div data-scroll-root className="relative z-10 h-full overflow-y-auto px-4 pb-28 md:px-6 lg:px-8 lg:pb-8 lg:pt-8">
          <div className="mx-auto max-w-[1120px] space-y-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
