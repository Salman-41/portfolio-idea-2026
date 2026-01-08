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
  title: "Alex Chen | Creative Developer & Designer",
  description:
    "Award-winning creative developer specializing in immersive web experiences, 3D animations, and cutting-edge digital products.",
  keywords: ["developer", "designer", "portfolio", "creative", "web development", "three.js", "react"],
  authors: [{ name: "Alex Chen" }],
  creator: "Alex Chen",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Alex Chen | Creative Developer & Designer",
    description: "Award-winning creative developer specializing in immersive web experiences.",
    siteName: "Alex Chen Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Chen | Creative Developer & Designer",
    description: "Award-winning creative developer specializing in immersive web experiences.",
  },
    generator: 'v0.app'
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
