import { Header } from "@/components/header"
import { HeroSection } from "@/components/public/home/home-hero"
import { LabPageContent } from "@/components/public/lab/lab-page-content";
import { Footer } from "@/components/footer"
import { CurrentQuests } from "@/components/public/home/quests";
import { Now } from "@/components/public/home/now";

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allisonpham.dev'

  return (
    <>
      <main className="relative min-h-screen overflow-hidden scanlines">
        <div className="relative z-10">
          <Header />
          <HeroSection />
          <CurrentQuests />
          <Now />
          <LabPageContent />
          <Footer />
        </div>
      </main>
    </>
  )
}
