import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { ServicesHero } from "@/components/services-hero"
import { GraphicServices } from "@/components/graphic-services"
import { KineticProcess } from "@/components/kinetic-process"
import { TestimonialsSection } from "@/components/testimonials-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Salman Yousufzai - Creative Solutions",
  description: "Discover the range of creative and technical services offered by Salman Yousufzai, including WebGL, Three.js, and high-end frontend development.",
}

const marqueeItems = ["Web Development", "Creative Coding", "UI/UX Design", "Consulting", "3D & WebGL"]

export default function ServicesPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navigation />
      
      <main className="min-h-screen bg-background text-foreground">
        <ServicesHero />
        <GraphicServices />
        <KineticProcess />
        <TestimonialsSection />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
