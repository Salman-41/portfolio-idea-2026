"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ThreeScene } from "./three-scene"
import { ArrowDown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const CHARS = "ABCDEFGHIKLMNOPQRSTUVWYZ0123456789!@#$%^&*()_+"

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [isRevealed, setIsRevealed] = useState(false)
  
  useEffect(() => {
    let interval: NodeJS.Timeout
    const startTimeout = setTimeout(() => {
      let iteration = 0
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index]
              }
              if (char === " ") return " "
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join("")
        )

        if (iteration >= text.length) {
          clearInterval(interval)
          setIsRevealed(true)
        }

        iteration += 1 / 3
      }, 30)
    }, delay * 1000)

    return () => {
      clearTimeout(startTimeout)
      if (interval) clearInterval(interval)
    }
  }, [text, delay])

  return (
    <span className={isRevealed ? "" : "font-mono opacity-80"}>
      {displayText || "\u00A0".repeat(text.length)}
    </span>
  )
}

interface ArchiveHeroProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  totalProjects: number
}

const filters = ["All", "Web App", "E-commerce", "Creative", "3D/WebGL"]

export function ArchiveHero({ activeFilter, onFilterChange, totalProjects }: ArchiveHeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Effects
      gsap.to(".hero-title-line", {
        x: (i) => (i % 2 === 0 ? -100 : 100),
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
      
      gsap.to(".hero-bg-container", {
        y: 150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Simple Fade In for Filter Bar
      gsap.fromTo(".filter-bar", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power3.out" }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-[80vh] w-full overflow-hidden flex flex-col justify-center p-6 md:p-12 lg:p-16 grid-bg">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 hero-bg-container pointer-events-none">
        <ThreeScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-background/90 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(var(--background-rgb),0.8)_100%)] z-0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center w-full pointer-events-none mb-16">
        <h1 className="flex flex-col w-full text-[13vw] md:text-[11vw] lg:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase mix-blend-difference text-white text-center">
            <span className="hero-title-line block pointer-events-auto hover:text-primary transition-colors duration-500">
                <ScrambleText text="DIGITAL" delay={0.2} />
            </span>
            <span className="hero-title-line block gradient-text pointer-events-auto">
                <ScrambleText text="ARCHIVE" delay={0.5} />
            </span>
        </h1>

        <div className="text-center mt-12 mix-blend-difference text-white">
            <p className="text-sm md:text-base font-light tracking-widest uppercase opacity-70">
                {totalProjects} Curated Experiences & Counting
            </p>
        </div>
      </div>

       {/* Filter Bar - Clean & Minimal - Recreated to match aesthetic */}
       <div className="filter-bar absolute bottom-12 left-0 right-0 z-30 flex justify-center pointer-events-auto">
          <div className="flex flex-wrap gap-2 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
            {filters.map((filter) => (
                <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
                    activeFilter === filter
                    ? "bg-primary text-black shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
                >
                {filter}
                </button>
            ))}
          </div>
       </div>

      {/* Side Decorations */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-8 text-right pointer-events-auto mix-blend-difference text-white">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] [writing-mode:vertical-lr]">
           INDEX // 2026
        </span>
        <div className="w-[1px] h-24 bg-gradient-to-t from-white/50 via-white to-transparent mx-auto" />
      </div>
    </section>
  )
}
