"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, Cpu, Zap, Box, Layers } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const CHARS = "ABCDEFGHIKLMNOPQRSTUVWYZ0123456789!@#$%^&*()_+"

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  
  useEffect(() => {
    let interval: NodeJS.Timeout
    const startTimeout = setTimeout(() => {
      let iteration = 0
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) return text[index]
              if (char === " ") return " "
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join("")
        )

        if (iteration >= text.length) clearInterval(interval)
        iteration += 1 / 3
      }, 30)
    }, delay * 1000)

    return () => {
      clearTimeout(startTimeout)
      if (interval) clearInterval(interval)
    }
  }, [text, delay])

  return (
    <span className="font-mono">{displayText || "\u00A0".repeat(text.length)}</span>
  )
}

const experiments = [
  {
    id: "01",
    title: "Generative Art",
    desc: "Algorithmic patterns & chaos.",
    icon: Layers,
    color: "from-purple-500/20 to-blue-500/20",
    border: "group-hover:border-purple-500/50"
  },
  {
    id: "02",
    title: "Physics Sim",
    desc: "Interactive matter & gravity.",
    icon: Box,
    color: "from-green-500/20 to-emerald-500/20",
    border: "group-hover:border-green-500/50"
  },
  {
    id: "03",
    title: "AI Agents",
    desc: "Autonomous digital entities.",
    icon: Cpu,
    color: "from-orange-500/20 to-red-500/20",
    border: "group-hover:border-orange-500/50"
  },
  {
    id: "04",
    title: "WebGL Shader",
    desc: "High-performance graphics.",
    icon: Zap,
    color: "from-cyan-500/20 to-blue-500/20",
    border: "group-hover:border-cyan-500/50"
  }
]

export function DigitalPlayground() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".experiment-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-12 bg-background relative z-10 overflow-hidden">
       {/* Section Header */}
       <div className="container mx-auto mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="block text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">
               // <ScrambleText text="R&D_LAB" />
            </span>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]">
               Digital<br/>
               <span className="text-transparent stroke-text-2">Playground</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground text-lg leading-relaxed md:text-right">
             A sandbox for experimental ideas, creative coding, and pushing the boundaries of what's possible on the web.
          </p>
       </div>

       {/* Grid */}
       <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiments.map((item) => (
             <div 
               key={item.id}
               className={`experiment-card group relative h-[400px] rounded-3xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${item.border}`}
             >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                   <div className="flex justify-between items-start">
                      <span className="font-mono text-xs opacity-50">{item.id}</span>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
                         <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                   </div>

                   <div>
                      <item.icon className="w-8 h-8 text-white mb-4 opacity-80 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                      <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 text-white">{item.title}</h3>
                      <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                        {item.desc}
                      </p>
                   </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
             </div>
          ))}
       </div>
    </section>
  )
}
