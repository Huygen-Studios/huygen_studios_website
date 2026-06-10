import { ResponsiveHome } from "@/components/ResponsiveHome";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-[#050505] min-h-screen">
      {/* ─── SCROLLYTELLING (IS THE HERO & CONTENT) ─── */}
      <ResponsiveHome />

      {/* ─── FOOTER ─── */}
      <footer className="relative bg-[#050505] border-t border-white/[0.06] py-10 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#f63a39] to-[#7c4e9b] flex items-center justify-center">
                  <span className="text-white text-[9px] font-bold">H</span>
                </div>
                <span className="text-xs text-white/40 tracking-tight">
                  © 2026 Huygen Studios.
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/50 font-medium">
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-white/30">
              <a
                href="mailto:hello@huygenstudios.com"
                className="hover:text-white/60 transition-colors"
              >
                hello@huygenstudios.com
              </a>
              <a
                href="https://huygenstudios.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors"
              >
                huygenstudios.com
              </a>
            </div>
          </div>
        </footer>
    </main>
  );
}
