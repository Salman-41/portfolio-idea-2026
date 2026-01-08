import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Salman Yousufzai | Creative Developer & Designer",
  description:
    "Salman Yousufzai is a creative developer and designer based in Swat, Pakistan, specializing in immersive web experiences, 3D animations, and cutting-edge digital products.",
  keywords: [
    "Salman Yousufzai", 
    "Creative Developer", 
    "Designer", 
    "Swat", 
    "Pakistan", 
    "Portfolio", 
    "Three.js", 
    "WebGL", 
    "React Developer", 
    "Motion Design"
  ],
  authors: [{ name: "Salman Yousufzai" }],
  creator: "Salman Yousufzai",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Salman Yousufzai | Creative Developer & Designer",
    description: "Creative developer specializing in immersive web experiences and 3D animations.",
    siteName: "Salman Yousufzai Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman Yousufzai | Creative Developer & Designer",
    description: "Creative developer specializing in immersive web experiences and 3D animations.",
  },
  generator: 'next.js'
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
}

import { PageTransitionOverlay } from "@/components/page-transition-overlay"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <PageTransitionOverlay />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
