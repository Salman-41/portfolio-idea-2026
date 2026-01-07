"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      "Alex transformed our vision into a stunning reality. His attention to detail and creative approach exceeded all expectations. The website has significantly improved our online presence.",
    author: "Sarah Chen",
    role: "CEO, TechStart Inc.",
    image: "/testimonial-avatar-professional-woman.jpg",
  },
  {
    quote:
      "Working with Alex was an absolute pleasure. His technical expertise combined with his design sensibility resulted in a product that truly stands out. Highly recommended!",
    author: "Michael Torres",
    role: "Creative Director, Studio Nova",
    image: "/testimonial-avatar-professional-man.jpg",
  },
  {
    quote:
      "The 3D web experience Alex created for us was mind-blowing. He pushed the boundaries of what we thought was possible on the web. Our customers love the immersive experience.",
    author: "Emily Watson",
    role: "Marketing Director, Luxe Brands",
    image: "/testimonial-avatar-professional-woman-2.jpg",
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          <span className="block text-sm uppercase tracking-[0.3em] text-primary mb-4">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16">
            What Clients <span className="gradient-text">Say</span>
          </h2>

          {/* Testimonial Carousel */}
          <div className="relative">
            <Quote className="w-16 h-16 text-primary/20 mx-auto mb-8" />

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden relative">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="Previous testimonial"
                data-cursor-hover
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index ? "w-8 bg-primary" : "bg-border"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    data-cursor-hover
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="Next testimonial"
                data-cursor-hover
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
