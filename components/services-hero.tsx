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
      // 1. Mouse Follower (Organic Blob) - Constrained to viewport
      const handleMouseMove = (e: MouseEvent) => {
        if (!blobRef.current) return
        const x = e.clientX - 300
        const y = e.clientY - 300
        
        gsap.to(blobRef.current, {
          left: Math.max(-200, Math.min(x, window.innerWidth - 400)),
          top: Math.max(-200, Math.min(y, window.innerHeight - 400)),
          duration: 1,
          ease: "power3.out"
        })
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

      // 3. Infinite Marquee for Ghost Text - seamless loop
      gsap.fromTo(".ghost-marquee", 
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 20,
          ease: "none",
          repeat: -1
        }
      )

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-x-clip overflow-y-visible bg-background pt-20"
    >
      {/* 1. Organic Blob Background - Constrained */}
      <div 
        ref={blobRef}
        className="fixed w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* 2. Layered Ghost Text - Infinite Marquee */}
      <div 
        ref={ghostTextRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none select-none z-0 opacity-[0.03] overflow-hidden"
      >
        <div className="ghost-marquee flex whitespace-nowrap" style={{ width: "fit-content" }}>
          <h2 className="text-[35vw] font-black uppercase tracking-tighter leading-none px-8 shrink-0">
            EXPERTISE
          </h2>
          <h2 className="text-[35vw] font-black uppercase tracking-tighter leading-none px-8 shrink-0">
            EXPERTISE
          </h2>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <h1 
          ref={titleRef}
          className="text-[12vw] md:text-[10vw] leading-[0.85] font-black uppercase tracking-tighter mb-8 mix-blend-difference"
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

        <div className="hero-description max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            We bridge the gap between imagination and execution, building immersive digital 
            experiences that transcend the ordinary. Every pixel is a calculated move toward 
            perfection.
          </p>
        </div>
      </div>
    </section>
  )
}
