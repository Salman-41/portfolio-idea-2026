"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Crosshair, Zap, Eye, Boxes } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const philosophies = [
  {
    title: "Precision",
    desc: "Pixel-perfect execution is not a luxury, it's the baseline.",
    icon: Crosshair,
    colSpan: "col-span-1 md:col-span-2",
    bg: "bg-primary/5"
  },
  {
    title: "Motion",
    desc: "Physics-based interactions that feel organic, not robotic.",
    icon: Zap,
    colSpan: "col-span-1",
    bg: "bg-background border border-white/10"
  },
  {
    title: "Clarity",
    desc: "Refining chaos into clean, intuitive user pathways.",
    icon: Eye,
    colSpan: "col-span-1",
    bg: "bg-white/5"
  },
  {
    title: "System",
    desc: "Building scalable architectures that grow with the product.",
    icon: Boxes,
    colSpan: "col-span-1 md:col-span-2",
    bg: "bg-gradient-to-br from-primary/10 to-transparent"
  }
]

export function PhilosophyGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".philosophy-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -5 // Max 5deg
    const rotateY = ((x - centerX) / centerX) * 5

    gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out"
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
    })
  }

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-12 bg-background border-t border-white/5">
       <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                Core <span className="text-primary italic">Philosophy</span>
             </h2>
             <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-4 md:mt-0">
                // guiding_principles
             </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
             {philosophies.map((item, i) => (
                <div 
                   key={item.title}
                   className={`philosophy-card perspective-[1000px] group relative rounded-3xl overflow-hidden p-8 flex flex-col justify-between ${item.colSpan} ${item.bg}`}
                   onMouseMove={handleMouseMove}
                   onMouseLeave={handleMouseLeave}
                >
                   <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 text-primary bg-white/5 group-hover:scale-110 transition-transform duration-300">
                         <item.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">
                         {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs group-hover:text-white transition-colors">
                         {item.desc}
                      </p>
                   </div>
                   
                   {/* Hover Glow */}
                   <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                </div>
             ))}
          </div>
       </div>
    </section>
  )
}
