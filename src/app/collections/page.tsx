"use client";
import { ActivityGarden } from "@/src/components/collections/ActivityGarden";
import { Bookmarks } from "@/src/components/collections/Bookmarks";
import { Calendar } from "@/src/components/collections/Calendar";
import { Guestbook } from "@/src/components/collections/Guestbook";
import { Hero } from "@/src/components/collections/Hero";
import { IfIBuiltX } from "@/src/components/collections/IfIBuiltX";
import { InfluenceMap } from "@/src/components/collections/InfluenceMap";
import { Journal } from "@/src/components/collections/Journal";
import { KnowledgeRepertoire } from "@/src/components/collections/KnowledgeRepertoire";
import { MicroInteractionMuseum } from "@/src/components/collections/MicroInteractionMuseum";
import { PhotoDumps } from "@/src/components/collections/PhotoDumps";
import { PiecesOfCuriosity } from "@/src/components/collections/PiecesOfCuriosity";
import { RabbitHoles } from "@/src/components/collections/RabbitHoles";
import { RabbitHoles2 } from "@/src/components/collections/RabbitHoles2";
import { ReadingTracker } from "@/src/components/collections/ReadingTracker";
import { Research } from "@/src/components/collections/Research";
import { SecondBrain } from "@/src/components/collections/SecondBrain";
import { StreakTracker } from "@/src/components/collections/StreakTracker";
import { TeaLog } from "@/src/components/collections/TeaLog";
import { TeaTastingViz } from "@/src/components/collections/TeaTastingViz";
import { ToolsTesting } from "@/src/components/collections/ToolsTesting";
import { TypewriterThoughts } from "@/src/components/collections/TypewriterThoughts";
import { WhoIdLikeToMeet } from "@/src/components/collections/WhoIdLikeToMeet";
import { YearByYear } from "@/src/components/collections/YearByYear";
import { YearInReview } from "@/src/components/collections/YearInReview";

export default function Loading() {
  return (
    <>
      <Hero />
      <Bookmarks />

      {/* <ActivityGarden />
      <Calendar />
      <Guestbook />
      <IfIBuiltX />
      <InfluenceMap />
      <Journal />
      <KnowledgeRepertoire />
      <MicroInteractionMuseum />
      <PhotoDumps />
      <PiecesOfCuriosity />
      <RabbitHoles />
      <RabbitHoles2 />
      <ReadingTracker />
      <Research />
      <SecondBrain />
      <StreakTracker />
      <TeaLog />
      <TeaTastingViz />
      <ToolsTesting />
      <TypewriterThoughts />
      <WhoIdLikeToMeet />
      <YearByYear />
      <YearInReview /> */}
    </>
  );
}
