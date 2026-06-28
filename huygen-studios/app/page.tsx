import { ResponsiveHome } from "@/components/ResponsiveHome";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-[#050505] min-h-screen">
      {/* ─── SCROLLYTELLING (IS THE HERO & CONTENT) ─── */}
      <ResponsiveHome />
      <Footer />
    </main>
  );
}
