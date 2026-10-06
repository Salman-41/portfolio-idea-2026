"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { TransitionLink } from "./transition-link"
import { selectedProjects } from "@/lib/selected-projects"

gsap.registerPlugin(ScrollTrigger)

export function FeaturedProjects() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = ref.current?.querySelectorAll<HTMLElement>(".folio-project")
      if (!cards || cards.length < 2) return
      gsap.to(cards[0], { scale: .96, transformOrigin: "center top", ease: "none", scrollTrigger: { trigger: cards[1], start: "top 85%", end: "top 130px", scrub: true } })
    })
    return () => mm.revert()
  }, [])
  return (
    <section ref={ref} id="selected-work" className="folio-work">
      <div className="folio-section-head"><div><span className="folio-label">01 / A closer look</span><h2>Selected<br /><span className="folio-serif">work.</span></h2></div><p>Finance on one side.<br />Furniture on the other.</p><span className="folio-count">(02)</span></div>
      <div className="folio-projects">
        {selectedProjects.map(project => (
          <article key={project.id} className="folio-project" style={{ backgroundColor: project.color }}>
            <TransitionLink href={project.href} className="folio-project-link" data-cursor-hover>
              <div className="folio-project-copy"><span className="folio-project-number">0{project.id} / {project.category}</span><div><h3>{project.title}</h3><p>{project.description}</p></div><div className="folio-project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="folio-case-link">See the project <ArrowUpRight size={18} /></span></div>
              <div className="folio-project-visual"><div className="folio-project-frame"><div className="folio-window-bar" aria-hidden="true"><i /><i /><i /><span>{project.title.toLowerCase().replaceAll(" ", "—")}</span></div><div className="folio-project-image"><Image src={project.image} alt={`${project.title} interface preview`} fill sizes="(max-width: 899px) 88vw, 52vw" className="object-cover" /></div></div><span className="folio-project-year">{project.year} / Design &amp; development</span></div>
            </TransitionLink>
          </article>
        ))}
      </div>
      <div className="folio-work-note"><span>Good work starts with a conversation.</span><TransitionLink href="/contact">Have something in mind? <ArrowUpRight size={16} /></TransitionLink></div>
    </section>
  )
}
