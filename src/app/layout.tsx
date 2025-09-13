import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "ChatFlow - Modern Chat Application",
  description: "A beautiful, modern chat application built with Next.js and Framer Motion",
  generator: "v0.app",
  icons: {
    icon: '/chat-icon.svg',
    shortcut: '/chat-icon.svg',
    apple: '/chat-icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
