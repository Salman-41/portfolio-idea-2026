"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

/**
 * Custom Cursor component.
 * Renders a custom SVG cursor with jelly/distortion effects based on velocity.
 * Handles hover states for interactive elements.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  
  const [isHovering, setIsHovering] = useState(false)
  
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || "ontouchstart" in window) {
      cursor.style.display = "none"
      return
    }

    const pos = { x: 0, y: 0 }
    const vel = { x: 0, y: 0 }
    let scale = 1
    let rotation = 0

    gsap.set(cursor, { xPercent: -50, yPercent: -50 })

    const update = () => {
      const dx = pos.x - (gsap.getProperty(cursor, "x") as number)
      const dy = pos.y - (gsap.getProperty(cursor, "y") as number)
      
      vel.x += (dx - vel.x) * 0.2
      vel.y += (dy - vel.y) * 0.2
      
      const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y)
      const maxSpeed = 50
      
      const stretchAmount = Math.min(speed / maxSpeed, 0.5)
      const scaleX = 1 + stretchAmount
      const scaleY = 1 - stretchAmount * 0.5
      
      if (speed > 1) {
         rotation = Math.atan2(vel.y, vel.x) * (180 / Math.PI)
      }

      gsap.to(cursor, {
        x: pos.x,
        y: pos.y,
        rotation: rotation,
        scaleX: scaleX * scale,
        scaleY: scaleY * scale,
        duration: 0.1,
        ease: "power2.out"
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      update()
    }

    const onMouseEnterLink = () => {
      scale = 1.5
      setIsHovering(true)
    }

    const onMouseLeaveLink = () => {
      scale = 1
      setIsHovering(false)
    }

    window.addEventListener("mousemove", onMouseMove)
    
    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, [data-cursor-hover]")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink)
      el.addEventListener("mouseleave", onMouseLeaveLink)
    })
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink)
        el.removeEventListener("mouseleave", onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
    >
      <svg
         ref={svgRef}
         width="40"
         height="40"
         viewBox="0 0 50 50"
         className="overflow-visible"
      >
         <defs>
            <filter id="blob-glow">
               <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
               <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
               <feBlend in="SourceGraphic" in2="glow" />
            </filter>
         </defs>
         
         <circle 
            cx="25" 
            cy="25" 
            r="12" 
            fill={isHovering ? "transparent" : "white"}
            stroke={isHovering ? "white" : "transparent"}
            strokeWidth={isHovering ? "2" : "0"}
            filter="url(#blob-glow)"
            className="opacity-90 transition-[fill,stroke,stroke-width] duration-300 ease-out"
         />
      </svg>
    </div>
  )
}
