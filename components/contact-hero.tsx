"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function ContactHero() {
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
    <section ref={heroRef} className="pt-40 pb-16 md:pt-48 md:pb-24 relative grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div ref={contentRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          <span className="animate-item inline-block px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary border border-primary/30 rounded-full mb-8">
            Contact
          </span>
          <h1 className="animate-item text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 leading-[0.95]">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h1>
          <p className="animate-item text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can work together to bring
            your vision to life.
          </p>
        </div>
      </div>
    </section>
  )
}
