"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function GamesArcade() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Reveal Title characters
      tl.fromTo(
        ".char-reveal",
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.05,
          duration: 1,
          ease: "expo.out",
        },
      );

      // Line expansion
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "expo.inOut" },
        "-=0.8",
      );

      // Subtitle Reveal
      tl.fromTo(
        ".sub-reveal",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
        "-=0.5",
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 px-4 md:px-12 min-h-[60vh] flex flex-col justify-center bg-background relative overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div className="container mx-auto relative z-10 max-w-[1400px]">
        {/* Typography Title */}
        <div className="relative mb-8 leading-none">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white overflow-hidden">
            {Array.from("SQL").map((char, i) => (
              <span key={i} className="char-reveal inline-block">
                {char}
              </span>
            ))}
            <span className="text-transparent stroke-text-2 ml-4">
              {Array.from("TRAINING").map((char, i) => (
                <span key={i} className="char-reveal inline-block">
                  {char}
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* Separator Line */}
        <div
          ref={lineRef}
          className="w-full h-px bg-white/10 mb-12 origin-left"
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
          <div className="md:col-span-1 space-y-4">
            <p className="sub-reveal text-muted-foreground leading-relaxed">
              Master the art of data forensics. Solve simulated cyber-crimes
              using real SQL syntax in an immersive terminal experience.
            </p>
          </div>

          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="sub-reveal flex items-center gap-4 text-white/50 text-sm font-mono">
              <span className="text-primary">[01]</span>
              <span>SYNTAX TRAINING</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="sub-reveal flex items-center gap-4 text-white/50 text-sm font-mono">
              <span className="text-primary">[02]</span>
              <span>LOGIC PUZZLES</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="sub-reveal flex items-center gap-4 text-white/50 text-sm font-mono">
              <span className="text-primary">[03]</span>
              <span>DATA FORENSICS</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>

          <div className="md:col-span-1 flex justify-end">
            <Link
              href="/detective"
              className="sub-reveal group relative inline-flex items-center gap-4 text-lg md:text-xl font-bold uppercase text-white hover:text-primary transition-colors"
            >
              <span>Enter Training</span>
              <div className="relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors">
                <ArrowUpRight className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-500" />
                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
