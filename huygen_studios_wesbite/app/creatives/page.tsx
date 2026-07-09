"use client";

import dynamic from "next/dynamic";

const CreativesApp = dynamic(() => import("@/components/creatives/App"), {
  ssr: false,
});

export default function CreativesPage() {
  return <CreativesApp />;
}
