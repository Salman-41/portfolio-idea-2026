"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      cursor.style.display = "none"
      cursorDot.style.display = "none"
      return
    }

    // Hide on touch devices
    if ("ontouchstart" in window) {
      cursor.style.display = "none"
      cursorDot.style.display = "none"
      return
    }

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.5,
        ease: "power3.out",
      })
      gsap.to(cursorDot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
      })
    }

    const onMouseEnterLink = () => {
      gsap.to(cursor, {
        scale: 2,
        opacity: 0.5,
        duration: 0.3,
      })
    }

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
      })
    }

    window.addEventListener("mousemove", onMouseMove)

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
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  )
}
