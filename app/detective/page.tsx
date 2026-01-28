"use client";

import { DataDetectiveGame } from "@/components/games/data-detective";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navigation from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

export default function DetectivePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navigation />

      <main className="min-h-screen bg-background text-foreground">
        <div className="relative pt-32 pb-20">
          {/* Background effects matching site theme */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.03)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />

          <div className="relative z-10 container mx-auto px-4 md:px-8">
            <div ref={containerRef} className="w-full opacity-0">
              <DataDetectiveGame onBack={() => router.push("/about")} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
