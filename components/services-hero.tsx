"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ServicesHero() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".animate-item") || [],
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.5 },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="pt-40 pb-20 md:pt-48 md:pb-32 relative grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div ref={contentRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          <span className="animate-item inline-block px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary border border-primary/30 rounded-full mb-8">
            Services
          </span>
          <h1 className="animate-item text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 leading-[0.95]">
            How I Can <span className="gradient-text">Help</span>
          </h1>
          <p className="animate-item text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            From concept to deployment, I provide end-to-end solutions for businesses looking to make an impact in the
            digital space.
          </p>
          <Link
            href="/contact"
            className="animate-item inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            data-cursor-hover
          >
            <span>Start a Project</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
