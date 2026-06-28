'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'Branding & Design',
    description: 'Transform your identity into a premium experience. Command higher prices with cinematic, memory-sticking designs.',
    tag: 'Agencies & Brands',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Websites & E-Commerce',
    description: 'Launch lightning-fast, highly-converting web apps that look like art and perform like engines.',
    tag: 'Founders',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Online Marketing',
    description: 'Stop guessing. Drive scalable growth, qualified leads, and measurable ROI with data-backed campaigns.',
    tag: 'Growth',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Platforms & Development',
    description: 'Build robust, scalable software architectures. We engineer solutions that grow seamlessly with your user base.',
    tag: 'Enterprise',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'AI & Automation',
    description: 'Reduce ops time by 40% with custom voice agents, chatbots, and intelligent workflow integrations.',
    tag: 'Founders & Enterprise',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Strategy & Consulting',
    description: 'Navigate digital transformation with clear roadmaps. From initial planning to flawless execution.',
    tag: 'Founders',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Tracking & Analytics',
    description: 'Uncover hidden revenue potentials. Make confident, data-driven decisions based on crystal-clear metrics.',
    tag: 'Growth',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Print & Cross-Media',
    description: 'Bridge the gap between digital and physical. Create stunning print materials that reinforce your brand.',
    tag: 'Agencies & Brands',
    image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&q=80&w=2000'
  }
]

export default function DigitalistsServices() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      start: 'top top',
      end: '+=4000', // Reduced from 8000px to avoid overly long pinning
      snap: {
        snapTo: 1 / (services.length - 1),
        duration: { min: 0.2, max: 0.5 }, // Faster snap
        delay: 0.05,
        ease: 'power1.inOut'
      },
      onUpdate: (self) => {
        let newIndex = Math.round(self.progress * (services.length - 1))
        
        if (newIndex >= services.length) newIndex = services.length - 1
        if (newIndex < 0) newIndex = 0
        
        setActiveIndex(prev => prev !== newIndex ? newIndex : prev)
      }
    })

    return () => {
      trigger.kill()
    }
  }, [])

  const handleNavClick = (idx: number) => {
    if (containerRef.current) {
      const scrollDistance = 4000
      const targetScrollY = containerRef.current.offsetTop + (idx / (services.length - 1)) * scrollDistance
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
    }
  }

  return (
    // We use a dark background theme #050505 to strictly match the main site theme
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] text-white overflow-hidden flex flex-col lg:flex-row items-center px-6 lg:px-24 py-16 lg:py-0">
        
        {/* Left Sidebar: Navigation List (approx 30% width) */}
        <div className="relative z-20 w-full lg:w-[35%] flex flex-col justify-center h-full pt-12 lg:pt-0">
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-12 tracking-tight">Our Services</h2>
          <ul className="space-y-4 lg:space-y-5">
            {services.map((service, idx) => {
              const isActive = activeIndex === idx
              return (
                <li key={idx} className="relative flex items-center group cursor-pointer" onClick={() => handleNavClick(idx)}>
                  <div className={`w-8 h-8 flex items-center justify-center mr-2 transition-opacity duration-300 ${isActive ? 'opacity-100 text-white' : 'opacity-0'}`}>
                    <ArrowRight strokeWidth={3} className="w-5 h-5" />
                  </div>
                  <button 
                    className={`text-xl lg:text-2xl font-bold transition-all duration-300 text-left
                      ${isActive ? 'text-white translate-x-2' : 'text-white/30 group-hover:text-white/60'}`}
                  >
                    {service.title}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Right Content Area: Images and Text (approx 65% width) */}
        <div className="relative z-10 w-full lg:w-[65%] h-full flex flex-col justify-center items-end perspective-1000">
          
          {/* Main Slogan above the active cards */}
          <div className="absolute top-24 lg:top-32 right-0 lg:right-24 z-30 text-right">
            <h3 className="text-white text-3xl lg:text-5xl font-black uppercase tracking-tight leading-tight">
              What we do <br />
              <span className="font-light">is what we love</span>
            </h3>
          </div>

          {/* Image Container (Background element scaling) */}
          <div className="absolute inset-y-0 right-0 lg:right-12 w-full lg:w-[80%] h-full flex items-center justify-center opacity-40 pointer-events-none">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="absolute w-[80%] h-[60%] lg:w-[70%] lg:h-[70%] rounded-2xl overflow-hidden shadow-2xl"
                initial={false}
                animate={{ 
                  opacity: activeIndex === i ? 1 : 0,
                  scale: activeIndex === i ? 1 : 0.95,
                  y: activeIndex === i ? 0 : 40,
                }}
                transition={{ type: "spring", stiffness: 40, damping: 15 }}
                style={{ zIndex: activeIndex === i ? 5 : 0, willChange: 'transform, opacity' }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Stacked Text Cards (Foreground) */}
          <div className="relative z-20 w-full lg:w-[80%] max-w-2xl h-[400px] mt-32 lg:mt-48 right-0 lg:right-24">
            {services.map((service, idx) => {
              const isActive = activeIndex === idx
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 50,
                    scale: isActive ? 1 : 0.95,
                    zIndex: isActive ? 10 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  className="absolute bottom-0 right-0 w-full bg-white/5 backdrop-blur-md p-8 lg:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-xl border border-white/10"
                  style={{ pointerEvents: isActive ? 'auto' : 'none', willChange: 'transform, opacity' }}
                >
                  <div className="mb-4 inline-block px-3 py-1 bg-[#ab71f8]/20 text-[#ab71f8] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#ab71f8]/30">
                    {service.tag}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-white mb-6 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-lg lg:text-xl leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

        </div>
    </div>
  )
}
