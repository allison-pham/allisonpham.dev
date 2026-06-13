import { CurrentQuests } from "@/src/components/home/CurrentQuests";
import { ExplorationGlimpse } from "@/src/components/home/ExplorationGlimpse"
import { FeaturedProjects } from "@/src/components/home/FeaturedProjects";
import { generateWebsiteStructuredData, generatePersonStructuredData } from "@/src/lib/core-features/structured-data"
import { Hero } from "@/src/components/home/Hero"

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

      <Hero />
      <CurrentQuests />
      <FeaturedProjects />
      {/* <ExplorationGlimpse /> */}
    </>
  )
}
