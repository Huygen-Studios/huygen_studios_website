"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { gsap, useGSAP } from "./gsap-client";
import { TextRoll } from "../Button";

interface AnimatedCtaProps {
  href: string;
  label: string;
  className?: string;
}

export function AnimatedCta({ href, label, className }: AnimatedCtaProps) {
  const rootRef = useRef<HTMLAnchorElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  let timeline: gsap.core.Timeline | null = null;
  const { contextSafe } = useGSAP(() => {
    if (!rootRef.current || !fillRef.current || !labelRef.current || !arrowRef.current) return;

    const media = gsap.matchMedia();
    media.add(
      {
        motion: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      ({ conditions }) => {
        const { motion, reduced } = conditions ?? {};

        gsap.set(fillRef.current, { scaleX: 0, transformOrigin: "left center" });
        gsap.set([rootRef.current, labelRef.current, arrowRef.current], { x: 0, y: 0, rotate: 0 });

        if (reduced || !motion) return;

        timeline = gsap.timeline({
          paused: true,
          defaults: { duration: 0.42, ease: "power3.out", overwrite: "auto" },
        })
          .to(rootRef.current, { y: -3 }, 0)
          .to(fillRef.current, { scaleX: 1 }, 0)
          .to(labelRef.current, { x: 4 }, 0)
          .to(arrowRef.current, { x: 7, rotate: -10 }, 0);
      },
    );

    return () => {
      timeline?.kill();
      media.revert();
    };
  }, { scope: rootRef });

  const activate = contextSafe(() => timeline?.play());
  const deactivate = contextSafe(() => timeline?.reverse());

  return (
    <Link
      ref={rootRef}
      href={href}
      className={`animated-cta relative isolate inline-flex items-center gap-2 overflow-hidden ${className || ""}`.trim()}
      onPointerEnter={activate}
      onPointerLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
    >
      <span ref={fillRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 origin-left bg-blue-500/15" />
      <span ref={labelRef} className="animated-cta-label relative z-10"><TextRoll>{label}</TextRoll></span>
      <ArrowUpRight ref={arrowRef} aria-hidden="true" size={15} className="relative z-10" />
    </Link>
  );
}
