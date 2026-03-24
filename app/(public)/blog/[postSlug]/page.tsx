import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { BlogPostContent } from "@/components/public/blog/BlogContent";
import { DevAutoRefresh } from "@/components/public/blog/DevAutoRefresh";
import { generateBlogPostStructuredData } from "@/lib/structured-data";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ postSlug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    postSlug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { postSlug } = await params;
  const post = getPostBySlug(postSlug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allisonpham.dev';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const ogImageUrl = `${baseUrl}/og-images/${post.slug}.png`;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: "Allison Pham" }],
    keywords: post.tags,

    openGraph: {
      type: "article",
      url: postUrl,
      title: post.title,
      description: post.excerpt,
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Allison Pham"],
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
      creator: "@builtbyallison",
    },

    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { postSlug } = await params;
  const post = getPostBySlug(postSlug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allisonpham.dev';
  const structuredData = generateBlogPostStructuredData(post, baseUrl);

  return (
    <>
      <DevAutoRefresh />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div>
        <BlogPostContent post={post} relatedPosts={relatedPosts} />
      </div>
    </>
  );
}