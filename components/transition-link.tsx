"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import type { ComponentProps, MouseEvent } from "react"

type TransitionLinkProps = ComponentProps<typeof Link>

export function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleTransition = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.currentTarget.target === "_blank" || event.currentTarget.hasAttribute("download")) return
    const destination = new URL(event.currentTarget.href, window.location.href)
    if (destination.origin !== window.location.origin || destination.pathname === pathname) return
    event.preventDefault()
    const overlay = document.getElementById("transition-overlay")
    if (overlay?.dataset.active === "true") return
    if (!overlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(destination.pathname + destination.search + destination.hash)
      return
    }
    window.dispatchEvent(new CustomEvent("portfolio:navigate", {
      detail: { pathname: destination.pathname, navigate: () => router.push(destination.pathname + destination.search + destination.hash) },
    }))
  }

  return <Link href={href} onClick={handleTransition} {...props}>{children}</Link>
}
