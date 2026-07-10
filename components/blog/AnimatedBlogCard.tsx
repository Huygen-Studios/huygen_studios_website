"use client";

import Link from "next/link";
import { type ReactNode, useRef } from "react";
import { gsap, useGSAP } from "../animations/gsap-client";
import { encodeBlogSlug } from "@/lib/blog/normalize";
import type { BlogPost } from "@/lib/blog/types";

interface AnimatedBlogCardProps {
  children: ReactNode;
  className?: string;
  post: BlogPost;
}

export function AnimatedBlogCard({ children, className, post }: AnimatedBlogCardProps) {
  const rootRef = useRef<HTMLAnchorElement>(null);
  let hoverTimeline: gsap.core.Timeline | null = null;
  const { contextSafe } = useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    const visual = root.querySelector<HTMLElement>(".blog-card-visual");
    const image = root.querySelector<HTMLElement>(".blog-card-image");
    const overlay = root.querySelector<HTMLElement>(".blog-card-overlay");
    const title = root.querySelector<HTMLElement>(".blog-card-title");
    const arrow = root.querySelector<SVGElement>(".blog-card-arrow");
    const border = root.querySelector<HTMLElement>(".blog-card-border");
    const targets = [root, visual, image, overlay, title, arrow, border].filter(Boolean);

    gsap.set(targets, { clearProps: "transform,opacity,filter" });
    if (overlay) gsap.set(overlay, { opacity: 0 });
    if (border) gsap.set(border, { opacity: 0, scaleX: 0, transformOrigin: "left center" });

    const media = gsap.matchMedia();
    media.add(
      {
        motion: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      ({ conditions }) => {
        const { motion, reduced } = conditions ?? {};
        if (reduced || !motion) {
          gsap.set(targets, { clearProps: "transform,opacity,filter" });
          return;
        }

        hoverTimeline = gsap.timeline({
          paused: true,
          defaults: { duration: 0.52, ease: "power3.out", overwrite: "auto" },
        });

        if (visual) hoverTimeline.to(visual, { y: -6 }, 0);
        if (image) hoverTimeline.to(image, { scale: 1.07, yPercent: -1.5 }, 0);
        if (overlay) hoverTimeline.to(overlay, { opacity: 0.72 }, 0);
        if (title) hoverTimeline.to(title, { x: 8, color: "#4a79ff" }, 0);
        if (arrow) hoverTimeline.to(arrow, { x: 7, y: -3, rotate: -8 }, 0);
        if (border) hoverTimeline.to(border, { opacity: 1, scaleX: 1 }, 0);
      },
    );

    return () => {
      hoverTimeline?.kill();
      media.revert();
    };
  }, { scope: rootRef });

  const activate = contextSafe(() => hoverTimeline?.play());
  const deactivate = contextSafe(() => hoverTimeline?.reverse());

  return (
    <Link
      ref={rootRef}
      href={`/blog/${encodeBlogSlug(post.slug)}`}
      data-animated-blog-card="true"
      className={`blog-card relative ${className || ""}`.trim()}
      onPointerEnter={activate}
      onPointerLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
    >
      <span aria-hidden="true" className="blog-card-border pointer-events-none absolute inset-0 z-20 rounded-[inherit] border border-blue-400/70" />
      {children}
    </Link>
  );
}
