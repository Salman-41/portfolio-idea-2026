"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Safe useLayoutEffect for SSR
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

interface MarqueeProps {
  items: string[]
  direction?: "left" | "right"
  speed?: number
}

export function Marquee({ items, direction = "left", speed = 100 }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const content = contentRef.current
    if (!content) return

    let ctx = gsap.context(() => {
      // Precise measurement of single content block
      const scrollWidth = content.scrollWidth
      const contentWidth = scrollWidth / 3
      
      if (contentWidth <= 0) return

      // INSTANT initialization to avoid flicker
      // We essentially teleport the strip to the start of the valid range
      const xStart = direction === "left" ? 0 : -contentWidth
      gsap.set(content, { x: xStart })

      const loop = gsap.to(content, {
        x: direction === "left" ? -contentWidth : 0,
        duration: contentWidth / speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const val = parseFloat(x)
            // Mathematically identical wrapping for both directions
            return val % contentWidth
          })
        },
        paused: false,
      })

      // Scroll Velocity Integration
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity() / 80
          const scrollDir = self.direction // 1 (down), -1 (up)
          
          // Down (1) -> Reverse logic, Up (-1) -> Speed up
          const targetTimeScale = scrollDir === -1 ? (1 + Math.abs(velocity)) : -(1 + Math.abs(velocity))

          gsap.to(loop, {
            timeScale: targetTimeScale,
            duration: 0.3,
            overwrite: "auto",
            ease: "power2.out"
          })
        }
      })

      const onScrollEnd = () => {
        gsap.to(loop, { timeScale: 1, duration: 1.2, ease: "power2.inOut" })
      }

      ScrollTrigger.addEventListener("scrollEnd", onScrollEnd)

      return () => {
        ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd)
      }
    }, contentRef)

    return () => ctx.revert()
  }, [items, direction, speed])

  return (
    <div ref={containerRef} className="relative overflow-hidden py-10 md:py-16 border-y border-white/5 bg-background select-none">
      <div 
        ref={contentRef} 
        className="flex items-center gap-12 md:gap-20 whitespace-nowrap will-change-transform" 
        style={{ width: "fit-content" }}
      >
        {/* Triple-cloned items for absolute gapless looping */}
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-12 md:gap-20">
            <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground/15 transition-colors duration-500 hover:text-primary/30">
              {item}
            </span>
            <span className="text-primary text-3xl md:text-5xl opacity-30">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
