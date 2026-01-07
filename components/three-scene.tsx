"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: new THREE.Color("#38bdf8"),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Create floating geometric shapes
    const shapes: THREE.Mesh[] = []
    const shapeGeometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
    ]

    const shapeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#38bdf8"),
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })

    for (let i = 0; i < 8; i++) {
      const geometry = shapeGeometries[Math.floor(Math.random() * shapeGeometries.length)]
      const shape = new THREE.Mesh(geometry, shapeMaterial.clone())
      shape.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30)
      shape.scale.setScalar(Math.random() * 2 + 1)
      shapes.push(shape)
      scene.add(shape)
    }

    // Mouse movement effect
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate particles
      particlesMesh.rotation.x += 0.0003
      particlesMesh.rotation.y += 0.0005

      // Animate shapes
      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.002 * (i + 1) * 0.5
        shape.rotation.y += 0.003 * (i + 1) * 0.5
        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01
      })

      // Camera follows mouse
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.02
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.02

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      shapeMaterial.dispose()
      shapeGeometries.forEach((g) => g.dispose())
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}
