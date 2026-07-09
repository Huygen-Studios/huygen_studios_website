"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";

const portfolioItems = [
  { title: "AI workflow systems", type: "Automation", image: "/portfolio/automation.svg" },
  { title: "Product interfaces", type: "UI/UX", image: "/portfolio/interface.svg" },
  { title: "Campaign direction", type: "Creative", image: "/portfolio/campaign.svg" },
  { title: "Motion systems", type: "Motion", image: "/portfolio/motion.svg" },
  { title: "Enterprise operations", type: "Systems", image: "/portfolio/enterprise.svg" },
  { title: "Growth infrastructure", type: "Growth", image: "/portfolio/growth.svg" },
];

// Dynamically import the WebGL 3D marquee with SSR disabled
const PortfolioMarquee3D = dynamic(
  () => import("./PortfolioMarquee3D"),
  {
    ssr: false,
    loading: () => <FallbackMarquee />
  }
);

// Fallback placeholder during server-side rendering or loading
function FallbackMarquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!track.current) return;
    const tween = gsap.to(track.current, {
      xPercent: -50,
      duration: 34,
      repeat: -1,
      ease: "none",
    });
    return () => {
      tween.kill();
    };
  }, []);

  const repeatedItems = [...portfolioItems, ...portfolioItems];

  return (
    <div className="portfolio-viewport">
      <div ref={track} className="portfolio-track">
        {repeatedItems.map((item, index) => (
          <article className="portfolio-item" key={`${item.title}-${index}`} aria-hidden={index >= portfolioItems.length}>
            <div className="portfolio-circle">
              <Image 
                src={item.image} 
                alt={index < portfolioItems.length ? `${item.title} visual study` : ""} 
                fill 
                sizes="(max-width: 767px) 58vw, (max-width: 1024px) 31vw, 21vw" 
                priority={index < 3}
              />
            </div>
            <div className="portfolio-caption">
              <span>{item.title}</span>
              <small>{item.type}</small>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function PortfolioMarquee() {
  return (
    <section className="portfolio-marquee" aria-labelledby="portfolio-marquee-title">
      <header className="shell portfolio-marquee-head">
        <h2 id="portfolio-marquee-title">Work across the studio</h2>
        <p>A continuous view of the disciplines Huygen Studios brings together across automation, enterprise systems, interfaces, creative production, motion, and growth.</p>
      </header>
      
      <PortfolioMarquee3D portfolioItems={portfolioItems} />
      
      <div className="shell portfolio-rule">
        <span>Hover to pause</span>
        <span>Selected studio disciplines</span>
      </div>
    </section>
  );
}

