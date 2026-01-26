"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Crosshair, Zap, Eye, Boxes, ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const philosophies = [
  {
    id: "01",
    title: "Precision",
    desc: "Pixel-perfect isn't a goal, it's the baseline. Every detail is a deliberate decision.",
    icon: Crosshair,
    colSpan: "md:col-span-2",
    bg: "bg-white/5",
    accent: "text-blue-500",
    border: "group-hover:border-blue-500/50"
  },
  {
    id: "02",
    title: "Motion",
    desc: "Designing feel, not just look. Interactions that mimic the physical world.",
    icon: Zap,
    colSpan: "md:col-span-1",
    bg: "bg-white/5",
    accent: "text-yellow-500",
     border: "group-hover:border-yellow-500/50"
  },
  {
    id: "03",
    title: "Clarity",
    desc: "Signal over noise. We distill complex problems into effortless journeys.",
    icon: Eye,
    colSpan: "md:col-span-1",
    bg: "bg-white/5",
    accent: "text-green-500",
    border: "group-hover:border-green-500/50"
  },
  {
    id: "04",
    title: "Architecture",
    desc: "Thinking in systems, not pages. Robust codebases built for future scale.",
    icon: Boxes,
    colSpan: "md:col-span-2",
    bg: "bg-white/5",
    accent: "text-purple-500",
    border: "group-hover:border-purple-500/50"
  }
]

export function PhilosophyGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".philosophy-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%"
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-4 md:px-12 bg-background border-t border-white/5 relative overflow-hidden">
       {/* Section Header - Asymmetric Layout */}
       <div className="container mx-auto mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]">
               Core<br/>
               <span className="text-transparent stroke-text-2">Philosophy</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 mb-2">
             <div className="w-12 h-[1px] bg-primary" />
             <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">
               Guiding_Principles
             </span>
          </div>
       </div>

       {/* Technical Grid */}
       <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {philosophies.map((item) => (
                <div 
                   key={item.id}
                   className={`philosophy-card group relative p-8 md:p-10 rounded-xl border border-white/10 ${item.bg} ${item.colSpan} overflow-hidden transition-all duration-500 hover:shadow-2xl ${item.border}`}
                >
                   {/* Background Number */}
                   <span className="absolute -top-6 -right-6 text-[120px] font-black text-white/[0.02] leading-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:text-white/[0.04]">
                      {item.id}
                   </span>

                   {/* Content Layout */}
                   <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                      <div className="flex justify-between items-start">
                         <div className={`p-4 rounded-lg bg-white/5 border border-white/10 ${item.accent} group-hover:bg-white/10 transition-colors`}>
                            <item.icon className="w-6 h-6" />
                         </div>
                         <ArrowRight className={`w-5 h-5 text-white/20 -rotate-45 transition-all duration-300 group-hover:rotate-0 group-hover:text-primary opacity-0 group-hover:opacity-100`} />
                      </div>

                      <div>
                         <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-white group-hover:text-primary transition-colors">
                            {item.title}
                         </h3>
                         <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-md group-hover:text-white/80 transition-colors">
                            {item.desc}
                         </p>
                      </div>
                   </div>

                   {/* Hover Gradient Overlay */}
                   <div className={`absolute inset-0 bg-gradient-to-br ${item.accent.replace('text-', 'from-')}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                </div>
             ))}
          </div>
       </div>
    </section>
  )
}
