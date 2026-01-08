import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Salman Yousufzai - Creative Developer",
  description: "Learn more about Salman Yousufzai, a creative developer and designer based in Swat, Pakistan, with a passion for building immersive digital experiences.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
