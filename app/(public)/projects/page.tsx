import { ProjectsPageContent } from "@/components/public/projects/ProjectsContent";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allisonpham.dev';

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore open source projects, experiments, and tools. From web applications to systems programming, dive into the code.",
  keywords: ["open source", "projects", "web development", "systems programming", "experiments"],
  
  openGraph: {
    title: "Projects - Allison Pham",
    description: "Collection of projects across CS, engineering, & design.",
    url: `${baseUrl}/projects`,
    type: "website",

    images: [
      {
        url: `${baseUrl}/og-image-projects.png`,
        width: 1200,
        height: 630,
        alt: "Allison Projects",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Projects - Allison Pham",
    description: "Collection of projects across CS, engineering, & design.",
    images: [`${baseUrl}/og-image-projects.png`],
  },

  alternates: {
    canonical: `${baseUrl}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <ProjectsPageContent />
    </div>
  );
}