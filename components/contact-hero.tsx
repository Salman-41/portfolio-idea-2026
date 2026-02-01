"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Contact Hero section component.
 * Features an interactive mouse-following blob, reveal animations, 
 * scroll parallax, and an infinite marquee background.
 */
export function ContactHero() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Initial cinematic state
      gsap.set(".contact-hero-tag", { 
        opacity: 0, 
        y: 60,
        filter: "blur(10px)"
      })
      gsap.set(".contact-hero-title-line", { 
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        y: 40
      })
      gsap.set(".contact-hero-title-line span", { 
        y: "100%",
        scaleY: 1.3,
        transformOrigin: "top"
      })
      gsap.set(".contact-hero-description", { 
        opacity: 0, 
        y: 80,
        filter: "blur(8px)"
      })

      // Cinematic master timeline
      const tl = gsap.timeline({ 
        defaults: { ease: "power4.out" },
        delay: 0.1
      })

      // Tag reveals with blur fade
      tl.to(".contact-hero-tag", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expo.out"
      })

      // Title lines unmask with polygon clip
      tl.to(".contact-hero-title-line", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        y: 0,
        duration: 1.6,
        stagger: 0.2,
        ease: "expo.inOut"
      }, "-=1")

      // Characters slide up and scale
      tl.to(".contact-hero-title-line span", {
        y: "0%",
        scaleY: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out"
      }, "-=1.2")

      // Description blur-in
      tl.to(".contact-hero-description", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expo.out"
      }, "-=0.6")

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


    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center bg-background pt-20 overflow-hidden"
    >


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

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <span className="contact-hero-tag text-primary text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] mb-4 md:mb-8 inline-flex items-center gap-3">
          <span className="w-6 md:w-8 h-[1px] bg-primary" />
          Get in Touch
          <span className="w-6 md:w-8 h-[1px] bg-primary" />
        </span>

        <h1 
          ref={titleRef}
          className="text-[20vw] md:text-[14vw] lg:text-[12vw] leading-[0.9] font-black uppercase tracking-tighter mb-6 md:mb-8 mix-blend-difference"
        >
          <div className="contact-hero-title-line overflow-visible py-2 md:py-3">
            <span className="inline-block text-foreground">Let's</span>
          </div>
          <div className="contact-hero-title-line overflow-visible py-2 md:py-3 px-1">
            <span 
              className="inline-block text-transparent"
              style={{ WebkitTextStroke: '2px var(--foreground)' }}
            >Connect</span>
          </div>
        </h1>

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
