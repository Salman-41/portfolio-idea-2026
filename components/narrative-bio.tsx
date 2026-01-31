"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  {
    id: "01",
    title: "Creative Dev",
    color: "primary",
    description:
      "Crafting immersive digital experiences with WebGL, GSAP, and modern frontend frameworks. I focus on interaction, motion, and visual storytelling.",
    tech: ["React", "Next.js", "Three.js", "GSAP", "Tailwind"],
  },
  {
    id: "02",
    title: "Data Science",
    color: "blue-500",
    description:
      "Uncovering insights through EDA, building predictive models with ML, and visualizing complex datasets. Turning raw data into actionable intelligence.",
    tech: ["Python", "TensorFlow", "Pandas", "Scikit-Learn", "EDA"],
  },
  {
    id: "03",
    title: "AI Integration",
    color: "purple-500",
    description:
      "Bridging the gap by integrating AI models into web applications for smarter, adaptive user interfaces.",
    tech: ["LangChain", "OpenAI", "Vector DB", "RAG", "Agents"],
  },
];

export function NarrativeBio() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split headline into words for reveal animation
      const headline = headlineRef.current;
      if (headline) {
        const text = headline.textContent || "";
        headline.innerHTML = text
          .split(" ")
          .map(
            (word, i) =>
              `<span class="inline-block overflow-hidden"><span class="word inline-block" style="transform: translateY(100%)">${word}</span></span>`,
          )
          .join(" ");

        // Animate words on scroll
        gsap.to(".word", {
          y: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headline,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        });
      }

      // Timeline progress bar
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      // Timeline cards staggered reveal
      gsap.fromTo(
        ".timeline-card",
        { x: (i) => (i % 2 === 0 ? -100 : 100), opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "center 50%",
            scrub: 1,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        {/* Main Headline with Word Reveal */}
        <div className="mb-24 md:mb-40">
          <h2
            ref={headlineRef}
            className="text-4xl md:text-6xl lg:text-8xl font-medium leading-[1.1] tracking-tight max-w-5xl"
          >
            Bridging the gap between Data Intelligence & Creative Expression
          </h2>
        </div>

        {/* Timeline Section */}
        <div ref={timelineRef} className="relative">
          {/* Progress Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-blue-500 to-purple-500 origin-top"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {/* Timeline Cards */}
          <div className="relative space-y-16 md:space-y-24">
            {expertise.map((item, index) => (
              <div
                key={item.id}
                className={`timeline-card relative pl-12 md:pl-0 md:w-[45%] ${
                  index % 2 === 0
                    ? "md:mr-auto md:pr-16"
                    : "md:ml-auto md:pl-16"
                }`}
              >
                {/* Card Content */}
                <div className="group relative p-6 md:p-8 rounded-2xl border border-border/50 bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-all duration-500">
                  {/* Background Number */}
                  <span className="absolute -top-4 -right-4 text-[80px] md:text-[100px] font-black text-foreground/[0.02] leading-none select-none">
                    {item.id}
                  </span>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className={`text-xl md:text-2xl font-bold uppercase tracking-tight text-${item.color}`}
                      >
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {item.id}
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-[10px] font-mono uppercase border border-border/50 rounded text-muted-foreground hover:border-border hover:text-foreground/80 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
