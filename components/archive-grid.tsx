"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { TransitionLink as Link } from "./transition-link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Interface definition for a project item.
 */
interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  href: string;
  image: string;
}

/**
 * Props for the ArchiveGrid component.
 */
interface ArchiveGridProps {
  projects: Project[];
}

/**
 * Generates a consistent dark distinctive background color based on the project ID.
 * @param id - The project ID used to select the color.
 */
const getCardColor = (id: number) => {
  const colors = [
    "#0f172a",
    "#1e1b4b",
    "#2e1065",
    "#020617",
    "#172554",
    "#052e16",
  ];
  return colors[id % colors.length];
};

/**
 * A detailed grid layout for displaying archived projects.
 * Features sticky cards with scroll-triggered blur and scale exit animations.
 */
export function ArchiveGrid({ projects }: ArchiveGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll(".project-card-item");

      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];
        if (!nextCard) return;

        gsap.to(card, {
          opacity: 0,
          scale: 0.9,
          filter: "blur(20px)",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={containerRef} className="relative bg-background pt-10 pb-40">
      <div className="relative">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card-item sticky top-0 h-screen flex items-center justify-center p-4 md:p-8"
          >
            <Link
              href={project.href}
              className="relative w-full max-w-7xl h-[85vh] rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl group block"
              style={{ backgroundColor: getCardColor(project.id) }}
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col justify-between z-10 relative">
                  <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-white/50">
                    <span>No. {(index + 1).toString().padStart(2, "0")}</span>
                    <span>{project.year}</span>
                  </div>

                  <div className="relative">
                    <h3 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-[0.85] text-white mix-blend-difference">
                      {project.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-widest text-primary border border-primary/20">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 group-hover:gap-6 transition-all duration-500">
                    <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/70">
                      View Case
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-3/5 relative h-1/2 md:h-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40 z-10" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-expo group-hover:scale-110"
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}

        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
            <span className="text-[15vw] font-black uppercase tracking-tighter text-white/[0.02] leading-none [writing-mode:vertical-lr] rotate-180">
              NEXT?
            </span>
          </div>

          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
            <span className="text-[15vw] font-black uppercase tracking-tighter text-white/[0.02] leading-none [writing-mode:vertical-lr]">
              LET'S TALK
            </span>
          </div>

          <div className="absolute top-20 left-8 md:left-16 hidden md:flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
              Available for
            </span>
            <div className="flex flex-wrap gap-2 max-w-[200px]">
              {["Freelance", "Full-time", "Collaboration"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground border border-border/50 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute top-20 right-8 md:right-16 hidden md:flex flex-col gap-3 items-end">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
              Expertise in
            </span>
            <div className="flex flex-wrap gap-2 max-w-[400px] justify-end">
              {[
                "Next.js",
                "React",
                "Vue",
                "Nuxt",
                "Svelte",
                "Tailwind",
                "HTML/CSS",
                "JavaScript",
                "Python",
                "GSAP",
                "Lenis",
                "WebGL",
                "Three.js",
                "Plotly",
                "P5.js",
                "Machine Learning",
                "Deep Learning",
                "TensorFlow",
                "Data Science",
                "EDA",
                "Data Cleaning",
                "Dashboards",
                "Analytics",
                "Pandas",
                "NumPy",
                "Visualization",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[10px] uppercase tracking-wider text-primary/60 border border-primary/20 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute bottom-20 left-8 md:left-16 hidden md:block">
            <div className="flex flex-col gap-2">
              <div className="w-12 h-[1px] bg-gradient-to-r from-foreground/20 to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Based in Pakistan
              </span>
            </div>
          </div>

          <div className="absolute bottom-20 right-8 md:right-16 text-right hidden md:block">
            <div className="flex flex-col gap-2 items-end">
              <a
                href="mailto:hello@example.com"
                className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
              >
                salmanyousufzai@gmail.com
              </a>
              <div className="w-12 h-[1px] bg-gradient-to-l from-foreground/20 to-transparent" />
            </div>
          </div>

          <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 200"
              style={{ animation: "spin 25s linear infinite" }}
            >
              <defs>
                <path
                  id="outerPath"
                  d="M 100, 100 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0"
                />
              </defs>
              <text className="fill-foreground/20 text-[7px] uppercase tracking-[0.15em] font-medium">
                <textPath href="#outerPath">
                  ✦ FREELANCE ✦ COLLABORATION ✦ FULL-TIME ✦ REMOTE ✦ WORLDWIDE ✦ AVAILABLE NOW ✦ LET'S CONNECT ✦ HIRE ME ✦ OPEN TO WORK ✦ R ✦ INNOVATIVE ✦
                </textPath>
              </text>
            </svg>

            <svg
              className="absolute inset-[30px] md:inset-[50px] w-[calc(100%-60px)] h-[calc(100%-60px)] md:w-[calc(100%-100px)] md:h-[calc(100%-100px)]"
              viewBox="0 0 200 200"
              style={{ animation: "spin 12s linear infinite reverse" }}
            >
              <defs>
                <path
                  id="middlePath"
                  d="M 100, 100 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
                />
              </defs>
              <text className="fill-primary text-[11px] uppercase tracking-[0.2em] font-black">
                <textPath href="#middlePath">
                  ★ LET'S CREATE SOMETHING AMAZING ★ HAVE A PROJECT IN MIND ★
                  LET'S TALK
                </textPath>
              </text>
            </svg>

            <svg
              className="absolute inset-[60px] md:inset-[100px] w-[calc(100%-120px)] h-[calc(100%-120px)] md:w-[calc(100%-200px)] md:h-[calc(100%-200px)]"
              viewBox="0 0 200 200"
              style={{ animation: "spin 20s linear infinite" }}
            >
              <defs>
                <path
                  id="innerPath"
                  d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                />
              </defs>
              <text className="fill-foreground/30 text-[8px] uppercase tracking-[0.15em] font-medium">
                <textPath href="#innerPath">
                  ◆ WEB DEV ◆ DATA SCIENCE ◆ ML ◆ DESIGN ◆ CREATIVE CODING ◆
                  CONSULTING ◆ ANALYTICS ◆ AI ◆ PYTHON ◆ REACT
                </textPath>
              </text>
            </svg>

            <a
              href="https://wa.me/923456556686?text=Hi!%20I%20have%20a%20project%20in%20mind."
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 m-auto w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-full border border-foreground/30 flex items-center justify-center group cursor-pointer overflow-hidden hover:border-primary transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center" />

              <div className="text-center relative z-10">
                <span className="block text-foreground/70 group-hover:text-background text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] transition-colors duration-300 mb-1">
                  Start a
                </span>
                <span className="block text-foreground group-hover:text-background text-xl md:text-3xl font-black uppercase tracking-tight transition-colors duration-300">
                  Project
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
