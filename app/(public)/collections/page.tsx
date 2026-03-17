import { BookmarksFlipbook } from "@/components/public/collections/Bookmarks"
import { BookNotes } from "@/components/public/collections/BookNotes"
import { CollectionsIntro } from "@/components/public/collections/CollectionsIntro"
import { InspirationBoard } from "@/components/public/collections/InspirationBoard"
import { PassionGrowth } from "@/components/public/collections/PassionGrowth"
import { PhotoDumps } from "@/components/public/collections/PhotoDumps"

export default function Loading() {
  return (
        <>
            <CollectionsIntro />
            <BookmarksFlipbook />
            <BookNotes />
            <InspirationBoard />
            <PassionGrowth />
            <PhotoDumps />
        </>
  )
}