"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TransitionLink } from "@/components/transition-link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

/**
 * Premium 404 Page - Matching Services Hero Style
 * Features centered 404 marquee and main 404 title with outline middle digit
 */
export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".nf-tag", {
        opacity: 0,
        y: 60,
        scale: 0.8,
        filter: "blur(10px)"
      });
      gsap.set(".nf-title", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        y: 50,
        opacity: 0
      });
      gsap.set(".nf-description", {
        opacity: 0,
        y: 40,
        filter: "blur(8px)"
      });
      gsap.set(".nf-cta", {
        opacity: 0,
        y: 30
      });

      // Animation timeline
      const tl = gsap.timeline({ 
        defaults: { ease: "power4.out" },
        delay: 0.2 
      });

      // Tag reveal
      tl.to(".nf-tag", {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expo.out"
      });

      // Title unmask with polygon clip
      tl.to(".nf-title", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        y: 0,
        opacity: 1,
        duration: 1.6,
        ease: "expo.inOut"
      }, "-=1");

      // Description blur-in
      tl.to(".nf-description", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expo.out"
      }, "-=0.8");

      // CTA button
      tl.to(".nf-cta", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.4)"
      }, "-=0.6");

      // Infinite marquee - seamless loop
      // We animate xPercent to -50% because we have duplicated content
      gsap.to(".ghost-marquee", {
        xPercent: -50,
        duration: 15, // Faster speed for better visibility
        ease: "none",
        repeat: -1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main
        ref={containerRef}
        className="relative min-h-screen bg-background overflow-x-hidden"
      >
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          
          {/* Centered Ghost Marquee - Same as Services Hero */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none select-none z-0 opacity-[0.04] overflow-hidden">
            <div className="ghost-marquee flex whitespace-nowrap" style={{ width: "fit-content" }}>
              {/* Duplicated content for seamless loop */}
              <div className="flex shrink-0">
                <h2 className="text-[40vw] font-black uppercase tracking-tighter leading-none px-4">
                  404
                </h2>
                <h2 className="text-[40vw] font-black uppercase tracking-tighter leading-none px-4">
                  404
                </h2>
              </div>
               <div className="flex shrink-0">
                <h2 className="text-[40vw] font-black uppercase tracking-tighter leading-none px-4">
                  404
                </h2>
                <h2 className="text-[40vw] font-black uppercase tracking-tighter leading-none px-4">
                  404
                </h2>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center py-32">
            
            {/* Tag */}
            <span className="nf-tag text-sm md:text-base uppercase tracking-[0.4em] text-primary font-bold mb-8">
              Page Not Found
            </span>

            {/* Main Title - Massive 404 inline */}
            <h1
              ref={titleRef}
              className="nf-title text-[35vw] md:text-[25vw] leading-[0.85] font-black uppercase tracking-tighter mb-12"
            >
              <span className="inline-block">4</span>
              <span 
                className="inline-block text-transparent mx-2 md:mx-4"
                style={{ WebkitTextStroke: '3px var(--foreground)' }}
              >
                0
              </span>
              <span className="inline-block">4</span>
            </h1>

            {/* Description */}
            <div className="nf-description max-w-xl mx-auto mb-14">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                The page you're looking for doesn't exist or has been moved. 
              </p>
            </div>

            {/* CTA Button */}
            <TransitionLink
              href="/"
              className="nf-cta group inline-flex items-center gap-4 px-10 py-5 border-2 border-foreground text-foreground text-sm uppercase tracking-[0.25em] font-bold transition-all duration-300 hover:bg-foreground hover:text-background"
              data-cursor-hover
              data-cursor-label="HOME"
            >
              <span>Back to Home</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </TransitionLink>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
