import type { Metadata } from "next";
import { LabContent } from "@/src/components/lab/LabContent";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allisonpham.dev';

export default function LabPage() {
  return (
    <div className="pt-24">
      <LabContent />
    </div>
  );
}