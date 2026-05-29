import { AreasOfWork } from "@/src/components/collections/AreasOfWork";
import { BookmarksFlipbook } from "@/src/components/collections/Bookmarks"
import { CollectionsIntro } from "@/src/components/collections/CollectionsIntro"
import { CollectionsMagazine } from "@/src/components/collections/Magazine"
import { ExplorationGlimpse } from "@/src/components/collections/ExplorationGlimpse"
import { PhotoDumps } from "@/src/components/collections/PhotoDumps"
import { PiecesOfCuriosity } from "@/src/components/collections/PiecesOfCuriosity";
import { RabbitHoles } from "@/src/components/collections/RabbitHoles"
import { RabbitHoles2 } from "@/src/components/collections/RabbitHoles2";
import { SecondBrain } from "@/src/components/collections/SecondBrain"
import { Timeline } from "@/src/components/collections/Timeline";
import { TimelineContent } from "@/src/components/collections/TimelineContent"
import { TimelineDecisions } from "@/src/components/collections/TimelineDecisions"
import { TimelineLevels } from "@/src/components/collections/TimelineLevels"
import { TimelineMemoryMap } from "@/src/components/collections/TimelineMemoryMap"
import { UsesSetup } from "@/src/components/collections/UsesSetup";
import { WritingNotes } from "@/src/components/collections/WritingNotes";
import { YearlyReviews } from "@/src/components/collections/ExperiencesYearlyReviews"

export default function Loading() {
  return (
        <>
            <CollectionsIntro />
            <BookmarksFlipbook />
            {/* <AreasOfWork />
            <CollectionsMagazine />
            <ExplorationGlimpse />
            <PhotoDumps /> */}

            {/* <PiecesOfCuriosity />
            <RabbitHoles />
            <RabbitHoles2 />
            <SecondBrain />
            <Timeline />
            <TimelineContent />
            <TimelineDecisions />
            <TimelineLevels />
            <TimelineMemoryMap />
            <UsesSetup />
            <WritingNotes />
            <YearlyReviews /> */}
        </>
  )
}