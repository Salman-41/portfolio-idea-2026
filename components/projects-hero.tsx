"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function ProjectsHero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.5 },
      )
      gsap.fromTo(
        descRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="pt-40 pb-20 md:pt-48 md:pb-32 relative grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary border border-primary/30 rounded-full mb-8">
            Portfolio
          </span>
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 leading-[0.95]"
          >
            Selected <span className="gradient-text">Work</span>
          </h1>
          <p ref={descRef} className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
            A collection of projects showcasing my expertise in creating immersive digital experiences, from concept to
            deployment.
          </p>
        </div>
      </div>
    </section>
  )
}
