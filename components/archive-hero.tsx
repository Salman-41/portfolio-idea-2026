import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const filters = ["All", "Web App", "E-commerce", "Creative", "3D/WebGL"]

interface ArchiveHeroProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  totalProjects: number
}

export function ArchiveHero({ activeFilter, onFilterChange, totalProjects }: ArchiveHeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const title1Ref = useRef<HTMLSpanElement>(null)
  const title2Ref = useRef<HTMLSpanElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
      
      // 1. Title Reveal
      tl.fromTo(title1Ref.current, 
        { y: 200, rotate: 10, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: 1.5, delay: 0.2 }
      )
      tl.fromTo(title2Ref.current, 
        { y: 200, rotate: -5, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: 1.5 },
        "-=1.2"
      )

      // 2. Filter Bar & Stats Reveal
      tl.fromTo([".filter-bar", ".stats-block"], {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.8")

      // 3. Background Parallax
      gsap.to(bgRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      })

      // 4. Counter Animation
      const counterObj = { value: 0 }
      const counterEl = document.getElementById("project-counter")
      if (counterEl) {
        gsap.to(counterObj, {
            value: totalProjects,
            duration: 2.5,
            ease: "expo.out",
            onUpdate: () => {
                counterEl.textContent = Math.floor(counterObj.value).toString().padStart(2, '0')
            }
        })
      }

    }, containerRef)

    return () => ctx.revert()
  }, [totalProjects])

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Massive Background Text */}
      <div ref={bgRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] opacity-5 pointer-events-none select-none z-0">
        <h2 className="text-[30vw] font-black uppercase tracking-tighter text-white whitespace-nowrap leading-none stroke-text text-center">
          SELECTED<br/>WORKS
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col mb-20 md:mb-32">
           <span className="text-primary text-xs uppercase tracking-[0.5em] mb-8 animate-pulse inline-block">
             // Index_01
           </span>
           <h1 className="flex flex-col text-[16vw] md:text-[14vw] leading-[0.8] font-black uppercase tracking-tighter mix-blend-difference mb-12">
             <span ref={title1Ref} className="inline-block">The</span>
             <span ref={title2Ref} className="inline-block text-transparent stroke-text-2">Archive</span>
           </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
           {/* Sticky Filter Bar */}
           <div className="filter-bar flex flex-wrap gap-2 md:gap-4 p-2 bg-background/5 backdrop-blur-md border border-white/10 rounded-full w-fit max-w-full overflow-x-auto no-scrollbar">
              {filters.map((filter) => (
                 <button
                   key={filter}
                   onClick={() => onFilterChange(filter)}
                   className={cn(
                     "px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
                     activeFilter === filter 
                       ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]" 
                       : "hover:bg-white/5 text-muted-foreground hover:text-white"
                   )}
                 >
                    {filter}
                 </button>
              ))}
           </div>

           {/* Data Counter */}
           <div className="stats-block flex flex-col items-end gap-2 opacity-80 mix-blend-difference">
              <span id="project-counter" className="text-6xl md:text-8xl font-black tabular-nums tracking-tighter text-white leading-none">
                00
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Total Cases</span>
           </div>
        </div>
      </div>
    </section>
  )
}
