"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { ArchiveHero } from "@/components/archive-hero"
import { ArchiveGrid } from "@/components/archive-grid"

const allProjects = [
  {
    id: 1,
    title: "Nebula Finance",
    category: "Web App",
    year: "2025",
    href: "/projects/nebula-finance",
    image: "/dark-fintech-dashboard-with-charts-and-crypto.jpg",
  },
  {
    id: 2,
    title: "Artisan Studio",
    category: "E-commerce",
    year: "2025",
    href: "/projects/artisan-studio",
    image: "/modern-furniture-ecommerce-dark-theme.jpg",
  },
  {
    id: 3,
    title: "Synthwave Recs",
    category: "Creative",
    year: "2024",
    href: "/projects/synthwave-records",
    image: "/synthwave-music-website-neon-dark.jpg",
  },
  {
    id: 4,
    title: "Orbital Space",
    category: "3D/WebGL",
    year: "2024",
    href: "/projects/orbital-space",
    image: "/3d-space-exploration-dark-theme-webgl.jpg",
  },
  {
    id: 5,
    title: "Meridian Health",
    category: "Web App",
    year: "2024",
    href: "/projects/meridian-health",
    image: "/dark-healthcare-dashboard-modern-ui.jpg",
  },
  {
    id: 6,
    title: "Velocity Motors",
    category: "E-commerce",
    year: "2024",
    href: "/projects/velocity-motors",
    image: "/luxury-car-dealership-dark-website-3d.jpg",
  },
]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  
  const filteredProjects = activeFilter === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === activeFilter)

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navigation />
      
      <main className="bg-background text-foreground overflow-x-hidden">
        <ArchiveHero 
           activeFilter={activeFilter} 
           onFilterChange={setActiveFilter}
           totalProjects={allProjects.length}
        />
        <ArchiveGrid projects={filteredProjects} />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
