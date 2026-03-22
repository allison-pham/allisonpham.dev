import { BehindTheScenesSection } from "@/components/public/collections/BehindTheScenesSection"
import { LabContent } from "@/components/public/lab/LabContent";
import type { Metadata } from "next";

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