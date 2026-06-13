"use client"
import { AccessibilityNotes } from "@/src/components/collections/AccessibilityNotes"
import { Bookmarks } from "@/src/components/collections/Bookmarks"
import { Bookshelf } from "@/src/components/collections/Bookshelf"
import { Calendar } from "@/src/components/collections/Calendar"
import { CognitiveLoadMeter } from "@/src/components/collections/CognitiveLoadMeter"
import { FavoriteThings } from "@/src/components/collections/FavoriteThings"
import { HCIFieldNotes } from "@/src/components/collections/HCIFieldNotes"
import { Hero } from "@/src/components/collections/Hero"
import { InfluenceMap } from "@/src/components/collections/InfluenceMap"
import { KnowledgeRepertoire } from "@/src/components/collections/KnowledgeRepertoire"
import { LanguageLearning } from "@/src/components/collections/LanguageLearning"
import { MicroInteractionMuseum } from "@/src/components/collections/MicroInteractionMuseum"
import { PhotoDumps } from "@/src/components/collections/PhotoDumps"
import { ReadingTracker } from "@/src/components/collections/ReadingTracker"
import { RubberDucky } from "@/src/components/collections/RubberDucky"
import { SkillsDependencyMap } from "@/src/components/collections/SkillsDependencyMap"
import { StreakTracker } from "@/src/components/collections/StreakTracker"
import { TeaLog } from "@/src/components/collections/TeaLog"
import { TeaTastingViz } from "@/src/components/collections/TeaTastingViz"
import { ThinkingGraph } from "@/src/components/collections/ThinkingGraph"
import { WhatIRead } from "@/src/components/collections/WhatIRead"

export default function Loading() {
  return (
        <>
          <Hero />
          <Bookmarks />
          {/* <PhotoDumps />
          <KnowledgeRepertoire />
          <AccessibilityNotes />
          <Bookshelf />
          <Calendar />
          <CognitiveLoadMeter />
          <FavoriteThings />
          <HCIFieldNotes />
          <InfluenceMap />
          <LanguageLearning />
          <MicroInteractionMuseum />
          <ReadingTracker />
          <RubberDucky />
          <SkillsDependencyMap />
          <StreakTracker />
          <TeaLog />
          <TeaTastingViz />
          <ThinkingGraph />
          <WhatIRead /> */}
        </>
  )
}