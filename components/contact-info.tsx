"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, MapPin, Clock, Github, Linkedin, Twitter, Instagram } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@alexchen.dev",
    href: "mailto:hello@alexchen.dev",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: null,
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Open for new projects",
    href: null,
  },
]

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
]

export function ContactInfo() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".animate-item") || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="space-y-12 lg:pl-12 lg:border-l border-border">
      {/* Contact Details */}
      <div className="animate-item space-y-8">
        <h2 className="text-2xl font-bold">Contact Details</h2>
        <div className="space-y-6">
          {contactDetails.map((detail) => (
            <div key={detail.label} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <detail.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="block text-sm uppercase tracking-widest text-muted-foreground mb-1">
                  {detail.label}
                </span>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    data-cursor-hover
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span className="text-lg font-medium">{detail.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="animate-item space-y-6">
        <h2 className="text-2xl font-bold">Follow Me</h2>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-xl border border-border flex items-center justify-center hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
              data-cursor-hover
              aria-label={link.label}
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>

      {/* Quick Response */}
      <div className="animate-item p-8 rounded-2xl bg-card border border-border">
        <h3 className="text-xl font-bold mb-4">Quick Response Time</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I typically respond to inquiries within 24-48 hours. For urgent matters, feel free to reach out via email
          directly.
        </p>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">Currently accepting new projects</span>
        </div>
      </div>

      {/* FAQ Teaser */}
      <div className="animate-item">
        <h3 className="text-xl font-bold mb-6">Common Questions</h3>
        <div className="space-y-4">
          {[
            {
              q: "What's your typical project timeline?",
              a: "Most projects take 4-12 weeks depending on scope and complexity.",
            },
            {
              q: "Do you work with international clients?",
              a: "I work with clients worldwide and am flexible with time zones.",
            },
            {
              q: "What's included in your services?",
              a: "Everything from design to development, deployment, and ongoing support.",
            },
          ].map((faq) => (
            <div key={faq.q} className="pb-4 border-b border-border last:border-0">
              <h4 className="font-medium mb-2">{faq.q}</h4>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
