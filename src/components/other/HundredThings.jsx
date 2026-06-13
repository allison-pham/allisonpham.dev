"use client";
import { useState } from "react";

const things = [
  { n: 1, text: "I always sketch interfaces on paper before opening Figma." },
  { n: 2, text: "Jasmine green tea is non-negotiable. 175°F exactly." },
  {
    n: 3,
    text: "I take things apart to understand how they work. This started with Legos.",
  },
  { n: 4, text: "Most of my best ideas arrive after midnight." },
  { n: 5, text: "I learned to type faster so I could think faster." },
  {
    n: 6,
    text: "I've rebuilt this portfolio several times. Each version taught me something the last one couldn't.",
  },
  {
    n: 7,
    text: "I'm not a morning person but I am a sunrise person. There's a difference.",
  },
  {
    n: 8,
    text: "I have a folder and system for everything. Color-coded. Probably over-engineered.",
  },
  {
    n: 9,
    text: "Space constraints interest me more than space itself - what do you design when everything is limited?",
  },
  {
    n: 10,
    text: "I find cognitive load invisible until it isn't. That's the whole problem.",
  },
  {
    n: 11,
    text: "Chess is the hobby that most directly shows up in how I build things.",
  },
  { n: 12, text: "I read the manual. Not always first, but eventually." },
  {
    n: 13,
    text: "Club Penguin taught me that computers could be a place where other people were.",
  },
  {
    n: 14,
    text: "I believe constraints are more honest than unlimited options.",
  },
  {
    n: 15,
    text: "The Apollo keyboard is one of my favorite interface designs. Chunky, tactile, constraint-first.",
  },
  { n: 16, text: "I write to understand, not to publish." },
  { n: 17, text: "I prefer physical books. I like the weight." },
  {
    n: 18,
    text: "I've been designing for space longer than I've been to space, which is zero times.",
  },
  { n: 19, text: "I scrapbook. Physical archive of moments and ideas." },
  {
    n: 20,
    text: "I believe the best technology makes you feel smarter, not smaller.",
  },
  { n: 21, text: "Long walks are my best debugging tool." },
  {
    n: 22,
    text: "I annotate books. The marginalia is sometimes more valuable than the text.",
  },
  {
    n: 23,
    text: "I got into HCI by asking: what's the hardest version of this problem?",
  },
  {
    n: 24,
    text: "I believe rest is part of the system, not a reward for finishing.",
  },
  { n: 25, text: "The second cup of tea is always better than the first." },
  {
    n: 26,
    text: "I am partially made of the tools I've used. Notion changed how I organize. Chess changed how I plan.",
  },
  {
    n: 27,
    text: "I have strong opinions about font sizes. Nothing below 11px.",
  },
  {
    n: 28,
    text: "I directed hackathons before I felt ready to. That's the only way to do it.",
  },
  {
    n: 29,
    text: "I believe the process matters as much as the output. Maybe more.",
  },
  {
    n: 30,
    text: "I've read The Picture of Dorian Gray twice and will probably read it again.",
  },
  {
    n: 31,
    text: "I think keyboard shortcuts are underrated as a sign of respect for the user's time.",
  },
  {
    n: 32,
    text: "The gap between what you imagine and what you produce is where all the work lives.",
  },
  {
    n: 33,
    text: "I believe documentation is compounding interest on your past thinking.",
  },
  {
    n: 34,
    text: "I've tried to learn to be comfortable with things that are finished but imperfect.",
  },
  {
    n: 35,
    text: "Hojicha is the underrated tea. Jasmine gets all the credit.",
  },
  {
    n: 36,
    text: "I think about cognitive load more than most people think is normal.",
  },
  { n: 37, text: "I believe most good interfaces are invisible." },
  {
    n: 38,
    text: "I prefer monospace for metadata. It communicates 'this is a different kind of information'.",
  },
  {
    n: 39,
    text: "I get unreasonably excited when a force-directed graph settles into its final state.",
  },
  {
    n: 40,
    text: "I believe constraints are secretly gifts. The design brief disguised as a limitation.",
  },
  {
    n: 41,
    text: "The first interface I remember was a beige desktop with an off-blue screen.",
  },
  {
    n: 42,
    text: "I have a bias toward building things that didn't exist before.",
  },
  {
    n: 43,
    text: "I believe that what you're procrastinating on is usually the most important thing.",
  },
  {
    n: 44,
    text: "I color-code my calendar. It's the only way I can see my time at a glance.",
  },
  {
    n: 45,
    text: "Chess endgames are about pawn structure. Everything else is tactics.",
  },
  {
    n: 46,
    text: "I believe asking 'why' one more time than feels comfortable is always worth it.",
  },
  { n: 47, text: "I find it harder to name things well than to build them." },
  {
    n: 48,
    text: "I believe in building in public, even when the thing isn't ready.",
  },
  {
    n: 49,
    text: "My favorite design principle is: details matter → start with why.",
  },
  { n: 50, text: "Halfway." },
  {
    n: 51,
    text: "I believe you can tell a lot about how someone thinks by what tools they reach for.",
  },
  {
    n: 52,
    text: "I'm more interested in why something feels effortless than in how it looks.",
  },
  {
    n: 53,
    text: "The best meetings I've ever been in ended early because we figured it out.",
  },
  {
    n: 54,
    text: "I believe communities built around shared curiosity are better than those built around shared identity.",
  },
  {
    n: 55,
    text: "I reread the same few books every few years. They mean different things each time.",
  },
  {
    n: 56,
    text: "I believe haptic feedback is the most underused high-bandwidth channel in interface design.",
  },
  { n: 57, text: "I lose track of time when I'm mapping a complex system." },
  {
    n: 58,
    text: "I think the map is not the territory, and forgetting this causes most design mistakes.",
  },
  { n: 59, text: "I believe that dead ends are research, not failure." },
  {
    n: 60,
    text: "I have a theory that the best ideas come from the space between two disciplines.",
  },
  {
    n: 61,
    text: "Pokémon is the first system I ever tried to fully understand. Still working on it.",
  },
  {
    n: 62,
    text: "I learned more from the things I built that failed than from the ones that succeeded.",
  },
  {
    n: 63,
    text: "I believe that making something is different from understanding something, and both matter.",
  },
  {
    n: 64,
    text: "I think stargazing and systems thinking are the same impulse at different scales.",
  },
  { n: 65, text: "I am very particular about the weight of a pen." },
  {
    n: 66,
    text: "I believe that second-order thinking is the most underused tool in product decisions.",
  },
  {
    n: 67,
    text: "I'd rather ship something that embarrasses me slightly than not ship at all.",
  },
  {
    n: 68,
    text: "I think the reason interfaces feel like fighting is that they were designed in the wrong context.",
  },
  {
    n: 69,
    text: "I believe that what you're avoiding is usually what most needs your attention.",
  },
  {
    n: 70,
    text: "I've been the person who stayed to clean up after the event. I think that matters.",
  },
  {
    n: 71,
    text: "I believe feedback loops are the mechanism of everything. No loop, no learning.",
  },
  { n: 72, text: "I think the antilibrary is more honest than the library." },
  {
    n: 73,
    text: "Oscar Wilde is funnier than most people give him credit for.",
  },
  {
    n: 74,
    text: "I believe that cognitive load in EVA suits and cognitive load in checkout flows are the same problem at different stakes.",
  },
  { n: 75, text: "I keep a running list of things I don't understand yet." },
  {
    n: 76,
    text: "I think the ceramics section of a thrift store is always worth checking.",
  },
  { n: 77, text: "I believe writing is thinking made visible." },
  {
    n: 78,
    text: "The specific sound of a kettle at exactly the right temperature is one of my favorite sounds.",
  },
  {
    n: 79,
    text: "I believe most systems fail at the edges, and the edges are where you should design first.",
  },
  {
    n: 80,
    text: "I have a bias toward purple. It wasn't intentional. It just kept showing up.",
  },
  {
    n: 81,
    text: "I believe the interface you're avoiding designing is the one that needs the most thought.",
  },
  {
    n: 82,
    text: "I think libraries are one of the best things humans have built.",
  },
  {
    n: 83,
    text: "I believe that what makes something feel effortless took a lot of effort.",
  },
  { n: 84, text: "I get genuinely excited about information architecture." },
  {
    n: 85,
    text: "I think Tufte is right that information design is a moral act.",
  },
  {
    n: 86,
    text: "I believe that the best communities I've been part of were built on generosity.",
  },
  {
    n: 87,
    text: "I keep a physical sketchbook even when I'm working entirely digitally.",
  },
  {
    n: 88,
    text: "I believe that most product decisions look different when you ask who they're actually for.",
  },
  {
    n: 89,
    text: "I think inversion - asking what would guarantee failure - is underrated as a design tool.",
  },
  {
    n: 90,
    text: "I believe that every interface has a designer behind it who made choices. Good or bad.",
  },
  { n: 91, text: "I am very susceptible to a well-designed loading state." },
  {
    n: 92,
    text: "I believe that building with constraints is more interesting than building without them.",
  },
  {
    n: 93,
    text: "I've been told I ask too many questions. I consider this a feature.",
  },
  {
    n: 94,
    text: "I think the fact that you're reading this means something about who you are.",
  },
  {
    n: 95,
    text: "I believe that the best personal websites feel like actually spending time with a person.",
  },
  {
    n: 96,
    text: "I'm still figuring most of this out. That feels like the point.",
  },
  {
    n: 97,
    text: "I believe that making the tea before making the decision is almost always the right call.",
  },
  {
    n: 98,
    text: "I think the gap between understanding and mastery is where all the interesting work happens.",
  },
  {
    n: 99,
    text: "I believe that whoever you are, you found this page for a reason.",
  },
  { n: 100, text: "I'm glad you read this far." },
];

export default function HundredThings() {
  const [highlight, setHighlight] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = search
    ? things.filter((t) => t.text.toLowerCase().includes(search.toLowerCase()))
    : things;

  return (
    <div
      style={{
        fontFamily: "system-ui,sans-serif",
        background: "#f8f7ff",
        minHeight: "100vh",
        padding: "2rem 1rem",
        color: "#1a1a2e",
      }}
    >
      <style>{`* { box-sizing:border-box;margin:0;padding:0; } input{outline:none;font-family:system-ui,sans-serif;}`}</style>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              color: "#7c3aed",
              marginBottom: 6,
            }}
          >
            a self-portrait in list form;
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            100 Things About Me ✦
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
            The kind of stuff that doesn't fit anywhere else. Read all of it or
            search for something specific.
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.1)",
            fontSize: 13,
            marginBottom: 20,
            background: "#fff",
          }}
        />

        {search && (
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "#9ca3af",
              marginBottom: 14,
            }}
          >
            {filtered.length} results
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {filtered.map((item, i) => {
            const isHigh = highlight === item.n;
            const isSpecial = item.n === 50 || item.n === 100;
            return (
              <div
                key={item.n}
                onMouseEnter={() => setHighlight(item.n)}
                onMouseLeave={() => setHighlight(null)}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "10px 12px",
                  borderRadius: 8,
                  background: isHigh ? "rgba(124,58,237,0.05)" : "transparent",
                  transition: "background 0.15s",
                  cursor: "default",
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    color: isSpecial ? "#7c3aed" : "rgba(124,58,237,0.2)",
                    width: 28,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {String(item.n).padStart(2, "0")}
                </span>
                <p
                  style={{
                    fontSize: isSpecial ? 15 : 14,
                    lineHeight: 1.65,
                    color: isSpecial ? "#7c3aed" : "#374151",
                    fontWeight: isSpecial ? 600 : 400,
                    fontStyle: item.n === 50 ? "italic" : "normal",
                  }}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {!search && (
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "#c4b5fd",
              textAlign: "center",
              marginTop: 28,
            }}
          >
            100 / 100 ✦
          </p>
        )}
      </div>
    </div>
  );
}
