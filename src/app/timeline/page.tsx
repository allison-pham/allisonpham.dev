import { TimelineContent } from "@/src/components/timeline/TimelineContent"
import { TimelineDecisions } from "@/src/components/timeline/TimelineDecisions"
import { TimelineLevels } from "@/src/components/timeline/TimelineLevels"
import { TimelineMemoryMap } from "@/src/components/timeline/TimelineMemoryMap"
import { YearlyReviews } from "@/src/components/timeline/ExperiencesYearlyReviews"

export default function Loading() {
  return (
    <>
      <TimelineMemoryMap />
      <TimelineLevels />
      <TimelineDecisions />
      <TimelineContent />
      <YearlyReviews />
    </>
  )
}