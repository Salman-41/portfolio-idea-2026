"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
  { value: "15+", label: "Awards Won" },
]

export function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".animate-item") || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        },
      )

      // Stats counter animation
      const statValues = statsRef.current?.querySelectorAll(".stat-value")
      statValues?.forEach((stat) => {
        const value = stat.textContent || "0"
        const numericValue = Number.parseInt(value.replace(/\D/g, ""))
        const suffix = value.replace(/[0-9]/g, "")

        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
            },
            onUpdate: () => {
              stat.textContent = Math.round(Number.parseFloat(stat.textContent || "0")) + suffix
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-40 relative bg-card/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <span className="animate-item block text-sm uppercase tracking-[0.3em] text-primary">About Me</span>
            <h2 className="animate-item text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Turning ideas into <span className="gradient-text">immersive</span> digital experiences
            </h2>
            <div className="animate-item space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I&apos;m a creative developer passionate about crafting accessible, pixel-perfect user interfaces that
                blend thoughtful design with robust engineering.
              </p>
              <p>
                My work lies at the intersection of design and development, creating experiences that not only look
                great but are meticulously built for performance and usability.
              </p>
            </div>
            <Link
              href="/about"
              className="animate-item inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
              data-cursor-hover
            >
              <span>Learn More About Me</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="p-8 bg-card border border-border rounded-2xl text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="stat-value text-5xl md:text-6xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
