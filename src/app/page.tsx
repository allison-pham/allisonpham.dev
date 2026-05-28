import { AreasOfWork } from "@/src/components/home/HomeAreasOfWork";
import { CurrentQuests } from "@/src/components/home/HomeQuests";
import { ExplorationGlimpse } from "@/src/components/home/HomeExplorationGlimpse"
import { FeaturedProjects } from "@/src/components/home/HomeFeaturedProjects";
import { generateWebsiteStructuredData, generatePersonStructuredData } from "@/src/lib/structured-data"
import { HeroSection } from "@/src/components/home/HomeHero"
import { LabContent } from "@/src/components/lab/LabContent";
import { Now } from "@/src/components/home/HomeNow";
import { PiecesOfCuriosity } from "@/src/components/home/HomePiecesOfCuriosity";

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

      {/* <main className="relative min-h-screen overflow-hidden scanlines">
        <div className="relative z-10"> */}

      <HeroSection />
      {/* <AreasOfWork /> */}
      <CurrentQuests />
      <FeaturedProjects />
      {/* <Now /> */}
      {/* <PiecesOfCuriosity /> */}
      {/* Exploration Glimpse Section */}
      {/* <div className="mt-16">
        <ExplorationGlimpse />
      </div> */}
      {/* <LabContent /> */}
      
        {/* </div>
      </main> */}
    </>
  )
}
