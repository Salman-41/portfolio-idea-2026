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

const filters = ["All", "Web App", "E-commerce", "Creative", "3D/WebGL"];

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
  const blobRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mouse Follower (Organic Blob)
      const xTo = gsap.quickTo(blobRef.current, "x", {
        duration: 1,
        ease: "power3",
      });
      const yTo = gsap.quickTo(blobRef.current, "y", {
        duration: 1,
        ease: "power3",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        xTo(clientX);
        yTo(clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".archive-hero-title-line span",
        {
          y: "100%",
          rotate: 5,
        },
        {
          y: "0%",
          rotate: 0,
          duration: 1.5,
          stagger: 0.1,
          delay: 0.3,
        },
      );

      tl.fromTo(
        ".archive-hero-description",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
        },
        "-=1",
      );

      tl.fromTo(
        ".filter-bar",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
        },
        "-=0.5",
      );

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

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-20"
    >
      <div
        ref={blobRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] -ml-[300px] -mt-[300px] rounded-full blur-[120px] opacity-20 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />

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

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <h1
          ref={titleRef}
          className="text-[12vw] md:text-[10vw] leading-[0.85] font-black uppercase tracking-tighter mb-8 mix-blend-difference"
        >
          <div className="archive-hero-title-line overflow-hidden py-1">
            <span className="inline-block">Selected</span>
          </div>
          <div className="archive-hero-title-line overflow-hidden py-1">
            <span className="inline-block text-transparent stroke-text-2">
              Work
            </span>
          </div>
        </h1>

        <div className="archive-hero-description max-w-2xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            {totalProjects} curated experiences showcasing expertise in creating
            immersive digital products, from concept to deployment.
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
