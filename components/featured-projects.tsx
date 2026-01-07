"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "Nebula Finance",
    category: "Web App / Fintech",
    description:
      "A revolutionary crypto trading platform with real-time analytics and immersive 3D data visualization.",
    image: "/dark-fintech-dashboard-with-charts-and-crypto.jpg",
    tags: ["Next.js", "Three.js", "WebGL"],
    href: "/projects/nebula-finance",
  },
  {
    id: 2,
    title: "Artisan Studio",
    category: "E-commerce / Design",
    description: "Luxury furniture e-commerce experience with AR product previews and seamless checkout flow.",
    image: "/modern-furniture-ecommerce-dark-theme.jpg",
    tags: ["React", "AR.js", "Stripe"],
    href: "/projects/artisan-studio",
  },
  {
    id: 3,
    title: "Synthwave Records",
    category: "Music / Entertainment",
    description: "Interactive record label website featuring audio-reactive visuals and immersive artist experiences.",
    image: "/synthwave-music-website-neon-dark.jpg",
    tags: ["GSAP", "Web Audio", "Canvas"],
    href: "/projects/synthwave-records",
  },
]

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".animate-item") || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        },
      )

      // Project cards animation
      const projectCards = projectsRef.current?.querySelectorAll(".project-card")
      projectCards?.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-40 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16 md:mb-24">
          <span className="animate-item block text-sm uppercase tracking-[0.3em] text-primary mb-4">Selected Work</span>
          <h2 className="animate-item text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Featured Projects
          </h2>
          <p className="animate-item max-w-xl text-muted-foreground text-lg leading-relaxed">
            A curated selection of projects showcasing my expertise in design, development, and creative
            problem-solving.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <Link key={project.id} href={project.href} className="project-card group block" data-cursor-hover>
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-16 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-3/5 relative overflow-hidden rounded-2xl">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-2/5 space-y-6">
                  <span className="text-sm uppercase tracking-widest text-muted-foreground">{project.category}</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs uppercase tracking-wider border border-border rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300">
                    <span>View Project</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-16 md:mt-24 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-medium rounded-full transition-all duration-300 hover:border-primary hover:text-primary"
            data-cursor-hover
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
