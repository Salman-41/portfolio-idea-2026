"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);



/**
 * Identity Hero section component.
 * Features a large name reveal, portrait image, and floating decorative elements.
 */
export function IdentityHero() {
  const containerRef = useRef<HTMLElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const decorLeftRef = useRef<HTMLDivElement>(null);
  const decorRightRef = useRef<HTMLDivElement>(null);
  const topArcRef = useRef<SVGSVGElement>(null);
  const cornerTLRef = useRef<HTMLDivElement>(null);
  const cornerBRRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Initial state
      tl.set([firstNameRef.current, lastNameRef.current], {
        y: 150,
        opacity: 0,
      });
      tl.set(imageWrapperRef.current, {
        scale: 1.2,
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
      });

      // Name reveal
      tl.to(firstNameRef.current, { y: 0, opacity: 1, duration: 1.5 });
      tl.to(lastNameRef.current, { y: 0, opacity: 1, duration: 1.5 }, "-=1.3");

      // Image reveal
      tl.to(
        imageWrapperRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power4.out",
        },
        "-=1.0",
      );

      // Badge spin entrance
      gsap.from(badgeRef.current, {
        scale: 0,
        rotate: -180,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 1.2,
      });

      // Scroll parallax - Names
      gsap.to(firstNameRef.current, {
        x: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(lastNameRef.current, {
        x: 150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Scroll parallax - Image
      gsap.to(imageWrapperRef.current, {
        y: 150,
        scale: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Scroll parallax - Decorative elements
      gsap.to(decorLeftRef.current, {
        y: -80,
        rotate: 5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(decorRightRef.current, {
        y: -100,
        rotate: -5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(topArcRef.current, {
        y: -50,
        scale: 1.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Corner brackets move inward on scroll
      gsap.to(cornerTLRef.current, {
        x: 30,
        y: 30,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      });

      gsap.to(cornerBRRef.current, {
        x: -30,
        y: -30,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-0 md:pt-48 md:pb-0 px-4 md:px-12 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* ═══════════════════════════════════════════════════════════════
          Creative Artistic Background - Scroll-Animated Line Art
          ═══════════════════════════════════════════════════════════════ */}

      {/* Corner bracket - top left */}
      <div ref={cornerTLRef} className="absolute top-16 left-8 md:top-24 md:left-16 w-16 h-16 md:w-20 md:h-20 pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 80 80" className="opacity-30">
          <path d="M 0 40 L 0 0 L 40 0" fill="none" stroke="var(--primary)" strokeWidth="1" />
          <circle cx="0" cy="0" r="3" fill="var(--primary)" fillOpacity="0.5" />
        </svg>
      </div>

      {/* Corner bracket - bottom right */}
      <div ref={cornerBRRef} className="absolute bottom-16 right-8 md:bottom-24 md:right-16 w-16 h-16 md:w-20 md:h-20 pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 80 80" className="opacity-30">
          <path d="M 80 40 L 80 80 L 40 80" fill="none" stroke="var(--primary)" strokeWidth="1" />
          <circle cx="80" cy="80" r="3" fill="var(--primary)" fillOpacity="0.5" />
        </svg>
      </div>

      {/* Elegant curved arc - top */}
      <svg ref={topArcRef} className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[80vw] h-[30vh] pointer-events-none z-0 opacity-[0.08]" viewBox="0 0 800 200" fill="none">
        <path 
          d="M 0 200 Q 400 -50 800 200" 
          stroke="url(#arcGradient)" 
          strokeWidth="1"
          strokeDasharray="8 12"
          className="animate-[dash_20s_linear_infinite]"
        />
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating geometric accent - left */}
      <div ref={decorLeftRef} className="hidden md:block absolute left-[5%] top-1/2 -translate-y-1/2 pointer-events-none z-0">
        <svg width="80" height="300" viewBox="0 0 80 300" className="opacity-20">
          <line x1="40" y1="0" x2="40" y2="300" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="40" cy="60" r="4" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
          <circle cx="40" cy="150" r="8" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
          <circle cx="40" cy="240" r="4" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
          {/* Concentric circles */}
          <circle cx="40" cy="150" r="20" fill="none" stroke="var(--primary)" strokeWidth="0.3" strokeDasharray="2 4" />
          <circle cx="40" cy="150" r="35" fill="none" stroke="var(--primary)" strokeWidth="0.2" strokeDasharray="1 6" />
        </svg>
      </div>

      {/* Floating geometric accent - right */}
      <div ref={decorRightRef} className="hidden md:block absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none z-0">
        <svg width="80" height="280" viewBox="0 0 80 280" className="opacity-15">
          <path d="M 40 0 L 40 280" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="2 6" />
          <rect x="25" y="80" width="30" height="30" fill="none" stroke="var(--primary)" strokeWidth="0.5" transform="rotate(45 40 95)" />
          <rect x="30" y="180" width="20" height="20" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
          {/* Small accent dots */}
          <circle cx="40" cy="40" r="2" fill="var(--primary)" fillOpacity="0.4" />
          <circle cx="40" cy="240" r="2" fill="var(--primary)" fillOpacity="0.4" />
        </svg>
      </div>

      {/* Horizontal scan lines */}
      <div className="hidden md:block absolute top-[30%] left-[15%] w-24 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none z-0" />
      <div className="hidden md:block absolute top-[70%] right-[15%] w-32 h-px bg-gradient-to-l from-transparent via-primary/15 to-transparent pointer-events-none z-0" />

      {/* Scattered accent dots */}
      <div className="hidden md:block absolute top-[25%] right-[20%] w-1.5 h-1.5 rounded-full bg-primary/30 pointer-events-none z-0" />
      <div className="hidden md:block absolute bottom-[35%] left-[18%] w-2 h-2 rounded-full bg-primary/20 pointer-events-none z-0" />
      <div className="hidden md:block absolute top-[60%] left-[25%] w-1 h-1 rounded-full bg-primary/40 pointer-events-none z-0" />




      <div className="container mx-auto relative z-10 flex flex-col items-center px-4">
        <h1
          ref={firstNameRef}
          className="relative z-10 text-[22vw] md:text-[15vw] leading-[0.8] font-black tracking-tighter uppercase mix-blend-difference about-name-text"
        >
          SALMAN
        </h1>

        <div className="relative z-0 -my-8 md:-my-24 w-[80vw] md:w-[35vw] aspect-[3/4]">
          <div
            ref={imageWrapperRef}
            className="relative w-full h-full overflow-hidden rounded-sm"
          >
            <Image
              src="/images/11.jpeg"
              alt="Salman Yousufzai"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
          </div>

          <div
            ref={badgeRef}
            className="absolute -top-6 -right-4 md:-top-12 md:-right-24 w-20 h-20 md:w-48 md:h-48 z-20"
          >
            <svg
              className="w-full h-full animate-[spin_10s_linear_infinite]"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="text-[10px] font-bold uppercase tracking-[0.2em] fill-primary">
                <textPath href="#circlePath">
                  Creative Developer • Designer •{" "}
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        <h1
          ref={lastNameRef}
          className="relative z-20 text-[16vw] md:text-[15vw] leading-[0.8] font-black tracking-tighter uppercase text-transparent stroke-text-2"
        >
          YOUSUFZAI
        </h1>
      </div>
    </section>
  );
}
