"use client"
import React, { useState } from 'react'
import { TestimonialsCard } from '@/components/ui/testimonials-card'

const TESTIMONIALS_DATA = [
  {
    id: 1,
    title: "Cinematic, fast, and beyond expectations.",
    description: "They transformed our digital presence completely. The attention to detail is unmatched in the industry. It feels less like a website and more like a premium software experience.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop",
    name: "Alex Sterling",
    role: "Founder",
    company: "Nexus AI"
  },
  {
    id: 2,
    title: "They pushed the boundaries of what we thought possible.",
    description: "Responsive, fast, and visually stunning results. They truly understood our brand vision and delivered an MVP that helped us close our seed round in record time.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
    name: "Sarah Jenkins",
    role: "CMO",
    company: "Horizon Tech"
  },
  {
    id: 3,
    title: "An absolute pleasure to work with from start to finish.",
    description: "Innovative, dynamic, and incredibly professional. Our new web application handles our complex data perfectly while maintaining a sleek, modern UI.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    name: "David Chen",
    role: "Product Lead",
    company: "FlowState"
  },
  {
    id: 4,
    title: "The ROI on their automation systems was immediate.",
    description: "We cut our operational overhead by 40% in the first month. The custom voice agents they built for us handle lead qualification flawlessly.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    name: "Marcus Thorne",
    role: "Director of Ops",
    company: "Elevate Real Estate"
  },
  {
    id: 5,
    title: "World-class design meets engineering excellence.",
    description: "Huygen Studios doesn't just build websites; they architect digital experiences that command authority and premium pricing in a crowded market.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    name: "Elena Rostova",
    role: "CEO",
    company: "Aura Creative"
  }
];

export default function VengenceTestimonials() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative w-full h-screen cursor-pointer flex flex-col items-center justify-center bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay UI */}
      <div className="absolute top-[10%] w-full text-center z-10 pointer-events-none transition-opacity duration-1000 flex flex-col items-center">
        {/* Trust Strip */}
        <div className="flex items-center justify-center flex-wrap gap-4 md:gap-8 text-[#ab71f8] font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-8 border-b border-[#ab71f8]/20 pb-4 px-12 opacity-80">
          <span>20+ SaaS products shipped</span>
          <span className="hidden md:block w-1 h-1 rounded-full bg-[#ab71f8]/50"></span>
          <span>50+ cinematic websites</span>
          <span className="hidden md:block w-1 h-1 rounded-full bg-[#ab71f8]/50"></span>
          <span>95% repeat clients</span>
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-widest uppercase mix-blend-overlay">
          Client Feedback
        </h2>
      </div>

      <div className="z-20 w-full max-w-4xl px-4 mt-20">
        <TestimonialsCard items={TESTIMONIALS_DATA} autoPlay={true} showNavigation={true} width={800} />
      </div>
      
      {/* Background hazy fog effect to match previous theme */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'radial-gradient(circle at center, rgba(30,50,80,0.1) 0%, rgba(0,0,0,0) 70%)'
      }} />
    </div>
  )
}
