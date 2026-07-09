import type { Metadata } from "next";
import CreativesApp from "./CreativesClient";

// The Creatives lab is a fully client-side interactive WebGL experience.
// It is noindexed until substantial crawlable explanatory content is added.
export const metadata: Metadata = {
  title: "Creatives Lab | Huygen Studios",
  description:
    "An interactive WebGL playground from Huygen Studios — particle systems, audio-reactive visuals, and real-time 3D experiences built with Three.js and custom GLSL shaders.",
  alternates: { canonical: "https://www.huygenstudios.com/creatives" },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Creatives Lab | Huygen Studios",
    description:
      "Interactive WebGL playground — particle systems, audio-reactive visuals, and real-time 3D experiences.",
    url: "https://www.huygenstudios.com/creatives",
    siteName: "Huygen Studios",
    type: "website",
  },
};

export default function CreativesPage() {
  return (
    <>
      {/*
        Server-rendered fallback for crawlers and no-JS browsers.
        The noindex directive keeps this page out of search results until
        it has enough original crawlable text to qualify for AdSense.
      */}
      <noscript>
        <main
          style={{
            minHeight: "100dvh",
            background: "#050505",
            color: "#ededed",
            padding: "120px 40px 80px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1>Creatives Lab — Huygen Studios</h1>
          <p>
            This page contains an interactive WebGL experience built with
            Three.js and custom GLSL shaders. Please enable JavaScript to view
            the interactive canvas.
          </p>
          <p>
            Huygen Studios builds cinematic web experiences, AI-powered
            automation systems, and enterprise workflow tooling. Visit our{" "}
            <a href="/services" style={{ color: "#4a79ff" }}>
              services page
            </a>{" "}
            or{" "}
            <a href="/contact" style={{ color: "#4a79ff" }}>
              get in touch
            </a>
            .
          </p>
        </main>
      </noscript>
      {/* Client-side WebGL canvas — rendered only when JS is enabled */}
      <CreativesApp />
    </>
  );
}
