"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function ContactHero() {
  const heroRef = useRef<HTMLElement>(null)
  const title1Ref = useRef<HTMLSpanElement>(null)
  const title2Ref = useRef<HTMLSpanElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      tl.fromTo(
        title1Ref.current,
        { y: 200, rotate: 10, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: 1.5, delay: 0.2 }
      )
      tl.fromTo(
        title2Ref.current,
        { y: 200, rotate: -5, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: 1.5 },
        "-=1.2"
      )
      tl.fromTo(
        ".hero-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      
      gsap.to(bgRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      <div ref={bgRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] opacity-5 pointer-events-none select-none z-0">
        <h2 className="text-[40vw] font-black uppercase tracking-tighter text-white whitespace-nowrap leading-none stroke-text">
          SAY HELLO
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col">
          <span className="text-primary text-xs uppercase tracking-[0.5em] mb-8 animate-pulse inline-block">
            // Init.Dialogue
          </span>
          <h1 className="flex flex-col text-[16vw] md:text-[14vw] leading-[0.8] font-black uppercase tracking-tighter mix-blend-difference mb-12">
            <span ref={title1Ref} className="inline-block">The</span>
            <span ref={title2Ref} className="inline-block text-transparent stroke-text-2">Conversation</span>
          </h1>
          <p className="hero-desc max-w-2xl text-xl md:text-2xl text-muted-foreground leading-relaxed">
            I’m always open to new challenges and creative collaborations. Let’s build something that matters.
          </p>
        </div>
      </div>
    </section>
  )
}
