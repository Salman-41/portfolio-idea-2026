"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send, Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const budgetOptions = ["$5K - $10K", "$10K - $25K", "$25K - $50K", "$50K+"]

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current?.querySelectorAll(".form-field") || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", company: "", message: "" })
      setSelectedBudget(null)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      <div className="form-field">
        <label htmlFor="name" className="block text-sm uppercase tracking-widest text-muted-foreground mb-3">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={cn(
            "w-full px-0 py-4 bg-transparent border-b-2 text-lg focus:outline-none transition-colors",
            errors.name ? "border-destructive" : "border-border focus:border-primary",
          )}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.name}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email" className="block text-sm uppercase tracking-widest text-muted-foreground mb-3">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={cn(
            "w-full px-0 py-4 bg-transparent border-b-2 text-lg focus:outline-none transition-colors",
            errors.email ? "border-destructive" : "border-border focus:border-primary",
          )}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="company" className="block text-sm uppercase tracking-widest text-muted-foreground mb-3">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-0 py-4 bg-transparent border-b-2 border-border text-lg focus:outline-none focus:border-primary transition-colors"
          placeholder="Your Company"
        />
      </div>

      <div className="form-field">
        <label className="block text-sm uppercase tracking-widest text-muted-foreground mb-4">Project Budget</label>
        <div className="flex flex-wrap gap-3">
          {budgetOptions.map((budget) => (
            <button
              key={budget}
              type="button"
              onClick={() => setSelectedBudget(budget)}
              className={cn(
                "px-5 py-3 rounded-full border text-sm transition-all duration-300",
                selectedBudget === budget
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary hover:text-primary",
              )}
              data-cursor-hover
            >
              {budget}
            </button>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="message" className="block text-sm uppercase tracking-widest text-muted-foreground mb-3">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={cn(
            "w-full px-0 py-4 bg-transparent border-b-2 text-lg focus:outline-none transition-colors resize-none",
            errors.message ? "border-destructive" : "border-border focus:border-primary",
          )}
          placeholder="Tell me about your project..."
        />
        {errors.message && (
          <p className="mt-2 text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className={cn(
          "form-field w-full md:w-auto px-10 py-5 rounded-full font-medium text-lg transition-all duration-500 flex items-center justify-center gap-3",
          isSubmitted
            ? "bg-green-500 text-white"
            : "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25",
          isSubmitting && "opacity-70 cursor-not-allowed",
        )}
        data-cursor-hover
      >
        {isSubmitting ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Sending...</span>
          </>
        ) : isSubmitted ? (
          <>
            <Check className="w-5 h-5" />
            <span>Message Sent!</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  )
}
