import { behindTheScenesItems } from "@/lib/behind-the-scenes-data"
import { BookmarksFlipbook } from "@/components/public/collections/Bookmarks"
import { CollectionsIntro } from "@/components/public/collections/CollectionsIntro"
import { CollectionsMagazine } from "@/components/public/collections/CollectionsMagazine"
import { PassionGrowth } from "@/components/public/collections/PassionGrowth"
import { PhotoDumps } from "@/components/public/collections/PhotoDumps"
import { RabbitHoles } from "@/components/public/collections/RabbitHoles"
import { SecondBrain } from "@/components/public/collections/SecondBrain"

export default function Loading() {
  return (
        <>
            <CollectionsIntro />
            <CollectionsMagazine />
            <BookmarksFlipbook />
            <SecondBrain />
            <RabbitHoles />
            <PassionGrowth />
            {/* <PhotoDumps /> */}
        </>
  )
}