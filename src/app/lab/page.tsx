import type { Metadata } from "next";
import { AreasOfWork } from "@/src/components/lab/AreasOfWork";
import { LabContent } from "@/src/components/lab/LabContent";
import { MemoryFieldMap } from "@/src/components/lab/MemoryFieldMap"
import { PiecesOfCuriosity } from "@/src/components/lab/PiecesOfCuriosity";
import { RabbitHoles } from "@/src/components/lab/RabbitHoles"
import { RabbitHoles2 } from "@/src/components/lab/RabbitHoles2";
import { SecondBrain } from "@/src/components/lab/SecondBrain"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allisonpham.dev';

export default function LabPage() {
  return (
    <div className="pt-24">
      <LabContent />
      <AreasOfWork />
      {/* <MemoryFieldMap />
      <PiecesOfCuriosity />
      <RabbitHoles />
      <RabbitHoles2 />
      <SecondBrain /> */}
    </div>
  );
}