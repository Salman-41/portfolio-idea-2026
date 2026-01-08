"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export function IdentityHero() {
  const containerRef = useRef<HTMLElement>(null)
  const firstNameRef = useRef<HTMLHeadingElement>(null)
  const lastNameRef = useRef<HTMLHeadingElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

      // 1. Initial Reveal
      tl.set([firstNameRef.current, lastNameRef.current], { y: 150, opacity: 0 })
      tl.set(imageWrapperRef.current, { scale: 1.2, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" })

      // Name Reveal
      tl.to(firstNameRef.current, { y: 0, opacity: 1, duration: 1.5, stagger: 0.1 })
      tl.to(lastNameRef.current, { y: 0, opacity: 1, duration: 1.5 }, "-=1.3")
      
      // Image Reveal
      tl.to(imageWrapperRef.current, { 
        clipPath: "inset(0% 0% 0% 0%)", 
        scale: 1, 
        opacity: 1, 
        duration: 1.8, 
        ease: "power4.out" 
      }, "-=1.0")

      // Badge Spin Entrance
      gsap.from(badgeRef.current, {
        scale: 0,
        rotate: -180,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 1.2
      })

      // 2. Scroll Parallax
      gsap.to(firstNameRef.current, {
        x: -100,
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
      })

      gsap.to(lastNameRef.current, {
        x: 100,
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
      })

      gsap.to(imageWrapperRef.current, {
        y: 100,
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative pt-32 pb-0 md:pt-48 md:pb-0 px-4 md:px-12 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
       
       {/* Background Grid & Noise */}
       <div className="absolute inset-0 grid-bg opacity-50" />
       
       <div className="container mx-auto relative z-10 flex flex-col items-center">
          
          {/* FIRST NAME */}
          <h1 ref={firstNameRef} className="relative z-10 text-[18vw] md:text-[15vw] leading-[0.8] font-black tracking-tighter uppercase mix-blend-difference text-white">
             SALMAN
          </h1>

          {/* PORTRAIT CONTAINER (Overlapping) */}
          <div className="relative z-0 -my-12 md:-my-24 w-[70vw] md:w-[35vw] aspect-[3/4]">
             <div ref={imageWrapperRef} className="relative w-full h-full overflow-hidden rounded-sm grayscale contrast-125">
                 <Image
                    src="/about-portrait.png" 
                    alt="Salman Yousufzai"
                    fill
                    className="object-cover"
                    priority
                 />
                 <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
             </div>
             
             {/* Rotating Badge */}
             <div ref={badgeRef} className="absolute -top-12 -right-12 md:-right-24 w-32 h-32 md:w-48 md:h-48 z-20">
                <svg className="w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                    <defs>
                        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text className="text-[10px] font-bold uppercase tracking-[0.2em] fill-primary">
                        <textPath href="#circlePath">
                            Creative Developer • Designer • 
                        </textPath>
                    </text>
                </svg>
             </div>
          </div>

          {/* LAST NAME */}
          <h1 ref={lastNameRef} className="relative z-20 text-[18vw] md:text-[15vw] leading-[0.8] font-black tracking-tighter uppercase text-transparent stroke-text-2">
             YOUSUFZAI
          </h1>

          <div className="mt-12 md:mt-24 flex items-center gap-4 animate-bounce">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll to Explore</span>
              <div className="w-[1px] h-8 bg-muted-foreground/50" />
          </div>

       </div>
    </section>
  )
}
