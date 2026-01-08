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
  description: "Explore the creative portfolio of Salman Yousufzai, a developer based in Swat, Pakistan, specializing in high-end web experiences and 3D design.",
}

const marqueeItems = [
  "Creative Development",
  "UI/UX Design",
  "Three.js",
  "React",
  "Next.js",
  "Vue",
  "Nuxt",
  "Svelte",
  "TypeScript",
  "Tailwind CSS",
  "GSAP Animations",
  "Motion Design",
  "Framer Motion",
]

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
        <Marquee items={marqueeItems} />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
