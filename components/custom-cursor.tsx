"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

/**
 * Premium 3D Pixelated Cursor with Contextual Labels
 * Features:
 * - Stylized pixel arrow cursor with glow effects
 * - Optimized GSAP quickSetter for smooth 60fps movement
 * - mix-blend-difference for universal visibility
 * - Morphs into labeled circle on interactive elements
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const [cursorState, setCursorState] = useState<{
    isHovering: boolean;
    isClicking: boolean;
    label: string;
  }>({
    isHovering: false,
    isClicking: false,
    label: "",
  });

  // Memoized label getter
  const getLabel = useCallback((el: Element): string => {
    const dataLabel = el.getAttribute("data-cursor-label");
    if (dataLabel) return dataLabel;

    const parent = el.closest("[data-cursor-label]");
    if (parent) return parent.getAttribute("data-cursor-label") || "";
    
    if (el.closest(".logo")) return "HOME";
    if (el.closest(".menu-toggle")) return "MENU";
    
    if (el.tagName === "A" || el.closest("a")) {
      const link = (el.closest("a") || el) as HTMLAnchorElement;
      const href = link.getAttribute("href") || "";
      if (href.includes("/projects") || href.includes("/work")) return "VIEW";
      if (href.includes("/about")) return "ABOUT";
      if (href.includes("/services")) return "SERVICES";
      if (href.includes("/contact")) return "CONTACT";
      if (href.startsWith("mailto:")) return "EMAIL";
      if (href.startsWith("http")) return "OPEN";
      if (href === "/") return "HOME";
      return "CLICK";
    }
    if (el.tagName === "BUTTON" || el.closest("button")) return "CLICK";
    
    return "EXPLORE";
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Skip on touch devices and reduced motion
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      "ontouchstart" in window
    ) {
      cursor.style.display = "none";
      return;
    }

    // Hide default cursor globally
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    // Initialize positions
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    cursorPos.current = { ...mousePos.current };

    // GSAP quickSetter for optimized performance
    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    // High-performance animation loop with GSAP
    const animate = () => {
      // Smooth lerp with adjustable easing
      const ease = 0.15;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * ease;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * ease;

      // Use quickSetter for GPU-accelerated updates
      setX(cursorPos.current.x);
      setY(cursorPos.current.y);

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    const onMouseDown = () => setCursorState(prev => ({ ...prev, isClicking: true }));
    const onMouseUp = () => setCursorState(prev => ({ ...prev, isClicking: false }));

    const onMouseEnterInteractive = (e: Event) => {
      const target = e.currentTarget as Element;
      const label = getLabel(target);
      setCursorState(prev => ({ ...prev, isHovering: true, label }));
    };

    const onMouseLeaveInteractive = () => {
      setCursorState(prev => ({ ...prev, isHovering: false, label: "" }));
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [data-cursor-hover], [data-cursor-label]"
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };

    attachListeners();

    // Re-attach on DOM changes
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      style.remove();
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [getLabel]);

  const { isHovering, isClicking, label } = cursorState;
  const pixelSize = isClicking ? 3 : 4;

  // Calculate sizes for smooth transition
  const cursorWidth = isHovering ? 90 : pixelSize * 5;
  const cursorHeight = isHovering ? 90 : pixelSize * 7;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference will-change-transform"
      style={{
        width: cursorWidth,
        height: cursorHeight,
        marginLeft: isHovering ? -45 : 0,
        marginTop: isHovering ? -45 : 0,
        transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), margin 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Pixelated Arrow Cursor - Default State */}
      <div
        className="absolute top-0 left-0"
        style={{
          opacity: isHovering ? 0 : 1,
          transform: isHovering ? "scale(0) rotate(45deg)" : "scale(1) rotate(0deg)",
          transition: "opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div 
          className="relative" 
          style={{ 
            width: pixelSize * 5, 
            height: pixelSize * 7,
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))",
          }}
        >
          {/* Pixel art arrow - optimized rendering */}
          {[
            [0, 0], // Row 1
            [0, 1], [1, 1], // Row 2
            [0, 2], [1, 2], [2, 2], // Row 3
            [0, 3], [1, 3], [2, 3], [3, 3], // Row 4
            [0, 4], [2, 4], [3, 4], [4, 4], // Row 5
            [0, 5], [3, 5], [4, 5], // Row 6
            [0, 6], // Row 7
          ].map(([x, y], i) => (
            <div
              key={i}
              className="absolute bg-white"
              style={{
                width: pixelSize,
                height: pixelSize,
                left: x * pixelSize,
                top: y * pixelSize,
                boxShadow: i === 0 ? "0 0 6px rgba(255,255,255,0.6)" : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Circle with Label - Hover State */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          opacity: isHovering ? 1 : 0,
          transform: isHovering ? "scale(1)" : "scale(0.3)",
          transition: "opacity 0.25s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          border: "2px solid white",
          boxShadow: "0 0 20px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.05)",
        }}
      >
        {/* Animated ring */}
        <div 
          className="absolute inset-1 rounded-full border border-white/30"
          style={{
            animation: isHovering ? "pulse 2s ease-in-out infinite" : "none",
          }}
        />
        
        {/* Label text */}
        <span 
          className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap"
          style={{
            textShadow: "0 0 10px rgba(255,255,255,0.5)",
          }}
        >
          {label}
        </span>
      </div>

      {/* Keyframes for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(0.95); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
