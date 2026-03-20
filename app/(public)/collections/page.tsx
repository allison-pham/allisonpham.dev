import { behindTheScenesItems } from "@/lib/behind-the-scenes-data"
import { BehindTheScenesSection } from "@/components/public/collections/BehindTheScenesSection"
import { BookmarksFlipbook } from "@/components/public/collections/Bookmarks"
import { CollectionsIntro } from "@/components/public/collections/CollectionsIntro"
import { PlayWithMyBrain } from "@/components/public/collections/PlayWithMyBrain"
import { PassionGrowth } from "@/components/public/collections/PassionGrowth"
import { PhotoDumps } from "@/components/public/collections/PhotoDumps"
import { SecondBrain } from "@/components/public/collections/SecondBrain"
import { SideQuests } from "@/components/public/collections/SideQuests"

export default function Loading() {
  return (
        <>
            <CollectionsIntro />
            <BookmarksFlipbook />
            {/* <SecondBrain />
            <PlayWithMyBrain /> */}
            {/* <PassionGrowth />
            <PhotoDumps />
            <SideQuests /> */}
            {/* <div className="pt-24">
              <BehindTheScenesSection items={behindTheScenesItems} />
            </div> */}
        </>
  )
}