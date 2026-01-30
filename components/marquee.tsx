"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Props for a single row in the Marquee.
 */
interface MarqueeRowProps {
  items: string[]
  direction?: "left" | "right"
  speed?: number
  className?: string
  rowIndex: number
}

/**
 * A single infinite scrolling row of the marquee.
 * Handles seamless looping and speed adjustments based on scroll velocity.
 */
function MarqueeRow({ items, direction = "left", speed = 100, className, rowIndex }: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  
  const speedMultiplier = rowIndex === 1 ? 2.5 : 1.8
  const baseSpeed = direction === "left" ? -speedMultiplier : speedMultiplier
  
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animationId: number
    let currentSpeed = baseSpeed
    let targetSpeed = baseSpeed
    
    // Get half width of the track (one copy)
    const getHalfWidth = () => track.scrollWidth / 2

    const animate = () => {
      // Smooth lerp towards target speed
      currentSpeed += (targetSpeed - currentSpeed) * 0.08
      
      xRef.current += currentSpeed
      
      // Reset position for seamless loop
      const halfWidth = getHalfWidth()
      if (xRef.current <= -halfWidth) {
        xRef.current += halfWidth
      } else if (xRef.current >= 0) {
        xRef.current -= halfWidth
      }
      
      gsap.set(track, { x: xRef.current })
      animationId = requestAnimationFrame(animate)
    }
    
    // Start with correct initial position
    xRef.current = direction === "left" ? 0 : -getHalfWidth()
    
    animate()

    let directionMultiplier = 1
    
    const scrollTrigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity()
        
        if (Math.abs(velocity) > 50) {
          const scrollDirection = velocity > 0 ? 1 : -1
          
          directionMultiplier = scrollDirection > 0 ? 1 : -1
          
          // Boost speed based on scroll velocity
          const boost = Math.min(Math.abs(velocity) / 80, 20)
          targetSpeed = baseSpeed * directionMultiplier * (1 + boost)
        }
      }
    })

    const onScrollEnd = () => {
      targetSpeed = baseSpeed * directionMultiplier
    }
    ScrollTrigger.addEventListener("scrollEnd", onScrollEnd)

    return () => {
      cancelAnimationFrame(animationId)
      scrollTrigger.kill()
      ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd)
    }
  }, [direction, baseSpeed])

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
      <div ref={trackRef} className="flex will-change-transform" style={{ width: "max-content" }}>
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  )
}

/**
 * Main Marquee component displaying scrolling rows of skills or keywords.
 * Creates a dynamic, multi-directional kinetic typography effect.
 */
export function Marquee({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const row1 = items.slice(0, Math.ceil(items.length / 2))
  const row2 = items.slice(Math.ceil(items.length / 2))

  return (
    <div ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-background select-none">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black leading-none text-primary uppercase select-none">
          SKILLS
        </div>
      </div>

      <div className="relative z-10 space-y-4 md:space-y-4 -rotate-3 scale-110">
        <MarqueeRow items={row1} direction="left" speed={120} className="py-2" rowIndex={0} />
        <MarqueeRow items={row2} direction="right" speed={100} className="py-2" rowIndex={1} />
        <MarqueeRow items={[...row1].reverse()} direction="left" speed={140} className="py-2 opacity-50" rowIndex={2} />
      </div>
      
      <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
    </div>
  )
}
