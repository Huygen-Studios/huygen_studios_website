"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap-client";

interface AnimatedTextProps {
  as?: "h1" | "h2";
  children: string;
  className?: string;
}

export function AnimatedText({ as = "h1", children, className }: AnimatedTextProps) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const words = children.trim().split(/\s+/);

  useGSAP(() => {
    const targets = wordRefs.current.filter((element): element is HTMLSpanElement => Boolean(element));
    if (!targets.length) return;

    const media = gsap.matchMedia();
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      ({ conditions }) => {
        const { motion, reduced } = conditions ?? {};

        gsap.set(targets, { yPercent: 0, opacity: 1, rotate: 0 });
        if (reduced || !motion) return;

        gsap.fromTo(
          targets,
          { yPercent: 115, opacity: 0, rotate: 2 },
          {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.9,
            stagger: 0.035,
            ease: "power4.out",
            clearProps: "transform,opacity",
          },
        );
      },
    );

    return () => media.revert();
  }, { scope: rootRef });

  const Heading = as;

  return (
    <Heading ref={rootRef} aria-label={children} className={className}>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <span
              ref={(element) => {
                wordRefs.current[index] = element;
              }}
              className="inline-block"
            >
              {word}
            </span>
            {index < words.length - 1 ? "\u00a0" : null}
          </span>
        ))}
      </span>
    </Heading>
  );
}
