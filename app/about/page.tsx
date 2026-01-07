import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { AboutHero } from "@/components/about-hero"
import { AboutBio } from "@/components/about-bio"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { SkillsSection } from "@/components/skills-section"
import { Marquee } from "@/components/marquee"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Alex Chen - Creative Developer",
  description:
    "Learn about my journey as a creative developer, my experience, skills, and the philosophy behind my work.",
}

const marqueeItems = ["Problem Solver", "Creative Thinker", "Detail Oriented", "Team Player", "Always Learning"]

export default function AboutPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <AboutHero />
        <AboutBio />
        <Marquee items={marqueeItems} />
        <ExperienceTimeline />
        <SkillsSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
