"use client"

import { useState } from "react"
import { selectedProjects } from "@/lib/selected-projects"
import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { ArchiveHero } from "@/components/archive-hero"
import { ArchiveGrid } from "@/components/archive-grid"

const allProjects = selectedProjects

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
