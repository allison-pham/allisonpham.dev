import { BlogPost } from "./types"
import { writingAboutSystems } from "./posts/writing-about-systems"

// Re-export types
export type { BlogPost }

// Import all blog posts here
export const blogPosts: BlogPost[] = [
  writingAboutSystems,
  // Add more posts by importing and adding them to this array
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, limit)
}
