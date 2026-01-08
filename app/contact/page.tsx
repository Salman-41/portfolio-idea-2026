import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { ContactHero } from "@/components/contact-hero"
import { CinematicContact } from "@/components/cinematic-contact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Alex Chen - Creative Developer",
  description: "Get in touch to discuss your next project. I'm always open to new opportunities and collaborations.",
}

export default function ContactPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <div className="noise-overlay" />
      <Navigation />
      <main className="bg-background min-h-screen">
        <ContactHero />
        <CinematicContact />
        <Footer />
      </main>
    </SmoothScrollProvider>
  )
}
