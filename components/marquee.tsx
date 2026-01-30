"use client"

import { useRef } from "react"

interface MarqueeRowProps {
  items: string[]
  direction?: "left" | "right"
  speed?: number
  className?: string
}

function MarqueeRow({ items, direction = "left", speed = 100, className }: MarqueeRowProps) {
  // Determine animation class based on direction and speed
  const getAnimationClass = () => {
    if (direction === "right") return "marquee-track marquee-track-right"
    if (speed > 120) return "marquee-track marquee-track-left-slow"
    return "marquee-track marquee-track-left"
  }
  
  // Render items for one copy
  const renderItems = () => (
    <div className="flex items-center gap-12 md:gap-20 shrink-0">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-12 md:gap-20 shrink-0">
          <span className={`text-5xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-700 hover:text-primary ${
            i % 2 === 0 ? "text-foreground" : "text-transparent stroke-text opacity-40"
          }`}>
            {item}
          </span>
          <span className="text-primary text-3xl md:text-5xl opacity-40">✦</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className={`whitespace-nowrap flex overflow-hidden ${className}`}>
      <div className={getAnimationClass()}>
        {/* Two identical copies for seamless infinite scroll */}
        {renderItems()}
        {renderItems()}
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
