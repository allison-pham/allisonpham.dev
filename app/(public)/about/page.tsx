import { AboutHero } from "@/components/about/about-hero"
import { AboutSkills } from "@/components/about/about-skills"
import { AboutEducation } from "@/components/about/about-education"

export default function Loading() {
  return (
        <>
            <AboutHero />
            <AboutSkills />
            <AboutEducation />
            {/* <KnowledgeRepertoire /> */}
        </>
  )
}
