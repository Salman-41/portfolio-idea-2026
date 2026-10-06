"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Magnetic } from "./magnetic";
import { TransitionLink } from "./transition-link";
import { ThemeToggleCompact } from "./theme-toggle";

/**
 * Navigation links for the desktop header.
 * Minimal set to keep the header clean.
 */
const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
];

/**
 * Full navigation links for the full-screen menu (burger menu).
 * Includes Home and Contact for complete navigation access.
 */
const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

/**
 * Props for the StickyNavLink component.
 */
interface StickyNavLinkProps {
  href: string;
  label: string;
  active: boolean;
}

/**
 * A navigation link that gently follows the pointer while keeping its label stable.
 */
const StickyNavLink = memo(({ href, label, active }: StickyNavLinkProps) => {
  return (
    <Magnetic strength={0.24} className="nav-magnetic-wrap">
      <TransitionLink
        href={href}
        className={cn("nav-sticky-link", active && "is-active")}
        aria-current={active ? "page" : undefined}
        data-cursor-hover
      >
        <span>{label}</span>
        <span className="nav-link-dot" aria-hidden="true" />
      </TransitionLink>
    </Magnetic>
  );
});
StickyNavLink.displayName = "StickyNavLink";

/**
 * Main Navigation component.
 * Handles the fixed header, scroll interactions, and the full-screen burger menu.
 */
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.to(menu, { clipPath: isMenuOpen ? "circle(150% at calc(100% - 3rem) 3rem)" : "circle(0% at calc(100% - 3rem) 3rem)", duration: reduced ? 0 : .45, ease: "power3.inOut", overwrite: true });
      if (isMenuOpen) gsap.fromTo(menuLinksRef.current?.children || [], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: reduced ? 0 : .35, stagger: reduced ? 0 : .04, delay: reduced ? 0 : .12, overwrite: true });
    }, menu);
    return () => ctx.revert();
  }, [isMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={cn("site-navigation fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 lg:px-20", isScrolled && "is-scrolled")}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between max-w-[1800px] mx-auto h-14 gap-4">
          <TransitionLink href="/" className="group shrink-0 logo" data-cursor-hover data-cursor-label="HOME" aria-label="Salman Yousufzai home">
            <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">s<span className="text-primary">y.</span></span>
          </TransitionLink>
          <div className="hidden md:flex items-center gap-2 lg:gap-5">
            {navLinks.map(link => <StickyNavLink key={link.href} href={link.href} label={link.label} active={pathname === link.href || pathname.startsWith(link.href + "/")} />)}
            <Magnetic strength={0.18}>
              <TransitionLink href="/contact" className="nav-contact-button" data-cursor-hover>Let’s talk <span aria-hidden="true">↗</span></TransitionLink>
            </Magnetic>
            <ThemeToggleCompact />
          </div>
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggleCompact />
            <button
              onClick={() => setIsMenuOpen(open => !open)}
              className="menu-toggle relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-muted/50"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              data-cursor-hover
            >
              <span className={cn("h-[2px] w-6 bg-foreground transition-transform duration-300", isMenuOpen && "rotate-45 translate-y-[4px]")} />
              <span className={cn("h-[2px] w-6 bg-foreground transition-transform duration-300", isMenuOpen && "-rotate-45 -translate-y-[4px]")} />
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={menuRef}
        id="site-menu"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={cn(
          "fixed inset-0 z-40 bg-card overflow-hidden",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        style={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />

        <div className="relative h-full flex flex-col md:flex-row">
          <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 md:py-12">
            <div ref={menuLinksRef} className="space-y-1 md:space-y-2">
              {menuLinks.map((link, index) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "group relative block py-1.5 md:py-2",
                    pathname === link.href ? "text-primary" : "text-foreground",
                  )}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="text-[10px] font-mono text-muted-foreground/50 w-8 group-hover:text-primary transition-colors duration-300">
                      /{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.03em] leading-none group-hover:text-primary group-hover:translate-x-3 transition-all duration-500">
                      {link.label}
                    </span>
                    <span className="text-2xl md:text-3xl text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      ↗
                    </span>
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>

          <div className="hidden md:flex w-80 lg:w-96 flex-col justify-between p-12 border-l border-border/30">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-2">
                Menu
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Crafting digital experiences with code and data.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50 block mb-2">
                  Status
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    Available for work
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50 block mb-2">
                  Location
                </span>
                <span className="text-sm text-muted-foreground">
                  Swat, Pakistan
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50 block mb-2">
                  Expertise
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Web Dev", "Data Science", "AI/ML"].map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-border/50 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono uppercase tracking-wider text-muted-foreground/50 hover:text-primary transition-colors duration-300"
                >
                  {social.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 flex md:hidden justify-between items-center border-t border-border/30">
          <div className="flex gap-4">
            {["Gh", "Li", "Tw"].map((social, i) => (
              <a
                key={social}
                href={`https://${["github", "linkedin", "twitter"][i]}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase text-muted-foreground/60 hover:text-primary transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase text-muted-foreground/60">
              Available
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
