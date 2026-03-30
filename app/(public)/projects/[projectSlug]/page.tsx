import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { getProjectBySlug, getProjectCaseStudy, getRelatedProjects, projects } from "@/lib/projects-data"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://allisonpham.dev"

type ProjectPageProps = {
  params: Promise<{
    projectSlug: string
  }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    projectSlug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { projectSlug } = await params
  const project = getProjectBySlug(projectSlug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  const ogImage = project.thumbnailSrc
    ? project.thumbnailSrc.startsWith("http")
      ? project.thumbnailSrc
      : `${baseUrl}${project.thumbnailSrc}`
    : `${baseUrl}/og-image-projects.png`

  return {
    title: `${project.title} Case Study`,
    description: project.description,
    alternates: {
      canonical: `${baseUrl}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} Case Study - Allison Pham`,
      description: project.description,
      url: `${baseUrl}/projects/${project.slug}`,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.thumbnailAlt || `${project.title} cover image`,
        },
      ],
    },
  }
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { projectSlug } = await params
  const project = getProjectBySlug(projectSlug)

  if (!project) {
    notFound()
  }

  const caseStudy = getProjectCaseStudy(project)
  const relatedProjects = getRelatedProjects(project.slug)

  return (
    <section className="px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28">
      <div className="mx-auto max-w-6xl space-y-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <header className="space-y-4">
          <p className="font-mono text-xs tracking-[0.25em] text-primary">project case study;</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">{project.description}</p>
        </header>

        <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/40 aspect-16/8">
          {project.thumbnailSrc ? (
            <Image
              src={project.thumbnailSrc}
              alt={project.thumbnailAlt || `${project.title} cover image`}
              fill
              priority
              sizes="(min-width: 1024px) 70vw, 96vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <p className="font-serif text-xl text-foreground/85 sm:text-3xl">Thumbnail</p>
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">Add /public/projects/{project.slug}/cover.jpg</p>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-border/70 bg-card/50 p-4">
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted-foreground">Role</h2>
            <p className="mt-2 text-sm font-medium">{caseStudy.role}</p>
          </article>
          <article className="rounded-xl border border-border/70 bg-card/50 p-4">
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted-foreground">Duration</h2>
            <p className="mt-2 text-sm font-medium">{caseStudy.duration}</p>
          </article>
          <article className="rounded-xl border border-border/70 bg-card/50 p-4">
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted-foreground">Tech Stack</h2>
            <p className="mt-2 text-sm font-medium">{project.tags.length > 0 ? project.tags.join(" · ") : caseStudy.specialization}</p>
          </article>
        </div>

        <div className="space-y-4 rounded-2xl border border-border/70 bg-card/35 p-5 sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight">In 1 sentence...</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>{caseStudy.oneSentence}</li>
            <li>{caseStudy.quickAction}</li>
          </ul>
        </div>

        <div className="space-y-7">
          {caseStudy.sections.map((section) => (
            <article key={section.id} className="rounded-2xl border border-border/70 bg-card/35 p-5 sm:p-6">
              <h2 className="mb-3 text-xl font-semibold tracking-tight">{section.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{section.description}</p>

              {section.images && section.images.length > 0 ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {section.images.map((image) => (
                    <figure key={image.src} className="space-y-2">
                      <div className="relative overflow-hidden rounded-xl border border-border/70 bg-secondary/35 aspect-video">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(min-width: 1024px) 30vw, 92vw"
                          className="object-cover"
                        />
                      </div>
                      {image.caption && <figcaption className="text-xs text-muted-foreground">{image.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-xl border border-dashed border-border/80 bg-secondary/25 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Image slot</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Add /public/projects/{project.slug}/{section.id}-1.jpg and wire it in lib/projects-data.ts.
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>

        <footer className="space-y-6 border-t border-border/70 pt-7">
          <div className="flex flex-wrap items-center gap-4">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-card/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                <Github className="h-4 w-4" />
                GitHub Repo
              </a>
            )}
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-card/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" />
                Live Link
              </a>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">See more</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.slug}
                  href={`/projects/${relatedProject.slug}`}
                  className="rounded-xl border border-border/70 bg-card/40 p-4 transition-colors hover:border-primary/40 hover:bg-card/70"
                >
                  <p className="font-semibold tracking-tight">{relatedProject.title}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{relatedProject.tags.join(" · ") || "No tags yet"}</p>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{relatedProject.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
