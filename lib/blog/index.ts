import "server-only"
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import type { BlogPost } from "@/lib/blog/types"

const PRIMARY_CONTENT_DIR = path.join(process.cwd(), "lib", "content")
const LEGACY_CONTENT_DIR = path.join(process.cwd(), "content", "blog")
const IS_DEV = process.env.NODE_ENV !== "production"

let cachedPosts: BlogPost[] | null = null

function resolveContentDir(): string {
  if (fs.existsSync(PRIMARY_CONTENT_DIR)) return PRIMARY_CONTENT_DIR
  return LEGACY_CONTENT_DIR
}

export function getAllPosts(): BlogPost[] {
  if (!IS_DEV && cachedPosts) return cachedPosts

  const contentDir = resolveContentDir()

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8")
    const { data, content } = matter(raw)
    return {
      id: data.id ?? file.replace(/\.mdx?$/, ""),
      slug: data.slug ?? file.replace(/\.mdx?$/, ""),
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      content,
      date: data.date ?? "",
      category: data.category ?? "",
      tags: data.tags ?? [],
      featured: data.featured ?? false,
      color: data.color ?? "",
      coverImage: data.coverImage,
    } satisfies BlogPost
  })

  if (!IS_DEV) {
    cachedPosts = posts
  }

  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const all = getAllPosts()
  const current = all.find((p) => p.slug === slug)
  if (!current) return []

  return all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aScore =
        (a.category === current.category ? 2 : 0) +
        a.tags.filter((t: string) => current.tags.includes(t)).length
      const bScore =
        (b.category === current.category ? 2 : 0) +
        b.tags.filter((t: string) => current.tags.includes(t)).length
      return bScore - aScore
    })
    .slice(0, limit)
}