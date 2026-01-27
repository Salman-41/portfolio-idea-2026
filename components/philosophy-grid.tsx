"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Crosshair, Zap, Eye, Boxes } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const philosophies = [
  {
    id: "01",
    title: "Precision",
    desc: "Pixel-perfect isn't a goal, it's the baseline. Every detail is a deliberate decision.",
    icon: Crosshair,
    colSpan: "md:col-span-2",
    accent: "blue-500",
  },
  {
    id: "02",
    title: "Motion",
    desc: "Designing feel, not just look. Interactions that mimic the physical world.",
    icon: Zap,
    colSpan: "md:col-span-1",
    accent: "yellow-500",
  },
  {
    id: "03",
    title: "Clarity",
    desc: "Signal over noise. We distill complex problems into effortless journeys.",
    icon: Eye,
    colSpan: "md:col-span-1",
    accent: "green-500",
  },
  {
    id: "04",
    title: "Architecture",
    desc: "Thinking in systems, not pages. Robust codebases built for future scale.",
    icon: Boxes,
    colSpan: "md:col-span-2",
    accent: "purple-500",
  },
]

export function PhilosophyGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".philosophy-header",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      // Cards staggered reveal with scale and rotation
      cardsRef.current.forEach((card, i) => {
        if (!card) return

        gsap.fromTo(
          card,
          {
            y: 80,
            opacity: 0,
            rotateX: 15,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
          }
        )

        // Parallax background numbers
        const bgNumber = card.querySelector(".bg-number")
        if (bgNumber) {
          gsap.to(bgNumber, {
            y: -40,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // 3D tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    })
  }

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index]
    if (!card) return

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    })
  }

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 px-4 md:px-12 bg-background border-t border-white/5 relative overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Section Header */}
      <div className="philosophy-header container mx-auto mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            Core
            <br />
            <span className="text-transparent stroke-text-2">Philosophy</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-primary" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">
            Guiding_Principles
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophies.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[index] = el }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className={`group relative p-8 md:p-10 rounded-2xl border border-white/10 bg-white/[0.02] ${item.colSpan} overflow-hidden transition-colors duration-500 hover:border-${item.accent}/50 hover:bg-white/[0.04]`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background Number - Parallax */}
              <span className="bg-number absolute -top-6 -right-6 text-[100px] md:text-[140px] font-black text-white/[0.02] leading-none select-none pointer-events-none">
                {item.id}
              </span>

              {/* Content */}
              <div
                className="relative z-10 flex flex-col h-full justify-between gap-8"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="flex justify-between items-start">
                  <div
                    className={`p-4 rounded-xl bg-white/5 border border-white/10 text-${item.accent} group-hover:bg-${item.accent}/10 transition-colors duration-300`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground opacity-50">
                    {item.id}
                  </span>
                </div>

                <div>
                  <h3
                    className={`text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 text-white group-hover:text-${item.accent} transition-colors duration-300`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-md group-hover:text-white/70 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Hover Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-${item.accent}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
