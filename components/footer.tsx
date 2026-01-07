"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
]

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".animate-item") || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        },
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="py-20 md:py-32 border-t border-border">
      <div ref={contentRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* CTA Section */}
        <div className="animate-item mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8">
            Let&apos;s work <span className="gradient-text">together</span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            data-cursor-hover
          >
            <Mail className="w-5 h-5" />
            <span>Get in Touch</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Footer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="animate-item lg:col-span-2">
            <Link href="/" className="inline-block mb-4" data-cursor-hover>
              <span className="text-2xl font-bold tracking-tight">
                Alex<span className="text-primary">.</span>Chen
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Creative developer crafting immersive digital experiences. Based in San Francisco, working worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div className="animate-item">
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors duration-300 line-animation"
                    data-cursor-hover
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="animate-item">
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Connect</h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
                    data-cursor-hover
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="animate-item pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Alex Chen. All rights reserved.</p>
          <p>
            Designed & Developed with <span className="text-primary">♥</span> in San Francisco
          </p>
        </div>
      </div>
    </footer>
  )
}
