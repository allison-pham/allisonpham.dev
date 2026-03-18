import { CurrentQuests } from "@/components/public/home/HomeQuests";
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/public/home/HomeHero"
import { HomeFolders } from "@/components/public/home/HomeFolders";
import { LabContent } from "@/components/public/lab/LabContent";
import { Now } from "@/components/public/home/HomeNow";
import { PiecesOfCuriosity } from "@/components/public/home/HomePiecesOfCuriosity";

import { generateWebsiteStructuredData, generatePersonStructuredData } from "@/lib/structured-data"

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allisonpham.dev'
  const websiteStructuredData = generateWebsiteStructuredData(baseUrl)
  const personStructuredData = generatePersonStructuredData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      <main className="relative min-h-screen overflow-hidden scanlines">
        <div className="relative z-10">
          <Header />
          <HeroSection />
          {/* <HomeFolders /> */}
          <CurrentQuests />
          <Now />
          <PiecesOfCuriosity />
          {/* <LabContent /> */}
          <Footer />
        </div>
      </main>
    </>
  )
}
