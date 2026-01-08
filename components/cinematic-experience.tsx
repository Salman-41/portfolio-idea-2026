"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    period: "2024 — Present",
    role: "Senior Frontend Engineer",
    company: "Klaviyo",
    desc: "Architecting the next generation of accessible UI components.",
    color: "bg-[#1a1a1a]",
    textColor: "text-white"
  },
  {
    period: "2021 — 2024",
    role: "Lead Developer",
    company: "Vercel",
    desc: "Led the dashboard team to improve build times by 40%.",
    color: "bg-[#f5f5f5]",
    textColor: "text-black"
  },
  {
    period: "2019 — 2021",
    role: "Creative Developer",
    company: "Basic/Dept",
    desc: "Crafted award-winning immersive web experiences for global brands.",
    color: "bg-[#0a0a0a]",
    textColor: "text-white"
  },
  {
    period: "2017 — 2019",
    role: "Frontend Dev",
    company: "Spotify",
    desc: "Built features for the web player used by millions daily.",
    color: "bg-primary",
    textColor: "text-black"
  }
]

export function CinematicExperience() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale down previous cards
      const cards = gsap.utils.toArray(".experience-card") as HTMLElement[]
      
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return // Don't animate last card
        
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true
          }
        })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-12 bg-background relative z-10">
       <div className="container mx-auto mb-20">
          <h2 className="text-[10vw] font-black uppercase leading-[0.8] tracking-tighter mix-blend-difference text-white">
             Legacy
          </h2>
          <span className="block mt-4 text-xs font-mono uppercase tracking-[0.3em] text-primary">
             // Career_Archive
          </span>
       </div>

       <div className="container mx-auto max-w-5xl">
          {experiences.map((item, i) => (
             <div 
               key={i}
               className={`experience-card sticky top-32 min-h-[50vh] md:min-h-[60vh] p-8 md:p-16 rounded-3xl ${item.color} ${item.textColor} mb-12 flex flex-col justify-between transform-gpu border border-white/5 shadow-2xl`}
             >
                <div className="flex justify-between items-start">
                   <div className="text-sm md:text-base font-mono uppercase tracking-widest opacity-60">
                      {item.period}
                   </div>
                   <div className="w-12 h-12 rounded-full border border-current opacity-20 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5" />
                   </div>
                </div>

                <div>
                   <h3 className="text-4xl md:text-7xl font-bold tracking-tight mb-4">
                      {item.company}
                   </h3>
                   <div className="text-xl md:text-3xl opacity-80 mb-8 font-light">
                      {item.role}
                   </div>
                   <p className="max-w-xl text-lg md:text-xl leading-relaxed opacity-70">
                      {item.desc}
                   </p>
                </div>

                <div className="absolute bottom-8 right-8 text-[12rem] font-black opacity-[0.03] pointer-events-none select-none leading-none">
                   {i + 1}
                </div>
             </div>
          ))}
       </div>
    </section>
  )
}
