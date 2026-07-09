"use client";

import dynamic from "next/dynamic";

// Re-export the actual CreativesApp from the client boundary.
// This wrapper satisfies the Next.js requirement that dynamic({ ssr: false })
// imports be initiated from a "use client" module.
const CreativesApp = dynamic(() => import("@/components/creatives/App"), {
  ssr: false,
});

export default function CreativesClient() {
  return <CreativesApp />;
}
