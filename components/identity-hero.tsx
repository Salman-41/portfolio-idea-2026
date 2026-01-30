"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const floatingElements = [
  { type: "dot", size: 8, x: "15%", y: "20%", speed: 0.5 },
  { type: "dot", size: 4, x: "85%", y: "25%", speed: 0.8 },
  { type: "line", width: 60, x: "10%", y: "60%", speed: 0.3, rotate: 45 },
  { type: "dot", size: 6, x: "90%", y: "70%", speed: 0.6 },
  { type: "line", width: 40, x: "80%", y: "15%", speed: 0.4, rotate: -30 },
  { type: "ring", size: 20, x: "5%", y: "80%", speed: 0.7 },
  { type: "ring", size: 12, x: "92%", y: "50%", speed: 0.5 },
  { type: "cross", size: 16, x: "20%", y: "85%", speed: 0.4 },
]

/**
 * Identity Hero section component.
 * Features a large name reveal, portrait image, and floating decorative elements.
 */
export function IdentityHero() {
  const containerRef = useRef<HTMLElement>(null)
  const firstNameRef = useRef<HTMLHeadingElement>(null)
  const lastNameRef = useRef<HTMLHeadingElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const floatingRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

      // Initial state
      tl.set([firstNameRef.current, lastNameRef.current], { y: 150, opacity: 0 })
      tl.set(imageWrapperRef.current, {
        scale: 1.2,
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
      })
      tl.set(".floating-element", { opacity: 0, scale: 0 })

      // Name reveal
      tl.to(firstNameRef.current, { y: 0, opacity: 1, duration: 1.5 })
      tl.to(lastNameRef.current, { y: 0, opacity: 1, duration: 1.5 }, "-=1.3")

      // Image reveal
      tl.to(
        imageWrapperRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power4.out",
        },
        "-=1.0"
      )

      // Badge spin entrance
      gsap.from(badgeRef.current, {
        scale: 0,
        rotate: -180,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 1.2,
      })

      // Floating elements entrance
      gsap.to(".floating-element", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(2)",
        delay: 1.5,
      })

      // Scroll parallax - Names
      gsap.to(firstNameRef.current, {
        x: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      })

      gsap.to(lastNameRef.current, {
        x: 150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      })

      // Scroll parallax - Image
      gsap.to(imageWrapperRef.current, {
        y: 150,
        scale: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Floating elements parallax with varying speeds
      floatingRef.current.forEach((el, i) => {
        if (!el) return
        const speed = floatingElements[i]?.speed || 0.5
        gsap.to(el, {
          y: -100 * speed,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-0 md:pt-48 md:pb-0 px-4 md:px-12 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 grid-bg opacity-50" />

      {floatingElements.map((el, i) => (
        <div
          key={i}
          ref={(ref) => { floatingRef.current[i] = ref }}
          className="floating-element absolute hidden md:block pointer-events-none"
          style={{ left: el.x, top: el.y }}
        >
          {el.type === "dot" && (
            <div
              className="rounded-full bg-primary/30"
              style={{ width: el.size, height: el.size }}
            />
          )}
          {el.type === "line" && (
            <div
              className="bg-primary/20"
              style={{
                width: el.width,
                height: 1,
                transform: `rotate(${el.rotate}deg)`,
              }}
            />
          )}
          {el.type === "ring" && (
            <div
              className="rounded-full border border-primary/30"
              style={{ width: el.size, height: el.size }}
            />
          )}
          {el.type === "cross" && (
            <div className="relative" style={{ width: el.size, height: el.size }}>
              <div
                className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/30 -translate-y-1/2"
              />
              <div
                className="absolute left-1/2 top-0 h-full w-[1px] bg-primary/30 -translate-x-1/2"
              />
            </div>
          )}
        </div>
      ))}

      <div className="container mx-auto relative z-10 flex flex-col items-center px-4">
        <h1
          ref={firstNameRef}
          className="relative z-10 text-[22vw] md:text-[15vw] leading-[0.8] font-black tracking-tighter uppercase mix-blend-difference text-white"
        >
          SALMAN
        </h1>

        <div className="relative z-0 -my-8 md:-my-24 w-[80vw] md:w-[35vw] aspect-[3/4]">
          <div
            ref={imageWrapperRef}
            className="relative w-full h-full overflow-hidden rounded-sm"
          >
            <Image
              src="/images/11.jpeg"
              alt="Salman Yousufzai"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
          </div>

          <div
            ref={badgeRef}
            className="absolute -top-6 -right-4 md:-top-12 md:-right-24 w-20 h-20 md:w-48 md:h-48 z-20"
          >
            <svg
              className="w-full h-full animate-[spin_10s_linear_infinite]"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="text-[10px] font-bold uppercase tracking-[0.2em] fill-primary">
                <textPath href="#circlePath">
                  Creative Developer • Designer •{" "}
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        <h1
          ref={lastNameRef}
          className="relative z-20 text-[16vw] md:text-[15vw] leading-[0.8] font-black tracking-tighter uppercase text-transparent stroke-text-2"
        >
          YOUSUFZAI
        </h1>
      </div>
    </section>
  )
}
