import { AboutEducation } from "@/src/components/about/AboutEducation"
import { AboutHero } from "@/src/components/about/AboutHero"
import { AboutKnowledgeAcrossFields } from "@/src/components/about/AboutKnowledgeAcrossFields"
import { AboutSkills } from "@/src/components/about/AboutSkills"
import { AboutTools } from "@/src/components/about/AboutTools"
import { KnowledgeRepertoire } from "@/src/components/about/AboutKnowledge"

export default function Loading() {
  return (
        <>
            <AboutHero />
            <AboutEducation />
            <AboutSkills />
            {/* <KnowledgeRepertoire /> */}
            <AboutKnowledgeAcrossFields />
            <AboutTools />
        </>
  )
}