"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: number
  title: string
  category: string
  year: string
  href: string
  image: string
}

interface ArchiveGridProps {
  projects: Project[]
}

// Helper to generate a consistent dark palette color based on ID
const getCardColor = (id: number) => {
    const colors = ["#0f172a", "#1e1b4b", "#2e1065", "#020617", "#172554", "#052e16"]
    return colors[id % colors.length]
}

export function ArchiveGrid({ projects }: ArchiveGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
        const cards = document.querySelectorAll(".project-card-item")
        
        cards.forEach((card, index) => {
            const nextCard = cards[index + 1]
            if (!nextCard) return

            // "Ghostly Blur" Exit Transition
            gsap.to(card, {
                opacity: 0,
                scale: 0.9,
                filter: "blur(20px)",
                scrollTrigger: {
                    trigger: nextCard,
                    start: "top bottom", 
                    end: "top top",      
                    scrub: true,
                }
            })
        })
    }, containerRef)
    
    return () => ctx.revert()
  }, [projects])

  return (
    <section ref={containerRef} className="relative bg-background pt-10 pb-40">
      <div className="relative">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="project-card-item sticky top-0 h-screen flex items-center justify-center p-4 md:p-8"
          >
            <Link 
                href={project.href}
                className="relative w-full max-w-7xl h-[85vh] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group block"
                style={{ backgroundColor: getCardColor(project.id) }}
            >
                <div className="flex flex-col md:flex-row h-full">
                    {/* Content Side */}
                    <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col justify-between z-10 relative">
                        {/* Top Meta */}
                        <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-white/50">
                            <span>No. {(index + 1).toString().padStart(2, '0')}</span>
                            <span>{project.year}</span>
                        </div>

                        {/* Main Text */}
                        <div className="relative">
                            <h3 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-[0.85] text-white mix-blend-difference">
                                {project.title}
                            </h3>
                            <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-widest text-primary border border-primary/20">
                                {project.category}
                            </span>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center gap-4 group-hover:gap-6 transition-all duration-500">
                             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-colors duration-300">
                                <ArrowUpRight className="w-5 h-5" />
                             </div>
                             <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">View Case</span>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="w-full md:w-3/5 relative h-1/2 md:h-full overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40 z-10" />
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-1000 ease-expo group-hover:scale-110"
                        />
                    </div>
                </div>
            </Link>
          </div>
        ))}
        
        {/* End of List Spacer/Message */}
        <div className="h-[50vh] flex items-center justify-center">
            <p className="text-xs uppercase tracking-[0.5em] text-white/30">End of Archive</p>
        </div>
      </div>
    </section>
  )
}
