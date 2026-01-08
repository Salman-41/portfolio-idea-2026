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
    text: "Architect of Digital Alchemy.", 
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
      const tl = gsap.timeline({
        onComplete: () => {
          setComplete(true)
          document.body.style.overflow = "auto"
        }
      })

      // 1. Immediate Boot (No delay)
      tl.set(".shutter-panel", { opacity: 1 })

      // 2. Typographic Site-Integrated Sequence
      phrases.forEach((phrase, index) => {
        const isLast = index === phrases.length - 1
        const textBus = `.phrase-${index}`
        
        // Site-Sync Blur + Glide
        tl.fromTo(textBus, {
          filter: "blur(18px)",
          opacity: 0,
          y: 30,
        }, {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power4.out",
        }, index === 0 ? "+=0.1" : "-=0.7")

        // Exit Transition (except last)
        if (!isLast) {
          tl.to(textBus, {
            filter: "blur(10px)",
            opacity: 0,
            y: -30,
            duration: 1,
            ease: "power4.in",
            delay: 1.0 
          })
        }
      })

      // 3. The Shutter Reveal (Crystal-Clear Gate)
      const lastText = `.phrase-${phrases.length - 1}`
      
      tl.to(lastText, {
        scale: 1.3,
        filter: "blur(25px)",
        opacity: 0,
        duration: 1.2,
        ease: "power3.in"
      }, "+=0.3")

      // Sync Shutter with Overlay Cleansing
      tl.to(".panel-top", {
        yPercent: -100,
        duration: 1.6,
        ease: "expo.inOut"
      }, "-=0.8")

      tl.to(".panel-bottom", {
        yPercent: 100,
        duration: 1.6,
        ease: "expo.inOut"
      }, "-=1.6")

      // Clear the "Mesh" and Glow artifacts immediately as shutter opens
      tl.to([".ambience-layer", ".grain-layer"], {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=1.5")

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.1
      })

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
      {/* SHUTTER PANELS - Immediate Background */}
      <div className="shutter-panel panel-top absolute top-0 left-0 w-full h-1/2 bg-[#fcfbf9] z-10" />
      <div className="shutter-panel panel-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#fcfbf9] z-10" />

      {/* Internal Atmospheric Depth (Sync-Clear) */}
      <div className="ambience-layer absolute inset-0 flex items-center justify-center opacity-30 z-0">
          <div className="w-[80vw] h-[80vw] bg-rose-200/15 rounded-full blur-[180px] animate-pulse duration-[7000ms]" />
      </div>

      {/* Editorial Typographic Canvas (Site Fonts) */}
      <div className="relative w-full h-full px-12 md:px-32 z-10">
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

      {/* Site Cohesion Tag */}
      <div className="absolute bottom-12 left-12 opacity-30 hidden md:flex items-center gap-4 z-20 text-[#1a1a1a]">
           <span className="text-[9px] uppercase tracking-[0.6em] font-mono">
             Identity / Sync
           </span>
           <div className="w-8 h-px bg-black/20" />
           <span className="text-[9px] uppercase tracking-[0.6em] font-mono">
             Core 1.0
           </span>
      </div>

      {/* High-End Film Grain (Sync-Clear) */}
      <div className="grain-layer absolute inset-0 opacity-[0.45] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-30" />
    </div>
  )
}
