"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const categories = ["All", "Web App", "E-commerce", "Creative", "3D/WebGL"]

const projects = [
  {
    id: 1,
    title: "Nebula Finance",
    category: "Web App",
    description:
      "A revolutionary crypto trading platform with real-time analytics and immersive 3D data visualization.",
    image: "/dark-fintech-dashboard-with-charts-and-crypto.jpg",
    tags: ["Next.js", "Three.js", "WebGL", "TypeScript"],
    year: "2025",
    href: "/projects/nebula-finance",
    featured: true,
  },
  {
    id: 2,
    title: "Artisan Studio",
    category: "E-commerce",
    description: "Luxury furniture e-commerce experience with AR product previews and seamless checkout flow.",
    image: "/modern-furniture-ecommerce-dark-theme.jpg",
    tags: ["React", "AR.js", "Stripe", "Sanity"],
    year: "2025",
    href: "/projects/artisan-studio",
    featured: true,
  },
  {
    id: 3,
    title: "Synthwave Records",
    category: "Creative",
    description: "Interactive record label website featuring audio-reactive visuals and immersive artist experiences.",
    image: "/synthwave-music-website-neon-dark.jpg",
    tags: ["GSAP", "Web Audio", "Canvas", "React"],
    year: "2024",
    href: "/projects/synthwave-records",
    featured: true,
  },
  {
    id: 4,
    title: "Orbital Space",
    category: "3D/WebGL",
    description: "An immersive 3D space exploration experience built with Three.js and WebGL shaders.",
    image: "/3d-space-exploration-dark-theme-webgl.jpg",
    tags: ["Three.js", "GLSL", "React Three Fiber"],
    year: "2024",
    href: "/projects/orbital-space",
    featured: false,
  },
  {
    id: 5,
    title: "Meridian Health",
    category: "Web App",
    description: "Healthcare platform with appointment scheduling, telemedicine, and patient portal features.",
    image: "/dark-healthcare-dashboard-modern-ui.jpg",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
    year: "2024",
    href: "/projects/meridian-health",
    featured: false,
  },
  {
    id: 6,
    title: "Velocity Motors",
    category: "E-commerce",
    description: "High-end automotive dealership website with 3D car configurator and virtual showroom.",
    image: "/luxury-car-dealership-dark-website-3d.jpg",
    tags: ["Next.js", "Three.js", "Shopify"],
    year: "2024",
    href: "/projects/velocity-motors",
    featured: false,
  },
]

export function ProjectsGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState(projects)

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((p) => p.category === activeFilter))
    }
  }, [activeFilter])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".project-card")
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [filteredProjects])

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "px-6 py-3 text-sm uppercase tracking-wider rounded-full border transition-all duration-300",
                activeFilter === category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary",
              )}
              data-cursor-hover
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={project.href} className="project-card group block" data-cursor-hover>
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                      <ArrowUpRight className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Year badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs uppercase tracking-wider">
                    {project.year}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-widest text-primary">{project.category}</span>
                  {project.featured && (
                    <span className="text-xs uppercase tracking-wider text-muted-foreground border border-border px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
