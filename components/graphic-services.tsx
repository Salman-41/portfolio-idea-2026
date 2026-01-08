"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const services = [
  {
    id: "01",
    title: "Web Design",
    desc: "Crafting immersive visual systems.",
    image: "/ui-design-dark-mode.jpg"
  },
  {
    id: "02",
    title: "Creative Dev",
    desc: "WebGL, GSAP, and interaction magic.",
    image: "/creative-coding-webgl-art.jpg"
  },
  {
    id: "03",
    title: "Development",
    desc: "Scalable, performant architecture.",
    image: "/code-editor-dark-theme-react.jpg"
  },
  {
    id: "04",
    title: "Consulting",
    desc: "Technical strategy & design direction.",
    image: "/modern-workspace-setup-developer.jpg"
  }
]

export function GraphicServices() {
  const [activeService, setActiveService] = useState<number | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power3.out"
      })
    }
    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [])

  useEffect(() => {
    if (activeService !== null) {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" })
    } else {
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: "expo.out" })
    }
  }, [activeService])

  return (
    <section className="min-h-screen py-32 px-4 md:px-12 bg-background relative overflow-hidden">
        
       {/* Floating Image Reveal */}
       <div 
          ref={cursorRef} 
          className="fixed top-0 left-0 w-[500px] h-[350px] z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block rounded-2xl overflow-hidden opacity-0 scale-0"
       >
          {services.map((item, i) => (
             <div 
                key={i}
                className={`absolute inset-0 transition-opacity duration-500 ${activeService === i ? "opacity-100" : "opacity-0"}`}
             >
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-primary/20 mix-blend-color" />
             </div>
          ))}
       </div>

       <div className="container mx-auto">
          <div className="mb-24 md:mb-40">
              <span className="text-primary text-xs uppercase tracking-[0.4em] mb-4 block">Offers</span>
              <h1 className="text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-white mix-blend-difference">
                 Our<br/>Expertise
              </h1>
          </div>

          <div className="space-y-0">
             {services.map((item, i) => (
                <div
                   key={i}
                   className="group relative border-t border-white/10 py-16 md:py-24 transition-colors duration-500 hover:bg-white/5 cursor-pointer"
                   onMouseEnter={() => setActiveService(i)}
                   onMouseLeave={() => setActiveService(null)}
                >
                   <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 relative z-10 px-4">
                      
                      <div className="md:w-1/3">
                         <span className="block text-xs font-mono text-muted-foreground mb-4">
                            ({item.id})
                         </span>
                         <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                            {item.title}
                         </h2>
                      </div>

                      <div className="md:w-1/3">
                         <p className="text-lg md:text-xl text-muted-foreground group-hover:text-white transition-colors max-w-sm">
                            {item.desc}
                         </p>
                      </div>

                      <div className="md:w-1/4 flex justify-end">
                          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                             <ArrowRight className="w-6 h-6 text-white group-hover:text-black" />
                          </div>
                      </div>

                   </div>
                </div>
             ))}
             <div className="border-t border-white/10" />
          </div>
       </div>
    </section>
  )
}
