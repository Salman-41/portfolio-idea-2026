"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null)
  const [complete, setComplete] = useState(false)
  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem("portfolio-intro-seen") === "true"; sessionStorage.setItem("portfolio-intro-seen", "true") } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setComplete(true); return }
    const ctx = gsap.context(() => {
      gsap.timeline({ onComplete: () => setComplete(true) })
        .from(".folio-intro-word", { y: 30, opacity: 0, duration: .4, ease: "power3.out" })
        .to(ref.current, { yPercent: -100, duration: .65, ease: "power4.inOut" }, .55)
    }, ref)
    return () => ctx.revert()
  }, [])
  if (complete) return null
  return <div ref={ref} className="folio-intro" aria-hidden="true"><span className="folio-intro-word">Hello<span className="text-primary">.</span></span><span className="folio-label">Salman Yousufzai / Portfolio</span></div>
}
