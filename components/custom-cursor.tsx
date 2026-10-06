"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const cursor = ref.current
    if (!cursor || !window.matchMedia("(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)").matches) return
    const xTo = gsap.quickTo(cursor, "x", { duration: .22, ease: "power3.out" })
    const yTo = gsap.quickTo(cursor, "y", { duration: .22, ease: "power3.out" })
    const move = (event: PointerEvent) => {
      cursor.style.opacity = "1"
      xTo(event.clientX)
      yTo(event.clientY)
    }
    const over = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null
      cursor.classList.toggle("is-interactive", !!target?.closest("a, button, input, [data-cursor-hover]"))
    }
    const hide = () => { cursor.style.opacity = "0" }
    window.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("pointerover", over, { passive: true })
    document.addEventListener("pointerleave", hide)
    return () => {
      window.removeEventListener("pointermove", move)
      document.removeEventListener("pointerover", over)
      document.removeEventListener("pointerleave", hide)
      gsap.killTweensOf(cursor)
    }
  }, [])
  return <div ref={ref} className="folio-cursor" aria-hidden="true"><span /></div>
}
