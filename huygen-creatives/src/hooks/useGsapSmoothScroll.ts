import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type UseGsapSmoothScrollProps = {
  enabled: boolean;
};

export default function useGsapSmoothScroll({ enabled }: UseGsapSmoothScrollProps) {
  useEffect(() => {
    if (!enabled) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Expose to window for debugging and integrations
    (window as any).gsap = gsap;
    (window as any).ScrollTrigger = ScrollTrigger;

    // Force reset scroll positions to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Instantiate Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Force Lenis to start at top
    lenis.scrollTo(0, { immediate: true });

    // Notify ScrollTrigger of scroll changes
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Sync Lenis RAF ticker with GSAP ticker loop
    const tickerUpdate = (time: number) => {
      // gsap.ticker time is in seconds, Lenis expects milliseconds
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Recalculate ScrollTrigger positions after exit transition completes
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1500);

    // Handle resizing
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
      
      // Clean up ScrollTrigger instances to avoid memory leaks
      const allTriggers = ScrollTrigger.getAll();
      allTriggers.forEach((trigger) => trigger.kill());
    };
  }, [enabled]);
}
