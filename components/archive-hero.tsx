"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ArchiveHeroProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  totalProjects: number
}

const filters = ["All", "Web App", "E-commerce", "Creative", "3D/WebGL"]

export function ArchiveHero({ activeFilter, onFilterChange, totalProjects }: ArchiveHeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Mouse Follower (Organic Blob)
      const xTo = gsap.quickTo(blobRef.current, "x", { duration: 1, ease: "power3" })
      const yTo = gsap.quickTo(blobRef.current, "y", { duration: 1, ease: "power3" })

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        xTo(clientX)
        yTo(clientY)
      }

      window.addEventListener("mousemove", handleMouseMove)

      // 2. Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

      tl.fromTo(".archive-hero-title-line span", {
        y: "100%",
        rotate: 5
      }, {
        y: "0%",
        rotate: 0,
        duration: 1.5,
        stagger: 0.1,
        delay: 0.3
      })

      tl.fromTo(".archive-hero-description", {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1
      }, "-=1")

      tl.fromTo(".filter-bar", {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1
      }, "-=0.5")

      // 3. Scroll Parallax
      gsap.to(titleRef.current, {
        y: -100,
        scale: 1.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      })

      // 4. Infinite Marquee for Ghost Text
      gsap.to(".archive-ghost-marquee", {
        xPercent: -33.33,
        duration: 20,
        ease: "none",
        repeat: -1
      })

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-20"
    >
      {/* 1. Organic Blob Background */}
      <div 
        ref={blobRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] -ml-[300px] -mt-[300px] rounded-full blur-[120px] opacity-20 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)"
        }}
      />

      {/* 2. Layered Ghost Text - Infinite Marquee */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none select-none z-0 opacity-[0.03] overflow-hidden">
        <div className="archive-ghost-marquee flex whitespace-nowrap">
          <h2 className="text-[35vw] font-black uppercase tracking-tighter leading-none px-8">
            ARCHIVE
          </h2>
          <h2 className="text-[35vw] font-black uppercase tracking-tighter leading-none px-8">
            ARCHIVE
          </h2>
          <h2 className="text-[35vw] font-black uppercase tracking-tighter leading-none px-8">
            ARCHIVE
          </h2>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <h1 
          ref={titleRef}
          className="text-[12vw] md:text-[10vw] leading-[0.85] font-black uppercase tracking-tighter mb-8 mix-blend-difference"
        >
          <div className="archive-hero-title-line overflow-hidden py-1">
            <span className="inline-block">Selected</span>
          </div>
          <div className="archive-hero-title-line overflow-hidden py-1">
            <span className="inline-block text-transparent stroke-text-2">Work</span>
          </div>
        </h1>

        <div className="archive-hero-description max-w-2xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            {totalProjects} curated experiences showcasing expertise in creating 
            immersive digital products, from concept to deployment.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar flex flex-wrap justify-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-primary text-black"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
