import { Education } from "@/src/components/about/Education"
import { Hero } from "@/src/components/about/Hero"
import { KnowledgeAcrossFields } from "@/src/components/about/KnowledgeAcrossFields"
import { LetterToStranger } from "@/src/components/about/LetterToStranger"
import { TechnicalSkills } from "@/src/components/about/TechnicalSkills"
import { TimelineDecisions } from "@/src/components/about/TimelineDecisions"
import { TimelineLevels } from "@/src/components/about/TimelineLevels"
import { ToolsIUse } from "@/src/components/about/ToolsIUse"
import { YearlyReviews } from "@/src/components/about/YearlyReviews"

export default function About() {
  return (
        <>
            <Hero />
            <Education />
            <TechnicalSkills />
            <ToolsIUse />
            {/* <KnowledgeAcrossFields />
            <LetterToStranger />
            <TimelineDecisions />
            <TimelineLevels />
            <YearlyReviews /> */}
        </>
  )
}