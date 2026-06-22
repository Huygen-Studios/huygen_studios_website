import { ResponsiveHome } from "@/components/ResponsiveHome";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-[#050505] min-h-screen">
      {/* ─── SCROLLYTELLING (IS THE HERO & CONTENT) ─── */}
      <ResponsiveHome />
    </main>
  );
}
