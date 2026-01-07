"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    period: "2024 — Present",
    title: "Senior Frontend Engineer, Accessibility",
    company: "Klaviyo",
    companyUrl: "https://klaviyo.com",
    description:
      "Build and maintain critical components used to construct Klaviyo's frontend, across the whole product. Work closely with cross-functional teams to implement and advocate for best practices in web accessibility.",
    tags: ["JavaScript", "TypeScript", "React", "Storybook"],
  },
  {
    period: "2021 — 2024",
    title: "Lead Frontend Developer",
    company: "Vercel",
    companyUrl: "https://vercel.com",
    description:
      "Led frontend development for the dashboard team, implementing new features and optimizing performance. Collaborated with design to create intuitive user interfaces and improved build times by 40%.",
    tags: ["Next.js", "React", "TypeScript", "GraphQL"],
  },
  {
    period: "2019 — 2021",
    title: "Creative Developer",
    company: "Basic/Dept",
    companyUrl: "https://basic.agency",
    description:
      "Developed award-winning interactive experiences for Fortune 500 clients. Specialized in WebGL, Three.js, and advanced CSS animations for immersive web experiences.",
    tags: ["Three.js", "GSAP", "WebGL", "React"],
  },
  {
    period: "2017 — 2019",
    title: "Frontend Developer",
    company: "Spotify",
    companyUrl: "https://spotify.com",
    description:
      "Built and maintained features for the web player team. Implemented responsive designs and optimized performance for millions of daily active users.",
    tags: ["React", "Redux", "Node.js", "A/B Testing"],
  },
]

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll(".timeline-item")
      items?.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-card/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-16">
          <span className="block text-sm uppercase tracking-[0.3em] text-primary mb-4">Career</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Experience</h2>
        </div>

        <div ref={itemsRef} className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="timeline-item group grid lg:grid-cols-[200px_1fr] gap-6 lg:gap-12 p-8 rounded-2xl transition-colors duration-300 hover:bg-card"
            >
              <div className="text-sm uppercase tracking-widest text-muted-foreground">{exp.period}</div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                    data-cursor-hover
                  >
                    {exp.company}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs uppercase tracking-wider border border-border rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
