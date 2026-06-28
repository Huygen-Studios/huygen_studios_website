"use client";
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ParticlePathHero from '@/components/creatives/ParticlePathHero'
import GallerySection from '@/components/creatives/GallerySection'
import CinematicEnterOverlay from '@/components/creatives/CinematicEnterOverlay'
import DigitalistsServices from '@/components/creatives/DigitalistsServices'
import useGsapSmoothScroll from '@/hooks/creatives/useGsapSmoothScroll'
import { audioManager } from '@/lib/creatives/audioManager'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import './creatives.css'

const VengenceTestimonials = dynamic(
  () => import('@/components/creatives/VengenceTestimonials'),
  { ssr: false }
)

const HuygenProducts = dynamic(
  () => import('@/components/creatives/HuygenProducts'),
  { ssr: false }
)

export default function CreativesPage() {
  const [entered, setEntered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Disable scroll restoration and check route
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    
    // Force top scroll position on fresh load
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }, [])

  // Global click pop and hover tick SFX bindings
  useEffect(() => {
    const handleGlobalClick = (e: any) => {
      const target = e.target
      if (!target) return
      const interactive = target.closest('button, a, [role="button"], .gallery-pill, .sv')
      if (interactive) {
        audioManager.playPop()
      }
    }

    let lastHoveredElement: any = null
    const handleGlobalMouseOver = (e: any) => {
      const target = e.target
      if (!target) return
      const interactive = target.closest('button, a, [role="button"], .gallery-pill, .sv')
      if (interactive && interactive !== lastHoveredElement) {
        audioManager.playHover()
        lastHoveredElement = interactive
      } else if (!interactive) {
        lastHoveredElement = null
      }
    }

    window.addEventListener('click', handleGlobalClick)
    window.addEventListener('mouseover', handleGlobalMouseOver)

    return () => {
      window.removeEventListener('click', handleGlobalClick)
      window.removeEventListener('mouseover', handleGlobalMouseOver)
    }
  }, [])

  // Initialize smooth scroll when preloader ends
  useGsapSmoothScroll({ enabled: entered })

  // Lock scroll during preloader
  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [entered])

  // Force scroll to top on entered transition
  useEffect(() => {
    if (entered) {
      window.scrollTo(0, 0)
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }, [entered])

  const toggleAudio = (e: any) => {
    if (e && e.preventDefault) e.preventDefault()
    if (isPlaying) {
      audioManager.stopMusicFadeOut()
      setIsPlaying(false)
    } else {
      audioManager.startMusicFadeIn()
      setIsPlaying(true)
    }
  }

  return (
    <main className="w-full bg-black">
      {/* Preloader overlay */}
      <CinematicEnterOverlay
        onEnter={() => {
          setEntered(true)
          setIsPlaying(true)
        }}
      />

      {/* Unified Cinematic Mask Reveal Bars (fixed viewport overlay) */}
      <motion.div 
        initial={{ y: 0 }}
        animate={entered ? { y: '-42.5vh' } : { y: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 w-full h-[50.5vh] bg-black z-[45] pointer-events-none"
        style={{ willChange: 'transform' }}
      />
      <motion.div 
        initial={{ y: 0 }}
        animate={entered ? { y: '42.5vh' } : { y: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="fixed bottom-0 left-0 w-full h-[50.5vh] bg-black z-[45] pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* Section 1: Hero */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <ParticlePathHero debugPath={false} isEntered={entered} />
        
        <motion.nav 
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="navbar absolute top-[8vh] w-full z-50 flex justify-between items-center px-12 lg:px-24"
        >
          <div className="nav-links flex gap-8">
            <Link href="/creatives/work">Work</Link>
            <a href="#services">Services</a>
            <Link href="/creatives/blogs">Blogs</Link>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-sound pointer-events-auto">
            <button onClick={toggleAudio} className="text-white/70 hover:text-white transition-colors text-xs font-medium uppercase tracking-widest border border-white/20 rounded-full px-4 py-2 bg-white/5 backdrop-blur-md">
              Sound [{isPlaying ? 'ON' : 'OFF'}]
            </button>
          </div>
        </motion.nav>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="layer-ui absolute bottom-[8vh] left-0 w-full z-50 pointer-events-none px-12 lg:px-24"
        >
          <div className="bottom-content flex justify-between items-end w-full pointer-events-none">
            {/* Kept empty on left to balance the design since subtitle moved to center */}
            <div className="hidden lg:block w-[340px]"></div>
            
            <div className="flex items-center gap-8 pointer-events-auto">
              <a href="#contact" className="text-white/70 hover:text-white transition-colors text-lg font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white hidden sm:block">
                Let's talk →
              </a>
              <a 
                href="#project" 
                className="group relative inline-flex items-center justify-center gap-4 px-10 py-4 bg-gradient-to-r from-[#ab71f8] to-violet-700 text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(171,113,248,0.6)] active:scale-95 shadow-[0_0_20px_rgba(171,113,248,0.3)] border border-white/10"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                <span className="relative z-10">Initiate Project</span>
                <div className="relative z-10 w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-[#ab71f8] transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45 group-hover:rotate-0 transition-transform duration-500"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Sphere/Grid Gallery */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <GallerySection isPlaying={isPlaying} toggleAudio={toggleAudio} />
      </section>

      {/* Section 3: Services */}
      <section className="relative w-full overflow-hidden bg-black">
        <DigitalistsServices />
      </section>

      {/* Section 4: Vengence Testimonials */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <VengenceTestimonials />
      </section>

      {/* Section 5: Products (Staggered Grid) */}
      <section className="relative w-full overflow-hidden bg-black">
        <HuygenProducts />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

