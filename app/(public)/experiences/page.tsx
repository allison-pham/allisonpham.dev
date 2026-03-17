import { ExperiencesTimeline } from "@/components/public/experiences/ExperiencesTimeline"
import { PastLife } from "@/components/public/experiences/ExperiencesPastLife"
import { YearlyReviews } from "@/components/public/experiences/ExperiencesYearlyReviews"

export default function Loading() {
  return (
        <>
            <ExperiencesTimeline/>
            <PastLife />
            <YearlyReviews />
        </>
  )
}