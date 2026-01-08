import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Salman Yousufzai - Portfolio",
  description: "Browse the curated collection of creative projects by Salman Yousufzai, featuring work in WebGL, Three.js, and immersive UI design.",
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
