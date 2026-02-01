"use client";

import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * Premium Sun/Moon Toggle Switch
 * Features animated clouds, stars, moon craters, and sun glow
 * With GSAP animations and custom cursor support
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const isDark = resolvedTheme === "dark";
  
  const sunMoonRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const crater1Ref = useRef<HTMLDivElement>(null);
  const crater2Ref = useRef<HTMLDivElement>(null);
  const crater3Ref = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // GSAP animations on theme change
  useEffect(() => {
    if (!sunMoonRef.current) return;

    if (isDark) {
      // Animate to moon
      gsap.to(sunMoonRef.current, {
        x: 20,
        backgroundColor: "#f1f5f9", // slate-100
        duration: 0.5,
        ease: "power3.out"
      });
      
      // Rotate the moon
      gsap.fromTo(sunMoonRef.current, 
        { rotation: 0 },
        { rotation: 360, duration: 0.6, ease: "power2.inOut" }
      );

      // Show craters
      gsap.to([crater1Ref.current, crater2Ref.current, crater3Ref.current], {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.2,
        ease: "back.out(1.7)"
      });

      // Hide sun glow
      gsap.to([glow1Ref.current, glow2Ref.current], {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.in"
      });

      // Show stars
      gsap.to(starsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.2,
        ease: "power3.out"
      });

      // Hide clouds
      gsap.to(cloudsRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.3,
        ease: "power2.in"
      });

    } else {
      // Animate to sun
      gsap.to(sunMoonRef.current, {
        x: 0,
        backgroundColor: "#fcd34d", // amber-300
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      });

      // Hide craters
      gsap.to([crater1Ref.current, crater2Ref.current, crater3Ref.current], {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.in"
      });

      // Show sun glow
      gsap.to([glow1Ref.current, glow2Ref.current], {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.2,
        ease: "elastic.out(1, 0.5)"
      });

      // Hide stars
      gsap.to(starsRef.current, {
        opacity: 0,
        y: -32,
        duration: 0.3,
        ease: "power2.in"
      });

      // Show clouds
      gsap.to(cloudsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: 0.2,
        ease: "power3.out"
      });
    }
  }, [isDark]);

  // Continuous cloud animation
  useEffect(() => {
    if (!cloudsRef.current) return;
    
    const clouds = cloudsRef.current.querySelectorAll('.cloud');
    clouds.forEach((cloud, i) => {
      gsap.to(cloud, {
        x: "+=4",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5
      });
    });
  }, []);

  // Continuous star twinkle animation
  useEffect(() => {
    if (!starsRef.current) return;
    
    const stars = starsRef.current.querySelectorAll('.star');
    stars.forEach((star, i) => {
      gsap.to(star, {
        scale: 1.3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3
      });
    });
  }, []);

  return (
    <label 
      className={cn(
        "relative inline-block w-[44px] h-[24px] cursor-pointer",
        className
      )}
      data-cursor-hover
      data-cursor-label="THEME"
    >
      <input
        type="checkbox"
        checked={isDark}
        onChange={handleToggle}
        className="opacity-0 w-0 h-0 absolute"
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      />
      
      {/* Slider track */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full overflow-hidden transition-colors duration-500",
          isDark ? "bg-slate-900" : "bg-sky-400"
        )}
      >
        {/* Sun/Moon circle */}
        <div
          ref={sunMoonRef}
          className="absolute w-[18px] h-[18px] rounded-full bottom-[3px] left-[3px] bg-amber-300"
        >
          {/* Moon craters */}
          <div
            ref={crater1Ref}
            className="absolute left-[7px] top-[2px] w-[4px] h-[4px] rounded-full bg-slate-300 opacity-0 scale-50"
          />
          <div
            ref={crater2Ref}
            className="absolute left-[1px] top-[7px] w-[7px] h-[7px] rounded-full bg-slate-300 opacity-0 scale-50"
          />
          <div
            ref={crater3Ref}
            className="absolute left-[11px] top-[12px] w-[2px] h-[2px] rounded-full bg-slate-300 opacity-0 scale-50"
          />
          
          {/* Sun glow rays */}
          <div
            ref={glow1Ref}
            className="absolute -left-[5px] -top-[5px] w-[28px] h-[28px] rounded-full bg-white/15 -z-10"
          />
          <div
            ref={glow2Ref}
            className="absolute -left-[9px] -top-[9px] w-[36px] h-[36px] rounded-full bg-white/10 -z-10"
          />
        </div>

        {/* Clouds - Light mode */}
        <div ref={cloudsRef} className="clouds">
          <div className="cloud absolute left-[22px] top-[10px] w-[24px] h-[24px] rounded-full bg-slate-200" />
          <div className="cloud absolute left-[32px] top-[6px] w-[12px] h-[12px] rounded-full bg-slate-300" />
          <div className="cloud absolute left-[14px] top-[14px] w-[16px] h-[16px] rounded-full bg-white" />
        </div>

        {/* Stars - Dark mode */}
        <div ref={starsRef} className="opacity-0 -translate-y-6">
          <svg className="star absolute w-2.5 h-2.5 top-[1px] left-[2px] fill-white" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className="star absolute w-[3px] h-[3px] top-2.5 left-[3px] fill-white" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className="star absolute w-1.5 h-1.5 top-3 left-[7px] fill-white" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className="star absolute w-[9px] h-[9px] top-[0px] left-[12px] fill-white" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
        </div>
      </div>
    </label>
  );
}

/**
 * Compact version - same design
 */
export function ThemeToggleCompact({ className }: { className?: string }) {
  return <ThemeToggle className={className} />;
}
