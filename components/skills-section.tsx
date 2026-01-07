"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "CSS / Tailwind", level: 95 },
      { name: "GSAP / Framer Motion", level: 88 },
    ],
  },
  {
    title: "Creative",
    skills: [
      { name: "Three.js / WebGL", level: 85 },
      { name: "Canvas / SVG", level: 82 },
      { name: "Figma / Design", level: 78 },
      { name: "Motion Design", level: 80 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "PostgreSQL", level: 75 },
      { name: "REST / GraphQL", level: 88 },
      { name: "Serverless", level: 80 },
    ],
  },
  {
    title: "Tools & Methods",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "CI/CD", level: 85 },
      { name: "Testing", level: 82 },
      { name: "Accessibility", level: 90 },
    ],
  },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const categories = categoriesRef.current?.querySelectorAll(".skill-category")
      categories?.forEach((category, catIndex) => {
        gsap.fromTo(
          category,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: catIndex * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: category,
              start: "top 85%",
            },
          },
        )

        // Animate skill bars
        const bars = category.querySelectorAll(".skill-bar-fill")
        bars.forEach((bar) => {
          const level = bar.getAttribute("data-level") || "0"
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: `${level}%`,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 90%",
              },
            },
          )
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-16">
          <span className="block text-sm uppercase tracking-[0.3em] text-primary mb-4">Expertise</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Skills & Technologies</h2>
        </div>

        <div ref={categoriesRef} className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-category space-y-8">
              <h3 className="text-xl font-bold text-primary">{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill h-full bg-primary rounded-full"
                        data-level={skill.level}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
