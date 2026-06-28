import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-black text-white pt-32 pb-12 overflow-hidden z-20 rounded-t-[3rem] mt-[-3rem] border-t border-white/5">
      {/* Immersive glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-[#ab71f8]/20 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        
        {/* Massive Call to Action */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-[4rem] lg:text-[7rem] leading-[0.9] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/30">
              Let's <br /> Create <br /> Magic.
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-8">
            <p className="text-xl lg:text-2xl text-white/50 max-w-md lg:text-right font-light">
              Stop blending in. We engineer cinematic digital experiences that dominate your industry.
            </p>
            <Link 
              href="/contact" 
              className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-gradient-to-r from-[#ab71f8] to-violet-700 text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(171,113,248,0.6)] active:scale-95 shadow-[0_0_20px_rgba(171,113,248,0.3)] border border-white/10"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10">Initiate Project</span>
              <div className="relative z-10 w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-[#ab71f8] transition-colors duration-500">
                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
            </Link>
          </div>
        </div>

        {/* Thick divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-24" />

        {/* Multi-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Brand & Intro (Spans 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ab71f8] to-black border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(171,113,248,0.3)]">
                <span className="text-white text-xl font-black">H</span>
              </div>
              <span className="text-2xl font-black tracking-[0.2em] uppercase">Huygen</span>
            </div>
            <p className="text-white/40 text-base leading-relaxed max-w-sm">
              We are an elite collective of digital artists, AI engineers, and growth architects building the future of the web.
            </p>
            <a href="mailto:hello@huygenstudios.com" className="flex items-center gap-3 text-white/60 hover:text-[#ab71f8] transition-colors group w-fit">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#ab71f8]/50 group-hover:bg-[#ab71f8]/10 transition-all">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-medium tracking-wide">hello@huygenstudios.com</span>
            </a>
          </div>

          {/* Spacer (1 col) */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links: Platform (Spans 2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-white font-bold uppercase tracking-[0.15em] text-sm mb-2 opacity-50">Platform</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Creatives', href: '/creatives' },
                { label: 'Pricing', href: '/pricing' }
              ].map((item) => (
                <Link key={item.label} href={item.href} className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 w-fit font-medium">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Links: Resources (Spans 2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-white font-bold uppercase tracking-[0.15em] text-sm mb-2 opacity-50">Resources</h4>
            <div className="flex flex-col gap-4">
              {['Insights & Blog', 'FAQ', 'Contact Support'].map((item) => (
                <Link key={item} href="/blog" className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 w-fit font-medium">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Links: Socials (Spans 3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-white font-bold uppercase tracking-[0.15em] text-sm mb-2 opacity-50">Follow Us</h4>
            <div className="flex gap-4">
              {[
                { icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>, href: "https://discord.gg/huygenstudios" },
                { icon: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, href: "https://instagram.com/huygenstudios" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#ab71f8] hover:border-[#ab71f8] hover:text-white transition-all duration-300 text-white/50 hover:-translate-y-1"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Mega Typography Background Text */}
        <div className="w-full flex justify-center mb-8 overflow-hidden pointer-events-none select-none opacity-[0.03]">
          <h1 className="text-[15vw] leading-none font-black tracking-tighter">
            HUYGEN
          </h1>
        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 text-sm text-white/40 font-medium">
          <p>© {new Date().getFullYear()} Huygen Studios. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
