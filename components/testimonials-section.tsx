"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Code2, Palette, Rocket, LineChart, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "Maintainable, scalable architecture that your team will love.",
    number: "01",
  },
  {
    icon: Palette,
    title: "Premium Design",
    desc: "Awwwards-level aesthetics with obsessive attention to detail.",
    number: "02",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized performance with cutting-edge technologies.",
    number: "03",
  },
  {
    icon: LineChart,
    title: "Data-Driven",
    desc: "Insights and analytics that drive real business decisions.",
    number: "04",
  },
  {
    icon: Rocket,
    title: "Future-Ready",
    desc: "Built with modern tools like Next.js, GSAP, and WebGL.",
    number: "05",
  },
  {
    icon: Shield,
    title: "Reliable",
    desc: "Consistent delivery with clear communication throughout.",
    number: "06",
  },
];

const stats = [
  { value: 50, suffix: "+", label: "Projects" },
  { value: 3, suffix: "+", label: "Years" },
  { value: 100, suffix: "%", label: "Satisfaction" },
  { value: 24, suffix: "h", label: "Response" },
];

// Custom hook for counting animation
function useCountUp(end: number, duration: number = 2) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(value, 2);

  return (
    <div ref={ref} className="stat-item flex flex-col items-center">
      <div className="flex items-baseline gap-1">
        <span className="text-6xl md:text-8xl font-black text-foreground tabular-nums leading-none">
          {count}
        </span>
        <span className="text-4xl md:text-5xl font-black text-primary">
          {suffix}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2">
        {label}
      </span>
    </div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Stats horizontal reveal
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-row",
            start: "top 85%",
          },
        },
      );

      // Cards staggered reveal with rotation
      gsap.fromTo(
        ".capability-card",
        {
          opacity: 0,
          y: 100,
          rotateY: -15,
          transformOrigin: "left center",
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".cards-grid",
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-40 bg-background relative overflow-hidden"
    >
      {/* Massive Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02]">
        <span className="text-[40vw] font-black uppercase tracking-tighter whitespace-nowrap">
          WHY
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header - Asymmetric Layout */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-24">
          <div>
            <span className="block text-xs uppercase tracking-[0.4em] text-primary mb-4 font-mono">
              // Why_Choose_Me
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              Built
              <br />
              <span className="text-transparent stroke-text-2">Different</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md lg:text-right leading-relaxed">
            I don't just build websites — I craft digital experiences that leave
            lasting impressions.
          </p>
        </div>

        {/* Stats Row - Horizontal Strip */}
        <div className="stats-row flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-4 mb-24 py-12 border-y border-border/30">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>

        {/* Cards Grid - Brutalist Style */}
        <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            const isHovered = hoveredCard === i;

            return (
              <div
                key={i}
                className="capability-card group relative"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ perspective: "1000px" }}
              >
                {/* Card */}
                <div
                  className={`
                  relative p-10 md:p-12 border border-border/30 
                  transition-all duration-500 cursor-default
                  ${isHovered ? "bg-primary text-primary-foreground border-primary" : "bg-transparent"}
                `}
                >
                  {/* Large Number Background */}
                  <span
                    className={`
                    absolute top-4 right-4 text-[8rem] font-black leading-none 
                    transition-all duration-500 select-none pointer-events-none
                    ${isHovered ? "text-primary-foreground/10" : "text-foreground/[0.03]"}
                  `}
                  >
                    {reason.number}
                  </span>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with animated ring */}
                    <div className="relative w-16 h-16 mb-8">
                      <div
                        className={`
                        absolute inset-0 rounded-full border-2 transition-all duration-500
                        ${isHovered ? "border-primary-foreground/30 scale-125" : "border-border/30 scale-100"}
                      `}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon
                          className={`w-7 h-7 transition-colors duration-300 ${isHovered ? "text-primary-foreground" : "text-primary"}`}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`
                      text-2xl md:text-3xl font-black uppercase tracking-tight mb-4
                      transition-colors duration-300
                      ${isHovered ? "text-primary-foreground" : "text-foreground"}
                    `}
                    >
                      {reason.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`
                      text-base leading-relaxed transition-colors duration-300
                      ${isHovered ? "text-primary-foreground/80" : "text-muted-foreground"}
                    `}
                    >
                      {reason.desc}
                    </p>

                    {/* Arrow indicator */}
                    <div
                      className={`
                      mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium
                      transition-all duration-500
                      ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                    `}
                    >
                      <span
                        className={
                          isHovered ? "text-primary-foreground" : "text-primary"
                        }
                      >
                        Explore
                      </span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div
                    className={`
                    absolute bottom-0 left-0 w-0 h-1 bg-primary transition-all duration-500
                    ${isHovered ? "w-full" : "w-0"}
                  `}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
