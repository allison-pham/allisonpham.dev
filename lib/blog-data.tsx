export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    role: string
  }
  featured: boolean
  color: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "tbd",
    title: "Title",
    excerpt:
      "About",
    content: `TBD`,
    date: "Month 2026",
    readTime: "5 min read",
    category: "category",
    tags: ["tags"],
    author: {
      name: "Allison Pham",
      avatar: "/developer-portrait.png",
      role: "Role",
    },
    featured: false,
    color: "from-purple-500/20 to-purple-300/20",
  },

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
