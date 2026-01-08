"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Download } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function AboutBio() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".animate-item") || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div ref={contentRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Bio */}
          <div className="space-y-8">
            <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight">
              Turning complex problems into <span className="gradient-text">elegant solutions</span>
            </h2>
            <div className="animate-item space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a developer passionate about crafting accessible, pixel-perfect user interfaces that blend
                thoughtful design with robust engineering. My favorite work lies at the intersection of design and
                development, creating experiences that not only look great but are meticulously built for performance
                and usability.
              </p>
              <p>
                Currently, I&apos;m a Senior Front-End Engineer at Klaviyo, specializing in accessibility. I contribute
                to the creation and maintenance of UI components that power the frontend, ensuring our platform meets
                web accessibility standards and best practices.
              </p>
              <p>
                In the past, I&apos;ve had the opportunity to develop software across a variety of settings — from
                advertising agencies and large corporations to start-ups and small digital product studios. I also
                released a comprehensive video course guiding learners through building a web app with the Spotify API.
              </p>
            </div>
            <Link
              href="/salman-yousufzai-resume.pdf"
              className="animate-item inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              data-cursor-hover
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </Link>
          </div>

          {/* Quick Facts */}
          <div className="space-y-8">
            <h3 className="animate-item text-sm uppercase tracking-widest text-muted-foreground">Quick Facts</h3>
            <div className="animate-item grid gap-6">
              {[
                { label: "Location", value: "Swat, Pakistan" },
                { label: "Experience", value: "8+ Years" },
                { label: "Specialization", value: "Frontend & Creative Development" },
                { label: "Education", value: "Computer Science" },
                { label: "Languages", value: "English, Pashto, Urdu" },
                { label: "Interests", value: "Climbing, Reading, Gaming" },
              ].map((fact) => (
                <div key={fact.label} className="flex justify-between items-center py-4 border-b border-border">
                  <span className="text-muted-foreground">{fact.label}</span>
                  <span className="font-medium">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
