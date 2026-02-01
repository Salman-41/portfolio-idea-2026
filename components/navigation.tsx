"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useTextScramble } from "@/hooks/use-text-scramble";
import { Magnetic } from "./magnetic";
import { TransitionLink } from "./transition-link";
import { ThemeToggle, ThemeToggleCompact } from "./theme-toggle";

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
 * Props for the ScrambleLink component.
 */
interface ScrambleLinkProps {
  href: string;
  label: string;
  active: boolean;
}

/**
 * A navigation link that scrambles its text on hover.
 */
const ScrambleLink = memo(({ href, label, active }: ScrambleLinkProps) => {
  const { displayText, scramble } = useTextScramble(label, {
    duration: 800,
    speed: 40,
  });

  return (
    <TransitionLink
      href={href}
      onMouseEnter={scramble}
      className={cn(
        "relative text-sm uppercase font-medium tracking-widest transition-all duration-300",
        active
          ? "text-primary"
          : "text-muted-foreground/80 hover:text-foreground",
      )}
      data-cursor-hover
    >
      {displayText}
    </TransitionLink>
  );
});
ScrambleLink.displayName = "ScrambleLink";

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const circleOrigin = "calc(100% - 4rem) 4rem";

    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        clipPath: `circle(150% at ${circleOrigin})`,
        duration: 1.2,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        menuLinksRef.current?.children || [],
        { y: 120, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          delay: 0.4,
          ease: "power4.out",
        },
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: `circle(0% at ${circleOrigin})`,
        duration: 0.9,
        ease: "power4.inOut",
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 lg:px-20 transition-all duration-500"
      >
        <div className="flex items-center justify-between max-w-[1800px] mx-auto relative h-14">
          <TransitionLink
            href="/"
            className="absolute left-0 z-50 group shrink-0 mix-blend-difference logo"
            data-cursor-hover
            data-cursor-label="HOME"
          >
            <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground dark:text-white">
              s<span className="text-primary">y</span>
              <span className="text-primary">.</span>
            </span>
          </TransitionLink>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-end h-12 gap-6 md:gap-10">
            {/* Theme Toggle - visible on desktop when not scrolled */}
            <div
              className={cn(
                "hidden md:block transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform-gpu",
                isScrolled
                  ? "opacity-0 -translate-x-8 blur-md pointer-events-none"
                  : "opacity-100 translate-y-0 blur-0",
              )}
            >
              <ThemeToggle />
            </div>

            <div
              className={cn(
                "hidden md:flex items-center gap-10 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform-gpu",
                isScrolled
                  ? "opacity-0 -translate-x-8 blur-md pointer-events-none"
                  : "opacity-100 translate-y-0 blur-0",
              )}
            >
              {navLinks.map((link) => (
                <ScrambleLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={pathname === link.href}
                />
              ))}
            </div>

            <div className="relative flex items-center justify-end min-w-[140px] h-12">
              <div
                className={cn(
                  "hidden md:block transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform-gpu",
                  isScrolled
                    ? "opacity-0 translate-x-12 pointer-events-none scale-90"
                    : "opacity-100 translate-x-0 scale-100",
                )}
              >
                <Magnetic strength={0.2}>
                  <TransitionLink
                    href="/contact"
                    className="flex px-6 py-2 text-xs uppercase tracking-widest font-bold border border-border/50 text-foreground hover:bg-foreground hover:text-background transition-all duration-500 rounded-full whitespace-nowrap"
                    data-cursor-hover
                    data-cursor-label="CONTACT"
                  >
                    Let's Talk
                  </TransitionLink>
                </Magnetic>
              </div>

              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-end gap-3 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform-gpu",
                  "opacity-100 scale-100 translate-x-0",
                  "md:opacity-0 md:scale-75 md:translate-x-12 md:pointer-events-none",
                  isScrolled &&
                    "md:opacity-100 md:scale-100 md:translate-x-0 md:pointer-events-auto",
                )}
              >
                {/* Theme Toggle for mobile or scrolled state */}
                <ThemeToggleCompact />

                <Magnetic strength={0.4}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="menu-toggle relative z-50 w-12 h-12 flex flex-col items-end justify-center gap-1.5 group rounded-full hover:bg-muted/50 transition-all duration-300"
                    aria-label="Toggle menu"
                    data-cursor-hover
                    data-cursor-label="MENU"
                  >
                    <span
                      className={cn(
                        "h-[2px] bg-foreground transition-all duration-500 rounded-full",
                        isMenuOpen
                          ? "w-7 rotate-45 translate-y-[8px]"
                          : "w-7 group-hover:w-5",
                      )}
                    />
                    <span
                      className={cn(
                        "h-[2px] bg-foreground transition-all duration-500 rounded-full",
                        isMenuOpen ? "opacity-0" : "w-4 group-hover:w-7",
                      )}
                    />
                    <span
                      className={cn(
                        "h-[2px] bg-foreground transition-all duration-500 rounded-full",
                        isMenuOpen
                          ? "w-7 -rotate-45 -translate-y-[8px]"
                          : "w-6 group-hover:w-4",
                      )}
                    />
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        ref={menuRef}
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
