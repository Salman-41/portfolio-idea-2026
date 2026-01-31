"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  ArrowLeft,
  ArrowDown,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- SCRAMBLE TEXT UTILITY (Ported from HeroSection) ---
const CHARS = "ABCDEFGHIKLMNOPQRSTUVWYZ0123456789!@#$%^&*()_+";

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

// PROJECT DATA
const projectData: Record<
  string,
  {
    title: string;
    category: string;
    year: string;
    client: string;
    role: string;
    description: string;
    challenge: string;
    solution: string;
    images: string[];
    tags: string[];
    liveUrl?: string;
    githubUrl?: string;
    nextProject?: { slug: string; title: string };
  }
> = {
  "nebula-finance": {
    title: "Nebula Finance",
    category: "Web App / Fintech",
    year: "2025",
    client: "Nebula Labs",
    role: "Lead Developer & Designer",
    description:
      "A revolutionary crypto trading platform with real-time analytics and immersive 3D data visualization. Built to handle millions of transactions while providing an intuitive user experience.",
    challenge:
      "The client needed a trading platform that could visualize complex financial data in real-time while maintaining sub-second response times and handling high-frequency trading operations.",
    solution:
      "Implemented WebSocket connections for real-time data streaming, Three.js for immersive 3D visualizations, and optimized React components with virtualization for smooth performance even with large datasets.",
    images: [
      "/dark-fintech-dashboard-with-charts-and-crypto.jpg",
      "/crypto-trading-charts-dark-theme.jpg",
      "/fintech-mobile-app-dark-mode.jpg",
    ],
    tags: [
      "Next.js",
      "Three.js",
      "WebGL",
      "TypeScript",
      "WebSocket",
      "PostgreSQL",
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    nextProject: { slug: "artisan-studio", title: "Artisan Studio" },
  },
  "artisan-studio": {
    title: "Artisan Studio",
    category: "E-commerce / Design",
    year: "2025",
    client: "Artisan Furniture Co.",
    role: "Full-Stack Developer",
    description:
      "Luxury furniture e-commerce experience with AR product previews and seamless checkout flow. Designed to elevate the online shopping experience for high-end furniture.",
    challenge:
      "Creating an e-commerce platform that conveyed the luxury and craftsmanship of the furniture while allowing customers to visualize products in their own space before purchasing.",
    solution:
      "Developed a custom AR feature using AR.js that lets customers place 3D furniture models in their rooms. Integrated Stripe for seamless payments and Sanity CMS for easy content management.",
    images: [
      "/modern-furniture-ecommerce-dark-theme.jpg",
      "/luxury-furniture-product-page-dark.jpg",
      "/ar-furniture-preview-app.jpg",
    ],
    tags: [
      "React",
      "AR.js",
      "Stripe",
      "Sanity",
      "Tailwind CSS",
      "Framer Motion",
    ],
    liveUrl: "https://example.com",
    nextProject: { slug: "synthwave-records", title: "Synthwave Records" },
  },
  "synthwave-records": {
    title: "Synthwave Records",
    category: "Music / Entertainment",
    year: "2024",
    client: "Synthwave Records",
    role: "Creative Developer",
    description:
      "Interactive record label website featuring audio-reactive visuals and immersive artist experiences. A digital platform that captures the essence of the synthwave genre.",
    challenge:
      "The label wanted a website that would stand out in the music industry, featuring unique interactive elements that respond to music while maintaining usability.",
    solution:
      "Built audio-reactive visualizations using the Web Audio API and Canvas, creating generative art that responds to music in real-time. Each artist page features unique animations and interactive elements.",
    images: [
      "/synthwave-music-website-neon-dark.jpg",
      "/music-artist-page-neon-synthwave.jpg",
      "/audio-visualizer-canvas-art.jpg",
    ],
    tags: [
      "GSAP",
      "Web Audio API",
      "Canvas",
      "React",
      "Node.js",
      "Spotify API",
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    nextProject: { slug: "nebula-finance", title: "Nebula Finance" },
  },
};

interface ProjectDetailProps {
  slug: string;
}

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const heroRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLElement>(null);

  const project = projectData[slug] || {
    title: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    category: "Project",
    year: "2024",
    client: "Client",
    role: "Developer",
    description: "Project detailed description placeholder.",
    challenge: "Challenge placeholder.",
    solution: "Solution placeholder.",
    images: ["/project-showcase-dark-theme.jpg"],
    tags: ["Tech", "Stack"],
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. HERO REVEAL with GRID BG PARALLAX
      const heroTl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.2 },
      });

      heroTl
        .from(".hero-line-reveal", {
          y: 100,
          opacity: 0,
          stagger: 0.1,
          rotateX: -5,
          transformOrigin: "bottom center",
        })
        .from(
          heroImageRef.current,
          {
            scale: 1.2,
            filter: "blur(20px)",
            opacity: 0,
            duration: 1.8,
            ease: "expo.out",
          },
          "-=1.2",
        );

      // 2. HERO IMAGE PARALLAX (Subtle & Deep)
      gsap.to(heroImageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 3. KINETIC GALLERY REVEAL (Scale + Skew)
      const galleryImages = document.querySelectorAll(".gallery-card");
      galleryImages.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.9, y: 100, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          },
        );
      });

      // 4. NEXT PROJECT PORTAL REVEAL
      gsap.from(".next-project-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: nextProjectRef.current,
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <article className="bg-background min-h-screen text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* 1. CYBER-HERO SECTION */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-border/30"
      >
        {/* Background Grid & Image */}
        <div className="absolute inset-0 z-0 bg-background">
          {/* Grid Texture */}
          <div className="absolute inset-0 grid-bg opacity-30 z-10 pointer-events-none" />

          {/* Main Image */}
          <div
            ref={heroImageRef}
            className="relative w-full h-[120%] -top-[10%] opacity-50 mix-blend-screen dark:mix-blend-screen"
          >
            <Image
              src={project.images[0] || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-[90vw] mx-auto mix-blend-difference text-white">
          {/* Navigation Back */}
          <Link
            href="/projects"
            className="hero-line-reveal inline-flex items-center gap-3 text-foreground/50 hover:text-primary transition-colors mb-12 group"
            data-cursor-hover
          >
            <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-sm uppercase tracking-widest font-mono">
              Back to Index
            </span>
          </Link>

          {/* Scrambled Title */}
          <div className="hero-line-reveal mb-8">
            <h1 className="text-[14vw] leading-[0.8] font-black tracking-tighter uppercase text-transparent stroke-text-2 my-2">
              <span className="block text-white">
                <ScrambleText text={project.title.split(" ")[0]} delay={0.2} />
              </span>
              <span className="block opacity-50 stroke-text">
                {project.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>
          </div>

          {/* Meta Data Row */}
          <div className="hero-line-reveal flex flex-wrap gap-8 md:gap-16 items-center text-sm font-mono text-primary/80 uppercase tracking-widest border-t border-border/50 pt-8 mt-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-muted-foreground">Year</span>
              <span>{project.year}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-muted-foreground">
                Category
              </span>
              <span>{project.category}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-muted-foreground">Role</span>
              <span>{project.role}</span>
            </div>

            {/* Scroll Indicator */}
            <div className="ml-auto hidden md:flex items-center gap-2 text-muted-foreground/50 animate-pulse">
              <span className="text-[10px]">Scroll to Explore</span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY INFO & NARRATIVE LAYOUT */}
      <section
        ref={contentRef}
        className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-32 lg:py-48 z-10"
      >
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32">
          {/* STICKY SIDEBAR (Project Metadata) */}
          <aside className="hidden lg:block relative">
            <div className="sticky top-40 space-y-16">
              {/* Live Links */}
              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="relative group w-20 h-20 rounded-full bg-foreground/5 border border-border/50 flex items-center justify-center overflow-hidden hover:border-primary transition-colors"
                    data-cursor-hover
                  >
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                    <ExternalLink className="w-6 h-6 relative z-10 group-hover:text-primary-foreground transition-colors" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    className="relative group w-20 h-20 rounded-full bg-foreground/5 border border-border/50 flex items-center justify-center overflow-hidden hover:border-primary transition-colors"
                    data-cursor-hover
                  >
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                    <Github className="w-6 h-6 relative z-10 group-hover:text-primary-foreground transition-colors" />
                  </a>
                )}
              </div>

              {/* Tech Stack List */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-mono">
                  Technologies
                </h3>
                <ul className="space-y-3">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-lg font-medium text-foreground/80 border-b border-border/30 pb-2 hover:pl-4 transition-all duration-300 hover:text-primary cursor-default"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* SCROLLING NARRATIVE */}
          <div className="space-y-32">
            {/* Mobile Info (Visible only on small screens) */}
            <div className="lg:hidden space-y-8 pb-12 border-b border-border/50">
              <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Stack
              </h3>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {project.tags.join(" • ")}
              </div>
            </div>

            <div className="prose-xl">
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
                01. The Challenge
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground leading-tight">
                Redefining the digital landscape.
              </h2>
              <div className="w-12 h-1 bg-primary mb-8" />
              <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground font-light">
                {project.challenge}
              </p>
            </div>

            {/* Main Feature Image - Kinetic Skew */}
            <div className="gallery-card relative aspect-video w-full rounded-none overflow-hidden group">
              <Image
                src={project.images[1] || project.images[0]}
                alt="Feature"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            <div className="prose-xl">
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
                02. The Solution
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground leading-tight">
                Engineered for performance.
              </h2>
              <div className="w-12 h-1 bg-primary mb-8" />
              <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground font-light">
                {project.solution}
              </p>
            </div>

            {/* Secondary Gallery Grid - Kinetic */}
            <div className="grid md:grid-cols-2 gap-8">
              {project.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="gallery-card relative aspect-[3/4] w-full overflow-hidden bg-foreground/5 grayscale group hover:grayscale-0 transition-all duration-700"
                >
                  <Image
                    src={img}
                    alt={`Detail ${i}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 border border-border/50 group-hover:border-primary/50 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEXT PROJECT PORTAL V2 */}
      {project.nextProject && (
        <section
          ref={nextProjectRef}
          className="relative py-48 px-6 bg-card border-t border-border/50 text-center overflow-hidden group cursor-pointer h-screen flex items-center justify-center"
        >
          {/* Background Hover Effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-primary/10 blur-[150px] scale-0 group-hover:scale-100 transition-transform duration-700 ease-expo rounded-full" />
          </div>

          <Link
            href={`/projects/${project.nextProject.slug}`}
            className="relative z-20 block w-full"
            data-cursor-hover
          >
            <span className="block text-sm font-mono uppercase tracking-[0.5em] mb-8 text-primary/80 group-hover:tracking-[0.8em] transition-all duration-500">
              Next Case Study
            </span>

            <div className="next-project-title overflow-hidden">
              <h2 className="text-[12vw] leading-[0.8] font-black tracking-tighter uppercase relative mix-blend-difference text-foreground group-hover:text-transparent group-hover:stroke-text pointer-events-none transition-all duration-500">
                {project.nextProject.title}
              </h2>
            </div>

            <div className="mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-10 group-hover:translate-y-0">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <ArrowUpRight className="w-8 h-8" />
              </div>
            </div>
          </Link>
        </section>
      )}
    </article>
  );
}
