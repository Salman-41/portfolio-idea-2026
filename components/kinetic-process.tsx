"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    id: "01",
    title: "Discovery",
    desc: "We dive deep into your brand, finding the hidden narrative that sets you apart.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: "02",
    title: "Strategy",
    desc: "Structuring the chaos. We build a blueprint that merges aesthetics with function.",
    color: "from-cyan-400 to-teal-400"
  },
  {
    id: "03",
    title: "Execution",
    desc: "The build. Pixel-perfect code, fluid motion, and rigorous testing.",
    color: "from-teal-400 to-green-400"
  }
]

export function KineticProcess() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray(".process-step") as HTMLElement[]
      
      stepElements.forEach((step, i) => {
        // Number Fill Animation
        gsap.fromTo(step.querySelector(".process-number-fill"),
          { height: "0%" },
          { 
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top center",
              end: "bottom center",
              scrub: true
            }
          }
        )
        
        // Content Reveal
        gsap.fromTo(step.querySelector(".process-content"),
          { opacity: 0.1, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
                trigger: step,
                start: "top 70%",
                end: "bottom 70%",
                scrub: 1
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-12 bg-background relative overflow-hidden">
       <div className="container mx-auto flex flex-col items-center">
          
          <div className="mb-24 text-center">
             <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">
                // The_Blueprint
             </span>
             <h2 className="text-4xl md:text-6xl font-black uppercase mt-4">
                Process
             </h2>
          </div>

          <div className="max-w-5xl w-full">
             {steps.map((step, i) => (
                <div key={i} className="process-step relative flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-32 last:mb-0">
                   
                   {/* Massive Number with Liquid Fill */}
                   <div className="relative text-[12rem] md:text-[18rem] font-black leading-none select-none">
                      <span className="text-white/5 block">{step.id}</span>
                      <div className="process-number-fill absolute bottom-0 left-0 w-full h-0 overflow-hidden text-transparent bg-clip-text bg-gradient-to-b from-white to-primary/50">
                         {step.id}
                      </div>
                   </div>

                   {/* Content */}
                   <div className="process-content text-center md:text-left max-w-lg">
                      <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6">
                         {step.title}
                      </h3>
                      <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                         {step.desc}
                      </p>
                   </div>
                   
                   {/* Connection Line (Visual Only) */}
                   {i !== steps.length - 1 && (
                      <div className="absolute left-1/2 top-full h-32 w-[1px] bg-gradient-to-b from-white/10 to-transparent -translate-x-1/2 hidden md:block" />
                   )}
                </div>
             ))}
          </div>
       </div>
    </section>
  )
}
