"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
]

export function Navigation() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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
    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(nav, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.5 })
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

          {/* Navigation Engine */}
          <div className="flex items-center gap-10 relative flex-1 justify-end h-full">
            
            {/* Desktop Navigation - Fades out neutrally */}
            <div className={cn(
               "hidden md:flex items-center gap-10 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform-gpu",
               isScrolled 
                ? "opacity-0 -translate-x-8 blur-md pointer-events-none" 
                : "opacity-100 translate-x-0 blur-0"
            )}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm uppercase font-medium tracking-widest transition-all duration-300 hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-muted-foreground/80 hover:text-white",
                  )}
                  data-cursor-hover
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Spatial Swap Action Slot - Button <-> Burger */}
            <div className="relative flex items-center justify-end min-w-[120px] h-12">
               
               {/* "Let's Talk" Button - Visible at Top */}
               <Link
                href="/contact"
                className={cn(
                  "hidden md:flex px-6 py-2 text-xs uppercase tracking-widest font-bold border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-700 rounded-full whitespace-nowrap transform-gpu",
                  isScrolled ? "opacity-0 translate-x-8 pointer-events-none scale-90" : "opacity-100 translate-x-0 scale-100"
                )}
                data-cursor-hover
              >
                Let's Talk
              </Link>

               {/* Burger Container - Visible on Scroll */}
               <div className={cn(
                  "absolute inset-0 flex items-center justify-end transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform-gpu",
                  isScrolled ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-75 translate-x-12 pointer-events-none"
               )}>
                 <span className="mr-4 text-[10px] font-bold uppercase tracking-widest">
                   Menu
                 </span>

                 <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative z-50 w-12 h-12 flex flex-col items-end justify-center gap-1.5 group rounded-full hover:bg-white/5 transition-all duration-300 transform-gpu"
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
              </div>

            </div>
          </div>

        </div>
      </nav>

      {/* Cinematic Full Screen Menu */}
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
