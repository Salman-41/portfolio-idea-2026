"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for the ArchiveHero component.
 */
interface ArchiveHeroProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  totalProjects: number;
}

const filters = ["All", "Web App", "E-commerce"];

/**
 * Archive Hero section component.
 * Features an interactive mouse-following blob, reveal animations, and a filter bar for projects.
 */
export function ArchiveHero({
  activeFilter,
  onFilterChange,
  totalProjects,
}: ArchiveHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Initial cinematic state
      gsap.set(".archive-hero-title-line", { 
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        y: 50
      })
      gsap.set(".archive-hero-title-line span", { 
        y: "100%",
        scaleY: 1.3,
        opacity: 0,
        transformOrigin: "top"
      })
      gsap.set(".archive-hero-description", { 
        opacity: 0, 
        y: 80,
        filter: "blur(8px)"
      })
      gsap.set(".filter-bar", { 
        opacity: 0, 
        y: 50,
        scale: 0.9,
        filter: "blur(6px)"
      })

      // Cinematic master timeline
      const tl = gsap.timeline({ 
        defaults: { ease: "power4.out" },
        delay: 0.1
      })

      // Title lines unmask with polygon clip
      tl.to(".archive-hero-title-line", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        y: 0,
        duration: 1.6,
        stagger: 0.2,
        ease: "expo.inOut"
      })

      // Characters slide up and scale
      tl.to(".archive-hero-title-line span", {
        y: "0%",
        scaleY: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out"
      }, "-=1.2")

      // Description blur-in
      tl.to(".archive-hero-description", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expo.out"
      }, "-=0.6")

      // Filter bar elastic reveal
      tl.to(".filter-bar", {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.8")

      // Scroll Parallax
      gsap.to(titleRef.current, {
        y: -100,
        scale: 1.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Infinite Marquee for Ghost Text - seamless loop
      gsap.fromTo(
        ".archive-ghost-marquee",
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 20,
          ease: "none",
          repeat: -1,
        },
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-20"
    >


      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none select-none z-0 opacity-[0.03] overflow-hidden">
        <div
          className="archive-ghost-marquee flex whitespace-nowrap"
          style={{ width: "fit-content" }}
        >
          <h2 className="text-[35vw] font-black uppercase tracking-tighter leading-none px-8 shrink-0">
            ARCHIVE
          </h2>
          <h2 className="text-[35vw] font-black uppercase tracking-tighter leading-none px-8 shrink-0">
            ARCHIVE
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-12 md:mt-0">
        <h1
          ref={titleRef}
          className="text-[14vw] md:text-[10vw] leading-[0.85] font-black uppercase tracking-tighter mb-8 mix-blend-difference"
        >
          <div className="archive-hero-title-line overflow-hidden py-1">
            <span className="inline-block">Selected</span>
          </div>
          <div className="archive-hero-title-line overflow-hidden py-1">
            <span 
              className="inline-block text-transparent"
              style={{ WebkitTextStroke: '2px var(--foreground)' }}
            >
              Work
            </span>
          </div>
        </h1>

        <div className="archive-hero-description max-w-2xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            {totalProjects} projects, from financial dashboards to furniture shops.
            Take a look at what went into each one.
          </p>
        </div>

        <div className="filter-bar flex flex-wrap justify-center gap-2 px-6 py-3 bg-foreground/5 backdrop-blur-md rounded-full border border-border/50">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
