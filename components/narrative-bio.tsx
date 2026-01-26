"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDownLeft, Code2, Database, Brain, Palette } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const CHARS = "ABCDEFGHIKLMNOPQRSTUVWYZ0123456789!@#$%^&*()_+"

function ScrambleText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
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
    <span className={`${className} ${isRevealed ? "" : "font-mono opacity-80"}`}>
      {displayText || "\u00A0".repeat(text.length)}
    </span>
  )
}

export function NarrativeBio() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line separators animation
      gsap.fromTo(".separator-line", 
        { scaleX: 0, transformOrigin: "left center" },
        { 
          scaleX: 1, 
          duration: 1.5, 
          ease: "expo.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      )

      // Content fade in
      gsap.fromTo(".bio-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column - Large Statement */}
          <div className="md:col-span-12 lg:col-span-7 flex flex-col justify-between mb-16 lg:mb-0">
            <div>
              <span className="bio-content block text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">
                // <ScrambleText text="THE_HYBRID_APPROACH" delay={0.5} />
              </span>
              <h2 className="bio-content text-4xl md:text-5xl lg:text-7xl font-sans font-medium leading-[1.1] tracking-tight mb-12">
                Bridging the gap between <span className="text-transparent stroke-text-2">Data Intelligence</span> & <span className="font-serif italic text-muted-foreground">Creative Expression</span>
              </h2>
            </div>
            
            <div className="hidden md:block">
              <ArrowDownLeft className="bio-content w-12 h-12 text-primary opacity-50" />
            </div>
          </div>

          {/* Right Column - Dual Expertise Sections */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-12 pt-8 lg:pt-24">
            
            {/* Creative Development Section */}
            <div className="relative group">
              <div className="separator-line absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary to-transparent opacity-50" />
              <div className="pt-6">
                <div className="bio-content flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                      <ScrambleText text="CREATIVE DEV" delay={1.0} />
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">01</span>
                </div>
                <p className="bio-content text-lg text-muted-foreground leading-relaxed mb-6">
                  Crafting immersive digital experiences with WebGL, GSAP, and modern frontend frameworks. I focus on interaction, motion, and visual storytelling.
                </p>
                <div className="bio-content flex flex-wrap gap-2">
                  {["React", "Next.js", "Three.js", "GSAP", "Tailwind"].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-[10px] font-mono uppercase border border-white/10 rounded text-white/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Science Section */}
            <div className="relative group">
              <div className="separator-line absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500 to-transparent opacity-50" />
              <div className="pt-6">
                <div className="bio-content flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-blue-500" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                      <ScrambleText text="DATA SCIENCE" delay={1.5} />
                    </h3>
                  </div>
                   <span className="text-[10px] font-mono text-muted-foreground">02</span>
                </div>
                <p className="bio-content text-lg text-muted-foreground leading-relaxed mb-6">
                  Uncovering insights through EDA, building predictive models with ML, and visualizing complex datasets. Turning raw data into actionable intelligence.
                </p>
                <div className="bio-content flex flex-wrap gap-2">
                  {["Python", "TensorFlow", "Pandas", "Scikit-Learn", "EDA"].map((tech) => (
                    <span key={tech} className="px-2 py-1 text-[10px] font-mono uppercase border border-white/10 rounded text-white/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Integration Section */}
             <div className="relative group">
              <div className="separator-line absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500 to-transparent opacity-50" />
              <div className="pt-6">
                 <div className="bio-content flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-purple-500" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                       <ScrambleText text="AI INTEGRATION" delay={2.0} />
                    </h3>
                  </div>
                   <span className="text-[10px] font-mono text-muted-foreground">03</span>
                </div>
                <p className="bio-content text-lg text-muted-foreground leading-relaxed">
                   Bridging the gap by integrating AI models into web applications for smarter, adaptive user interfaces.
                </p>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  )
}
