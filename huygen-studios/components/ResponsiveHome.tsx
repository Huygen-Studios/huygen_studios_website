"use client";

import dynamic from "next/dynamic";
import { MobileHuygenHome } from "@/components/MobileHuygenHome";
import { useIsMobile } from "@/hooks/useMediaQuery";

const DesktopHuygenScroll = dynamic(
  () => import("@/components/HuygenScroll").then((mod) => mod.HuygenScroll),
  { ssr: false }
);

export function ResponsiveHome() {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return <div className="min-h-screen bg-[#050505]" aria-hidden="true" />;
  }

  if (isMobile === true) {
    return <MobileHuygenHome />;
  }

  return <DesktopHuygenScroll />;
}
