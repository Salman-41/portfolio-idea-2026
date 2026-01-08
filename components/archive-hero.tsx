"use client"

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
  const titleRef = useRef<HTMLHeadingElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic Title Animation
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })
      
      tl.fromTo(titleRef.current, 
        { y: 120, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.8, delay: 0.2 }
      )

      gsap.to(".filter-bar", {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
      })

      // Counter Animation
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

      // Scroll Focus Effect (Fade out hero)
      gsap.to(".hero-content", {
        opacity: 0,
        y: -50,
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [totalProjects])

  return (
    <section ref={containerRef} className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 grid-bg border-b border-white/5">
      <div className="container mx-auto hero-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-32">
           {/* Kinetic Header */}
           <div className="relative overflow-hidden perspective-[1000px]">
              <span className="block text-primary text-xs uppercase tracking-[0.5em] mb-4 font-mono opacity-80">
                 Index_01
              </span>
              <h1 ref={titleRef} className="text-[15vw] leading-[0.8] font-black tracking-tighter uppercase mix-blend-difference text-white">
                 The<br />
                 <span className="text-primary/20">Archive.</span>
              </h1>
           </div>

           {/* Data Counter */}
           <div className="flex flex-col items-end gap-2 mt-8 md:mt-0 opacity-60 mix-blend-difference">
              <span id="project-counter" className="text-6xl md:text-8xl font-black tabular-nums tracking-tighter text-white">
                00
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-white">Total Cases</span>
           </div>
        </div>

        {/* Sticky Filter Bar */}
        <div className="filter-bar opacity-0 translate-y-10 sticky top-24 z-30 flex flex-wrap gap-2 md:gap-4 p-2 bg-background/5 backdrop-blur-md border border-white/10 rounded-full w-fit max-w-full overflow-x-auto no-scrollbar">
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
      </div>
    </section>
  )
}
