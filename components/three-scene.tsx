"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "./theme-provider";

export function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // Theme-aware colors
    const isDark = resolvedTheme === "dark";
    const color1 = isDark ? "#38bdf8" : "#0891b2"; // Cyan variants
    const color2 = isDark ? "#818cf8" : "#6366f1"; // Indigo variants

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1); // 2D Camera

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Shader Material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(color1) },
        uColor2: { value: new THREE.Color(color2) },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uAlphaMultiplier: { value: isDark ? 0.3 : 0.15 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float uAlphaMultiplier;
        varying vec2 vUv;

        // Simplex Noise (Simplified)
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                              0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                             -0.577350269189626,  // -1.0 + 2.0 * C.x
                              0.024390243902439); // 1.0 / 41.0
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = vUv;
          
          // Mouse Interaction
          float dist = distance(uv, uMouse);
          float interaction = 1.0 - smoothstep(0.0, 0.4, dist);
          
          // Warp UVs based on mouse
          vec2 warpedUv = uv - (uv - uMouse) * interaction * 0.1;
          
          // Slow moving noise with warp
          float noise1 = snoise(warpedUv * 1.5 + uTime * 0.1);
          float noise2 = snoise(warpedUv * 2.5 - uTime * 0.15);
          
          // Mix noise
          float pattern = (noise1 + noise2) * 0.5;
          
          // Soft radial glow from center
          float centerDist = distance(uv, vec2(0.5));
          float glow = 1.0 - smoothstep(0.0, 1.2, centerDist);
          
          // Color Mixing
          vec3 finalColor = mix(uColor1, uColor2, uv.x + pattern * 0.5);
          
          // Alpha mask - only show where pattern is strong
          // Boost alpha near mouse
          float alpha = smoothstep(0.2, 0.8, pattern + glow * 0.5) * uAlphaMultiplier; 
          alpha += interaction * 0.1; // Brighten near mouse
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Interaction State
    const handleMouseMove = (event: MouseEvent) => {
      // Update shader uniform directly
      material.uniforms.uMouse.value.x = event.clientX / window.innerWidth;
      material.uniforms.uMouse.value.y =
        1.0 - event.clientY / window.innerHeight; // Invert Y for shader UVs
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      material.uniforms.uTime.value += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      material.uniforms.uResolution.value.set(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    const currentContainer = containerRef.current;
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (currentContainer) {
        currentContainer.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [resolvedTheme]);

  return <div ref={containerRef} className="absolute inset-0" />;
}
