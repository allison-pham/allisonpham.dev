import { TimelineMemoryMap } from "@/components/public/timeline/TimelineMemoryMap"
import { TimelineLevels } from "@/components/public/timeline/TimelineLevels"
import { TimelineDecisions } from "@/components/public/timeline/TimelineDecisions"
import { TimelineContent } from "@/components/public/timeline/TimelineContent"
import { YearlyReviews } from "@/components/public/experiences/ExperiencesYearlyReviews"

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