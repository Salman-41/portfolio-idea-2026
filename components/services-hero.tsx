"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export function ServicesHero() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ghostTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Initial cinematic state
      gsap.set(".hero-tag", { 
        opacity: 0, 
        y: 60,
        scale: 0.8,
        filter: "blur(10px)"
      })
      gsap.set(".hero-title-line", { 
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        y: 50
      })
      gsap.set(".hero-title-line span", { 
        y: "100%",
        scaleY: 1.3,
        opacity: 0,
        transformOrigin: "top"
      })
      gsap.set(".hero-description", { 
        opacity: 0, 
        y: 80,
        filter: "blur(8px)"
      })

      // Cinematic master timeline
      const tl = gsap.timeline({ 
        defaults: { ease: "power4.out" },
        delay: 0.1
      })

      // Tag reveals with scale and blur
      tl.to(".hero-tag", {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expo.out"
      })

      // Title lines unmask with polygon clip
      tl.to(".hero-title-line", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        y: 0,
        duration: 1.6,
        stagger: 0.2,
        ease: "expo.inOut"
      }, "-=1")

      // Characters slide up and scale
      tl.to(".hero-title-line span", {
        y: "0%",
        scaleY: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out"
      }, "-=1.2")

      // Description blur-in
      tl.to(".hero-description", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expo.out"
      }, "-=0.6")

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

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center overflow-x-clip overflow-y-visible bg-background pt-20"
    >


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
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-12 md:mt-0">
        <h1 
          ref={titleRef}
          className="text-[14vw] md:text-[10vw] leading-[0.85] font-black uppercase tracking-tighter mb-8 mix-blend-difference"
        >
          <div className="hero-title-line overflow-hidden py-1">
            <span className="inline-block">Crafting</span>
          </div>
          <div className="hero-title-line overflow-hidden py-1">
            <span 
              className="inline-block text-transparent"
              style={{ WebkitTextStroke: '2px var(--foreground)' }}
            >Infinite</span>
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
