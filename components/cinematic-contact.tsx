"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Mail, MapPin, Send, Check } from "lucide-react"

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

      // Entrance animation
      gsap.from(".contact-field", {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 2000)
  }

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-24 relative z-10">
        
        {/* Contact Info (Parallax drifting) */}
        <div className="space-y-16">
          <div className="contact-field space-y-4">
            <span className="text-primary text-xs uppercase tracking-widest font-mono">// Contact.Details</span>
            <div className="group flex items-start gap-6 cursor-pointer">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:border-primary">
                <Mail className="w-6 h-6 text-white group-hover:text-black" />
              </div>
              <div>
                <span className="block text-sm text-muted-foreground uppercase tracking-widest mb-1">Email Me</span>
                <span className="text-2xl md:text-3xl font-medium text-white break-all">hello@salman.dev</span>
              </div>
            </div>
            
            <div className="group flex items-start gap-6 cursor-pointer">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:border-primary">
                <MapPin className="w-6 h-6 text-white group-hover:text-black" />
              </div>
              <div>
                <span className="block text-sm text-muted-foreground uppercase tracking-widest mb-1">Base</span>
                <span className="text-2xl md:text-3xl font-medium text-white">Swat, Pakistan</span>
              </div>
            </div>
          </div>

          <div className="contact-field pt-12 border-t border-white/10 space-y-6">
            <h3 className="text-3xl font-bold uppercase tracking-tighter">Availability</h3>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xl text-muted-foreground">Accepting new projects for Q1 2026</span>
            </div>
          </div>
        </div>

        {/* Minimalist Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="contact-field relative group">
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 py-6 text-2xl focus:outline-none focus:border-primary transition-colors peer"
                placeholder=" "
              />
              <label className="absolute left-0 top-6 text-2xl text-muted-foreground pointer-events-none transition-all duration-500 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                Your Name
              </label>
            </div>

            <div className="contact-field relative group">
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 py-6 text-2xl focus:outline-none focus:border-primary transition-colors peer"
                placeholder=" "
              />
              <label className="absolute left-0 top-6 text-2xl text-muted-foreground pointer-events-none transition-all duration-500 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                Your Email
              </label>
            </div>

            <div className="contact-field relative group">
              <textarea 
                rows={3}
                required 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 py-6 text-2xl focus:outline-none focus:border-primary transition-colors peer resize-none"
                placeholder=" "
              />
              <label className="absolute left-0 top-6 text-2xl text-muted-foreground pointer-events-none transition-all duration-500 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                Tell me about your project
              </label>
            </div>

            <div className="contact-field flex justify-start pt-8">
              <button 
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`relative w-48 h-48 rounded-full border border-primary flex items-center justify-center transition-all duration-500 ${isSubmitted ? 'bg-green-500 border-green-500' : 'hover:bg-primary group'}`}
              >
                <div className="absolute inset-0 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-500" />
                <div className="relative z-10 flex flex-col items-center">
                  {isSubmitting ? (
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSubmitted ? (
                    <Check className="w-12 h-12 text-white" />
                  ) : (
                    <>
                      <Send className="w-8 h-8 text-primary group-hover:text-black transition-colors" />
                      <span className="text-xs uppercase tracking-widest mt-2 group-hover:text-black transition-colors">Send</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Abstract Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="grid-bg h-full w-full" />
      </div>
    </section>
  )
}
