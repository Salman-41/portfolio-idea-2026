import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { ProjectsHero } from "@/components/projects-hero"
import { ProjectsGrid } from "@/components/projects-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Alex Chen - Creative Developer",
  description:
    "Explore my portfolio of web development projects featuring immersive experiences, 3D animations, and cutting-edge digital products.",
}

export default function ProjectsPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <ProjectsHero />
        <ProjectsGrid />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
