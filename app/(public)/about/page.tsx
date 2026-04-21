import { AboutEducation } from "@/components/public/about/AboutEducation"
import { AboutHero } from "@/components/public/about/AboutHero"
import { AboutSkills } from "@/components/public/about/AboutSkills"
import { KnowledgeRepertoire } from "@/components/public/about/AboutKnowledge"

export default function Loading() {
  return (
        <>
            <AboutHero />
            <AboutEducation />
            <AboutSkills />
            <KnowledgeRepertoire />
        </>
  )
}
