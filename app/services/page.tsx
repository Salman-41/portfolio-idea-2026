import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { ServicesHero } from "@/components/services-hero"
import { GraphicServices } from "@/components/graphic-services"
import { KineticProcess } from "@/components/kinetic-process"
import { Marquee } from "@/components/marquee"
import { TestimonialsSection } from "@/components/testimonials-section"

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
        <Marquee items={marqueeItems} direction="right" speed={0.5} />
        <TestimonialsSection />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
