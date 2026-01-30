"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { TransitionLink } from "./transition-link"
import { ArrowDown } from "lucide-react"
import { ThreeScene } from "./three-scene"

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

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Initial Bottom Bar Reveal
      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 0.5 }
        )
      }
      
      // Subtitle Reveal
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 1 },
          "-=0.5"
        )
      }

      // CTA Reveal
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 1 },
          "<"
        )
      }

      // Scroll Indicator Reveal
      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 2 }
        )
        
        gsap.to(scrollIndicatorRef.current, {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        })
      }

      // Parallax Effects
      gsap.to(".hero-title-line", {
        x: (i) => (i % 2 === 0 ? -100 : 100),
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
      
      gsap.to(".hero-bg-container", {
        y: 150,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex flex-col justify-between p-4 md:p-12 lg:p-16 grid-bg">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 hero-bg-container pointer-events-none">
        <ThreeScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-background/90 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(var(--background-rgb),0.8)_100%)] z-0 pointer-events-none" />

      {/* Main Content - Mobile-First Centered Layout */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center w-full pointer-events-none">
        <h1
          ref={titleRef}
          className="flex flex-col w-full text-[17vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] font-black leading-[0.9] tracking-tighter uppercase mix-blend-difference text-white text-center md:text-left"
        >
          {/* Handle - Centered on Mobile */}
          <span className="self-center md:self-start md:pl-[5vw] mb-4 text-[10px] sm:text-xs md:text-base font-mono text-primary/80 tracking-widest uppercase pointer-events-auto">
            @devousufzai
          </span>
          
          {/* Typography - Stacked Vertically, Centered on Mobile */}
          <span className="hero-title-line block pointer-events-auto hover:text-primary transition-colors duration-500 self-center md:self-start md:pl-[5vw]">
            <ScrambleText text="CRAFTING" delay={0.5} />
          </span>
          <span className="hero-title-line block gradient-text pointer-events-auto self-center">
            <ScrambleText text="DIGITAL" delay={0.8} />
          </span>
          <span className="hero-title-line block pointer-events-auto hover:text-primary transition-colors duration-500 self-center md:self-end md:pr-[5vw]">
            <ScrambleText text="ARTISTRY" delay={1.1} />
          </span>
        </h1>

        {/* Mobile Role Badge - Visible only on small screens */}
        <div className="flex md:hidden flex-col items-center gap-1 mt-6 pointer-events-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-medium">Creative Developer</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/50">Swat, Pakistan</span>
        </div>

        {/* Floating Metadata - Desktop Only */}
        <div className="absolute right-4 md:right-[5vw] top-[55%] md:top-[50%] -translate-y-full hidden md:flex flex-col gap-1 items-end text-right pointer-events-auto mix-blend-difference text-white">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium">Creative Developer</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-70">Swat, Pakistan</span>
        </div>
      </div>

      {/* Side Decorations - Desktop Only */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-8 pointer-events-auto mix-blend-difference text-white">
        {["GitHub", "LinkedIn", "Twitter"].map((label) => (
          <a
            key={label}
            href={`https://${label.toLowerCase()}.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] md:text-xs uppercase tracking-[0.3em] hover:text-primary transition-all duration-300 [writing-mode:vertical-lr] hover:translate-x-1"
            data-cursor-hover
          >
            {label}
          </a>
        ))}
        <div className="w-[1px] h-24 bg-gradient-to-b from-white/50 via-white to-transparent mx-auto" />
      </div>

      {/* Side Decorations - Desktop Only */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-8 text-right pointer-events-auto mix-blend-difference text-white">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] [writing-mode:vertical-lr]">
          EST. 2026
        </span>
        <div className="w-[1px] h-24 bg-gradient-to-t from-white/50 via-white to-transparent mx-auto" />
        <div className="flex flex-col items-center gap-4">
           <div className="flex flex-col items-center gap-2 group cursor-pointer">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)] group-hover:scale-150 transition-transform duration-300" />
             <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] [writing-mode:vertical-lr] group-hover:text-primary transition-colors">Available for Work</span>
           </div>
        </div>
      </div>

      {/* Bottom Bar - Mobile Optimized */}
      <div ref={bottomBarRef} className="relative z-30 flex flex-col md:flex-row justify-between items-center md:items-end w-full pointer-events-none gap-4 pb-2 md:pb-0">
         
         {/* Description - Desktop Only */}
         <div className="hidden md:flex flex-col gap-2 items-start text-left pointer-events-auto mix-blend-difference text-white">
            <div ref={subtitleRef} className="max-w-md">
               <p className="text-sm opacity-80 leading-relaxed font-light tracking-wide border-l border-primary/20 pl-4">
                 Merging architectural precision with fluid motion design. 
                 Engineering high-performance interfaces that transform 
                 complex data into captivating visual narratives.
               </p>
            </div>
         </div>

         {/* Scroll Indicator - Desktop Only */}
         <div ref={scrollIndicatorRef} className="hidden lg:flex flex-col items-center gap-2 text-white/30 absolute left-1/2 bottom-12 -translate-x-1/2 pointer-events-none mix-blend-difference">
            <span className="text-[10px] uppercase tracking-[0.3em] mb-2">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
         </div>

         {/* CTAs - Centered on Mobile, Right on Desktop */}
         <div className="flex flex-col gap-4 items-center md:items-end pointer-events-auto md:ml-auto">
            <div ref={ctaRef} className="flex flex-row gap-3 items-center justify-center md:justify-end">
               <TransitionLink
                 href="/projects"
                 className="group relative px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary"
                 data-cursor-hover
               >
                 <span className="relative z-10 text-[11px] uppercase tracking-wider transition-colors">View Projects</span>
               </TransitionLink>
               
               <TransitionLink
                 href="/contact"
                 className="group relative w-11 h-11 flex items-center justify-center rounded-full bg-primary text-primary-foreground overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]"
                 data-cursor-hover
               >
                  <ArrowDown className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
               </TransitionLink>
             </div>
         </div>
      </div>
    </section>
  )
}
