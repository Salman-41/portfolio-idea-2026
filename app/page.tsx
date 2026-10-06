import Navigation from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { AboutPreview } from "@/components/about-preview"
import { Marquee } from "@/components/marquee"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Salman Yousufzai | Creative Developer Portfolio",
  description: "Salman Yousufzai is a developer and data scientist in Swat, Pakistan. A selection of websites, interfaces, and data-driven work.",
}

const marqueeItems = ["Creative development", "Design", "Data science", "Motion", "WebGL"]

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <Marquee items={marqueeItems} />
        <FeaturedProjects />
        <AboutPreview />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
