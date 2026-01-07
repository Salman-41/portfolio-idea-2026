"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const projectData: Record<
  string,
  {
    title: string
    category: string
    year: string
    client: string
    role: string
    description: string
    challenge: string
    solution: string
    images: string[]
    tags: string[]
    liveUrl?: string
    githubUrl?: string
    nextProject?: { slug: string; title: string }
  }
> = {
  "nebula-finance": {
    title: "Nebula Finance",
    category: "Web App / Fintech",
    year: "2025",
    client: "Nebula Labs",
    role: "Lead Developer & Designer",
    description:
      "A revolutionary crypto trading platform with real-time analytics and immersive 3D data visualization. Built to handle millions of transactions while providing an intuitive user experience.",
    challenge:
      "The client needed a trading platform that could visualize complex financial data in real-time while maintaining sub-second response times and handling high-frequency trading operations.",
    solution:
      "Implemented WebSocket connections for real-time data streaming, Three.js for immersive 3D visualizations, and optimized React components with virtualization for smooth performance even with large datasets.",
    images: [
      "/dark-fintech-dashboard-with-charts-and-crypto.jpg",
      "/crypto-trading-charts-dark-theme.jpg",
      "/fintech-mobile-app-dark-mode.jpg",
    ],
    tags: ["Next.js", "Three.js", "WebGL", "TypeScript", "WebSocket", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    nextProject: { slug: "artisan-studio", title: "Artisan Studio" },
  },
  "artisan-studio": {
    title: "Artisan Studio",
    category: "E-commerce / Design",
    year: "2025",
    client: "Artisan Furniture Co.",
    role: "Full-Stack Developer",
    description:
      "Luxury furniture e-commerce experience with AR product previews and seamless checkout flow. Designed to elevate the online shopping experience for high-end furniture.",
    challenge:
      "Creating an e-commerce platform that conveyed the luxury and craftsmanship of the furniture while allowing customers to visualize products in their own space before purchasing.",
    solution:
      "Developed a custom AR feature using AR.js that lets customers place 3D furniture models in their rooms. Integrated Stripe for seamless payments and Sanity CMS for easy content management.",
    images: ["/modern-furniture-ecommerce-dark-theme.jpg", "/luxury-furniture-product-page-dark.jpg", "/ar-furniture-preview-app.jpg"],
    tags: ["React", "AR.js", "Stripe", "Sanity", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com",
    nextProject: { slug: "synthwave-records", title: "Synthwave Records" },
  },
  "synthwave-records": {
    title: "Synthwave Records",
    category: "Music / Entertainment",
    year: "2024",
    client: "Synthwave Records",
    role: "Creative Developer",
    description:
      "Interactive record label website featuring audio-reactive visuals and immersive artist experiences. A digital platform that captures the essence of the synthwave genre.",
    challenge:
      "The label wanted a website that would stand out in the music industry, featuring unique interactive elements that respond to music while maintaining usability.",
    solution:
      "Built audio-reactive visualizations using the Web Audio API and Canvas, creating generative art that responds to music in real-time. Each artist page features unique animations and interactive elements.",
    images: ["/synthwave-music-website-neon-dark.jpg", "/music-artist-page-neon-synthwave.jpg", "/audio-visualizer-canvas-art.jpg"],
    tags: ["GSAP", "Web Audio API", "Canvas", "React", "Node.js", "Spotify API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    nextProject: { slug: "nebula-finance", title: "Nebula Finance" },
  },
}

interface ProjectDetailProps {
  slug: string
}

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)

  const project = projectData[slug] || {
    title: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    category: "Project",
    year: "2024",
    client: "Client",
    role: "Developer",
    description: "Project description",
    challenge: "Project challenge",
    solution: "Project solution",
    images: ["/project-showcase-dark-theme.jpg"],
    tags: ["React", "Next.js"],
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".animate-item") || [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 },
      )

      // Content animation
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
            trigger: contentRef.current,
            start: "top 80%",
          },
        },
      )

      // Images parallax
      const images = imagesRef.current?.querySelectorAll(".project-image")
      images?.forEach((img) => {
        gsap.fromTo(
          img,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
            },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <Link
            href="/projects"
            className="animate-item inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12"
            data-cursor-hover
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-widest">Back to Projects</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="animate-item block text-sm uppercase tracking-[0.3em] text-primary mb-4">
                {project.category}
              </span>
              <h1 className="animate-item text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {project.title}
              </h1>
              <p className="animate-item text-xl text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="animate-item">
                <span className="block text-sm uppercase tracking-widest text-muted-foreground mb-2">Year</span>
                <span className="text-lg font-medium">{project.year}</span>
              </div>
              <div className="animate-item">
                <span className="block text-sm uppercase tracking-widest text-muted-foreground mb-2">Client</span>
                <span className="text-lg font-medium">{project.client}</span>
              </div>
              <div className="animate-item">
                <span className="block text-sm uppercase tracking-widest text-muted-foreground mb-2">Role</span>
                <span className="text-lg font-medium">{project.role}</span>
              </div>
              <div className="animate-item flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    data-cursor-hover
                    aria-label="View live site"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    data-cursor-hover
                    aria-label="View source code"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section ref={imagesRef} className="pb-16 md:pb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="project-image aspect-[16/9] relative rounded-2xl overflow-hidden">
            <Image src={project.images[0] || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
            <div className="animate-item">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">The Challenge</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{project.challenge}</p>
            </div>
            <div className="animate-item">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">The Solution</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{project.solution}</p>
            </div>
          </div>

          {/* Additional Images */}
          {project.images.length > 1 && (
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {project.images.slice(1).map((img, i) => (
                <div key={i} className="project-image aspect-[4/3] relative rounded-2xl overflow-hidden">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${i + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="animate-item">
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 border border-border rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      {project.nextProject && (
        <section className="py-16 md:py-24 border-t border-border">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 text-center">
            <span className="block text-sm uppercase tracking-widest text-muted-foreground mb-4">Next Project</span>
            <Link href={`/projects/${project.nextProject.slug}`} className="group inline-block" data-cursor-hover>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight group-hover:text-primary transition-colors">
                {project.nextProject.title}
                <ArrowUpRight className="inline-block w-10 h-10 ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
