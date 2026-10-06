"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"

const names: Record<string, string> = { "/": "Home", "/projects": "Selected work", "/about": "Behind the work", "/services": "Expertise", "/contact": "Let’s talk" }

export function PageTransitionOverlay() {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    const panels = overlay.querySelectorAll(".transition-panel")
    const copy = overlay.querySelector(".transition-copy")
    const reset = () => {
      timelineRef.current?.kill()
      gsap.set(overlay, { autoAlpha: 0 })
      gsap.set(panels, { y: 0, yPercent: 100 })
      overlay.dataset.active = "false"
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    const navigate = (event: Event) => {
      const { pathname: target, navigate: push } = (event as CustomEvent<{ pathname: string; navigate: () => void }>).detail
      if (overlay.dataset.active === "true") return
      overlay.dataset.active = "true"
      const title = overlay.querySelector(".transition-title")
      if (title) title.textContent = names[target] || "Project story"
      timelineRef.current?.kill()
      gsap.set(overlay, { autoAlpha: 1 })
      gsap.set(panels, { y: 0, yPercent: 100 })
      gsap.set(copy, { opacity: 0, y: 20 })
      timelineRef.current = gsap.timeline({ onComplete: push })
        .to(panels, { yPercent: 0, duration: .55, stagger: .045, ease: "power4.inOut" })
        .to(copy, { opacity: 1, y: 0, duration: .28, ease: "power2.out" }, .3)
      // Keep navigation usable if a destination fails or is interrupted.
      timeoutRef.current = setTimeout(reset, 6000)
    }
    window.addEventListener("portfolio:navigate", navigate)
    return () => {
      window.removeEventListener("portfolio:navigate", navigate)
      reset()
    }
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay || overlay.dataset.active !== "true") return
    timelineRef.current?.kill()
    const panels = overlay.querySelectorAll(".transition-panel")
    const copy = overlay.querySelector(".transition-copy")
    timelineRef.current = gsap.timeline({ onComplete: () => {
      gsap.set(overlay, { autoAlpha: 0 })
      overlay.dataset.active = "false"
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    } })
      .to(copy, { opacity: 0, y: -20, duration: .22, ease: "power2.in" }, .12)
      .to(panels, { yPercent: -100, duration: .65, stagger: .045, ease: "power4.inOut" }, .22)
    return () => { timelineRef.current?.kill() }
  }, [pathname])

  return (
    <div ref={overlayRef} id="transition-overlay" className="portfolio-transition" aria-hidden="true" style={{ opacity: 0, visibility: "hidden" }}>
      {[0, 1, 2].map(index => <div key={index} className="transition-panel" />)}
      <div className="transition-copy">
        <span className="transition-kicker">Salman Yousufzai / Portfolio</span>
        <div className="transition-title">Selected work</div>
        <div className="transition-signature"><span>Imagination engineered.</span><span>↗</span></div>
      </div>
    </div>
  )
}
