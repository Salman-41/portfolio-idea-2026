"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "Gh" },
  { icon: Linkedin, href: "https://linkedin.com", label: "Li" },
  { icon: Twitter, href: "https://twitter.com", label: "X" },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current?.querySelectorAll(".animate-item") || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        },
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={footerRef} className="py-12 md:py-16 bg-background border-t border-white/5">
      <div className="w-full px-6 md:px-12 lg:px-20">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Socials */}
          <div className="animate-item flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-widest"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Center: Copyright & Handle */}
          <div className="animate-item text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} <span className="text-foreground font-medium">@devousufzai</span>
            </p>
            <p className="text-xs text-muted-foreground/50 mt-1">
              Designed & Developed in Pakistan
            </p>
          </div>

          {/* Right: Logo + Back to Top */}
          <div className="animate-item flex items-center gap-6">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Salman<span className="text-primary">.</span>yz
            </Link>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
            >
              Top <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>

        </div>
        
      </div>
    </footer>
  )
}
