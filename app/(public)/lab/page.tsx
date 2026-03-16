import { LabPageContent } from "@/components/public/lab/lab-page-content";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allisonpham.dev';

export default function LabPage() {
  return (
    <div className="pt-24">
      <LabPageContent />
    </div>
  );
}
