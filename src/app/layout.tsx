import "@/src/styles/globals.css";
import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { CustomCursor } from "@/src/components/CustomCursor";
import { Footer } from "@/src/components/Footer";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Header } from "@/src/components/Header";
import { SpiritOrb } from "@/src/components/SpiritOrb";
import { ThemeProvider } from "@/src/components/ui/ThemeProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://allisonpham.dev";
const siteDescription = "Where design meets curiosity.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Allison Pham", template: "%s | Allison Pham" },
  description: siteDescription,
  keywords: ["Software Engineering", "Web Development", "Next.js", "TypeScript", "Machine Learning"],
  authors: [{ name: "Allison Pham", url: "https://github.com/allison-pham" }],
  creator: "Allison Pham",
  publisher: "Allison Pham",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Allison Pham",
    title: "Allison Pham",
    description: siteDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Allison Pham" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Allison Pham",
    description: siteDescription,
    creator: "@allisonpham",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="theme-mode">
          {/* <CustomCursor /> */}
          <SpiritOrb />
          <main className="relative min-h-screen overflow-hidden scanlines">
            <div className="relative z-10 flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
