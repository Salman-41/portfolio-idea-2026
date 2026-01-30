"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, MapPin, Send, Check } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

/**
 * Cinematic Contact section component.
 * Features a magnetic submit button, staggered entrance animations, and a contact form.
 */
export function CinematicContact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Magnetic button
      const handleMouseMove = (e: MouseEvent) => {
        if (!buttonRef.current) return
        const rect = buttonRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        gsap.to(buttonRef.current, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.6,
          ease: "power2.out"
        })
      }

      const handleMouseLeave = () => {
        gsap.to(buttonRef.current, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        })
      }

      buttonRef.current?.addEventListener("mousemove", handleMouseMove)
      buttonRef.current?.addEventListener("mouseleave", handleMouseLeave)

      // Staggered entrance animations
      gsap.fromTo(".contact-info-item", {
        x: -60,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      })

      gsap.fromTo(".contact-field", {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form-container",
          start: "top 80%"
        }
      })

      // Parallax effect
      gsap.to(".contact-deco-line", {
        scaleX: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center center",
          scrub: 1
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 2000)
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 md:px-12 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden md:block" />
      
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 relative z-10">
        
        <div className="space-y-10 md:space-y-16">
          <div className="contact-info-item flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary contact-deco-line origin-left scale-x-0" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary font-medium">Contact Details</span>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="contact-info-item group flex items-start gap-4 md:gap-6 cursor-pointer">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:border-primary shrink-0">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest mb-1">Email Me</span>
                <span className="text-lg md:text-2xl lg:text-3xl font-medium text-white break-all">hello@salman.dev</span>
              </div>
            </div>
            
            <div className="contact-info-item group flex items-start gap-4 md:gap-6 cursor-pointer">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:border-primary shrink-0">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
              </div>
              <div>
                <span className="block text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest mb-1">Base</span>
                <span className="text-lg md:text-2xl lg:text-3xl font-medium text-white">Swat, Pakistan</span>
              </div>
            </div>
          </div>

          <div className="contact-info-item pt-8 md:pt-12 border-t border-white/10 space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-3xl font-bold uppercase tracking-tighter">Availability</h3>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm md:text-xl text-muted-foreground">Accepting new projects for Q1 2026</span>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <div className="contact-field flex items-center gap-3 mb-8">
            <span className="w-8 h-[1px] bg-primary contact-deco-line origin-left scale-x-0" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary font-medium">Send Message</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
            <div className="contact-field relative group">
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 py-4 md:py-6 text-lg md:text-2xl focus:outline-none focus:border-primary transition-colors peer"
                placeholder=" "
              />
              <label className="absolute left-0 top-4 md:top-6 text-lg md:text-2xl text-muted-foreground pointer-events-none transition-all duration-500 peer-focus:-top-2 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px] md:peer-[:not(:placeholder-shown)]:text-xs">
                Your Name
              </label>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-500 peer-focus:w-full" />
            </div>

            <div className="contact-field relative group">
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 py-4 md:py-6 text-lg md:text-2xl focus:outline-none focus:border-primary transition-colors peer"
                placeholder=" "
              />
              <label className="absolute left-0 top-4 md:top-6 text-lg md:text-2xl text-muted-foreground pointer-events-none transition-all duration-500 peer-focus:-top-2 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px] md:peer-[:not(:placeholder-shown)]:text-xs">
                Your Email
              </label>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-500 peer-focus:w-full" />
            </div>

            <div className="contact-field relative group">
              <textarea 
                rows={3}
                required 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 py-4 md:py-6 text-lg md:text-2xl focus:outline-none focus:border-primary transition-colors peer resize-none"
                placeholder=" "
              />
              <label className="absolute left-0 top-4 md:top-6 text-lg md:text-2xl text-muted-foreground pointer-events-none transition-all duration-500 peer-focus:-top-2 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px] md:peer-[:not(:placeholder-shown)]:text-xs">
                Tell me about your project
              </label>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-500 peer-focus:w-full" />
            </div>

            <div className="contact-field flex justify-center md:justify-end pt-4 md:pt-8">
              <button 
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`relative w-32 h-32 md:w-48 md:h-48 rounded-full border border-primary flex items-center justify-center transition-all duration-500 ${isSubmitted ? 'bg-green-500 border-green-500' : 'hover:bg-primary group'}`}
              >
                <div className="absolute inset-0 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-500" />
                <div className="relative z-10 flex flex-col items-center">
                  {isSubmitting ? (
                    <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSubmitted ? (
                    <Check className="w-8 h-8 md:w-12 md:h-12 text-white" />
                  ) : (
                    <>
                      <Send className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-black transition-colors" />
                      <span className="text-[10px] md:text-xs uppercase tracking-widest mt-2 group-hover:text-black transition-colors">Send</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>

      </div>

      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="grid-bg h-full w-full" />
      </div>
    </section>
  )
}
