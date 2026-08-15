"use client";
import { cn } from "@/src/lib/core-features/utils";
import { projects } from "@/src/lib/main-pages/projects-data";
import { useEffect, useRef, useState } from "react";

type PlantType = "flower" | "tree" | "succulent" | "fern" | "mushroom" | "sprout";

interface Plant {
  id: string;
  title: string;
  status: string;
  year: string;
  type: PlantType;
  x: number; // % position
  size: number; // 0.4 - 1.0
  color: string;
  bloomColor: string;
  swayDuration: number;
}

const STATUS_PLANT: Record<string, PlantType> = {
  shipped: "flower",
  "in progress": "tree",
  ideation: "sprout",
  archived: "mushroom",
};

const YEAR_COLORS: Record<string, { stem: string; bloom: string }> = {
  "2026": { stem: "#7F77DD", bloom: "#AFA9EC" },
  "2025": { stem: "#1D9E75", bloom: "#5DCAA5" },
  "2024": { stem: "#ED93B1", bloom: "#F4C0D1" },
  "2023": { stem: "#EF9F27", bloom: "#F7C875" },
  "2022": { stem: "#378ADD", bloom: "#85B7EB" },
};

function buildPlants(projectList: typeof projects): Plant[] {
  return projectList.map((p, i) => {
    const type = STATUS_PLANT[p.status] ?? "sprout";
    const colors = YEAR_COLORS[p.year] ?? YEAR_COLORS["2025"];
    const size =
      p.status === "shipped"
        ? 0.75 + Math.random() * 0.25
        : p.status === "in progress"
          ? 0.55 + Math.random() * 0.25
          : p.status === "ideation"
            ? 0.3 + Math.random() * 0.2
            : 0.3 + Math.random() * 0.15;
    return {
      id: p.id,
      title: p.title,
      status: p.status,
      year: p.year,
      type,
      x: 5 + (i / projectList.length) * 90 + (Math.random() - 0.5) * 4,
      size,
      color: colors.stem,
      bloomColor: colors.bloom,
      swayDuration: 2.5 + Math.random() * 2,
    };
  });
}

function Flower({ size, color, bloomColor, sway }: { size: number; color: string; bloomColor: string; sway: string }) {
  const h = 80 * size;
  const r = 10 * size;
  return (
    <g style={{ animation: `sway${sway} ease-in-out infinite`, transformOrigin: "50% 100%" }}>
      {/* Stem */}
      <line x1="0" y1="0" x2="0" y2={-h} stroke={color} strokeWidth={2.5 * size} strokeLinecap="round" />
      {/* Leaves */}
      <ellipse
        cx={-8 * size}
        cy={-h * 0.45}
        rx={10 * size}
        ry={5 * size}
        fill={color}
        opacity="0.7"
        transform={`rotate(-30 ${-8 * size} ${-h * 0.45})`}
      />
      <ellipse
        cx={8 * size}
        cy={-h * 0.65}
        rx={10 * size}
        ry={5 * size}
        fill={color}
        opacity="0.7"
        transform={`rotate(30 ${8 * size} ${-h * 0.65})`}
      />
      {/* Petals */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx={0}
          cy={-h - r * 1.2}
          rx={r * 0.55}
          ry={r * 1.1}
          fill={bloomColor}
          transform={`rotate(${deg} 0 ${-h})`}
          opacity="0.9"
        />
      ))}
      {/* Center */}
      <circle cx={0} cy={-h} r={r * 0.6} fill={color} />
    </g>
  );
}

function Tree({ size, color, bloomColor, sway }: { size: number; color: string; bloomColor: string; sway: string }) {
  const h = 90 * size;
  return (
    <g style={{ animation: `sway${sway} ease-in-out infinite`, transformOrigin: "50% 100%" }}>
      <line x1="0" y1="0" x2="0" y2={-h * 0.45} stroke={color} strokeWidth={4 * size} strokeLinecap="round" />
      <ellipse cx={0} cy={-h * 0.72} rx={22 * size} ry={28 * size} fill={bloomColor} opacity="0.85" />
      <ellipse cx={-14 * size} cy={-h * 0.6} rx={16 * size} ry={20 * size} fill={bloomColor} opacity="0.75" />
      <ellipse cx={14 * size} cy={-h * 0.6} rx={16 * size} ry={20 * size} fill={bloomColor} opacity="0.75" />
      <ellipse cx={0} cy={-h * 0.88} rx={14 * size} ry={18 * size} fill={bloomColor} opacity="0.8" />
      {/* Darker center */}
      <ellipse cx={0} cy={-h * 0.72} rx={12 * size} ry={15 * size} fill={color} opacity="0.3" />
    </g>
  );
}

function Sprout({ size, color, sway }: { size: number; color: string; sway: string }) {
  const h = 35 * size;
  return (
    <g style={{ animation: `sway${sway} ease-in-out infinite`, transformOrigin: "50% 100%" }}>
      <line x1="0" y1="0" x2="0" y2={-h} stroke={color} strokeWidth={2 * size} strokeLinecap="round" />
      <ellipse
        cx={-7 * size}
        cy={-h}
        rx={9 * size}
        ry={5 * size}
        fill={color}
        opacity="0.8"
        transform={`rotate(-40 ${-7 * size} ${-h})`}
      />
      <ellipse
        cx={7 * size}
        cy={-h * 0.85}
        rx={9 * size}
        ry={5 * size}
        fill={color}
        opacity="0.8"
        transform={`rotate(40 ${7 * size} ${-h * 0.85})`}
      />
    </g>
  );
}

function Mushroom({
  size,
  color,
  bloomColor,
  sway,
}: {
  size: number;
  color: string;
  bloomColor: string;
  sway: string;
}) {
  const h = 45 * size;
  return (
    <g style={{ animation: `sway${sway} ease-in-out infinite`, transformOrigin: "50% 100%" }}>
      <line x1="0" y1="0" x2="0" y2={-h * 0.5} stroke="#D3D1C7" strokeWidth={3 * size} strokeLinecap="round" />
      <ellipse cx={0} cy={-h * 0.6} rx={18 * size} ry={8 * size} fill="#D3D1C7" opacity="0.6" />
      <path
        d={`M ${-18 * size} ${-h * 0.6} Q 0 ${-h * 1.1} ${18 * size} ${-h * 0.6}`}
        fill={bloomColor}
        opacity="0.7"
      />
      <circle cx={-5 * size} cy={-h * 0.82} r={2.5 * size} fill="white" opacity="0.7" />
      <circle cx={5 * size} cy={-h * 0.76} r={2 * size} fill="white" opacity="0.7" />
      <circle cx={0} cy={-h * 0.92} r={1.5 * size} fill="white" opacity="0.6" />
    </g>
  );
}

function PlantSVG({ plant, sway }: { plant: Plant; sway: string }) {
  switch (plant.type) {
    case "flower":
      return <Flower size={plant.size} color={plant.color} bloomColor={plant.bloomColor} sway={sway} />;
    case "tree":
      return <Tree size={plant.size} color={plant.color} bloomColor={plant.bloomColor} sway={sway} />;
    case "sprout":
      return <Sprout size={plant.size} color={plant.color} sway={sway} />;
    case "mushroom":
      return <Mushroom size={plant.size} color={plant.color} bloomColor={plant.bloomColor} sway={sway} />;
    default:
      return <Sprout size={plant.size} color={plant.color} sway={sway} />;
  }
}

export function ActivityGarden() {
  const [isVisible, setIsVisible] = useState(false);
  const [plants] = useState(() => buildPlants(projects));
  const [hovered, setHovered] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [dims, setDims] = useState({ w: 900, h: 320 });
  const ref = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setDims({ w, h: Math.max(260, w * 0.35) });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const years = [...new Set(projects.map((p) => p.year).filter(Boolean))].sort().reverse();
  const visible = filter === "all" ? plants : plants.filter((p) => p.year === filter || p.status === filter);
  const hoveredProject = hovered ? projects.find((p) => p.id === hovered) : null;

  const swayKeys = [...new Set(plants.map((p) => Math.round(p.swayDuration * 10)))];

  return (
    <section ref={ref} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
      <style>{`
        ${swayKeys
          .map(
            (k) => `
          @keyframes sway${k} {
            0%, 100% { transform: rotate(${-1 - (k % 3) * 0.5}deg); }
            50%       { transform: rotate(${1 + (k % 3) * 0.5}deg); }
          }
        `,
          )
          .join("")}
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div
          className={cn(
            "mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 opacity-0",
            isVisible && "animate-fade-in-up",
          )}
        >
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">garden;</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Activity Garden</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Every project grows as a plant - ideas are sprouts, completed initiatives bloom into flowers
            </p>
          </div>
          <div className="text-right space-y-1">
            <p className="font-mono text-2xl font-bold text-foreground">
              {projects.filter((p) => p.status === "shipped").length}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground tracking-wider">flowers in bloom</p>
          </div>
        </div>

        {/* Filters */}
        <div
          className={cn("flex flex-wrap gap-2 mb-6 opacity-0", isVisible && "animate-fade-in-up")}
          style={{ animationDelay: "100ms" }}
        >
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all",
              filter === "all"
                ? "border-primary bg-primary/15 text-primary"
                : "border-border/60 text-muted-foreground hover:border-primary/30",
            )}
          >
            all seasons
          </button>
          {["shipped", "in progress", "ideation", "archived"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all",
                filter === s
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-primary/30",
              )}
            >
              {s === "shipped"
                ? "🌸 flowers"
                : s === "in progress"
                  ? "🌳 trees"
                  : s === "ideation"
                    ? "🌱 sprouts"
                    : "🍄 archived"}
            </button>
          ))}
          <div className="w-px bg-border/40 self-stretch mx-1" />
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setFilter(y)}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-xs transition-all",
                filter === y
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-primary/30",
              )}
            >
              {y}
            </button>
          ))}
        </div>

        <div className={cn("opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "150ms" }}>
          <div
            ref={containerRef}
            className="relative rounded-2xl border border-border/40 bg-gradient-to-b from-sky-50/30 to-green-50/20 dark:from-slate-900/50 dark:to-slate-800/30 overflow-visible"
            style={{ height: dims.h }}
          >
            {/* Ground */}
            <div
              className="absolute bottom-0 left-0 right-0 h-8 rounded-b-2xl"
              style={{ background: "linear-gradient(to top, rgba(120,160,80,0.2), transparent)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-4 rounded-b-2xl border-t border-green-500/10" />

            {/* Plants */}
            {visible.map((plant) => {
              const px = (plant.x / 100) * dims.w;
              const py = dims.h - 12; // ground level
              const isHov = hovered === plant.id;
              const swayKey = Math.round(plant.swayDuration * 10);

              return (
                <g key={plant.id} style={{ position: "absolute" }}>
                  <svg
                    key={plant.id}
                    style={{
                      position: "absolute",
                      left: px,
                      top: py - 120 * plant.size,
                      width: 80 * plant.size,
                      height: 120 * plant.size,
                      overflow: "visible",
                      cursor: "pointer",
                      filter: isHov ? `drop-shadow(0 0 8px ${plant.color}80)` : "none",
                      transition: "filter 0.2s",
                      transform: filter !== "all" && !visible.includes(plant) ? "opacity-0" : "",
                    }}
                    onMouseEnter={() => setHovered(plant.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setHovered(hovered === plant.id ? null : plant.id)}
                  >
                    <g transform={`translate(${40 * plant.size}, ${120 * plant.size})`}>
                      <PlantSVG plant={plant} sway={String(swayKey)} />
                    </g>
                  </svg>
                </g>
              );
            })}
          </div>

          {/* Hovered plant detail */}
          {hoveredProject && (
            <div className="mt-4 rounded-2xl border border-primary/20 bg-card/50 px-5 py-4 animate-fade-in-up flex items-start gap-4">
              <div className="text-2xl shrink-0">
                {hoveredProject.status === "shipped"
                  ? "🌸"
                  : hoveredProject.status === "in progress"
                    ? "🌳"
                    : hoveredProject.status === "ideation"
                      ? "🌱"
                      : "🍄"}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold text-sm">{hoveredProject.title}</h3>
                  <span className="font-mono text-[10px] text-muted-foreground border border-border/40 rounded-full px-2 py-0.5">
                    {hoveredProject.year}
                  </span>
                  <span className="font-mono text-[10px] border rounded-full px-2 py-0.5 bg-primary/10 text-primary border-primary/30">
                    {hoveredProject.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{hoveredProject.description}</p>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <div className="flex flex-wrap gap-4">
              {[
                { emoji: "🌸", label: "shipped" },
                { emoji: "🌳", label: "in progress" },
                { emoji: "🌱", label: "ideation" },
                { emoji: "🍄", label: "archived" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span>{l.emoji}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>
            <div className="w-px bg-border/40 self-stretch" />
            <div className="flex flex-wrap gap-3">
              {Object.entries(YEAR_COLORS)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([year, c]) => (
                  <div key={year} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.stem }} />
                    <span className="font-mono text-[11px] text-muted-foreground">{year}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
