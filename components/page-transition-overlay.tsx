"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"

export function PageTransitionOverlay() {
  const pathname = usePathname()

  useEffect(() => {
    const overlay = document.getElementById("transition-overlay")
    if (!overlay) return

    // On Path Change / Mount: Fade out the overlay
    const tl = gsap.timeline()

    // 1. Fade out the overlay covering the page
    tl.to(overlay, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(overlay, { display: "none" })
      }
    })

    // 2. Smoothly reveal the new page content (Lens Flare / Blur Reveal)
    tl.fromTo("main", 
      { filter: "blur(20px)", opacity: 0, scale: 1.05 },
      { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" },
      "-=0.8"
    )

  }, [pathname])

  return (
    <div 
      id="transition-overlay"
      className="fixed inset-0 z-[9999] pointer-events-none bg-black flex items-center justify-center"
      style={{ 
        display: "block",
        opacity: 0
      }}
    >
        {/* Cinematic Grain / Pulse */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E')]" />
        
        {/* Secondary centered focus element */}
        <div className="w-1 h-1 bg-primary rounded-full blur-[2px] opacity-50" />
    </div>
  )
}
