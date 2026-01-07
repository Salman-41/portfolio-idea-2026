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
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuLinksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(nav, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 })
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      })
      gsap.fromTo(
        menuLinksRef.current?.children || [],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power3.out" },
      )
    } else {
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.6,
        ease: "power4.inOut",
      })
    }
  }, [isMenuOpen])

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          {/* Logo */}
          <Link href="/" className="relative z-50 group" data-cursor-hover>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Salman<span className="text-primary">.</span>yz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
            data-cursor-hover
          >
            <span
              className={cn(
                "w-6 h-0.5 bg-foreground transition-all duration-300",
                isMenuOpen && "rotate-45 translate-y-2",
              )}
            />
            <span className={cn("w-6 h-0.5 bg-foreground transition-all duration-300", isMenuOpen && "opacity-0")} />
            <span
              className={cn(
                "w-6 h-0.5 bg-foreground transition-all duration-300",
                isMenuOpen && "-rotate-45 -translate-y-2",
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-background md:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div ref={menuLinksRef} className="flex flex-col items-center justify-center h-full gap-8">
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
        </div>
      </div>
    </>
  )
}
