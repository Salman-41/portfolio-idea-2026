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
  "Machine Learning",
  "NLP",
  "Deep Learning",
  "Computer Vision",
  "Data Architecture",
  "Predictive Analytics",
  "Big Data",
  "Neural Networks",
  "Model Architecture",
  "Three.js",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "GSAP Animations",
  "Motion Design",
  "Framer Motion",
  "Vue.js",
  "Nuxt",
  "Svelte",
  "Node.js",
  "Python",
  "WebGL",
  "Supabase",
  "PostgreSQL",
  "GraphQL",
  "REST APIs",
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
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
