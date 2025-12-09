import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JewelAI - AI-Generated Jewellery Product Photography",
  description:
    "Professional AI-generated product photos of your jewellery on diverse human models. Perfect for e-commerce, Instagram, and lookbooks.",
  keywords: "AI jewellery photography, product photography, e-commerce, jewellery marketing, AI models",
  openGraph: {
    title: "JewelAI - AI-Generated Jewellery Product Photography",
    description: "Professional AI-generated product photos of your jewellery on diverse human models.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#d4a574" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#8b6f47" media="(prefers-color-scheme: dark)" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
      </head>
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
