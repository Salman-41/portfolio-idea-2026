import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { ServicesHero } from "@/components/services-hero"
import { ServicesGrid } from "@/components/services-grid"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Marquee } from "@/components/marquee"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Alex Chen - Creative Developer",
  description:
    "Explore my services including web development, creative development, UI/UX design, and consulting for digital products.",
}

const marqueeItems = ["Web Development", "Creative Coding", "UI/UX Design", "Consulting", "3D & WebGL"]

export default function ServicesPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <ServicesHero />
        <ServicesGrid />
        <Marquee items={marqueeItems} />
        <ProcessSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
