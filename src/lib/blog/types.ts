export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  tags: string[]
  featured: boolean
  color: string
  coverImage?: string
}
