"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Image from "next/image"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@salman.dev", label: "Email" },
]

export function AboutHero() {
  const heroRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.5 },
      )

      // Content animation
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".animate-item") || [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.8 },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-24 relative grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
              <Image
                src="/images/10.jpeg"
                alt="Salman Yousufzai - Creative Developer"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-primary/30 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <span className="animate-item inline-block px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary border border-primary/30 rounded-full mb-8">
              About Me
            </span>
            <h1 className="animate-item text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              Salman Yousufzai
            </h1>
            <p className="animate-item text-xl md:text-2xl text-primary font-medium mb-6">
              Creative Developer & Designer
            </p>
            <p className="animate-item text-lg text-muted-foreground leading-relaxed mb-8">
              I build accessible, pixel-perfect digital experiences for the web. Currently based in Swat, Pakistan,
              working with clients worldwide to bring their visions to life.
            </p>

            {/* Social Links */}
            <div className="animate-item flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300"
                  data-cursor-hover
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
