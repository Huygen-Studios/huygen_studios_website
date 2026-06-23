'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'Branding & Design',
    description: 'We develop strong brand identities for businesses – from logo and corporate design to clear brand messaging. As an agency, we create brandings and designs that have a measurable impact and stay in memory.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Websites & E-Commerce',
    description: 'We develop custom websites and webshops for businesses – from modern web design to high-performance e-commerce solutions. As a digital agency, we build fast, user-friendly, and SEO-optimized websites.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Online Marketing',
    description: 'We support businesses with SEO, Google Ads, and Social Media Marketing. We continuously optimize campaigns and ensure more visibility, qualified leads, and measurable growth.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Platforms & Development',
    description: 'We develop custom web applications for businesses – from concept to implementation. As a digital agency, we build scalable, high-performance solutions with modern design.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'AI & Automation',
    description: 'We optimize business processes with AI and automation for businesses. For more efficiency, less effort, and sustainable growth.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Strategy & Consulting',
    description: 'As an agency, we develop strategies and guide businesses from planning to implementation. For sustainable digital success.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Tracking & Analytics',
    description: 'We use tracking and web analytics to make digital performance measurable and identify potentials. For data-driven decisions and better results.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Print & Cross-Media',
    description: 'Analog and digital are not opposites for us, but perfectly complement each other. We take care of print products that perfectly match your corporate identity.',
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
      end: '+=4000', // Pins for 4000px of scroll
      snap: {
        snapTo: 1 / (services.length - 1),
        duration: 0.3,
        delay: 0.05,
        ease: 'power2.inOut'
      },
      onUpdate: (self) => {
        let newIndex = Math.round(self.progress * (services.length - 1))
        
        console.log(`ScrollTrigger progress: ${self.progress}, newIndex: ${newIndex}`)
        
        if (newIndex >= services.length) newIndex = services.length - 1
        if (newIndex < 0) newIndex = 0
        setActiveIndex(newIndex)
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
    // We use a light grey background theme #e5e5e5 to strictly match the reference site
    <div ref={containerRef} className="relative w-full h-screen bg-[#f5f5f5] text-black overflow-hidden flex flex-col lg:flex-row items-center px-6 lg:px-24 py-16 lg:py-0">
        
        {/* Left Sidebar: Navigation List (approx 30% width) */}
        <div className="relative z-20 w-full lg:w-[35%] flex flex-col justify-center h-full pt-12 lg:pt-0">
          <h2 className="text-3xl lg:text-5xl font-black text-black mb-12 tracking-tight">Our Services</h2>
          <ul className="space-y-4 lg:space-y-5">
            {services.map((service, idx) => {
              const isActive = activeIndex === idx
              return (
                <li key={idx} className="relative flex items-center group cursor-pointer" onClick={() => handleNavClick(idx)}>
                  <div className={`w-8 h-8 flex items-center justify-center mr-2 transition-opacity duration-300 ${isActive ? 'opacity-100 text-black' : 'opacity-0'}`}>
                    <ArrowRight strokeWidth={3} className="w-5 h-5" />
                  </div>
                  <button 
                    className={`text-xl lg:text-2xl font-bold transition-all duration-300 text-left
                      ${isActive ? 'text-black translate-x-2' : 'text-black/30 group-hover:text-black/60'}`}
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
            <h3 className="text-black text-3xl lg:text-5xl font-black uppercase tracking-tight leading-tight">
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
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ zIndex: activeIndex === i ? 5 : 0 }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover filter contrast-125"
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
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Spring-like ease
                  className="absolute bottom-0 right-0 w-full bg-white/90 backdrop-blur-xl p-8 lg:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.1)] rounded-xl border border-black/5"
                  style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                >
                  <h3 className="text-2xl lg:text-3xl font-black text-black mb-6 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-black/70 text-lg lg:text-xl leading-relaxed">
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
