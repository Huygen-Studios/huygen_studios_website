import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.06] pt-10 pb-28 px-6 z-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-[12px] font-bold">H</span>
            </div>
            <span className="text-xs text-white/40 tracking-tight">
              © {new Date().getFullYear()} Huygen Studios.<br className="hidden md:block"/> All rights reserved.
            </span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-xs text-white/50 font-medium border-l-0 md:border-l border-white/10 md:pl-6">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-end gap-3 text-[11px] text-white/40">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-white/70 transition-colors">Cookie Policy</Link>
          </div>
          <div className="flex gap-4">
            <a
              href="mailto:hello@huygenstudios.com"
              className="hover:text-white/70 transition-colors"
            >
              hello@huygenstudios.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
