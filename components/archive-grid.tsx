"use client"

import { useEffect, useRef, useState } from "react"
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

export function ArchiveGrid({ projects }: ArchiveGridProps) {
  const containerRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorLabelRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)

  useEffect(() => {
    // 1. Move Cursor Logic
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8, // Increased weight
        ease: "power3.out"
      })
      gsap.to(cursorLabelRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.7,
        ease: "power3.out"
      })
    }
    
    window.addEventListener("mousemove", moveCursor)

    // 2. Scroll Skew Effect
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".project-row", "skewY", "deg"),
        clamp = gsap.utils.clamp(-20, 20);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
        }
      }
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [])

  // Hover Animations
  useEffect(() => {
    if (activeProject !== null) {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" })
      gsap.to(cursorLabelRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" })
    } else {
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: "expo.out" })
      gsap.to(cursorLabelRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: "expo.out" })
    }
  }, [activeProject])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    const title = el.querySelector(".project-title") as HTMLElement
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(title, {
        x: x * 0.1, // Magnetic strength
        y: y * 0.1,
        duration: 0.5,
        ease: "power3.out"
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveProject(null)
    const title = e.currentTarget.querySelector(".project-title") as HTMLElement
    gsap.to(title, { x: 0, y: 0, duration: 0.5, ease: "power3.out" })
  }

  return (
    <section ref={containerRef} className="pb-32 px-6 md:px-12 min-h-screen relative bg-background">
      
      {/* Floating Hover Cursor */}
      <div 
         ref={cursorRef}
         className="fixed top-0 left-0 w-[400px] h-[300px] rounded-2xl overflow-hidden pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 opacity-0 shadow-2xl hidden md:block"
      >
        {projects.map((project) => (
             <Image 
                key={project.id}
                src={project.image}
                alt={project.title}
                fill
                className={`object-cover transition-opacity duration-300 ${activeProject === project.id ? "opacity-100" : "opacity-0"}`}
             />
        ))}
      </div>

      <div 
         ref={cursorLabelRef}
         className="fixed top-0 left-0 z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-20 h-20 bg-primary rounded-full mix-blend-difference text-black opacity-0"
      >
          <ArrowUpRight className="w-8 h-8" />
      </div>


      {/* Project List */}
      <div className="container mx-auto">
        <div className="flex flex-col">
           {/* Header Row */}
           <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs uppercase tracking-[0.2em] text-muted-foreground/50 z-20 py-4">
              <div className="col-span-1">No.</div>
              <div className="col-span-5">Project Name</div>
              <div className="col-span-3">Services</div>
              <div className="col-span-2">Year</div>
              <div className="col-span-1 text-right">Link</div>
           </div>

           {/* Rows */}
           {projects.map((project, index) => (
             <Link 
               key={project.id}
               href={project.href}
               className="project-row group grid grid-cols-1 md:grid-cols-12 gap-4 py-8 md:py-12 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors duration-300"
               onMouseEnter={() => setActiveProject(project.id)}
               onMouseLeave={handleMouseLeave}
               onMouseMove={handleMouseMove}
             >
                <div className="hidden md:block col-span-1 text-xs font-mono text-muted-foreground/40">
                   {index < 9 ? `0${index + 1}` : index + 1}
                </div>
                
                <div className="col-span-1 md:col-span-5">
                   <h3 className="project-title text-3xl md:text-5xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300 inline-block">
                     {project.title}
                   </h3>
                </div>

                <div className="col-span-1 md:col-span-3 md:text-sm uppercase tracking-wider text-muted-foreground group-hover:text-white transition-colors duration-300">
                    {project.category}
                </div>

                <div className="hidden md:block col-span-2 text-sm font-mono text-muted-foreground/60">
                    {project.year}
                </div>

                <div className="hidden md:flex col-span-1 justify-end">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black" />
                    </div>
                </div>
             </Link>
           ))}
        </div>
      </div>
    </section>
  )
}
