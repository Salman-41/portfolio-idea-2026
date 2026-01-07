"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface MarqueeProps {
  items: string[]
  direction?: "left" | "right"
  speed?: number
}

export function Marquee({ items, direction = "left", speed = 50 }: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const content = contentRef.current
    if (!content) return

    const contentWidth = content.offsetWidth / 2
    const duration = contentWidth / speed

    gsap.to(content, {
      x: direction === "left" ? -contentWidth : contentWidth,
      duration,
      ease: "none",
      repeat: -1,
    })
  }, [direction, speed])

  return (
    <div ref={marqueeRef} className="overflow-hidden py-8 border-y border-border">
      <div ref={contentRef} className="flex items-center gap-12 whitespace-nowrap" style={{ width: "fit-content" }}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground/10">{item}</span>
            <span className="text-primary text-4xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
