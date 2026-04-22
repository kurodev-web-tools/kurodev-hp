"use client";

import { useEffect, useRef } from "react";

function HexGridSvg({ className }) {
  return (
    <svg className={className} aria-hidden="true">
      <defs>
        <pattern id="hexagon-grid" width="96" height="84" patternUnits="userSpaceOnUse">
          <path d="M24 2H72L96 42L72 82H24L0 42Z" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M72 2L96 -40M72 82L96 124M24 2L0 -40M24 82L0 124" fill="none" vectorEffect="non-scaling-stroke" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagon-grid)" />
    </svg>
  );
}

export function HexagonBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");

    if (!element || reduceMotion.matches || !desktop.matches) {
      return undefined;
    }

    let frame = 0;

    const handlePointerMove = (event) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();

        element.style.setProperty("--hex-x", `${event.clientX - rect.left}px`);
        element.style.setProperty("--hex-y", `${event.clientY - rect.top}px`);
        element.dataset.active = "true";
        frame = 0;
      });
    };

    const handlePointerLeave = () => {
      element.dataset.active = "false";
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="hexagon-background" data-active="false" aria-hidden="true">
      <HexGridSvg className="hexagon-background__grid" />
      <HexGridSvg className="hexagon-background__glow" />
    </div>
  );
}
