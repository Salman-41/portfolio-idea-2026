import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
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
      <main>
        <ContactHero />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
