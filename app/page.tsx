import type { Metadata } from "next";
import { Web3Home } from "@/components/web3/Web3Home";

export const metadata: Metadata = {
  title: "AI Automation, Creative Production & Digital Delivery",
  description: "Huygen Studios combines AI automation, enterprise workflows, creative production, motion, UI/UX, and frontend delivery.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Huygen Studios | Creative and Technology Studio",
    description: "AI automation, enterprise workflows, creative production, motion, UI/UX, and frontend delivery in one studio practice.",
    url: "https://huygenstudios.com",
  },
};

export default function HomePage() {
  return <Web3Home />;
}
