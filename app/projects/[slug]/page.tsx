import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { ProjectDetail } from "@/components/project-detail"
import type { Metadata } from "next"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${title} | Alex Chen - Projects`,
    description: `Explore the ${title} project - a showcase of creative development and immersive design.`,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <ProjectDetail slug={slug} />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
