"use client";
import { ActivityGarden } from "@/src/components/collections/ActivityGarden";
import { Bookmarks } from "@/src/components/collections/Bookmarks";
import { Bookshelf } from "@/src/components/collections/Bookshelf";
import { Calendar } from "@/src/components/collections/Calendar";
import { FavoriteThings } from "@/src/components/collections/FavoriteThings";
import { Guestbook } from "@/src/components/collections/Guestbook";
import { HCIFieldNotes } from "@/src/components/collections/HCIFieldNotes";
import { Hero } from "@/src/components/collections/Hero";
import { InfluenceMap } from "@/src/components/collections/InfluenceMap";
import { Journal } from "@/src/components/collections/Journal";
import { KnowledgeRepertoire } from "@/src/components/collections/KnowledgeRepertoire";
import { MicroInteractionMuseum } from "@/src/components/collections/MicroInteractionMuseum";
import { PhotoDumps } from "@/src/components/collections/PhotoDumps";
import { ReadingTracker } from "@/src/components/collections/ReadingTracker";
import { StreakTracker } from "@/src/components/collections/StreakTracker";
import { TeaLog } from "@/src/components/collections/TeaLog";
import { TeaTastingViz } from "@/src/components/collections/TeaTastingViz";
import { TypewriterThoughts } from "@/src/components/collections/TypewriterThoughts";
import { YearByYear } from "@/src/components/collections/YearByYear";
import { YearInReview } from "@/src/components/collections/YearInReview";

export default function Loading() {
  return (
    <>
      <Hero />
      <Bookmarks />
      {/* <ActivityGarden />
      <Bookshelf />
      <Calendar />
      <FavoriteThings />
      <Guestbook />
      <HCIFieldNotes />
      <InfluenceMap />
      <Journal />
      <KnowledgeRepertoire />
      <MicroInteractionMuseum />
      <PhotoDumps />
      <ReadingTracker />
      <StreakTracker />
      <TeaLog />
      <TeaTastingViz />
      <TypewriterThoughts />
      <YearByYear />
      <YearInReview /> */}
    </>
  );
}
