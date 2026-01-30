"use client"

import React, { useState, useEffect, useRef, memo, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { useTextScramble } from "@/hooks/use-text-scramble"

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
]

// --- Helper Components ---

import { Magnetic } from "./magnetic"
import { TransitionLink } from "./transition-link"

const ScrambleLink = memo(({ href, label, active }: { href: string; label: string; active: boolean }) => {
  const { displayText, scramble } = useTextScramble(label, { duration: 800, speed: 40 })

  return (
    <TransitionLink
      href={href}
      onMouseEnter={scramble}
      className={cn(
        "relative text-sm uppercase font-medium tracking-widest transition-all duration-300",
        active ? "text-primary" : "text-muted-foreground/80 hover:text-white"
      )}
      data-cursor-hover
    >
      {displayText}
    </TransitionLink>
  )
})
ScrambleLink.displayName = "ScrambleLink"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuLinksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Coordinate for the burger button visual center
    const circleOrigin = "calc(100% - 4rem) 4rem"

    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        clipPath: `circle(150% at ${circleOrigin})`,
        duration: 1.2,
        ease: "power4.inOut",
      })
      gsap.fromTo(
        menuLinksRef.current?.children || [],
        { y: 120, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, delay: 0.4, ease: "power4.out" },
      )
    } else {
      gsap.to(menuRef.current, {
        clipPath: `circle(0% at ${circleOrigin})`,
        duration: 0.9,
        ease: "power4.inOut",
      })
    }
  }, [isMenuOpen])

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 lg:px-20 transition-all duration-500">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto relative h-14">
          
          {/* Logo - Fixed Left */}
          <TransitionLink href="/" className="absolute left-0 z-50 group shrink-0 mix-blend-difference" data-cursor-hover>
            <span className="text-2xl md:text-2xl font-bold tracking-tight text-white">
              s<span className="text-primary">y</span><span className="text-primary">.</span>
            </span>
          </TransitionLink>

          {/* Right-Aligned Navigation Engine */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-end h-12 gap-10">
            
            {/* Desktop Links - Now on the Right */}
            <div className={cn(
               "hidden md:flex items-center gap-10 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform-gpu",
               isScrolled 
                ? "opacity-0 -translate-x-8 blur-md pointer-events-none" 
                : "opacity-100 translate-y-0 blur-0"
            )}>
              {navLinks.map((link) => (
                <ScrambleLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={pathname === link.href}
                />
              ))}
            </div>

            {/* Spatial Swap Action Slot - Button <-> Burger */}
            <div className="relative flex items-center justify-end min-w-[140px] h-12">
               
               {/* "Let's Talk" Button - Visible at Top (Desktop Only) */}
               <div className={cn(
                  "hidden md:block transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform-gpu",
                  isScrolled ? "opacity-0 translate-x-12 pointer-events-none scale-90" : "opacity-100 translate-x-0 scale-100"
               )}>
                 <Magnetic strength={0.2}>
                   <TransitionLink
                    href="/contact"
                    className="flex px-6 py-2 text-xs uppercase tracking-widest font-bold border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-full whitespace-nowrap"
                    data-cursor-hover
                  >
                    Let's Talk
                  </TransitionLink>
                 </Magnetic>
               </div>

               {/* Burger Container - Always visible on mobile, visible on scroll for desktop */}
               <div className={cn(
                  "absolute inset-0 flex items-center justify-end transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform-gpu",
                  // Always visible on mobile (< md), scroll-dependent on desktop (>= md)
                  "opacity-100 scale-100 translate-x-0",
                  "md:opacity-0 md:scale-75 md:translate-x-12 md:pointer-events-none",
                  isScrolled && "md:opacity-100 md:scale-100 md:translate-x-0 md:pointer-events-auto"
               )}>

                 <Magnetic strength={0.4}>
                   <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="relative z-50 w-12 h-12 flex flex-col items-end justify-center gap-1.5 group rounded-full hover:bg-white/5 transition-all duration-300"
                    aria-label="Toggle menu"
                    data-cursor-hover
                  >
                    <span
                      className={cn(
                        "h-[2px] bg-white transition-all duration-500 rounded-full",
                        isMenuOpen ? "w-7 rotate-45 translate-y-[8px]" : "w-7 group-hover:w-5",
                      )}
                    />
                    <span className={cn(
                      "h-[2px] bg-white transition-all duration-500 rounded-full", 
                      isMenuOpen ? "opacity-0" : "w-4 group-hover:w-7"
                    )} />
                    <span
                      className={cn(
                        "h-[2px] bg-white transition-all duration-500 rounded-full",
                        isMenuOpen ? "w-7 -rotate-45 -translate-y-[8px]" : "w-6 group-hover:w-4",
                      )}
                    />
                  </button>
                 </Magnetic>
               </div>

            </div>
          </div>

        </div>
      </nav>

      {/* Cinematic Full Screen Menu Overlay */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-0 z-40 bg-[#0C0C0C] flex flex-col items-center justify-center p-6 md:p-12 lg:p-24",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{ clipPath: "circle(0% at calc(100% - 4rem) 4rem)" }}
      >
        <div ref={menuLinksRef} className="flex flex-col items-start gap-4 md:gap-8 z-10 w-full max-w-5xl relative">
          {navLinks.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "group relative text-[15vw] md:text-[8vw] font-black uppercase tracking-[-0.05em] leading-[0.8] transition-all duration-700 transform-gpu hover:italic",
                pathname === link.href ? "text-primary" : "text-white hover:text-primary",
              )}
            >
              <div className="flex items-start gap-4">
                <span className="text-xs md:text-sm font-bold tracking-widest text-primary/60 mt-4 md:mt-8">
                  0{navLinks.indexOf(link) + 1}
                </span>
                <span className="relative z-10">{link.label}</span>
              </div>
            </TransitionLink>
          ))}
          
          <TransitionLink
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="group flex flex-col gap-4 mt-8 md:mt-16 border-t border-white/10 pt-8 md:pt-16 w-full"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-white/30">Get in touch</span>
            <div className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white hover:text-primary transition-all duration-500 inline-block w-fit group-hover:translate-x-4">
              Let's Talk <span className="text-primary italic">—</span>
            </div>
          </TransitionLink>
        </div>

        {/* Menu Footer Decor */}
        <div className="absolute bottom-12 left-12 right-12 hidden md:flex justify-between items-end text-[10px] uppercase tracking-[0.4em] opacity-20 select-none">
          <span>@devousufzai • {new Date().getFullYear()}</span>
          <span>Based in Pakistan</span>
        </div>
      </div>
    </>
  )
}

export default Navigation
