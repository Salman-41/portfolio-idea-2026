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

    gsap.fromTo(nav, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 })
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at calc(100% - 3rem) 3rem)",
        duration: 1,
        ease: "power4.inOut",
      })
      gsap.fromTo(
        menuLinksRef.current?.children || [],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power3.out" },
      )
    } else {
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at calc(100% - 3rem) 3rem)",
        duration: 0.8,
        ease: "power4.inOut",
      })
    }
  }, [isMenuOpen])

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 lg:px-20 transition-all duration-300">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto relative h-12">
          
          {/* Logo - Fixed Position */}
          <Link href="/" className="relative z-50 group shrink-0" data-cursor-hover>
            <span className="text-xl md:text-2xl font-black tracking-tight text-white mix-blend-difference">
              Salman<span className="text-primary">.</span>yz
            </span>
          </Link>

          {/* Navigation Container - Stable Right Side */}
          <div className="relative flex items-center justify-end h-full">
            
            {/* Desktop Navigation */}
            <div className={cn(
               "hidden md:flex items-center gap-8 transition-all duration-700 ease-in-out transform-gpu",
               isScrolled 
                ? "opacity-0 translate-x-8 pointer-events-none blur-sm scale-95" 
                : "opacity-100 translate-x-0 scale-100 blur-0"
            )}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm uppercase font-medium tracking-[0.2em] transition-colors duration-300",
                    pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                  data-cursor-hover
                >
                  {link.label}
                </Link>
              ))}
              
              <Link
                href="/contact"
                className="ml-4 px-6 py-2 text-xs uppercase tracking-[0.2em] font-bold border border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-500 rounded-full"
                data-cursor-hover
              >
                Let's Talk
              </Link>
            </div>

            {/* Mobile/Burger Button - Coordinated Fade-in */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                 "relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5 transition-all duration-700 ease-out rounded-full hover:bg-white/10 transform-gpu",
                 isScrolled 
                  ? "opacity-100 scale-100 rotate-0 translate-x-0" 
                  : "md:opacity-0 md:scale-50 md:-rotate-45 md:pointer-events-none translate-x-12"
              )}
              aria-label="Toggle menu"
              data-cursor-hover
            >
              <span
                className={cn(
                  "w-6 h-0.5 bg-white transition-all duration-300 mix-blend-difference",
                  isMenuOpen && "rotate-45 translate-y-2",
                )}
              />
              <span className={cn("w-6 h-0.5 bg-white transition-all duration-300 mix-blend-difference", isMenuOpen && "opacity-0")} />
              <span
                className={cn(
                  "w-6 h-0.5 bg-white transition-all duration-300 mix-blend-difference",
                  isMenuOpen && "-rotate-45 -translate-y-2",
                )}
              />
            </button>
          </div>

        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-0 z-40 bg-background flex flex-col items-center justify-center",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
      >
        <div ref={menuLinksRef} className="flex flex-col items-center justify-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-5xl md:text-7xl font-black uppercase tracking-tighter transition-all duration-500 hover:text-primary transform-gpu hover:scale-110",
                pathname === link.href ? "text-primary" : "text-white hover:text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter transition-all duration-500 text-white hover:text-primary mt-6 transform-gpu hover:scale-110"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </>
  )
}

