import type { Metadata } from "next";
import { DevAutoRefresh } from "@/src/components/blog/DevAutoRefresh";
import { getAllPosts } from "@/src/lib/blog";
import { Hero } from "@/src/components/blog/Hero";
import { List } from "@/src/components/blog/List";
import { SideBar } from "@/src/components/blog/SideBar";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allisonpham.dev';

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical articles, experiments, and insights from the digital laboratory. Exploring systems programming, web development, AI, and more.",

  openGraph: {
    title: "Blog - Allison Pham",
    description: "My space of dreams, experiences, & knowledge learning in the world. Little notes mixed with Substack.",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-blog.png`,
        width: 1200,
        height: 630,
        alt: "Allison Pham Blog",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog - Allison Pham",
    description: "My space of dreams, experiences, & knowledge learning in the world. Little notes mixed with Substack.",
    images: [`${baseUrl}/og-image-blog.png`],
  },

  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <DevAutoRefresh />
      <Hero />

      <section className="px-4 sm:px-6 py-8 sm:py-10 border-t border-border/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <List posts={posts} />
            <SideBar />
          </div>
        </div>
      </section>
    </div>
  );
}