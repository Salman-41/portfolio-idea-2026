"use client"

import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { IdentityHero } from "@/components/identity-hero"
import { NarrativeBio } from "@/components/narrative-bio"
import { PhilosophyGrid } from "@/components/philosophy-grid"
import { CinematicExperience } from "@/components/cinematic-experience"
import { Marquee } from "@/components/marquee"

const marqueeItems = ["Creative Developer", "UI/UX Designer", "Motion Enthusiast", "System Architect", "Available for Work"]

export default function AboutPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navigation />
      
      <main className="min-h-screen bg-background text-foreground">
        <IdentityHero />
        <NarrativeBio />
        <CinematicExperience />
        <PhilosophyGrid />
        <div className="py-20">
           <Marquee items={marqueeItems} direction="left" speed={0.4} />
        </div>
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
