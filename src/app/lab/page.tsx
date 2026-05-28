import type { Metadata } from "next";
import { BehindTheScenesSection } from "@/src/components/collections/BehindTheScenesSection"
import { LabContent } from "@/src/components/lab/LabContent";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allisonpham.dev';

export default function LabPage() {
  return (
    <div className="pt-24">
      <LabContent />
      {/* <BehindTheScenesSection />
      <div className="pt-24">
        <BehindTheScenesSection items={behindTheScenesItems} />
      </div> */}
    </div>
  );
}