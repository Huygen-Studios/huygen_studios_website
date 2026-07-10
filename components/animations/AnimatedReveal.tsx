"use client";

import { type ReactNode, type RefObject, useRef } from "react";
import { gsap, useGSAP } from "./gsap-client";

interface AnimatedRevealProps {
  as?: "div" | "p" | "span";
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedReveal({ as = "div", children, className, delay = 0 }: AnimatedRevealProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const target = rootRef.current;
    if (!target) return;

    const media = gsap.matchMedia();
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      ({ conditions }) => {
        const { motion, reduced } = conditions ?? {};

        gsap.set(target, { y: 0, opacity: 1 });
        if (reduced || !motion) return;

        gsap.fromTo(
          target,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
        );
      },
    );

    return () => media.revert();
  }, { scope: rootRef });

  if (as === "p") return <p ref={rootRef as RefObject<HTMLParagraphElement>} className={className}>{children}</p>;
  if (as === "span") return <span ref={rootRef as RefObject<HTMLSpanElement>} className={className}>{children}</span>;
  return <div ref={rootRef as RefObject<HTMLDivElement>} className={className}>{children}</div>;
}
