import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { TransitionLink } from "./transition-link"

export function AboutPreview() {
  return (
    <section className="folio-about">
      <div className="folio-about-portrait"><div className="folio-portrait-image"><Image src="/images/11.jpeg" alt="Salman Yousufzai" fill sizes="(max-width: 767px) 88vw, 33vw" className="object-cover object-top" /></div><div className="folio-portrait-caption"><span>Salman, behind the screen.</span><span>Swat / PK</span></div><span className="folio-portrait-mark" aria-hidden="true">✳</span></div>
      <div className="folio-about-copy"><span className="folio-label">02 / A bit about me</span><h2>I like making<br /><span className="folio-serif">things work.</span></h2><p>I’m a developer and data scientist from Swat, Pakistan. I work with code, interfaces, and data.</p><p>I like the small decisions: how a page moves, where a button sits, whether a chart actually tells you something. That’s where I spend my time.</p><TransitionLink href="/about" className="folio-text-link" data-cursor-hover>More about me <ArrowUpRight size={18} /></TransitionLink></div>
    </section>
  )
}
