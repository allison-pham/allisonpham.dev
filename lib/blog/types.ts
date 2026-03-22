export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  // readTime: string
  category: string
  tags: string[]
  // author: {
  //   name: string
  //   avatar: string
  //   role: string
  // }
  featured: boolean
  color: string
  coverImage?: string
}
