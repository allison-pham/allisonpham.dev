"use client"

interface NavLink { label: string; path: string }

const navLinks: NavLink[] = [
  { label: "Leave a note in the jar", path: "/jar" },
  { label: "Ask me something", path: "/questions" },
  { label: "See what I'm building", path: "/projects" },
  { label: "Read my field notes", path: "/thoughts" },
]

export function LetterToStranger() {
  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#fffdf7", minHeight: "100vh", padding: "4rem 1rem", color: "#1a1a2e" }}>
      <style>{`a{color:#7c3aed;}`}</style>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.25em", color: "#7c3aed", marginBottom: 20 }}>for whoever finds this;</p>

        <div style={{ fontSize: 15, lineHeight: 2, color: "#374151" }}>
          <p style={{ marginBottom: 24 }}>Dear stranger,</p>
          <p style={{ marginBottom: 20 }}>
            I don't know how you ended up here. Maybe you searched for something about HCI or space interfaces. Maybe someone sent you a link. Maybe you clicked around long enough that you found this page tucked away somewhere.
          </p>
          <p style={{ marginBottom: 20 }}>
            Either way - hello. I'm glad you're here.
          </p>
          <p style={{ marginBottom: 20 }}>
            I'm Allison. I build things. Software, mostly, but also systems, and sometimes I build structures for how people think. I study human-computer interaction because I'm obsessed with the question of why some things feel effortless and others feel like fighting. I research it in the context of space, which sounds dramatic but is really just the extreme version of a question everyone has: what does it take to make technology disappear?
          </p>
          <p style={{ marginBottom: 20 }}>
            The reason I built this site the way I did - with all these sections and rabbit holes and interactive pieces - is that I'm tired of personal websites that feel like resumes. Like a list of things someone did to impress other people. I wanted to make something that felt like actually spending time with a person.
          </p>
          <p style={{ marginBottom: 20 }}>
            So here's what I want you to know, in case you only read this one page:
          </p>
          <p style={{ marginBottom: 20, paddingLeft: 24, borderLeft: "3px solid rgba(124,58,237,0.3)", fontStyle: "italic" }}>
            I believe the best technology makes you feel smarter, not smaller. I believe constraints are where interesting things happen. I believe the process matters as much as the output - maybe more. And I believe most good ideas arrive when you're making tea and not trying.
          </p>
          <p style={{ marginBottom: 20 }}>
            If something on this site made you think, or made you want to build something, or just made you feel like the internet can still be a weird and genuine place - that's everything I was hoping for.
          </p>
          <p style={{ marginBottom: 20 }}>
            If you want to leave a note, there's a jar for that. If you have a question, there's a box for that too. And if you just want to wander around, please do. There are easter eggs.
          </p>
          <p style={{ marginBottom: 40 }}>Thanks for being curious enough to end up here.</p>
          <p>With genuine warmth,</p>
          <p style={{ marginTop: 8, fontStyle: "italic", color: "#7c3aed" }}>Allison</p>
          <p style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af", marginTop: 4 }}>May 2026 · Riverside, CA</p>
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <p style={{ fontFamily: "monospace", fontSize: 10, color: "#9ca3af", marginBottom: 12, letterSpacing: "0.1em" }}>WHERE TO GO FROM HERE</p>
          {navLinks.map(link => (
            <a key={link.path} href={link.path} style={{ display: "block", fontFamily: "monospace", fontSize: 12, color: "#7c3aed", marginBottom: 8, textDecoration: "none" }}>
              → {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}