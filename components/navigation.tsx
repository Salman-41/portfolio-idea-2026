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

const Magnetic = ({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height, left, top } = el.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      xTo(x * strength)
      yTo(y * strength)
    }

    const onMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener("mousemove", onMouseMove)
    el.addEventListener("mouseleave", onMouseLeave)
    return () => {
      el.removeEventListener("mousemove", onMouseMove)
      el.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [strength])

  return <div ref={ref} className="flex items-center justify-center">{children}</div>
}

const ScrambleLink = memo(({ href, label, active }: { href: string; label: string; active: boolean }) => {
  const { displayText, scramble } = useTextScramble(label, { duration: 800, speed: 40 })

  return (
    <Link
      href={href}
      onMouseEnter={scramble}
      className={cn(
        "relative text-sm uppercase font-medium tracking-widest transition-all duration-300",
        active ? "text-primary" : "text-muted-foreground/80 hover:text-white"
      )}
      data-cursor-hover
    >
      {displayText}
    </Link>
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
          <Link href="/" className="absolute left-0 z-50 group shrink-0 mix-blend-difference" data-cursor-hover>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Salman<span className="text-primary">.</span>yz
            </span>
          </Link>

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
               
               {/* "Let's Talk" Button - Visible at Top */}
               <div className={cn(
                  "transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform-gpu",
                  isScrolled ? "opacity-0 translate-x-12 pointer-events-none scale-90" : "opacity-100 translate-x-0 scale-100"
               )}>
                 <Magnetic strength={0.2}>
                   <Link
                    href="/contact"
                    className="hidden md:flex px-6 py-2 text-xs uppercase tracking-widest font-bold border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-full whitespace-nowrap"
                    data-cursor-hover
                  >
                    Let's Talk
                  </Link>
                 </Magnetic>
               </div>

               {/* Burger Container - Visible on Scroll */}
               <div className={cn(
                  "absolute inset-0 flex items-center justify-end transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform-gpu",
                  isScrolled ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-75 translate-x-12 pointer-events-none"
               )}>
                 <span className="mr-8 text-[10px] font-bold uppercase tracking-widest opacity-60">
                   Menu
                 </span>

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
          "fixed inset-0 z-40 bg-[#0C0C0C] flex flex-col items-center justify-center p-12 lg:p-24",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{ clipPath: "circle(0% at calc(100% - 4rem) 4rem)" }}
      >
        <div ref={menuLinksRef} className="flex flex-col items-center justify-center gap-8 md:gap-12 z-10 w-full relative">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "group relative text-5xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-500 transform-gpu",
                pathname === link.href ? "text-primary" : "text-white hover:text-primary",
              )}
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-xl font-bold opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transition-all duration-500 text-primary">
                0{navLinks.indexOf(link) + 1}
              </span>
            </Link>
          ))}
          
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white hover:text-primary transition-all duration-500 transform-gpu group border-t border-white/5 pt-12 mt-4 w-full text-center"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navigation
