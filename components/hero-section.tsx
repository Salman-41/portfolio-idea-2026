"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionLink } from "./transition-link";
import { ArrowDown } from "lucide-react";
import { ThreeScene } from "./three-scene";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "ABCDEFGHIKLMNOPQRSTUVWYZ0123456789!@#$%^&*()_+";

/**
 * Renders text with a scrambling effect on reveal.
 * @param text - The text to display.
 * @param delay - Delay in seconds before the scramble effect starts.
 */
function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === " ") return " ";
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join(""),
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsRevealed(true);
        }

        iteration += 1 / 3;
      }, 30);
    }, delay * 1000);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <span className={isRevealed ? "" : "font-mono opacity-80"}>
      {displayText || "\u00A0".repeat(text.length)}
    </span>
  );
}

/**
 * A wrapper component that applies a magnetic effect to its children.
 * The child element moves towards the cursor when hovered.
 */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={buttonRef} className="inline-block">
      {children}
    </div>
  );
}

/**
 * The main Hero Section component.
 * Features a 3D background, scrambled text animations, magnetic buttons, and responsive layout.
 */
export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 0.5 },
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 1 },
          "-=0.5",
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 1 },
          "<",
        );
      }

      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 2 },
        );

        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      gsap.to(".hero-title-line", {
        x: (i) => (i % 2 === 0 ? -100 : 100),
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-bg-container", {
        y: 150,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex flex-col justify-between p-4 md:p-12 lg:p-16 hero-section"
    >
      <div className="absolute inset-0 z-0 hero-bg-container pointer-events-none">
        <ThreeScene />
      </div>

      {/* Gradient overlays for depth */}
      <div className="hero-gradient-overlay absolute inset-0 z-0 pointer-events-none" />
      <div className="hero-radial-overlay absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-20 flex-1 flex flex-col justify-center items-center w-full pointer-events-none">
        <h1
          ref={titleRef}
          className="flex flex-col w-full text-[17vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] font-black leading-[0.9] tracking-tighter uppercase text-foreground text-center md:text-left"
        >
          <span className="self-center md:self-start md:pl-[5vw] mb-4 text-[10px] sm:text-xs md:text-base font-mono text-primary tracking-widest uppercase pointer-events-auto">
            Salman Yousufzai
          </span>

          <span className="hero-title-line block pointer-events-auto hover:text-primary transition-colors duration-500 self-center md:self-start md:pl-[5vw]">
            <ScrambleText text="CRAFTING" delay={0.5} />
          </span>
          <span className="hero-title-line block gradient-text pointer-events-auto self-center">
            <ScrambleText text="DIGITAL" delay={0.8} />
          </span>
          <span className="hero-title-line block pointer-events-auto hover:text-primary transition-colors duration-500 self-center md:self-end md:pr-[5vw]">
            <ScrambleText text="ARTISTRY" delay={1.1} />
          </span>
        </h1>

        <div className="flex md:hidden flex-col items-center gap-1 mt-6 pointer-events-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-medium">
            Developer & Data Scientist
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            Swat, Pakistan
          </span>
        </div>

        <div className="absolute right-4 md:right-[5vw] top-[55%] md:top-[50%] -translate-y-full hidden md:flex flex-col gap-1 items-end text-right pointer-events-auto text-foreground">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium">
            Developer & Data Scientist
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-70">
            Swat, Pakistan
          </span>
        </div>
      </div>

      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-8 pointer-events-auto text-foreground">
        {["GitHub", "LinkedIn", "Twitter"].map((label) => (
          <a
            key={label}
            href={`https://${label.toLowerCase()}.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] md:text-xs uppercase tracking-[0.3em] hover:text-primary transition-all duration-300 [writing-mode:vertical-lr] hover:translate-x-1"
            data-cursor-hover
          >
            {label}
          </a>
        ))}
        <div className="w-[1px] h-24 bg-gradient-to-b from-foreground/50 via-foreground to-transparent mx-auto" />
      </div>

      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-8 text-right pointer-events-auto text-foreground">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] [writing-mode:vertical-lr]">
          EST. 2026
        </span>
        <div className="w-[1px] h-24 bg-gradient-to-t from-foreground/50 via-foreground to-transparent mx-auto" />
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)] group-hover:scale-150 transition-transform duration-300" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] [writing-mode:vertical-lr] group-hover:text-primary transition-colors">
              Available for Work
            </span>
          </div>
        </div>
      </div>

      <div
        ref={bottomBarRef}
        className="relative z-30 flex flex-col md:flex-row justify-between items-center md:items-end w-full pointer-events-none gap-4 pb-2 md:pb-0"
      >
        <div className="hidden md:flex flex-col gap-2 items-start text-left pointer-events-auto text-foreground">
          <div ref={subtitleRef} className="max-w-md">
            <p className="text-sm opacity-80 leading-relaxed font-light tracking-wide border-l border-primary/30 pl-4">
              Merging architectural precision with fluid motion design.
              Engineering high-performance interfaces that transform complex
              data into captivating visual narratives.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center md:items-end pointer-events-auto md:ml-auto">
          <div
            ref={ctaRef}
            className="flex flex-row gap-4 items-center justify-center md:justify-end"
          >
            <MagneticButton>
              <TransitionLink
                href="/projects"
                className="flex items-center h-12 px-6 text-xs uppercase tracking-widest font-bold border border-foreground/20 text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-500 rounded-full whitespace-nowrap"
                data-cursor-hover
              >
                View Projects
              </TransitionLink>
            </MagneticButton>

            <MagneticButton>
              <TransitionLink
                href="/contact"
                className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)]"
                data-cursor-hover
              >
                <ArrowDown className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </TransitionLink>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
