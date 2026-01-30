"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

// Subtle animated grain overlay using canvas
function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    let animationId: number
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)
    
    const animate = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data
      
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value     // R
        data[i + 1] = value // G
        data[i + 2] = value // B
        data[i + 3] = 12    // Very subtle alpha (0-255)
      }
      
      ctx.putImageData(imageData, 0, 0)
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="grain-layer absolute inset-0 pointer-events-none z-30 opacity-60"
    />
  )
}

const phrases = [
  { 
    text: "Hello.", 
    style: "top-left", 
    font: "font-mono uppercase tracking-[0.3em] md:tracking-[0.5em] text-[3.5vw] md:text-[0.9vw] font-medium" 
  },
  { 
    text: "I am Salmān Yousufzai.", 
    style: "center", 
    font: "font-sans text-[8vw] md:text-[7vw] leading-[0.9] md:leading-[0.85] tracking-tighter font-black" 
  },
  { 
    text: "Imagination Engineered.", 
    style: "bottom-right", 
    font: "font-sans text-[5vw] md:text-[2.2vw] tracking-tight font-light italic" 
  },
  { 
    text: "Let's explore.", 
    style: "center", 
    font: "font-sans font-black uppercase tracking-[-0.04em] text-[11vw] md:text-[8vw] leading-none" 
  }
]

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    // Add class to html element to prevent layout shift
    document.documentElement.classList.add("preloader-active")

    const ctx = gsap.context(() => {
      // MASTER TIMELINE CONFIG
      // Target Total Duration: ~6.3s - 6.5s
      const tl = gsap.timeline({
        onComplete: () => {
          // Smooth transition - remove class after a tiny delay
          setTimeout(() => {
            document.documentElement.classList.remove("preloader-active")
            setComplete(true)
          }, 100)
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
      case "top-left": return "top-[20%] md:top-[15%] left-6 md:left-[10%] text-left"
      case "bottom-right": return "bottom-[20%] md:bottom-[15%] right-6 md:right-[10%] text-right"
      default: return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4"
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
      <div className="relative w-full h-full px-4 md:px-32 z-20">
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

      {/* Subtle Animated Grain - Canvas Based */}
      <GrainOverlay />
    </div>
  )
}
