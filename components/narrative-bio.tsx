"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const phrases = [
  { text: "I don't just write code.", style: "font-sans font-black text-white" },
  { text: "I engineer digital ecosystems.", style: "font-serif italic text-muted-foreground/80" },
  { text: "Born from the intersection", style: "font-serif italic text-muted-foreground/80" },
  { text: "of functional logic", style: "font-sans font-black text-white" },
  { text: "and aesthetic emotion.", style: "font-serif italic text-muted-foreground/80" },
  { text: "My mission is to obliterate", style: "font-sans font-black text-white" },
  { text: "the line between tool and art.", style: "font-serif italic text-muted-foreground/80" },
  { text: "Every pixel is a decision.", style: "font-sans font-black text-white" },
  { text: "Every interaction is a story.", style: "font-serif italic text-muted-foreground/80" },
  { text: "Let's build the future,", style: "font-serif italic text-muted-foreground/80" },
  { text: "one frame at a time.", style: "font-sans font-black text-primary" }
]

export function NarrativeBio() {
  const containerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".bio-line") as HTMLElement[]
      
      lines.forEach((line) => {
        gsap.fromTo(line, 
          { opacity: 0, y: 40, rotateX: 20 },
          { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "bottom 60%",
              scrub: 1,
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
          <div ref={textRef} className="flex flex-col gap-6">
             {phrases.map((item, i) => (
                <div key={i} className="overflow-hidden">
                    <h2 
                    className={cn(
                        "bio-line text-4xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] transition-all duration-500 origin-bottom-left",
                        item.style
                    )}
                    >
                    {item.text}
                    </h2>
                </div>
             ))}
          </div>
       </div>

       <div className="absolute bottom-10 right-10 text-sm font-bold font-mono text-primary/60 uppercase tracking-widest [writing-mode:vertical-rl]">
          Manifesto_v2.1 // SY
       </div>
    </section>
  )
}
