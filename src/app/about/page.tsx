import { Education } from "@/src/components/about/Education"
import { Hero } from "@/src/components/about/Hero"
import { KnowledgeAcrossFields } from "@/src/components/about/KnowledgeAcrossFields"
import { KnowledgeRepertoire } from "@/src/components/about/KnowledgeRepertoire"
import { TechnicalSkills } from "@/src/components/about/TechnicalSkills"
import { ToolsIUse } from "@/src/components/about/ToolsIUse"

export default function Loading() {
  return (
        <>
            <Hero />
            <Education />1
            <TechnicalSkills />
            <KnowledgeAcrossFields />
            <ToolsIUse />
            {/* <KnowledgeRepertoire /> */}
        </>
  )
}