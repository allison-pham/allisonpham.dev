import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css"

// Configure fonts with proper options
const geist = Geist({
  subsets: ["latin"],
  variable: '--font-geist',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
})
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://allisonpham.dev'),

  title: {
    default: "Allison Pham",
    template: "%s | Allison Pham",
  },

  description:
    "Where design meets curiosity.",
  keywords: ["Software Engineering", "Web Development", "Next.js", "TypeScript", "Machine Learning"],
  authors: [{ name: "Allison Pham", url: "https://github.com/allison-pham" }],
  creator: "Allison Pham",
  publisher: "Allison Pham",
  generator: "v0.app",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Allison Pham",
    description: "Where design meets curiosity.",
    siteName: "Allison Pham",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Allison Pham",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Allison Pham",
    description: "A digital workshop where code meets curiosity. Experiments, prototypes, and open-source artifacts.",
    creator: "@allisonpham",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: [
      // {
      //   url: "/favicon.ico",
      //   sizes: "any",
      // },
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} storageKey="theme-mode">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}