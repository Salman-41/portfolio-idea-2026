"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionLink } from "./transition-link";
import { ArrowUp, Github, Linkedin, Twitter, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "X" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

/**
 * Global Site Footer component.
 * Includes navigation links, social media connections, and a "back to top" functionality.
 * Features staggered entrance animations triggered on scroll.
 */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current?.querySelectorAll(".animate-item") || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 md:py-24 bg-background border-t border-border/30 overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.02] hidden md:block">
        <span className="text-[20vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
          SALMAN
        </span>
      </div>

      <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] md:hidden">
        <span className="text-[25vw] font-black uppercase tracking-tighter leading-none [writing-mode:vertical-rl] rotate-180">
          SALMAN
        </span>
      </div>

      <div className="w-full px-4 md:px-12 lg:px-20 relative z-10">
        <div className="animate-item flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12 mb-16 md:mb-20">
          <TransitionLink
            href="/"
            className="text-4xl md:text-6xl font-black tracking-tight group"
          >
            s
            <span className="text-primary group-hover:text-foreground transition-colors">
              y
            </span>
            <span className="text-primary">.</span>
          </TransitionLink>

          <div className="text-center md:text-right max-w-md">
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Have a project in mind? Let's create something extraordinary
              together.
            </p>
            <TransitionLink
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-bold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </TransitionLink>
          </div>
        </div>

        <div className="animate-item grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-12 md:pb-16 border-b border-border/30">
          <div className="text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4 block">
              Navigation
            </span>
            <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </nav>
          </div>

          <div className="text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4 block">
              Connect
            </span>
            <div className="flex justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-center md:text-right">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4 block">
              Contact
            </span>
            <a
              href="mailto:salmanyousufzai@gmail.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 block"
            >
              salmanyousufzai@gmail.com
            </a>
            <span className="text-sm text-muted-foreground/50 block mt-1">
              Swat, Pakistan
            </span>
          </div>
        </div>

        <div className="animate-item flex flex-col md:flex-row items-center justify-between gap-4 pt-8 md:pt-10">
          <div className="text-center md:text-left">
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Salman Yousufzai. All rights
              reserved.
            </p>
            <p className="text-[10px] text-muted-foreground/40 mt-1">
              Designed & Developed with ♥ in Pakistan
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary border border-border/50 hover:border-primary rounded-full transition-all duration-300 group"
          >
            Back to Top
            <ArrowUp className="w-3 h-3 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
