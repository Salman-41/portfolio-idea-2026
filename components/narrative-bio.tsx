"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const phrases = [
  "I don't just write code.",
  "I engineer digital ecosystems.",
  "Born from the intersection of functional logic",
  "and aesthetic emotion.",
  "My mission is to obliterate the line",
  "between tool and art.",
  "Every pixel is a decision.",
  "Every interaction is a story.",
  "Let's build the future, one frame at a time."
]

export function NarrativeBio() {
  const containerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".bio-line") as HTMLElement[]
      
      lines.forEach((line) => {
        gsap.fromTo(line, 
          { opacity: 0.1, x: -20 },
          { 
            opacity: 1, 
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.5,
              toggleActions: "play reverse play reverse"
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-40 bg-background relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

       <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div ref={textRef} className="flex flex-col gap-8 md:gap-12">
             {phrases.map((phrase, i) => (
                <h2 
                  key={i}
                  className={cn(
                    "bio-line text-4xl md:text-6xl lg:text-8xl font-black tracking-tight uppercase leading-[0.9] transition-all duration-500",
                    i % 2 === 0 ? "text-white" : "text-white/40"
                  )}
                >
                   {phrase.split(" ").map((word, wIndex) => {
                      const isHighlight = ["code.", "ecosystems.", "emotion.", "art.", "story."].some(k => word.includes(k))
                      return (
                        <span key={wIndex} className={cn("inline-block mr-4", isHighlight && "text-primary")}>
                            {word}
                        </span>
                      )
                   })}
                </h2>
             ))}
          </div>
       </div>

       <div className="absolute bottom-10 right-10 text-sm font-bold font-mono text-primary/60 uppercase tracking-widest [writing-mode:vertical-rl]">
          Manifesto_v2.1 // SY
       </div>
    </section>
  )
}
