"use client"

import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode, MouseEvent } from "react"
import gsap from "gsap"

interface TransitionLinkProps extends LinkProps {
  children: ReactNode
  className?: string
  "data-cursor-hover"?: boolean
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export function TransitionLink({ href, children, className, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter()

  const handleTransition = async (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided (like closing a menu)
    if (onClick) onClick(e)
    
    // Prevent default browser navigation
    e.preventDefault()
    
    // 1. Access the global transition overlay
    const overlay = document.getElementById("transition-overlay")
    if (!overlay) {
      router.push(href.toString())
      return
    }

    // 2. Trigger OUT animation (The Exit)
    // We blur the current content and fade it, then bring the overlay in.
    const tl = gsap.timeline({
      onComplete: () => {
        router.push(href.toString())
      }
    })

    // Fade and blur current page
    tl.to("main", {
      opacity: 0,
      filter: "blur(20px)",
      scale: 0.95,
      duration: 0.8,
      ease: "power2.inOut"
    })

    // Bring in the cinematic overlay
    tl.set(overlay, { display: "block", opacity: 0 }, "-=0.4")
    tl.to(overlay, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.inOut"
    }, "-=0.2")
  }

  return (
    <Link 
      href={href} 
      onClick={handleTransition} 
      className={className}
      {...props}
    >
      {children}
    </Link>
  )
}
