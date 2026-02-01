"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

/**
 * A canvas-based overlay that generates a subtle animated grain effect.
 * enhancing the cinematic feel of the preloader.
 */
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
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 12
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

/**
 * Configuration for the intro phrases displayed during the preloader sequence.
 */
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

/**
 * Main Preloader component.
 * Orchestrates the initial loading sequence, animations, and transitions into the main site.
 * Utilizes GSAP for precise timing and animations.
 */
export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add("preloader-active")

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            document.documentElement.classList.remove("preloader-active")
            setComplete(true)
          }, 100)
        }
      })

      tl.set(".shutter-panel", { opacity: 1 })

      // Phrase sequence
      tl.fromTo(".phrase-0", { filter: "blur(18px)", opacity: 0, y: 30 }, {
        filter: "blur(0px)", opacity: 1, y: 0, duration: 0.8, ease: "power3.out"
      }, 0.1)
      tl.to(".phrase-0", { 
        filter: "blur(10px)", opacity: 0, y: -30, duration: 0.4, ease: "power2.in" 
      }, 1.5)

      tl.fromTo(".phrase-1", { filter: "blur(18px)", opacity: 0, y: 30 }, {
        filter: "blur(0px)", opacity: 1, y: 0, duration: 0.9, ease: "power3.out"
      }, 2.0)
      tl.to(".phrase-1", { 
        filter: "blur(10px)", opacity: 0, y: -30, duration: 0.4, ease: "power2.in" 
      }, 3.4)

      tl.fromTo(".phrase-2", { filter: "blur(18px)", opacity: 0, y: 30 }, {
        filter: "blur(0px)", opacity: 1, y: 0, duration: 0.9, ease: "power3.out"
      }, 4.0)
      
      const finaleStart = 5.3

      tl.to(".phrase-2", {
        scale: 1.15,
        filter: "blur(15px)",
        opacity: 0,
        duration: 1.1,
        ease: "power2.in"
      }, finaleStart)

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

      tl.to([".ambience-layer", ".grain-layer"], {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, finaleStart) 

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
      <div className="shutter-panel panel-top absolute top-0 left-0 w-full h-1/2 bg-background z-10" />
      <div className="shutter-panel panel-bottom absolute bottom-0 left-0 w-full h-1/2 bg-background z-10" />

      <div className="ambience-layer absolute inset-0 flex items-center justify-center opacity-30 z-0">
          <div className="w-[80vw] h-[80vw] bg-rose-200/15 rounded-full blur-[180px] animate-pulse duration-[7000ms]" />
      </div>

      <div className="relative w-full h-full px-4 md:px-32 z-20">
        {phrases.map((item, i) => (
            <div 
                key={`phrase-slot-${i}`}
                className={`absolute ${getPositionClass(item.style)} w-full max-6xl h-fit`}
            >
                <h2 
                    className={`phrase-${i} ${item.font} opacity-0 leading-[1.05] text-foreground`}
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

      <GrainOverlay />
    </div>
  )
}
