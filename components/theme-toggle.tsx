"use client";

import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * Minimalist Theme Toggle - Matches portfolio aesthetic
 * Clean, subtle, and elegant
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const themes = [
    { value: "light" as const, label: "Light" },
    { value: "dark" as const, label: "Dark" },
    { value: "system" as const, label: "System" },
  ];

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" },
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <div className={cn("relative", className)}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative group w-12 h-12 flex items-center justify-center",
          "rounded-full border transition-all duration-500",
          "backdrop-blur-sm",
          isDark
            ? "bg-foreground/5 border-foreground/10 hover:border-primary/50 hover:bg-foreground/10"
            : "bg-background/80 border-foreground/10 hover:border-primary/50 hover:bg-foreground/5",
          "hover:scale-105 active:scale-95",
        )}
        aria-label="Toggle theme"
        data-cursor-hover
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {isDark ? (
            // Moon - Simple crescent
            <svg
              className="w-5 h-5 text-foreground transition-transform duration-500 group-hover:rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            // Sun - Simple rays
            <svg
              className="w-5 h-5 text-foreground transition-transform duration-500 group-hover:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </div>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            "absolute top-full right-0 mt-3 py-2 px-1",
            "bg-card/95 backdrop-blur-xl",
            "border border-border/50 rounded-xl shadow-2xl",
            "min-w-[140px]",
          )}
        >
          {themes.map((t) => {
            const isActive = theme === t.value;
            return (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 rounded-lg mx-1",
                  "text-sm font-medium transition-all duration-300",
                  "group relative",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <span className="relative z-10 uppercase tracking-wider text-xs">
                  {t.label}
                </span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary relative z-10" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Compact theme toggle - Minimal circle
 */
export function ThemeToggleCompact({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cycleTheme = () => {
    const themes = ["light", "dark", "system"] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        "relative w-12 h-12 flex items-center justify-center",
        "rounded-full border transition-all duration-500",
        "backdrop-blur-sm",
        isDark
          ? "bg-foreground/5 border-foreground/10 hover:border-primary/50"
          : "bg-background/80 border-foreground/10 hover:border-primary/50",
        "hover:scale-105 active:scale-95",
        className,
      )}
      aria-label="Toggle theme"
      data-cursor-hover
    >
      <div className="w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <svg
            className="w-4 h-4 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
