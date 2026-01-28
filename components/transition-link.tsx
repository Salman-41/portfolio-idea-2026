"use client"

import Link, { LinkProps } from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { ReactNode, MouseEvent } from "react"
import gsap from "gsap"

interface TransitionLinkProps extends LinkProps {
  children: ReactNode
  className?: string
  "data-cursor-hover"?: boolean
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleTransition = async (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e)
    e.preventDefault()

    const targetPath = href.toString()

    // Don't animate if same page
    if (targetPath === pathname) return

    const overlay = document.getElementById("transition-overlay")
    const bars = document.querySelectorAll(".transition-bar")

    if (!overlay) {
      router.push(targetPath)
      return
    }

    // Fast EXIT animation
    const tl = gsap.timeline({
      onComplete: () => {
        router.push(targetPath)
      },
    })

    // Show overlay and reset bars
    tl.set(overlay, { display: "flex" })
    tl.set(bars, { scaleY: 0, transformOrigin: "bottom" })

    // Fade out current page quickly
    tl.to("main", {
      opacity: 0,
      y: -15,
      duration: 0.25,
      ease: "power2.in",
    })

    // Bars slide up
    tl.to(bars, {
      scaleY: 1,
      duration: 0.35,
      stagger: 0.03,
      ease: "power3.inOut",
    }, "-=0.15")
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
