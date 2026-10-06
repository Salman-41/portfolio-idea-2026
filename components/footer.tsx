"use client"

import { ArrowUp, ArrowUpRight } from "lucide-react"
import { TransitionLink } from "./transition-link"
import { Magnetic } from "./magnetic"

export function Footer() {
  return (
    <footer className="folio-footer">
      <div className="folio-footer-top"><span className="folio-label">03 / Your turn</span><span className="folio-status"><i /> Open to new projects</span></div>
      <div className="folio-footer-invite"><h2>Got an idea?<br /><span className="folio-serif">Let’s talk.</span></h2><Magnetic strength={.15}><TransitionLink href="/contact" className="folio-contact-circle" data-cursor-hover aria-label="Start a conversation"><ArrowUpRight size={44} strokeWidth={1.3} /><span>Say hello</span></TransitionLink></Magnetic></div>
      <div className="folio-footer-details"><a href="mailto:salmanyousufzai@gmail.com" className="folio-email">salmanyousufzai@gmail.com <ArrowUpRight size={16} /></a><p>A website, a collaboration, or a question.<br />I’d like to hear about it.</p></div>
      <div className="folio-footer-bottom"><span>© {new Date().getFullYear()} Salman Yousufzai</span><nav aria-label="Footer navigation">{[{href:"/projects",label:"Work"},{href:"/about",label:"About"},{href:"/services",label:"Services"}].map(link=><TransitionLink key={link.href} href={link.href}>{link.label}</TransitionLink>)}</nav><button onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>Back to top <ArrowUp size={13} /></button></div>
    </footer>
  )
}
