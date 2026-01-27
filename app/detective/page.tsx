"use client"

import { DataDetectiveGame } from "@/components/games/data-detective"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function DetectivePage() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <main className="h-[100dvh] w-full bg-black overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-8">
        <div 
            ref={containerRef}
            className="w-full max-w-7xl h-full max-h-[900px] opacity-0"
        >
            <DataDetectiveGame onBack={() => router.push('/about')} />
        </div>
      </div>
    </main>
  )
}
