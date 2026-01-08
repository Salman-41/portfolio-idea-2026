"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: "01",
    title: "Web Design",
    desc: "Crafting immersive visual systems.",
    image: "/luxury-furniture-product-page-dark.jpg"
  },
  {
    id: "02",
    title: "Creative Dev",
    desc: "WebGL, GSAP, and interaction magic.",
    image: "/audio-visualizer-canvas-art.jpg"
  },
  {
    id: "03",
    title: "Architecture",
    desc: "Scalable, performant architecture.",
    image: "/dark-fintech-dashboard-with-charts-and-crypto.jpg" 
  },
  {
    id: "04",
    title: "Consulting",
    desc: "Technical strategy & design direction.",
    image: "/modern-furniture-ecommerce-dark-theme.jpg"
  }
]

export function GraphicServices() {
  const containerRef = useRef<HTMLElement>(null)
  const [activeService, setActiveService] = useState<number | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Cursor movement
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: "power3.out"
            })
        }
        window.addEventListener("mousemove", moveCursor)

        // Marquee Scroll Animation
        const rows = gsap.utils.toArray(".service-row") as HTMLElement[]
        
        rows.forEach((row, i) => {
            const direction = i % 2 === 0 ? -1 : 1
            
            // Dramatic movement range
            gsap.fromTo(row.querySelector(".service-track"), 
                { xPercent: direction * -35 }, 
                {
                    xPercent: direction * 35,
                    ease: "none",
                    scrollTrigger: {
                        trigger: row, // Trigger each row individually
                        start: "top bottom", // Start when row enters viewport
                        end: "bottom top",   // End when row leaves viewport
                        scrub: 0.5 // More direct scrub feel
                    }
                }
            )
        })

        return () => window.removeEventListener("mousemove", moveCursor)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (activeService !== null) {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" })
    } else {
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: "expo.out" })
    }
  }, [activeService])

  return (
    <section ref={containerRef} className="py-24 bg-background relative overflow-hidden">
        
       {/* Floating Image Reveal */}
       <div 
          ref={cursorRef} 
          className="fixed top-0 left-0 w-[400px] h-[300px] md:w-[600px] md:h-[400px] z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block rounded-xl overflow-hidden opacity-0 scale-0 shadow-2xl mix-blend-difference"
       >
          {services.map((item, i) => (
             <div 
                key={i}
                className={`absolute inset-0 transition-opacity duration-500 bg-black ${activeService === i ? "opacity-100" : "opacity-0"}`}
             >
                <div className="relative w-full h-full">
                    <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover scale-110" 
                    />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-color" />
                </div>
             </div>
          ))}
       </div>

       <div className="container mx-auto mb-20 px-4">
           <span className="text-primary text-xs uppercase tracking-[0.4em] mb-4 block animate-pulse">
              // The_Impact
           </span>
           <h1 className="text-[10vw] leading-[0.9] font-black uppercase tracking-tighter text-white overflow-hidden pb-4">
              <span className="inline-block animate-reveal-up delay-100">Creative</span><br/>
              <span className="inline-block animate-reveal-up delay-200 text-transparent stroke-text-2">Capabilities</span>
           </h1>
       </div>

       <div className="flex flex-col gap-0 w-full overflow-hidden">
          {services.map((item, i) => (
             <div
                key={i}
                className="service-row group relative border-t border-white/10 py-16 md:py-20 cursor-pointer hover:bg-white/5 transition-colors duration-300 w-full"
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
             >
                <div className="service-track flex items-center justify-center w-full whitespace-nowrap will-change-transform">
                   {/* Centered Content that moves */}
                   <div className="flex items-center gap-8 md:gap-16 px-8">
                       <span className="text-xs font-mono text-muted-foreground opacity-50">
                          ({item.id})
                       </span>
                       <h2 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter text-white transition-all duration-300 scale-100 group-hover:scale-110">
                          {item.title}
                       </h2>
                       <p className="text-sm md:text-xl font-light text-muted-foreground max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 hidden md:block">
                          {item.desc}
                       </p>
                       <ArrowRight className="w-8 h-8 md:w-16 md:h-16 text-white/20 group-hover:text-primary -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                   </div>
                </div>
             </div>
          ))}
          <div className="border-t border-white/10" />
       </div>
    </section>
  )
}
