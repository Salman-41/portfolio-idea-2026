"use client"

import React, { useRef, useEffect, type ReactNode } from "react"
import gsap from "gsap"

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const content = contentRef.current
    if (!content || !el || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return

    const xTo = gsap.quickTo(content, "x", { duration: 0.45, ease: "power3.out" })
    const yTo = gsap.quickTo(content, "y", { duration: 0.45, ease: "power3.out" })

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height, left, top } = el.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      xTo(x * strength)
      yTo(y * strength)
    }

    const onMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener("mousemove", onMouseMove)
    el.addEventListener("mouseleave", onMouseLeave)
    
    return () => {
      el.removeEventListener("mousemove", onMouseMove)
      el.removeEventListener("mouseleave", onMouseLeave)
      gsap.killTweensOf(content)
      gsap.set(content, { x: 0, y: 0 })
    }
  }, [strength])

  return (
    <div ref={ref} className={className}>
      <div ref={contentRef}>{children}</div>
    </div>
  )
}
