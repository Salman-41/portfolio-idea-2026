"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
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
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          {/* Logo */}
          <Link href="/" className="relative z-50 group" data-cursor-hover>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground mix-blend-difference text-white">
              Salman<span className="text-primary">.</span>yz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={cn(
             "hidden md:flex items-center gap-8 transition-all duration-500 ease-in-out origin-right",
             isScrolled ? "opacity-0 translate-x-10 pointer-events-none scale-90" : "opacity-100 translate-x-0 scale-100"
          )}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm uppercase tracking-widest transition-colors duration-300 line-animation",
                  pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
                data-cursor-hover
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              href="/contact"
              className="ml-4 px-6 py-2 text-xs uppercase tracking-widest font-medium border border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full"
              data-cursor-hover
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile/Burger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
               "relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5 transition-all duration-500 rounded-full hover:bg-white/10",
               isScrolled ? "md:flex opacity-100 scale-100 rotate-0" : "md:hidden opacity-0 scale-50 rotate-90 pointer-events-none md:pointer-events-none"
            )}
            aria-label="Toggle menu"
            data-cursor-hover
          >
            <span
              className={cn(
                "w-6 h-0.5 bg-foreground transition-all duration-300 mix-blend-difference text-white",
                isMenuOpen && "rotate-45 translate-y-2",
              )}
            />
            <span className={cn("w-6 h-0.5 bg-foreground transition-all duration-300 mix-blend-difference text-white", isMenuOpen && "opacity-0")} />
            <span
              className={cn(
                "w-6 h-0.5 bg-foreground transition-all duration-300 mix-blend-difference text-white",
                isMenuOpen && "-rotate-45 -translate-y-2",
              )}
            />
          </button>
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
        <div ref={menuLinksRef} className="flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-4xl font-bold uppercase tracking-wider transition-colors duration-300",
                pathname === link.href ? "text-primary" : "text-foreground hover:text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="text-4xl font-bold uppercase tracking-wider transition-colors duration-300 text-foreground hover:text-primary mt-4"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </>
  )
}
