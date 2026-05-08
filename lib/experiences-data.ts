import React from "react";

export const SECTIONS = {
  "intro-opportunities": "Intro & Opportunities",
  "background-story": "Background Story",
  "org-impact-contributions": "Org Impact & My Contributions",
  "tools-technologies": "Tools & Technologies",
  "lessons-learned": "Lessons Learned",
} as const;

export type SectionId = keyof typeof SECTIONS;

export type Experience = {
  slug: string;
  title: string;
  period: string;
  role?: string[];
  skills?: string[];
  thumbnail?: string;
  shortDescription: string;
  oneSentence?: string;
  sections?: Array<{
    id: SectionId;
    content: React.ReactNode;
  }>;
};

import acmExperience from "./experiences/acm";
import cutieHackExperience from "./experiences/cutie-hack";

export const experiences: Experience[] = [
  acmExperience,
  // cutieHackExperience
];