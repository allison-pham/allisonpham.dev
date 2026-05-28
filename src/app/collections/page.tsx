import { behindTheScenesItems } from "@/src/lib/main-pages/behind-the-scenes-data"
import { BookmarksFlipbook } from "@/src/components/collections/Bookmarks"
import { ChildhoodNostalgiaWhimsy } from "@/src/components/collections/ChildhoodNostalgiaWhimsy"
import { CollectionsIntro } from "@/src/components/collections/CollectionsIntro"
import { CollectionsMagazine } from "@/src/components/collections/Magazine"
import { PassionGrowth } from "@/src/components/collections/PassionGrowth"
import { PhotoDumps } from "@/src/components/collections/PhotoDumps"
import { RabbitHoles } from "@/src/components/collections/RabbitHoles"
import { SecondBrain } from "@/src/components/collections/SecondBrain"

export default function Loading() {
  return (
        <>
            <CollectionsIntro />
            {/* <CollectionsMagazine /> */}
            <BookmarksFlipbook />
            {/* <SecondBrain />
            <RabbitHoles /> */}
            {/* <PassionGrowth /> */}
            {/* <PhotoDumps /> */}
            {/* <ChildhoodNostalgiaWhimsy /> */}
        </>
  )
}