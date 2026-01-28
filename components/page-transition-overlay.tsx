"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"

export function PageTransitionOverlay() {
  const pathname = usePathname()
  const isFirstMount = useRef(true)

  useEffect(() => {
    const overlay = document.getElementById("transition-overlay")
    const bars = document.querySelectorAll(".transition-bar")

    if (!overlay) return

    // Skip animation on first mount (handled by preloader)
    if (isFirstMount.current) {
      isFirstMount.current = false
      gsap.set(overlay, { display: "none" })
      gsap.set(bars, { scaleY: 0 })
      gsap.set("main", { opacity: 1, y: 0 })
      return
    }

    // ENTER: Bars slide out, reveal new page
    const tl = gsap.timeline()
    
    tl.to(bars, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.4,
      stagger: 0.04,
      ease: "power3.inOut",
    })
    
    tl.fromTo("main",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      "-=0.25"
    )
    
    tl.set(overlay, { display: "none" })

  }, [pathname])

  return (
    <div
      id="transition-overlay"
      className="fixed inset-0 z-[9999] pointer-events-none flex"
      style={{ display: "none" }}
    >
      {/* Simple horizontal bars for fast transitions */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="transition-bar flex-1 h-full bg-background origin-bottom"
          style={{ transform: "scaleY(0)" }}
        />
      ))}
    </div>
  )
}
