"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ProjectsHero() {
  const containerRef = useRef<HTMLElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ghostTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Mouse Follower (Organic Blob)
      const xTo = gsap.quickTo(blobRef.current, "x", { duration: 1, ease: "power3" })
      const yTo = gsap.quickTo(blobRef.current, "y", { duration: 1, ease: "power3" })

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        xTo(clientX)
        yTo(clientY)
      }

      window.addEventListener("mousemove", handleMouseMove)

      // 2. Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

      tl.fromTo(".projects-hero-title-line span", {
        y: "100%",
        rotate: 5
      }, {
        y: "0%",
        rotate: 0,
        duration: 1.5,
        stagger: 0.1,
        delay: 0.3
      })

      tl.fromTo(".projects-hero-description", {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1
      }, "-=1")

      // 3. Scroll Parallax
      gsap.to(titleRef.current, {
        y: -100,
        scale: 1.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      })

      // 4. Infinite Marquee for Ghost Text
      gsap.to(".projects-ghost-marquee", {
        xPercent: -33.33,
        duration: 20,
        ease: "none",
        repeat: -1
      })

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-20"
    >
      {/* 1. Organic Blob Background */}
      <div 
        ref={blobRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] -ml-[300px] -mt-[300px] rounded-full blur-[120px] opacity-20 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)"
        }}
      />

      {/* 2. Layered Ghost Text - Infinite Marquee */}
      <div 
        ref={ghostTextRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none select-none z-0 opacity-[0.03] overflow-hidden"
      >
        <div className="projects-ghost-marquee flex whitespace-nowrap">
          <h2 className="text-[35vw] font-black uppercase tracking-tighter leading-none px-8">
            PORTFOLIO
          </h2>
          <h2 className="text-[35vw] font-black uppercase tracking-tighter leading-none px-8">
            PORTFOLIO
          </h2>
          <h2 className="text-[35vw] font-black uppercase tracking-tighter leading-none px-8">
            PORTFOLIO
          </h2>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <h1 
          ref={titleRef}
          className="text-[12vw] md:text-[10vw] leading-[0.85] font-black uppercase tracking-tighter mb-8 mix-blend-difference"
        >
          <div className="projects-hero-title-line overflow-hidden py-1">
            <span className="inline-block">Selected</span>
          </div>
          <div className="projects-hero-title-line overflow-hidden py-1">
            <span className="inline-block text-transparent stroke-text-2">Work</span>
          </div>
        </h1>

        <div className="projects-hero-description max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            A curated collection of projects showcasing expertise in creating 
            immersive digital experiences, from concept to deployment.
          </p>
        </div>
      </div>
    </section>
  )
}
