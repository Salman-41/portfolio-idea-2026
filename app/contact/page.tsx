import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { ContactHero } from "@/components/contact-hero"
import { CinematicContact } from "@/components/cinematic-contact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Salman Yousufzai - Creative Developer",
  description: "Get in touch with Salman Yousufzai to discuss your next creative or technical project. Based in Swat, Pakistan, available for global collaborations.",
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
