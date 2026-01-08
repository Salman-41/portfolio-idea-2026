"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export function ServicesHero() {
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
      
      tl.fromTo(".hero-tag", {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5
      })

      tl.fromTo(".hero-title-line span", {
        y: "100%",
        rotate: 5
      }, {
        y: "0%",
        rotate: 0,
        duration: 1.5,
        stagger: 0.1,
      }, "-=0.8")

      tl.fromTo(".hero-description", {
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

      gsap.to(ghostTextRef.current, {
        y: 150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
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
      className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-20"
    >
      {/* 1. Organic Blob Background */}
      <div 
        ref={blobRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] -ml-[300px] -mt-[300px] rounded-full blur-[120px] opacity-20 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)"
        }}
      />

      {/* 2. Layered Ghost Text */}
      <div 
        ref={ghostTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 opacity-[0.03]"
      >
        <h2 className="text-[35vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
          EXPERTISE
        </h2>
      </div>

      {/* 3. Main Content Container */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div className="hero-tag mb-8 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] uppercase tracking-[0.4em] font-bold">
          // Digital Solutions Architecture
        </div>

        <h1 
          ref={titleRef}
          className="text-[12vw] md:text-[10vw] leading-[0.85] font-black uppercase tracking-tighter mb-12 mix-blend-difference"
        >
          <div className="hero-title-line overflow-hidden py-1">
            <span className="inline-block">Crafting</span>
          </div>
          <div className="hero-title-line overflow-hidden py-1">
            <span className="inline-block text-transparent stroke-text-2">Infinite</span>
          </div>
          <div className="hero-title-line overflow-hidden py-1">
            <span className="inline-block">Realities</span>
          </div>
        </h1>

        <div className="hero-description max-w-2xl mx-auto space-y-6">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            We bridge the gap between imagination and execution, building immersive digital 
            experiences that transcend the ordinary. Every pixel is a calculated move toward 
            perfection.
          </p>
          
          <div className="flex items-center justify-center gap-12 pt-8">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black text-primary">12+</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Capabilities</span>
            </div>
            <div className="w-px h-12 bg-white/10 hidden md:block" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black text-primary">A+</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Standard</span>
            </div>
            <div className="w-px h-12 bg-white/10 hidden md:block" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black text-primary">2025</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Vision</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Decorative Scroll Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] vertical-text">Scroll to explore</span>
      </div>
    </section>
  )
}
