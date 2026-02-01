"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

/**
 * Premium 3D Pixelated Cursor with Contextual States
 * Features:
 * - Pixel arrow cursor (default)
 * - Pixel I-beam cursor (text inputs)
 * - Circle with label (interactive elements)
 * - mix-blend-difference for universal visibility
 */

type CursorType = "pointer" | "text" | "interactive";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const [cursorState, setCursorState] = useState<{
    type: CursorType;
    isClicking: boolean;
    label: string;
  }>({
    type: "pointer",
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
      const ease = 0.15;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * ease;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * ease;

      setX(cursorPos.current.x);
      setY(cursorPos.current.y);

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    const onMouseDown = () => setCursorState(prev => ({ ...prev, isClicking: true }));
    const onMouseUp = () => setCursorState(prev => ({ ...prev, isClicking: false }));

    // Text input handler
    const onMouseEnterText = () => {
      setCursorState(prev => ({ ...prev, type: "text", label: "" }));
    };

    // Interactive element handler
    const onMouseEnterInteractive = (e: Event) => {
      const target = e.currentTarget as Element;
      const label = getLabel(target);
      setCursorState(prev => ({ ...prev, type: "interactive", label }));
    };

    const onMouseLeave = () => {
      setCursorState(prev => ({ ...prev, type: "pointer", label: "" }));
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const attachListeners = () => {
      // Text inputs - show I-beam
      const textElements = document.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='password'], input[type='search'], input[type='tel'], input[type='url'], input:not([type]), textarea, [contenteditable='true']"
      );
      textElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterText);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.addEventListener("mouseenter", onMouseEnterText);
        el.addEventListener("mouseleave", onMouseLeave);
      });

      // Interactive elements - show circle with label
      const interactiveElements = document.querySelectorAll(
        "a, button, [data-cursor-hover], [data-cursor-label]"
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeave);
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

  const { type, isClicking, label } = cursorState;
  const pixelSize = isClicking ? 3 : 4;

  // Calculate sizes based on cursor type
  const isInteractive = type === "interactive";
  const isText = type === "text";
  
  const cursorWidth = isInteractive ? 90 : (isText ? pixelSize * 3 : pixelSize * 5);
  const cursorHeight = isInteractive ? 90 : (isText ? pixelSize * 9 : pixelSize * 7);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center will-change-transform"
      style={{
        width: cursorWidth,
        height: cursorHeight,
        marginLeft: isInteractive ? -45 : (isText ? -pixelSize * 1.5 : 0),
        marginTop: isInteractive ? -45 : (isText ? -pixelSize * 4.5 : 0),
        transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), margin 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* 3D Carmine Red Pixel Arrow Cursor - Default State */}
      <div
        className="absolute top-0 left-0"
        style={{
          opacity: type === "pointer" ? 1 : 0,
          transform: type === "pointer" ? "scale(1)" : "scale(0)",
          transition: "opacity 0.2s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div 
          className="relative" 
          style={{ 
            width: 24, 
            height: 32,
            filter: "drop-shadow(0 0 10px rgba(185, 28, 28, 0.5)) drop-shadow(0 0 3px rgba(0,0,0,0.3))",
          }}
        >
          {/* Layer 3 - Darkest shadow (bottom layer) - Deep maroon */}
          <div className="absolute" style={{ top: 4, left: 4 }}>
            {[[0,0],[0,1],[1,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[3,3],[0,4],[2,4],[3,4],[0,5],[3,5],[0,6]].map(([x, y], i) => (
              <div key={`s3-${i}`} className="absolute" style={{ width: 4, height: 4, left: x * 4, top: y * 4, background: "#450a0a" }} />
            ))}
          </div>
          
          {/* Layer 2 - Mid shadow - Dark red */}
          <div className="absolute" style={{ top: 2, left: 2 }}>
            {[[0,0],[0,1],[1,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[3,3],[0,4],[2,4],[3,4],[0,5],[3,5],[0,6]].map(([x, y], i) => (
              <div key={`s2-${i}`} className="absolute" style={{ width: 4, height: 4, left: x * 4, top: y * 4, background: "#7f1d1d" }} />
            ))}
          </div>
          
          {/* Layer 1 - Main cursor (top layer) - Carmine red gradient */}
          <div className="absolute" style={{ top: 0, left: 0 }}>
            {[[0,0],[0,1],[1,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[3,3],[0,4],[2,4],[3,4],[0,5],[3,5],[0,6]].map(([x, y], i) => (
              <div 
                key={`s1-${i}`} 
                className="absolute" 
                style={{ 
                  width: 4, 
                  height: 4, 
                  left: x * 4, 
                  top: y * 4, 
                  background: i === 0 ? "#fef2f2" : i < 4 ? "#fecaca" : i < 8 ? "#f87171" : "#dc2626",
                }} 
              />
            ))}
          </div>
          
          {/* Highlight pixels (top-left corner shine) */}
          <div className="absolute" style={{ width: 4, height: 4, left: 0, top: 0, background: "#ffffff" }} />
          <div className="absolute" style={{ width: 4, height: 4, left: 0, top: 4, background: "#fef2f2" }} />
          <div className="absolute" style={{ width: 4, height: 4, left: 4, top: 4, background: "#fee2e2" }} />
        </div>
      </div>

      {/* 3D Carmine Red Pixel I-Beam Cursor - Text Input State */}
      <div
        className="absolute"
        style={{
          opacity: isText ? 1 : 0,
          transform: isText ? "scale(1)" : "scale(0)",
          transition: "opacity 0.2s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          left: "50%",
          top: "50%",
          marginLeft: -10,
          marginTop: -20,
        }}
      >
        <div 
          className="relative" 
          style={{ 
            width: 20, 
            height: 40,
            filter: "drop-shadow(0 0 10px rgba(185, 28, 28, 0.5)) drop-shadow(0 0 3px rgba(0,0,0,0.3))",
          }}
        >
          {/* Layer 3 - Darkest shadow - Deep maroon */}
          <div className="absolute" style={{ top: 4, left: 4 }}>
            <div className="absolute" style={{ width: 16, height: 4, left: 0, top: 0, background: "#450a0a" }} />
            <div className="absolute" style={{ width: 4, height: 4, left: 0, top: 4, background: "#450a0a" }} />
            <div className="absolute" style={{ width: 4, height: 4, left: 12, top: 4, background: "#450a0a" }} />
            <div className="absolute" style={{ width: 4, height: 20, left: 6, top: 8, background: "#450a0a" }} />
            <div className="absolute" style={{ width: 4, height: 4, left: 0, top: 28, background: "#450a0a" }} />
            <div className="absolute" style={{ width: 4, height: 4, left: 12, top: 28, background: "#450a0a" }} />
            <div className="absolute" style={{ width: 16, height: 4, left: 0, top: 32, background: "#450a0a" }} />
          </div>
          
          {/* Layer 2 - Mid shadow - Dark red */}
          <div className="absolute" style={{ top: 2, left: 2 }}>
            <div className="absolute" style={{ width: 16, height: 4, left: 0, top: 0, background: "#7f1d1d" }} />
            <div className="absolute" style={{ width: 4, height: 4, left: 0, top: 4, background: "#7f1d1d" }} />
            <div className="absolute" style={{ width: 4, height: 4, left: 12, top: 4, background: "#7f1d1d" }} />
            <div className="absolute" style={{ width: 4, height: 20, left: 6, top: 8, background: "#7f1d1d" }} />
            <div className="absolute" style={{ width: 4, height: 4, left: 0, top: 28, background: "#7f1d1d" }} />
            <div className="absolute" style={{ width: 4, height: 4, left: 12, top: 28, background: "#7f1d1d" }} />
            <div className="absolute" style={{ width: 16, height: 4, left: 0, top: 32, background: "#7f1d1d" }} />
          </div>
          
          {/* Layer 1 - Main cursor (top) - Carmine red gradient */}
          <div className="absolute" style={{ top: 0, left: 0 }}>
            <div className="absolute" style={{ width: 16, height: 4, left: 0, top: 0, background: "#fecaca" }} />
            <div className="absolute" style={{ width: 4, height: 4, left: 0, top: 4, background: "#f87171" }} />
            <div className="absolute" style={{ width: 4, height: 4, left: 12, top: 4, background: "#f87171" }} />
            <div className="absolute" style={{ width: 4, height: 20, left: 6, top: 8, background: "#dc2626" }} />
            <div className="absolute" style={{ width: 4, height: 4, left: 0, top: 28, background: "#f87171" }} />
            <div className="absolute" style={{ width: 4, height: 4, left: 12, top: 28, background: "#f87171" }} />
            <div className="absolute" style={{ width: 16, height: 4, left: 0, top: 32, background: "#fecaca" }} />
          </div>
          
          {/* Highlight */}
          <div className="absolute" style={{ width: 4, height: 4, left: 0, top: 0, background: "#ffffff" }} />
          <div className="absolute" style={{ width: 4, height: 4, left: 4, top: 0, background: "#fef2f2" }} />
        </div>
      </div>

      {/* Circle with Label - Interactive State - Carmine Red */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          opacity: isInteractive ? 1 : 0,
          transform: isInteractive ? "scale(1)" : "scale(0.3)",
          transition: "opacity 0.2s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          border: "2px solid #dc2626",
          background: "rgba(69, 10, 10, 0.9)",
          boxShadow: "0 0 20px rgba(185, 28, 28, 0.4), inset 0 0 15px rgba(220, 38, 38, 0.2)",
        }}
      >
        {/* Inner ring */}
        <div 
          className="absolute inset-1.5 rounded-full"
          style={{
            border: "1px solid rgba(248, 113, 113, 0.3)",
            animation: isInteractive ? "pulse 2s ease-in-out infinite" : "none",
          }}
        />
        
        {/* Label */}
        <span 
          className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap"
          style={{ 
            color: "#fecaca",
            textShadow: "0 0 8px rgba(220, 38, 38, 0.6)" 
          }}
        >
          {label}
        </span>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(0.95); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
