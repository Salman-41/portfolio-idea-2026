"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: "01",
    title: "Web Design",
    desc: "Crafting immersive visual systems."
  },
  {
    id: "02",
    title: "Creative Dev",
    desc: "WebGL, GSAP, and interaction magic."
  },
  {
    id: "03",
    title: "Architecture",
    desc: "Scalable, performant architecture."
  },
  {
    id: "04",
    title: "Data Science",
    desc: "ML, analytics, and data-driven insights."
  },
  {
    id: "05",
    title: "Consulting",
    desc: "Technical strategy & design direction."
  }
]

const WHATSAPP_NUMBER = "923456556686"

/**
 * Graphic Services section component.
 * Displays a list of services with marquee scroll animations.
 */
export function GraphicServices() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Marquee Scroll Animation
        const rows = gsap.utils.toArray(".service-row") as HTMLElement[]
        
        rows.forEach((row, i) => {
            const direction = i % 2 === 0 ? -1 : 1
            
            gsap.fromTo(row.querySelector(".service-track"), 
                { xPercent: direction * -35 }, 
                {
                    xPercent: direction * 35,
                    ease: "none",
                    scrollTrigger: {
                        trigger: row,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5
                    }
                }
            )
        })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleWhatsAppClick = (serviceName: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in your ${serviceName} services.`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  return (
    <section ref={containerRef} className="py-24 bg-background relative overflow-hidden">

       <div className="container mx-auto mb-20 px-4">
           <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
             <div>
               <span className="text-primary text-xs uppercase tracking-[0.4em] mb-4 block font-mono">
                  // The_Impact
               </span>
               <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                  Creative<br/>
                  <span className="text-transparent stroke-text-2">Capabilities</span>
               </h1>
             </div>
             <p className="text-lg text-muted-foreground max-w-sm lg:text-right leading-relaxed">
                Full-spectrum digital expertise to bring your boldest ideas to life.
             </p>
           </div>
       </div>

       <div className="flex flex-col gap-0 w-full overflow-hidden">
          {services.map((item, i) => (
             <div
                key={i}
                className="service-row group relative border-t border-white/10 py-16 md:py-20 cursor-pointer hover:bg-white/5 transition-colors duration-300 w-full"
                onClick={() => handleWhatsAppClick(item.title)}
             >
                <div className="service-track flex items-center justify-center w-full whitespace-nowrap will-change-transform">
                   
                   <div className="flex items-center gap-8 md:gap-16 px-8">
                       <span className="text-xs font-mono text-muted-foreground opacity-50">
                          ({item.id})
                       </span>
                       <h2 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter text-white transition-all duration-300 scale-100 group-hover:scale-110">
                          {item.title}
                       </h2>
                       <p className="text-sm md:text-xl font-light text-muted-foreground max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 hidden md:block">
                          {item.desc}
                       </p>
                       <ArrowRight className="w-8 h-8 md:w-16 md:h-16 text-white/20 group-hover:text-primary -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                   </div>
                </div>
             </div>
          ))}
          <div className="border-t border-white/10" />
       </div>
    </section>
  )
}
