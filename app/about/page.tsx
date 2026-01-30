"use client"

import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { IdentityHero } from "@/components/identity-hero"
import { NarrativeBio } from "@/components/narrative-bio"
import { PhilosophyGrid } from "@/components/philosophy-grid"
import { GamesArcade } from "@/components/games-arcade"

const marqueeItems = ["Creative Developer", "UI/UX Designer", "Motion Enthusiast", "System Architect", "Available for Work"]

export default function AboutPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navigation />
      
      <main className="min-h-screen bg-background text-foreground">
        <IdentityHero />
        <NarrativeBio />
        <PhilosophyGrid />
        <GamesArcade />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
