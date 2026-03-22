// Re-export from the new blog structure for backward compatibility
export type { BlogPost } from "./blog"
export { blogPosts, getPostBySlug, getRelatedPosts } from "./blog"
