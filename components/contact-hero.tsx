"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ContactHero() {
  const containerRef = useRef<HTMLElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Mouse Follower (Organic Blob) - Constrained to viewport
      const handleMouseMove = (e: MouseEvent) => {
        if (!blobRef.current) return
        // Use transform instead of x/y to prevent scroll issues
        const x = e.clientX - 200 // half of blob width
        const y = e.clientY - 200
        
        gsap.to(blobRef.current, {
          left: Math.max(0, Math.min(x, window.innerWidth - 400)),
          top: Math.max(0, Math.min(y, window.innerHeight - 400)),
          duration: 1,
          ease: "power3.out"
        })
      }

      window.addEventListener("mousemove", handleMouseMove)

      // 2. Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

      tl.fromTo(".contact-hero-tag", {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3
      })

      tl.fromTo(".contact-hero-title-line span", {
        y: "100%",
        rotate: 5
      }, {
        y: "0%",
        rotate: 0,
        duration: 1.5,
        stagger: 0.1,
      }, "-=0.8")

      tl.fromTo(".contact-hero-description", {
        y: 30,
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

      // 4. Infinite Seamless Marquee for Ghost Text
      const marquee = document.querySelector(".contact-ghost-marquee")
      if (marquee) {
        gsap.set(marquee, { xPercent: 0 })
        gsap.to(marquee, {
          xPercent: -50,
          duration: 30,
          ease: "none",
          repeat: -1
        })
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center bg-background pt-20 overflow-hidden"
    >
      {/* 1. Organic Blob Background - Contained */}
      <div 
        ref={blobRef}
        className="fixed w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* 2. Layered Ghost Text - Seamless Infinite Marquee */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none select-none z-0 opacity-[0.03] overflow-hidden hidden md:block">
        <div className="contact-ghost-marquee flex whitespace-nowrap will-change-transform" style={{ width: "fit-content" }}>
          <span className="text-[35vw] font-black uppercase tracking-tighter leading-none px-8 shrink-0">
            CONNECT
          </span>
          <span className="text-[35vw] font-black uppercase tracking-tighter leading-none px-8 shrink-0">
            CONNECT
          </span>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        {/* Section Tag */}
        <span className="contact-hero-tag text-primary text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] mb-4 md:mb-8 inline-flex items-center gap-3">
          <span className="w-6 md:w-8 h-[1px] bg-primary" />
          Get in Touch
          <span className="w-6 md:w-8 h-[1px] bg-primary" />
        </span>

        {/* Title with Reveal Animation - BIGGER */}
        <h1 
          ref={titleRef}
          className="text-[20vw] md:text-[14vw] lg:text-[12vw] leading-[0.9] font-black uppercase tracking-tighter mb-6 md:mb-8 mix-blend-difference"
        >
          <div className="contact-hero-title-line overflow-visible py-2 md:py-3">
            <span className="inline-block text-white">Let's</span>
          </div>
          <div className="contact-hero-title-line overflow-visible py-2 md:py-3 px-1">
            <span className="inline-block text-transparent stroke-text-2">Connect</span>
          </div>
        </h1>

        {/* Description */}
        <div className="contact-hero-description max-w-sm md:max-w-2xl mx-auto">
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-medium">
            I'm always open to new challenges and creative collaborations. 
            Let's build something that matters.
          </p>
        </div>
      </div>
    </section>
  )
}
