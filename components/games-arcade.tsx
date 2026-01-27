"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function GamesArcade() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
        }
      })

      // Reveal Title characters
      tl.fromTo(
        ".char-reveal", 
        { y: 100, opacity: 0, rotateX: -90 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          stagger: 0.05, 
          duration: 1, 
          ease: "expo.out" 
        }
      )

      // Line expansion
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "expo.inOut" },
        "-=0.8"
      )

      // Subtitle Reveal
      tl.fromTo(
        ".sub-reveal",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
        "-=0.5"
      )

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-12 min-h-[80vh] flex flex-col justify-center bg-black relative overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
        
        <div className="container mx-auto relative z-10">
            {/* Massive Typography Title */}
            <div className="relative mb-8 leading-none">
                <h2 className="text-[12vw] font-black uppercase tracking-tighter text-white mix-blend-difference overflow-hidden">
                   {Array.from("SQL").map((char, i) => (
                       <span key={i} className="char-reveal inline-block">{char}</span>
                   ))}
                </h2>
                <h2 className="text-[12vw] font-black uppercase tracking-tighter text-transparent stroke-text-2 opacity-50 ml-[10vw] -mt-[4vw] overflow-hidden">
                    {Array.from("TRAINING").map((char, i) => (
                       <span key={i} className="char-reveal inline-block">{char}</span>
                   ))}
                </h2>
            </div>

            {/* Separator Line */}
            <div ref={lineRef} className="w-full h-px bg-white/20 mb-12 origin-left" />

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
                <div className="md:col-span-1 space-y-2">
                    <div className="sub-reveal text-xs font-mono uppercase tracking-widest text-cyan-500">
                        // System Status: Online
                    </div>
                    <div className="sub-reveal text-sm text-muted-foreground leading-relaxed">
                        Master the art of data forensics. Solve simulated cyber-crimes using real SQL syntax.
                    </div>
                </div>

                <div className="md:col-span-1 flex flex-col gap-4">
                     <div className="sub-reveal flex items-center gap-4 text-white/50 text-sm font-mono">
                        <span>[01] SYNTAX TRAINING</span>
                        <div className="h-px flex-1 bg-white/10" />
                     </div>
                     <div className="sub-reveal flex items-center gap-4 text-white/50 text-sm font-mono">
                        <span>[02] LOGIC PUZZLES</span>
                        <div className="h-px flex-1 bg-white/10" />
                     </div>
                     <div className="sub-reveal flex items-center gap-4 text-white/50 text-sm font-mono">
                        <span>[03] ADVANCED FORENSICS</span>
                        <div className="h-px flex-1 bg-white/10" />
                     </div>
                </div>

                <div className="md:col-span-1 flex justify-end">
                    <Link href="/detective" className="sub-reveal group relative inline-flex items-center gap-4 text-2xl font-bold uppercase text-white hover:text-cyan-400 transition-colors">
                        <span>Enter Training</span>
                        <div className="relative w-12 h-12 rounded-full border border-white/30 flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-colors">
                            <ArrowUpRight className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-cyan-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}
