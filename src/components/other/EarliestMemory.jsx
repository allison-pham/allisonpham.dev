"use client";

export default function EarliestMemory() {
  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        background: "#fffdf7",
        minHeight: "100vh",
        padding: "4rem 1rem",
        color: "#1a1a2e",
      }}
    >
      <style>{`* { box-sizing:border-box;margin:0;padding:0; }`}</style>
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            letterSpacing: "0.25em",
            color: "#7c3aed",
            marginBottom: 20,
          }}
        >
          where it started;
        </p>

        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 32,
            lineHeight: 1.3,
          }}
        >
          Earliest Memory of Computers
        </h1>

        <div style={{ fontSize: 15, lineHeight: 2.1, color: "#374151" }}>
          <p style={{ marginBottom: 22 }}>
            It was a beige desktop. I don't remember the brand. I remember it
            was taller than I expected, and that it made a sound when it started
            up - a low, slow whirr that built into something steadier, like a
            machine waking up and deciding to stay awake.
          </p>
          <p style={{ marginBottom: 22 }}>
            I remember the monitor was heavy, with a thick plastic frame, and
            that the screen glowed a particular shade of off-blue that I haven't
            seen since. Not a good blue. Just the specific blue of that era.
          </p>
          <p style={{ marginBottom: 22 }}>
            I don't remember what I was trying to do. I remember figuring out
            that you could make things happen by clicking in the right places,
            and that the right places weren't obvious, and that finding them
            felt like discovering something that had been hidden on purpose. Not
            to be cruel - just because no one had thought to make it visible.
          </p>
          <p
            style={{
              marginBottom: 22,
              paddingLeft: 24,
              borderLeft: "3px solid rgba(124,58,237,0.3)",
              fontStyle: "italic",
              color: "#6b7280",
            }}
          >
            That feeling - there are rules here, and if I learn them, I can make
            the machine do what I want - was the first feeling I can identify
            that eventually became a career.
          </p>
          <p style={{ marginBottom: 22 }}>
            Later there was Scratch. And before Scratch there was Paint, where I
            made things that were objectively ugly but made with intention. And
            Club Penguin, which was the first time I understood that computers
            could be a place where other people were, not just a machine in a
            room.
          </p>
          <p style={{ marginBottom: 22 }}>
            But the first memory is that beige desktop. The whirr. The off-blue
            screen. The slow understanding that the rules were discoverable, and
            that discovering them was the point.
          </p>
          <p style={{ marginBottom: 22 }}>
            I don't think I've stopped doing that since.
          </p>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "#9ca3af",
              marginTop: 40,
            }}
          >
            written May 2026
          </p>
        </div>
      </div>
    </div>
  );
}
