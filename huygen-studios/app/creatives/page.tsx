"use client";
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LiquidGlass from '@/components/creatives/LiquidGlass'
import ParticlePathHero from '@/components/creatives/ParticlePathHero'
import GallerySection from '@/components/creatives/GallerySection'
import CinematicEnterOverlay from '@/components/creatives/CinematicEnterOverlay'
import DigitalistsServices from '@/components/creatives/DigitalistsServices'
import useGsapSmoothScroll from '@/hooks/creatives/useGsapSmoothScroll'
import { audioManager } from '@/lib/creatives/audioManager'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import './creatives.css'

const AntigravityTestimonials = dynamic(
  () => import('@/components/creatives/AntigravityTestimonials'),
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
          className="navbar absolute top-[8vh] w-full z-50"
        >
          <div className="nav-links">
            <Link href="/creatives/work">Work</Link>
            <a href="#">Services</a>
            <Link href="/creatives/blogs">Blogs</Link>
            <a href="#">Contact</a>
            <a href="#" onClick={toggleAudio}>Sound [{isPlaying ? 'ON' : 'OFF'}]</a>
          </div>
        </motion.nav>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="layer-ui absolute bottom-[8vh] left-0 w-full z-50 pointer-events-none"
        >
          <div className="bottom-content flex justify-between items-end w-full pointer-events-none">
            <p className="subtitle text-white/50 text-[1.05rem] max-w-[340px] select-none pointer-events-auto font-medium">
              Mind-bending websites, smooth SaaS animations, and creative digital products.
            </p>
            
            <LiquidGlass className="rounded-[100px] pointer-events-auto" color="white" blur={16} button>
              <a href="#" className="px-12 py-5 text-[1.1rem] text-white font-medium block">
                Start a project
              </a>
            </LiquidGlass>
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

      {/* Section 4: Antigravity Testimonials */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <AntigravityTestimonials />
      </section>
    </main>
  )
}

