"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function ServicesHero() {
  const containerRef = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    const container = containerRef.current
    if (container) {
       container.addEventListener("mousemove", handleMouseMove)
    }

    // Entrance Animation
    const ctx = gsap.context(() => {
        gsap.from(".hero-text-char", {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.05,
            ease: "power4.out"
        })
    }, containerRef)

    return () => {
        if (container) container.removeEventListener("mousemove", handleMouseMove)
        ctx.revert()
    }
  }, [])

  return (
    <section 
        ref={containerRef} 
        className="h-screen relative flex items-center justify-center overflow-hidden bg-black cursor-none"
    >
      
      {/* 1. GHOST LAYER (Always Visible, Barely) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
         <div className="text-center opacity-20 mix-blend-difference">
            <h1 className="text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-[#333]">
                <span className="hero-text-char inline-block">Digital</span><br/>
                <span className="hero-text-char inline-block">Reality</span>
            </h1>
         </div>
      </div>

      {/* 2. SPOTLIGHT LAYER (Revealed by Mask) */}
      <div 
        ref={spotlightRef}
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none select-none bg-black"
        style={{
            clipPath: `circle(250px at ${mousePos.x}px ${mousePos.y}px)`
        }}
      >
         {/* Background Grid within Spotlight */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
         
         <div className="text-center relative">
            <span className="block text-primary text-sm uppercase tracking-[1em] mb-4 font-mono">
                // System.Explore
            </span>
            <h1 className="text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
               Digital<br/>
               Reality
            </h1>
         </div>
      </div>

      {/* 3. Instruction Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 text-xs uppercase tracking-widest animate-pulse z-30 pointer-events-none">
          Use spotlight to reveal
      </div>

    </section>
  )
}
