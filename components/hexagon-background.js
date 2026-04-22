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

    if (!element || reduceMotion.matches) {
      return undefined;
    }

    let frame = 0;
    let timer = 0;

    const setGlowPosition = (x, y) => {
      element.style.setProperty("--hex-x", x);
      element.style.setProperty("--hex-y", y);
      element.dataset.active = "true";
    };

    const handlePointerMove = (event) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();

        setGlowPosition(`${event.clientX - rect.left}px`, `${event.clientY - rect.top}px`);
        frame = 0;
      });
    };

    const handlePointerLeave = () => {
      element.dataset.active = "false";
    };

    if (desktop.matches) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    } else {
      const positions = [
        ["24%", "18%"],
        ["72%", "28%"],
        ["44%", "48%"],
        ["78%", "68%"],
        ["30%", "78%"]
      ];
      let index = 0;

      setGlowPosition(positions[0][0], positions[0][1]);
      timer = window.setInterval(() => {
        index = (index + 1) % positions.length;
        setGlowPosition(positions[index][0], positions[index][1]);
      }, 4200);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      if (timer) window.clearInterval(timer);
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
