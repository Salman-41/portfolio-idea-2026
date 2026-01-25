"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

interface MarqueeRowProps {
  items: string[]
  direction?: "left" | "right"
  speed?: number
  className?: string
}

function MarqueeRow({ items, direction = "left", speed = 100, className }: MarqueeRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const content = contentRef.current
    if (!content) return

    let ctx = gsap.context(() => {
      const scrollWidth = content.scrollWidth
      const contentWidth = scrollWidth / 3
      if (contentWidth <= 0) return

      const xStart = direction === "left" ? 0 : -contentWidth
      gsap.set(content, { x: xStart })

      const loop = gsap.to(content, {
        x: direction === "left" ? -contentWidth : 0,
        duration: contentWidth / speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % contentWidth)
        },
      })

      const timeScaleSetter = gsap.quickTo(loop, "timeScale", {
        duration: 0.5,
        ease: "power2.out"
      })

      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 100)
          timeScaleSetter(1 + velocity)
        }
      })

      const onScrollEnd = () => {
        gsap.to(loop, { timeScale: 1, duration: 1.2, ease: "power2.inOut" })
      }
      ScrollTrigger.addEventListener("scrollEnd", onScrollEnd)
      return () => ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd)
    }, content)

    return () => ctx.revert()
  }, [items, direction, speed])

  return (
    <div ref={rowRef} className={`whitespace-nowrap flex overflow-hidden ${className}`}>
      <div ref={contentRef} className="flex items-center gap-12 md:gap-20 will-change-transform">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-12 md:gap-20">
            <span className={`text-5xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-700 hover:text-primary ${
              i % 2 === 0 ? "text-foreground" : "text-transparent stroke-text opacity-40"
            }`}>
              {item}
            </span>
            <span className="text-primary text-3xl md:text-5xl opacity-40">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Marquee({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Split items for variety
  const row1 = items.slice(0, Math.ceil(items.length / 2))
  const row2 = items.slice(Math.ceil(items.length / 2))

  return (
    <div ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-background select-none">
      {/* Background kinetic layers */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black leading-none text-primary uppercase select-none">
          SKILLS
        </div>
      </div>

      <div className="relative z-10 space-y-4 md:space-y-4 -rotate-3 scale-110">
        <MarqueeRow items={row1} direction="left" speed={120} className="py-2" />
        <MarqueeRow items={row2} direction="right" speed={100} className="py-2" />
        <MarqueeRow items={[...row1].reverse()} direction="left" speed={140} className="py-2 opacity-50" />
      </div>
      
      {/* Gradient fades on sides */}
      <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
    </div>
  )
}
