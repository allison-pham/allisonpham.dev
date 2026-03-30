export type Experience = {
  slug: string;
  title: string;
  period: string;
  role?: string;
  skills?: string[];
  thumbnail?: string;
  shortDescription: string;
  oneSentence?: string;
  sections?: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
};

import acmExperience from "./experiences/acm";

export const experiences: Experience[] = [
  acmExperience,
  // Add more experiences here
];
