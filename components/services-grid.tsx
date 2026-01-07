"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Palette, Layers, Lightbulb, Globe, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Custom web applications built with modern technologies like React, Next.js, and TypeScript. Performance-optimized and accessible by default.",
    features: ["Custom Web Apps", "E-commerce Solutions", "CMS Integration", "API Development"],
  },
  {
    icon: Palette,
    title: "Creative Development",
    description:
      "Immersive digital experiences using WebGL, Three.js, and advanced animations. Pushing the boundaries of what's possible on the web.",
    features: ["3D Web Experiences", "Interactive Installations", "WebGL/Three.js", "Motion Design"],
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description:
      "User-centered design that balances aesthetics with functionality. Creating intuitive interfaces that users love to interact with.",
    features: ["Interface Design", "User Research", "Prototyping", "Design Systems"],
  },
  {
    icon: Lightbulb,
    title: "Consulting",
    description:
      "Strategic guidance for your digital projects. From technology selection to team training, I help businesses make informed decisions.",
    features: ["Tech Strategy", "Code Reviews", "Team Training", "Architecture Planning"],
  },
  {
    icon: Globe,
    title: "Performance Optimization",
    description:
      "Speed up your existing applications with thorough audits and optimizations. Core Web Vitals, bundle size, and runtime performance.",
    features: ["Site Audits", "Core Web Vitals", "Bundle Optimization", "SEO Improvements"],
  },
  {
    icon: Zap,
    title: "Maintenance & Support",
    description:
      "Ongoing support and maintenance for your digital products. Bug fixes, updates, and continuous improvements to keep things running smoothly.",
    features: ["Bug Fixes", "Feature Updates", "Security Patches", "24/7 Monitoring"],
  },
]

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".service-card")
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                "service-card group p-8 rounded-2xl border border-border bg-card/50 transition-all duration-500 cursor-pointer",
                expandedIndex === index && "bg-card border-primary/50",
              )}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              }}
              role="button"
              tabIndex={0}
              data-cursor-hover
            >
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>

              {/* Expanded features */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-500",
                  expandedIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="pt-6 border-t border-border">
                  <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">What&apos;s Included</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Expand indicator */}
              <div className="mt-6 flex items-center gap-2 text-sm text-primary">
                <span>{expandedIndex === index ? "Show less" : "Learn more"}</span>
                <span className={cn("transition-transform duration-300", expandedIndex === index ? "rotate-180" : "")}>
                  ↓
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
