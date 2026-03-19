export function BlogHero() {
  return (
    <section className="overflow-x-clip px-4 sm:px-6 pt-28 pb-8 sm:pt-36 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-4 animate-fade-in-up">
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            digital writings;
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Blog of{" "}
            <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">Curiositea</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            My space of dreams, experiences, & knowledge learning in the world. Little notes mixed with Substack.
            Notes, including thoughts, reflections, & insight on various topics. A glimpse into lessons learned along the way.
          </p>
        </div>
      </div>
    </section>
  )
}