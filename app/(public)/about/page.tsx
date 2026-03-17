import { AboutEducation } from "@/components/public/about/AboutEducation"
import { AboutHero } from "@/components/public/about/AboutHero"
import { AboutSkills } from "@/components/public/about/AboutSkills"
import { KnowledgeRepertoire } from "@/components/public/about/AboutKnowledge"
import { LearningQueue } from "@/components/public/about/AboutLearning"
import { SideQuests } from "@/components/public/about/AboutSideQuests"

export default function Loading() {
  return (
        <>
            <AboutHero />
            <AboutSkills />
            <AboutEducation />
            <KnowledgeRepertoire />
            <LearningQueue />
            <SideQuests />
        </>
  )
}
