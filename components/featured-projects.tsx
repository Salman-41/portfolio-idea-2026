"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Magnetic } from "./magnetic"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "Nebula Finance",
    category: "Fintech",
    id_display: "01",
    year: "2024",
    description: "A revolutionary crypto trading platform with real-time analytics.",
    image: "/dark-fintech-dashboard-with-charts-and-crypto.jpg",
    tags: ["Next.js", "WebGL"],
    href: "/projects/nebula-finance",
    color: "#0f172a" // Slate 900
  },
  {
    id: 2,
    title: "Artisan Studio",
    category: "E-commerce",
    id_display: "02",
    year: "2023",
    description: "Luxury furniture e-commerce experience with AR previews.",
    image: "/modern-furniture-ecommerce-dark-theme.jpg",
    tags: ["React", "AR.js"],
    href: "/projects/artisan-studio",
    color: "#1e1b4b" // Indigo 950
  },
  {
    id: 3,
    title: "Synthwave",
    category: "Music",
    id_display: "03",
    year: "2023",
    description: "Interactive record label website with audio-reactive visuals.",
    image: "/synthwave-music-website-neon-dark.jpg",
    tags: ["GSAP", "Canvas"],
    href: "/projects/synthwave-records",
    color: "#2e1065" // Violet 950
  },
  {
    id: 4,
    title: "Cyberpunk Hub",
    category: "Gaming",
    id_display: "04",
    year: "2022",
    description: "Immersive gaming community hub with 3D avatars and real-time chat.",
    image: "/placeholder.svg", 
    tags: ["Three.js", "React"],
    href: "/projects/cyberpunk-hub",
    color: "#020617" // Slate 950
  }
]

export function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
        const cards = document.querySelectorAll(".project-card")
        
        cards.forEach((card, index) => {
            const nextCard = cards[index + 1]
            if (!nextCard) return

            // "Ghostly Blur" Exit Transition
            // As the next card scrolls up, the current one blurs, fades, and drifts
            gsap.to(card, {
                opacity: 0.3,
                filter: "blur(12px)",
                y: -30,
                scrollTrigger: {
                    trigger: nextCard,
                    start: "top bottom", // Starts when next card peaks at bottom
                    end: "top top",      // Ends when next card hits the top
                    scrub: true,
                }
            })
        })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative bg-background pt-20 pb-40">
        
        {/* Header (Non-sticky, scrolls away) */}
        <div className="container mx-auto px-6 md:px-12 mb-20 text-center">
             <span className="text-primary text-sm uppercase tracking-[0.4em] mb-4 block">Selected Works</span>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                 Featured Gallery
             </h2>
        </div>

        <div className="relative">
            {projects.map((project, index) => (
                <div 
                    key={project.id} 
                    className="project-card sticky top-0 h-screen flex items-center justify-center p-4 md:p-8"
                >
                    {/* Card Container */}
                    <Link 
                        href={project.href}
                        className="relative w-full max-w-6xl h-[80vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
                        style={{ backgroundColor: project.color }}
                    >
                        {/* Two Column Layout inside Card */}
                        <div className="flex flex-col md:flex-row h-full">
                            
                            {/* Content Side */}
                            <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between z-10 relative">
                                {/* Top Meta */}
                                <div className="flex justify-between items-center text-sm uppercase tracking-widest text-muted-foreground/60">
                                    <span>{project.id_display} / {project.year}</span>
                                    <span>{project.category}</span>
                                </div>

                                {/* Main Text */}
                                <div>
                                    <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.9]">
                                        {project.title}
                                    </h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Footer & Tags */}
                                <div>
                                    <div className="flex gap-2 flex-wrap mb-8">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest group-hover:text-primary transition-colors">
                                        View Case Study <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Image Side */}
                            <div className="w-full md:w-3/5 relative h-1/2 md:h-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/20 md:to-background z-10" />
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                        </div>
                    </Link>
                </div>
            ))}

            {/* Final "Explore All" Card - Creative CTA */}
            <div className="project-card sticky top-0 h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
                <div className="relative w-full max-w-7xl h-[85vh] rounded-[2rem] md:rounded-[4rem] border border-primary/20 bg-primary/5 flex flex-col items-center justify-center text-center p-8 md:p-24 group backdrop-blur-3xl">
                    
                    {/* Background Decorative Elements */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[inherit]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-2 border-primary/5 rounded-full scale-50 group-hover:scale-100 transition-transform duration-1000" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/10 rounded-full scale-75 group-hover:scale-110 transition-transform duration-1000 delay-100" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center w-full px-4">
                        <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.6em] mb-6 md:mb-10 font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                            The Complete Portfolio
                        </span>
                        
                        <h3 className="text-[14vw] md:text-[10vw] font-black tracking-tighter leading-[0.85] uppercase mb-16 md:mb-24 mix-blend-difference text-white select-none">
                            FULL<br/><span className="gradient-text italic">ARCHIVE</span>
                        </h3>

                        <Magnetic strength={0.4}>
                            <Link 
                                href="/projects"
                                className="relative w-44 h-44 md:w-64 md:h-64 flex items-center justify-center rounded-full bg-primary text-primary-foreground group/btn transition-all duration-700 active:scale-95 overflow-hidden shadow-[0_0_60px_rgba(var(--primary-rgb),0.3)]"
                                data-cursor-hover
                            >
                                {/* Liquid Hover Effect */}
                                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                                
                                <div className="relative z-10 flex flex-col items-center gap-3 md:gap-4 transition-transform duration-500 group-hover/btn:scale-110">
                                    <ArrowUpRight className="w-10 h-10 md:w-16 md:h-16 stroke-[2.5px]" />
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] pl-1">View Archive</span>
                                </div>
                            </Link>
                        </Magnetic>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[10px] uppercase tracking-[0.4em] opacity-30 select-none">
                        <span className="hidden md:block">Ready to Collaborate?</span>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xs font-black text-primary">026</span>
                            <span>Salmān</span>
                        </div>
                        <span className="hidden md:block">Scroll to Top</span>
                    </div>
                </div>
            </div>
        </div>

    </section>
  )
}
