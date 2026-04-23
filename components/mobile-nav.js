"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigationItems } from "@/lib/navigation";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/theme-toggle";

export function MobileNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setVisible(true);
    lastScrollY.current = 0;
  }, [pathname]);

  useEffect(() => {
    const scrollRoot = document.querySelector("[data-scroll-root]");
    const targets = scrollRoot ? [window, scrollRoot] : [window];

    const getScrollY = () => {
      return Math.max(window.scrollY, scrollRoot?.scrollTop || 0);
    };

    const handleScroll = () => {
      const currentScrollY = getScrollY();
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY < 24) {
        setVisible(true);
      } else if (delta > 8) {
        setVisible(false);
      } else if (delta < -8) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = getScrollY();
    targets.forEach((target) => {
      target.addEventListener("scroll", handleScroll, { passive: true });
    });

    return () => {
      targets.forEach((target) => {
        target.removeEventListener("scroll", handleScroll);
      });
    };
  }, []);

  return (
    <>
      <header className="panel-strong sticky top-4 z-40 flex items-center justify-between rounded-[28px] px-4 py-3 lg:hidden">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/brand-icon.png" alt="" width={40} height={40} className="h-10 w-10 rounded-2xl object-cover" priority />
          <div>
            <p className="text-base font-semibold tracking-[-0.04em]">kurodev</p>
            <p className="text-xs text-[var(--text-faint)]">portal site</p>
          </div>
        </Link>
        <ThemeToggle />
      </header>

      <nav className={`mobile-bottom-nav panel-strong lg:hidden ${visible ? "mobile-bottom-nav--visible" : "mobile-bottom-nav--hidden"}`} aria-label="Mobile navigation">
        {navigationItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-bottom-nav__item ${active ? "mobile-bottom-nav__item--active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <Icon name={item.icon} className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
