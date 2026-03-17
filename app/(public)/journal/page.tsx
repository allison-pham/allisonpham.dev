import { JournalPageContent } from "@/components/public/journal/JournalContent";

export const metadata = {
  title: "Journal - Allison Pham",
  description: "Notes, including thoughts, reflections, & insight on various topics. A glimpse into lessons learned along the way.",
};

export default function NotesPage() {
  return (
    <div className="pt-24">
      <JournalPageContent />
    </div>
  );
}