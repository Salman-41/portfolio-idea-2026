"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with a deep dive into your goals, target audience, and project requirements. Understanding the problem is half the solution.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Based on our discovery, I develop a comprehensive strategy including technical architecture, design direction, and project timeline.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Visual concepts come to life through wireframes, mockups, and interactive prototypes. Iteration is key to achieving the perfect result.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Clean, maintainable code brings the designs to reality. I build with performance, accessibility, and scalability in mind.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Thorough testing, optimization, and a carefully planned launch. But this isn't the end—it's just the beginning of your product's journey.",
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Animate the vertical line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        },
      )

      // Animate steps
      const stepItems = stepsRef.current?.querySelectorAll(".process-step")
      stepItems?.forEach((step) => {
        gsap.fromTo(
          step,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-card/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-16 max-w-2xl">
          <span className="block text-sm uppercase tracking-[0.3em] text-primary mb-4">Process</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">How I Work</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A proven process that ensures every project is delivered on time, on budget, and exceeds expectations.
          </p>
        </div>

        <div ref={stepsRef} className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-primary origin-top hidden md:block"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className="process-step relative flex gap-8 md:gap-12">
                {/* Number */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <span className="text-lg md:text-xl font-bold text-primary">{step.number}</span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2 md:pt-4">
                  <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
