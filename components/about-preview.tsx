"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Magnetic } from "./magnetic"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export function AboutPreview() {
  const containerRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 2. Kinetic Parallax for Floating Background Text
      gsap.to(".bg-token", {
        yPercent: -40,
        rotation: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })

      // 3. Narrative Layer Parallax (Moves Slower)
      gsap.to(textRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      })

      // 4. Image Layer Parallax & Mask Reveal (Moves Faster)
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -250,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        })

        // Mask Reveal
        gsap.fromTo(".image-mask", 
          { clipPath: "inset(10% 10% 10% 10% round 2rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 1rem)",
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
            }
          }
        )
      }

      // 5. Floating Stats (Rapid Movement)
      gsap.to(".stat-bubble", {
        y: -300,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8
        }
      })

      // 6. Atmospheric Glow Animation
      gsap.to(".bg-glow-blob", {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 2
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[140vh] py-40 bg-background border-t border-white/5 overflow-hidden"
    >
      {/* Background Kinetic Layer - Spectral Tokens & Atmospheric Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
         {/* Atmospheric Color Blobs */}
         <div className="bg-glow-blob absolute top-[20%] left-[15%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
         <div className="bg-glow-blob absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen opacity-40" />
         <div className="bg-glow-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] mix-blend-overlay" />

         <div className="bg-token absolute top-1/4 left-[10%] text-[25vw] font-black text-primary/[0.04] select-none leading-none blur-sm">
            SY
         </div>
         <div className="bg-token absolute bottom-1/4 right-[5%] text-[20vw] font-black text-primary/[0.03] select-none leading-none italic blur-[2px]">
            026
         </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative h-full">
        
        {/* Layer 1: Narrative Block (Middle-Ground) */}
        <div 
          ref={textRef}
          className="relative z-20 max-w-3xl ml-auto lg:mr-20 mt-20"
        >
          <div className="flex items-center gap-6 mb-12">
             <span className="w-16 h-[2px] bg-primary animate-pulse" />
             <span className="text-xs uppercase tracking-[0.8em] text-primary font-black italic">The Genesis</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-12 mix-blend-difference">
            WEAVING <span className="text-primary italic">DIGITAL</span><br />
            FABRICS FROM<br />
            PURE <span className="gradient-text">LOGIC</span>.
          </h2>

          <div className="max-w-xl space-y-10">
            <p className="text-2xl md:text-3xl font-medium text-white/70 leading-[1.1] tracking-tight">
              I don&apos;t just build websites. I engineer digital ecosystems that pulse with aesthetic intent and technical precision.
            </p>
            
            <p className="text-lg text-white/40 leading-relaxed max-w-md">
              Bridging the gap between clinical engineering and raw visual emotion. Every line of code is a brushstroke; every interaction is a moment of truth.
            </p>

            <Magnetic strength={0.25}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-6 text-sm font-black uppercase tracking-[0.5em] text-primary"
                data-cursor-hover
              >
                <div className="relative overflow-hidden w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center transition-all duration-700 group-hover:border-primary group-hover:bg-primary">
                  <ArrowUpRight className="w-6 h-6 text-primary group-hover:text-black transition-all duration-500" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                </div>
                <span className="border-b border-primary/20 group-hover:border-primary transition-colors pb-1">Our Manifest</span>
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Layer 2: Visual Collage (Foreground) */}
        <div 
          ref={imageRef}
          className="absolute top-[10%] left-[5%] w-full max-w-sm lg:max-w-md z-30"
        >
          <div className="image-mask relative aspect-[4/5] shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/10 group overflow-hidden">
             <Image 
                src="/images/11.jpeg" 
                alt="The Craft" 
                fill
                className="object-cover object-top transition-transform duration-1000 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
             <div className="absolute inset-0 bg-primary/20 mix-blend-color opacity-30 z-10" />
             
             <div className="absolute bottom-8 left-8 z-20">
                <span className="text-[10px] uppercase tracking-[0.6em] text-primary font-bold block mb-2">Process v4.0</span>
                <span className="text-xl font-black text-white tracking-tighter uppercase italic leading-none">Aesthetic<br />Precision</span>
             </div>
          </div>

          {/* Floating Micro-UI Component */}
          <div className="absolute -right-12 -bottom-12 w-48 p-6 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl z-40 hidden md:block">
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <div className="w-2 h-2 rounded-full bg-primary" />
                   <span className="text-[8px] uppercase tracking-widest text-white/40">Status: Active</span>
                </div>
                <div className="h-[1px] bg-white/10" />
                <p className="text-[10px] text-white/60 font-mono tracking-tight leading-relaxed">
                   Engineering immersive layouts with kinetic energy and spatial awareness.
                </p>
             </div>
          </div>
        </div>

        {/* Layer 3: Kinetic Stats Bubbles (Fast-Moving Foreground) */}
        <div className="absolute right-[5%] top-[20%] space-y-24 z-40">
           <div className="stat-bubble flex flex-col items-end">
              <span className="text-8xl font-black tracking-tighter text-white/90 leading-none">08</span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-primary font-bold mt-2">Years on Planet</span>
           </div>
           
           <div className="stat-bubble flex flex-col items-end opacity-60">
              <span className="text-7xl font-black tracking-tighter text-white/90 leading-none">50+</span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold mt-2">Visions Refined</span>
           </div>

           <div className="stat-bubble flex flex-col items-end">
              <span className="text-9xl font-black tracking-tighter text-white appearance-none select-none opacity-20">AWD</span>
           </div>
        </div>

      </div>

      {/* Aesthetic Film Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] contrast-150 brightness-150 mix-blend-overlay z-[100]" style={{ backgroundImage: "url('/noise.png')" }} />
    </section>
  )
}
