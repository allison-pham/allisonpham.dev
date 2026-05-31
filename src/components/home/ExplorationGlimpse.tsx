"use client";
import { useState } from "react";

function AppIcon({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      className="flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
      onClick={onClick}
      aria-label={label}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-mono text-white drop-shadow">{label}</span>
    </button>
  );
}

function RetroComputer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[340px] h-[320px] bg-[#eaeaea] rounded-2xl border-4 border-[#ccc] mx-auto shadow-lg flex flex-col items-center justify-end">
      {/* Screen */}
      <div className="absolute top-5 left-5 right-5 bottom-16 bg-[#4e8683] rounded-lg border-2 border-[#b0b0b0] overflow-hidden flex flex-col items-start justify-start p-4">
        {children}
      </div>
      {/* Base */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-2/3 h-6 bg-[#ccc] rounded-b-lg" />
    </div>
  );
}

function ArticlesApp({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-12 left-10 right-10 bg-white/95 rounded-lg shadow-lg p-4 z-10 border border-gray-300 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-sm">Article Writings</span>
        <button onClick={onClose} className="text-xs px-2 py-0.5 rounded bg-gray-200 hover:bg-gray-300">Close</button>
      </div>
      <ul className="list-disc pl-5 text-sm text-gray-700">
        <li>Why I Love Retro Tech</li>
        <li>Designing for Fun</li>
      </ul>
    </div>
  );
}

function TopicsApp({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-24 left-16 right-16 bg-white/95 rounded-lg shadow-lg p-4 z-10 border border-gray-300 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-sm">Random Topics I Like</span>
        <button onClick={onClose} className="text-xs px-2 py-0.5 rounded bg-gray-200 hover:bg-gray-300">Close</button>
      </div>
      <ul className="list-disc pl-5 text-sm text-gray-700">
        <li>Space Exploration</li>
        <li>Human-Computer Interaction</li>
        <li>Whimsical UI</li>
      </ul>
    </div>
  );
}

export function ExplorationGlimpse() {
  const [openApp, setOpenApp] = useState<null | "articles" | "topics">(null);

  return (
    <div className="flex flex-col items-center py-8">
      <h2 className="text-xl font-bold mb-4">Exploration Glimpse</h2>
      <RetroComputer>
        <div className="absolute top-6 left-6 flex gap-6 z-10">
          <AppIcon icon="📝" label="Articles" onClick={() => setOpenApp("articles")}/>
          <AppIcon icon="💡" label="Topics" onClick={() => setOpenApp("topics")}/>
        </div>
        {openApp === "articles" && <ArticlesApp onClose={() => setOpenApp(null)} />}
        {openApp === "topics" && <TopicsApp onClose={() => setOpenApp(null)} />}
        {/* Default screen content */}
        {!openApp && (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <span className="text-white text-2xl font-serif mb-2">article writings</span>
            <span className="text-white text-2xl font-serif">random topics i like</span>
          </div>
        )}
      </RetroComputer>
    </div>
  );
}
