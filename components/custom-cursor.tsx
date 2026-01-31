"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Awwwards-Inspired Premium Cursor
 * Balanced sophistication - clean, smooth, refined
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;

    if (!dot || !circle) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      "ontouchstart" in window
    ) {
      dot.style.display = "none";
      circle.style.display = "none";
      return;
    }

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let dotX = mouse.x;
    let dotY = mouse.y;
    let circleX = mouse.x;
    let circleY = mouse.y;

    gsap.set([dot, circle], { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Smooth follow animation
    const animate = () => {
      // Dot follows quickly
      dotX += (mouse.x - dotX) * 0.2;
      dotY += (mouse.y - dotY) * 0.2;

      // Circle follows with delay for smooth effect
      circleX += (mouse.x - circleX) * 0.12;
      circleY += (mouse.y - circleY) * 0.12;

      gsap.set(dot, { x: dotX, y: dotY });
      gsap.set(circle, { x: circleX, y: circleY });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseEnterLink = () => setIsHovering(true);
    const onMouseLeaveLink = () => setIsHovering(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor-hover]",
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{
          width: isClicking ? "4px" : "6px",
          height: isClicking ? "4px" : "6px",
          transition: "width 0.15s ease, height 0.15s ease, opacity 0.3s ease",
          opacity: isHovering ? 0 : 1,
        }}
      >
        <div
          className="w-full h-full rounded-full bg-white"
          style={{
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          }}
        />
      </div>

      {/* Outer Circle */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{
          width: isHovering ? "50px" : isClicking ? "30px" : "36px",
          height: isHovering ? "50px" : isClicking ? "30px" : "36px",
          transition:
            "width 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease",
          opacity: isClicking ? 0.7 : 0.5,
        }}
      >
        <div
          className="w-full h-full rounded-full border border-white"
          style={{
            borderWidth: isHovering ? "1.5px" : "1px",
            transition: "border-width 0.25s ease",
          }}
        />
      </div>
    </>
  );
}
