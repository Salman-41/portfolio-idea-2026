"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import gsap from "gsap"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { TransitionLink } from "./transition-link"
import { Magnetic } from "./magnetic"

const ThreeScene = dynamic(() => import("./three-scene").then(module => module.ThreeScene), { ssr: false })

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = gsap.context(() => {
      gsap.from(".folio-hero-reveal", { opacity: 0, y: 28, duration: .85, stagger: .09, ease: "power3.out", clearProps: "all" })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="folio-hero hero-section">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"><ThreeScene /></div>
      <div className="folio-hero-grid" aria-hidden="true" />
      <div className="folio-hero-top folio-hero-reveal">
        <span className="folio-label">Salman Yousufzai<br /><span>Developer &amp; data scientist</span></span>
        <TransitionLink href="/contact" className="folio-status"><i /> Open to new projects <ArrowUpRight size={13} /></TransitionLink>
      </div>
      <div className="folio-title-wrap">
        <h1>
          <span className="folio-title-row folio-hero-reveal">Crafting<span className="folio-title-mark" aria-hidden="true">✳</span></span>
          <span className="folio-title-row folio-title-middle folio-hero-reveal"><span className="gradient-text">Digital</span><span className="folio-title-note" aria-hidden="true">A little curiosity.<br />A lot of care.<br /><span>Swat, Pakistan ↗</span></span></span>
          <span className="folio-title-row folio-title-last folio-hero-reveal">Artistry<span className="text-primary">.</span></span>
        </h1>
        <span className="folio-margin-note" aria-hidden="true">Code / Design / Data</span>
      </div>
      <div className="folio-hero-bottom folio-hero-reveal">
        <p>I’m Salman. I build websites that feel good to use.<br className="hidden md:block" /> I work across development, design, and data—<br className="hidden md:block" />from the first sketch to the last small detail.</p>
        <Magnetic strength={.18}><a href="#selected-work" className="folio-primary" data-cursor-hover>Take a look <ArrowDown size={18} /></a></Magnetic>
      </div>
      <div className="folio-hero-foot folio-hero-reveal"><a href="#selected-work"><ArrowDown size={12} /> Scroll to explore</a><span>Selected work / 01—02</span></div>
    </section>
  )
}
