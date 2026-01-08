"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const phrases = [
  { 
    text: "Hello.", 
    style: "top-left", 
    font: "font-mono uppercase tracking-[0.5em] text-[2vw] md:text-[0.9vw] font-medium" 
  },
  { 
    text: "I am Salmān Yousufzai.", 
    style: "center", 
    font: "font-sans text-[10vw] md:text-[7vw] leading-[0.85] tracking-tighter font-black" 
  },
  { 
    text: "Imagination Engineered.", 
    style: "bottom-right", 
    font: "font-sans text-[4vw] md:text-[2.2vw] tracking-tight font-light italic" 
  },
  { 
    text: "Let's explore.", 
    style: "center", 
    font: "font-sans font-black uppercase tracking-[-0.04em] text-[12vw] md:text-[8vw] leading-none" 
  }
]

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const ctx = gsap.context(() => {
      // MASTER TIMELINE CONFIG
      // Target Total Duration: ~6.3s - 6.5s
      const tl = gsap.timeline({
        onComplete: () => {
          setComplete(true)
          document.body.style.overflow = "auto"
        }
      })

      // 1. Initial State Sync
      tl.set(".shutter-panel", { opacity: 1 })

      // 2. PHRASE SEQUENCE (Precision Timing)
      
      // Phrase 0: "Hello." (Total cycle ~1.8s)
      tl.fromTo(".phrase-0", { filter: "blur(18px)", opacity: 0, y: 30 }, {
        filter: "blur(0px)", opacity: 1, y: 0, duration: 0.8, ease: "power3.out"
      }, 0.1) // Start at 0.1s
      tl.to(".phrase-0", { 
        filter: "blur(10px)", opacity: 0, y: -30, duration: 0.4, ease: "power2.in" 
      }, 1.5) // Exit at 1.5s (0.6s hold)

      // Phrase 1: "I am Salmān..." (Total cycle ~1.8s)
      tl.fromTo(".phrase-1", { filter: "blur(18px)", opacity: 0, y: 30 }, {
        filter: "blur(0px)", opacity: 1, y: 0, duration: 0.9, ease: "power3.out"
      }, 2.0) // 0.1s delay after P0 exit
      tl.to(".phrase-1", { 
        filter: "blur(10px)", opacity: 0, y: -30, duration: 0.4, ease: "power2.in" 
      }, 3.4) // Exit at 3.4s (0.5s hold)

      // Phrase 2: "Imagination Engineered." (Display ~1.4s)
      tl.fromTo(".phrase-2", { filter: "blur(18px)", opacity: 0, y: 30 }, {
        filter: "blur(0px)", opacity: 1, y: 0, duration: 0.9, ease: "power3.out"
      }, 4.0) // 0.2s delay after P1 exit
      
      // 3. SYNCHRONIZED FINALE (Master Reveal)
      // Transformation and Shutter start at the exact same millisecond
      const finaleStart = 5.3 // Calculated for 6.5s total end-to-end

      // Final Text Transformation
      tl.to(".phrase-2", {
        scale: 1.15,
        filter: "blur(15px)",
        opacity: 0,
        duration: 1.1,
        ease: "power2.in"
      }, finaleStart)

      // Shutter Panel Reveal
      tl.to(".panel-top", {
        yPercent: -100,
        duration: 1.1,
        ease: "expo.inOut"
      }, finaleStart)

      tl.to(".panel-bottom", {
        yPercent: 100,
        duration: 1.1,
        ease: "expo.inOut"
      }, finaleStart)

      // Overlay Cleansing Sync (Removes the "white mesh" fog immediately as shutter opens)
      tl.to([".ambience-layer", ".grain-layer"], {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, finaleStart) 

      // Master Container Exit (Marks the absolute end)
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.2
      }, finaleStart + 1.0) 

    }, containerRef)

    return () => ctx.revert()
  }, [])

  if (complete) return null

  const getPositionClass = (style: string) => {
    switch (style) {
      case "top-left": return "top-[15%] left-[10%] text-left"
      case "bottom-right": return "bottom-[15%] right-[10%] text-right"
      default: return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
    }
  }

  return (
    <div 
        ref={containerRef} 
        className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
    >
      {/* SHUTTER PANELS - Brand Cohesion Background */}
      <div className="shutter-panel panel-top absolute top-0 left-0 w-full h-1/2 bg-[#fcfbf9] z-10" />
      <div className="shutter-panel panel-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#fcfbf9] z-10" />

      {/* Internal Atmospheric Depth (Sync-Clear Stage) */}
      <div className="ambience-layer absolute inset-0 flex items-center justify-center opacity-30 z-0">
          <div className="w-[80vw] h-[80vw] bg-rose-200/15 rounded-full blur-[180px] animate-pulse duration-[7000ms]" />
      </div>

      {/* Editorial Typographic Canvas (Space Grotesk Core) */}
      <div className="relative w-full h-full px-12 md:px-32 z-20">
        {phrases.map((item, i) => (
            <div 
                key={`phrase-slot-${i}`}
                className={`absolute ${getPositionClass(item.style)} w-full max-6xl h-fit`}
            >
                <h2 
                    className={`phrase-${i} ${item.font} opacity-0 leading-[1.05] text-[#1a1a1a]`}
                    style={{ 
                        fontFamily: item.font.includes('font-mono') 
                            ? 'var(--font-jetbrains-mono), monospace' 
                            : 'var(--font-space-grotesk), sans-serif'
                    }}
                >
                    {item.text}
                </h2>
            </div>
        ))}
      </div>

      {/* Site Identity Tag */}
      <div className="absolute bottom-12 left-12 opacity-30 hidden md:flex items-center gap-4 z-20 text-[#1a1a1a]">
           <span className="text-[9px] uppercase tracking-[0.6em] font-mono">
             Identity / Sync
           </span>
           <div className="w-8 h-px bg-black/20" />
           <span className="text-[9px] uppercase tracking-[0.6em] font-mono">
             Core 1.0
           </span>
      </div>

      {/* High-End Film Grain Overlay (Sync-Clear Stage) */}
      <div className="grain-layer absolute inset-0 opacity-[0.45] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-30" />
    </div>
  )
}
