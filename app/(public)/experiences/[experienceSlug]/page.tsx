// Enable static generation for all experience pages
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { experiences } from "@/lib/experiences-data";

function getRelatedExperiences(currentSlug: string) {
  return experiences.filter(e => e.slug !== currentSlug).slice(0, 3);
}

export function generateStaticParams() {
  return experiences.map((exp) => ({ experienceSlug: exp.slug }));
}

export default async function ExperiencePage(props: { params: Promise<{ experienceSlug: string }> }) {
  const { experienceSlug } = await props.params;
  const experience = experiences.find(e => e.slug === experienceSlug);
  if (!experience) return notFound();

  const relatedExperiences = getRelatedExperiences(experienceSlug);

  return (
    <section className="px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28">
      <div className="mx-auto max-w-6xl space-y-10">
        <Link
          href="/experiences"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to experiences
        </Link>

        {/* Experience Highlight, Title, Description */}
        <header className="space-y-4">
          <p className="font-mono text-xs tracking-[0.25em] text-primary">experience highlight</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{experience.title}</h1>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">{experience.shortDescription}</p>
        </header>

        {/* Thumbnail */}
        {experience.thumbnail && (
          <div className="relative aspect-[16/6] w-full overflow-hidden rounded-2xl border border-border/70 bg-card/40">
            <Image
              src={experience.thumbnail}
              alt={experience.title + " thumbnail"}
              fill
              className="object-contain object-center"
              sizes="(min-width: 1024px) 70vw, 96vw"
              priority
            />
          </div>
        )}

        {/* Role | Duration | Skills */}
        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-border/70 bg-card/50 p-4">
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted-foreground">Role</h2>
            <p className="mt-2 text-sm font-medium">{experience.role}</p>
          </article>
          <article className="rounded-xl border border-border/70 bg-card/50 p-4">
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted-foreground">Duration</h2>
            <p className="mt-2 text-sm font-medium">{experience.period}</p>
          </article>
          <article className="rounded-xl border border-border/70 bg-card/50 p-4">
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted-foreground">Skills</h2>
            <p className="mt-2 text-sm font-medium">{experience.skills?.join(" · ")}</p>
          </article>
        </div>

        {/* In 1 sentence... */}
        {experience.oneSentence && (
          <div className="space-y-4 rounded-2xl border border-border/70 bg-card/35 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">In 1 sentence...</h2>
            <p className="text-sm text-muted-foreground">{experience.oneSentence}</p>
          </div>
        )}

        {/* Sections */}
        {experience.sections?.map((section) => (
          <div key={section.id} className="space-y-4 rounded-2xl border border-border/70 bg-card/35 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
            <div className="text-sm text-muted-foreground">{section.content}</div>
          </div>
        ))}

        {/* Related Experiences */}
        {relatedExperiences.length > 0 && (
          <footer className="space-y-6 border-t border-border/70 pt-7">
            <h2 className="text-2xl font-semibold tracking-tight">See more experiences</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedExperiences.map((related) => (
                <Link
                  key={related.slug}
                  href={`/experiences/${related.slug}`}
                  className="rounded-xl border border-border/70 bg-card/40 p-4 transition-colors hover:border-primary/40 hover:bg-card/70"
                >
                  <p className="font-semibold tracking-tight">{related.title}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{related.period}</p>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{related.shortDescription}</p>
                </Link>
              ))}
            </div>
          </footer>
        )}
      </div>
    </section>
  );
}
