"use client";

import { motion } from "motion/react";
import { ChairColor } from "@/types/workspace";

interface ChairRendererProps {
  chairId: string;
  color: ChairColor;
  isStanding: boolean;
  onClick?: () => void;
}

export function ChairRenderer({ chairId, color, isStanding, onClick }: ChairRendererProps) {
  // Color presets
  const colorMap: Record<
    ChairColor,
    { mesh: string; frame: string; accent: string; leather: string }
  > = {
    "stealth-black": {
      mesh: "#1e293b",
      frame: "#0f172a",
      accent: "#334155",
      leather: "from-stone-900 to-zinc-950",
    },
    "mineral-grey": {
      mesh: "#475569",
      frame: "#1e293b",
      accent: "#94a3b8",
      leather: "from-slate-700 to-slate-900",
    },
    "cognac-leather": {
      mesh: "#854d0e",
      frame: "#1c1917",
      accent: "#b45309",
      leather: "from-amber-800 via-amber-900 to-stone-950",
    },
    terracotta: {
      mesh: "#9a3412",
      frame: "#1c1917",
      accent: "#ea580c",
      leather: "from-orange-800 to-stone-950",
    },
  };

  const activeColors = colorMap[color] || colorMap["stealth-black"];

  return (
    <motion.div
      onClick={onClick}
      className="group/chair pointer-events-auto absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center select-none"
      style={{ transformStyle: "preserve-3d", transform: "translateZ(-20px)" }}
      animate={{
        y: isStanding ? 8 : 0,
        scale: isStanding ? 0.96 : 1,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      title="Ergonomic Chair • Click to customize"
    >
      {/* Floating Hover Badge on Chair */}
      <div className="pointer-events-none absolute -top-10 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/20 bg-neutral-900/90 px-2 py-0.5 text-[9px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover/chair:opacity-100">
        🪑 Ergonomic Chair • Click to Select
      </div>
      {/* 1. Monis Ergonomic 4D Mesh Chair */}
      {chairId === "chair-ergonomic-mesh" && (
        <div className="relative flex flex-col items-center">
          {/* Adjustable Neck/Headrest */}
          <div
            className="relative z-20 flex h-7 w-14 items-center justify-center rounded-xl border border-white/10 shadow-md"
            style={{ backgroundColor: activeColors.mesh }}
          >
            <div className="h-1 w-8 rounded-full bg-white/20" />
            <div className="absolute -bottom-2 h-2.5 w-1.5 bg-neutral-800" />
          </div>

          {/* Ergonomic Curved Mesh Backrest */}
          <div className="relative mt-0.5">
            <div
              className="relative flex h-32 w-28 flex-col items-center justify-center overflow-hidden rounded-t-2xl rounded-b-xl border-2 border-neutral-800 shadow-lg"
              style={{ backgroundColor: activeColors.frame }}
            >
              <div
                className="absolute inset-1 rounded-t-xl rounded-b-lg opacity-85"
                style={{
                  backgroundColor: activeColors.mesh,
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 0)",
                  backgroundSize: "5px 5px",
                }}
              />

              {/* Lumbar Spine Support Bar */}
              <div
                className="absolute bottom-4 flex h-3 w-18 items-center justify-center rounded-full border border-white/15 shadow-sm"
                style={{ backgroundColor: activeColors.accent }}
              >
                <div className="h-0.5 w-8 rounded-full bg-white/30" />
              </div>
            </div>

            {/* 4D Armrests */}
            <div className="absolute top-12 -left-3.5 h-12 w-3.5 rounded-t-md border border-white/10 bg-neutral-900 shadow-sm">
              <div className="-ml-0.5 h-2 w-4.5 rounded border-t border-white/20 bg-neutral-800" />
            </div>
            <div className="absolute top-12 -right-3.5 h-12 w-3.5 rounded-t-md border border-white/10 bg-neutral-900 shadow-sm">
              <div className="-ml-0.5 h-2 w-4.5 rounded border-t border-white/20 bg-neutral-800" />
            </div>
          </div>

          {/* Contoured Seat Cushion */}
          <div
            className="relative z-10 -mt-2 flex h-8 w-32 items-center justify-center rounded-xl border-t border-white/15 shadow-xl"
            style={{ backgroundColor: activeColors.frame }}
          >
            <div
              className="h-5 w-[88%] rounded-lg shadow-inner"
              style={{ backgroundColor: activeColors.mesh }}
            />
          </div>

          {/* Gas Lift Hydraulic Cylinder */}
          <div className="h-8 w-3 bg-linear-to-r from-neutral-700 via-neutral-400 to-neutral-800 shadow-inner" />

          {/* 5-Star Spider Caster Base */}
          <div className="relative flex h-5 w-36 items-center justify-center">
            <div className="relative z-10 h-4.5 w-4.5 rounded-full border border-white/10 bg-neutral-800 shadow-sm" />
            <div className="absolute h-1.5 w-30 rounded-full bg-neutral-900" />
            <div className="absolute h-1.5 w-24 rotate-45 rounded-full bg-neutral-900" />
            <div className="absolute h-1.5 w-24 -rotate-45 rounded-full bg-neutral-900" />
            <div className="absolute bottom-0 -left-1 h-2.5 w-2.5 rounded-full border border-neutral-700 bg-black" />
            <div className="absolute -right-1 bottom-0 h-2.5 w-2.5 rounded-full border border-neutral-700 bg-black" />
            <div className="absolute -bottom-0.5 left-6 h-2.5 w-2.5 rounded-full border border-neutral-700 bg-black" />
            <div className="absolute right-6 -bottom-0.5 h-2.5 w-2.5 rounded-full border border-neutral-700 bg-black" />
          </div>
        </div>
      )}

      {/* 2. Full-Pellicle Mesh Pro Chair (Aeron Style) */}
      {chairId === "chair-aeron-style" && (
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <div
              className="relative flex h-34 w-30 flex-col items-center justify-center overflow-hidden rounded-[2rem] border-3 border-slate-700 shadow-xl"
              style={{ backgroundColor: "#0f172a" }}
            >
              <div
                className="absolute inset-1 rounded-[1.7rem] opacity-80"
                style={{
                  backgroundColor: activeColors.mesh,
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 0)",
                  backgroundSize: "4px 4px",
                }}
              />
              <div className="absolute bottom-5 flex gap-1.5">
                <div className="h-8 w-6 rounded-md border border-white/10 bg-neutral-800 shadow-inner" />
                <div className="h-8 w-6 rounded-md border border-white/10 bg-neutral-800 shadow-inner" />
              </div>
            </div>

            <div className="absolute top-14 -left-4 h-12 w-4 rounded border border-slate-600 bg-neutral-900">
              <div className="-ml-0.5 h-2.5 w-5.5 rounded-full border border-white/10 bg-slate-800" />
            </div>
            <div className="absolute top-14 -right-4 h-12 w-4 rounded border border-slate-600 bg-neutral-900">
              <div className="-ml-0.5 h-2.5 w-5.5 rounded-full border border-white/10 bg-slate-800" />
            </div>
          </div>

          <div className="relative z-10 -mt-2 flex h-8 w-34 items-center justify-center overflow-hidden rounded-[1.4rem] border-2 border-slate-700 bg-slate-900 shadow-xl">
            <div
              className="h-5 w-[88%] rounded-lg opacity-80"
              style={{
                backgroundColor: activeColors.mesh,
                backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 0)",
                backgroundSize: "4px 4px",
              }}
            />
          </div>

          <div className="h-8 w-3 bg-linear-to-r from-slate-400 via-slate-100 to-slate-500 shadow-md" />

          <div className="relative flex h-5 w-36 items-center justify-center">
            <div className="relative z-10 h-5 w-5 rounded-full border border-white bg-slate-400 shadow-sm" />
            <div className="absolute h-1.5 w-30 rounded-full bg-slate-500" />
            <div className="absolute h-1.5 w-24 rotate-45 rounded-full bg-slate-500" />
            <div className="absolute h-1.5 w-24 -rotate-45 rounded-full bg-slate-500" />
            <div className="absolute bottom-0 -left-1 h-2.5 w-2.5 rounded-full border border-slate-600 bg-slate-950" />
            <div className="absolute -right-1 bottom-0 h-2.5 w-2.5 rounded-full border border-slate-600 bg-slate-950" />
          </div>
        </div>
      )}

      {/* 3. Executive Comfort Lounge Chair */}
      {chairId === "chair-executive-leather" && (
        <div className="relative flex flex-col items-center">
          <div
            className={`h-7 w-18 rounded-lg bg-linear-to-b ${activeColors.leather} relative z-20 flex items-center justify-center border-t border-white/20 shadow-md`}
          >
            <div className="h-0.5 w-12 rounded-full bg-black/30" />
          </div>

          <div
            className={`-mt-1 h-32 w-32 rounded-xl bg-linear-to-b ${activeColors.leather} relative flex flex-col items-center justify-around border border-white/10 py-2 shadow-xl`}
          >
            <div className="h-5 w-22 rounded-md border-t border-white/10 bg-black/20" />
            <div className="h-5 w-24 rounded-md border-t border-white/10 bg-black/20" />
            <div className="h-6 w-26 rounded-md border-t border-white/10 bg-black/25" />

            <div className="absolute top-10 -left-4 h-16 w-4 rounded-lg border border-white/10 bg-neutral-900 shadow-md">
              <div
                className={`-ml-0.5 h-9 w-5 rounded-md bg-linear-to-b ${activeColors.leather} border-t border-white/20`}
              />
            </div>
            <div className="absolute top-10 -right-4 h-16 w-4 rounded-lg border border-white/10 bg-neutral-900 shadow-md">
              <div
                className={`-ml-0.5 h-9 w-5 rounded-md bg-linear-to-b ${activeColors.leather} border-t border-white/20`}
              />
            </div>
          </div>

          <div
            className={`-mt-2 h-9 w-36 rounded-xl bg-linear-to-b ${activeColors.leather} relative z-10 flex items-center justify-center border-t-2 border-white/25 shadow-xl`}
          >
            <div className="h-5 w-[82%] rounded-lg bg-black/20" />
          </div>

          <div className="h-7 w-3.5 bg-linear-to-r from-neutral-600 via-neutral-300 to-neutral-700" />

          <div className="relative flex h-5 w-36 items-center justify-center">
            <div className="relative z-10 h-5 w-5 rounded-full border border-white bg-slate-300 shadow-sm" />
            <div className="absolute h-2 w-30 rounded-full bg-slate-300 shadow" />
            <div className="absolute h-2 w-24 rotate-45 rounded-full bg-slate-300" />
            <div className="absolute h-2 w-24 -rotate-45 rounded-full bg-slate-300" />
            <div className="absolute bottom-0 -left-1 h-2.5 w-2.5 rounded-full border border-slate-400 bg-stone-900" />
            <div className="absolute -right-1 bottom-0 h-2.5 w-2.5 rounded-full border border-slate-400 bg-stone-900" />
          </div>
        </div>
      )}

      {/* 4. Ergonomic Active Wobble Stool */}
      {chairId === "chair-active-stool" && (
        <div className="relative flex flex-col items-center">
          <div
            className="relative z-20 flex h-9 w-22 items-center justify-center rounded-full border-t-2 border-white/20 shadow-xl"
            style={{ backgroundColor: activeColors.mesh }}
          >
            <div className="h-4 w-16 rounded-full bg-black/25" />
            <div className="absolute right-1.5 -bottom-1 h-1.5 w-2.5 rounded-full bg-neutral-700" />
          </div>

          <div className="h-20 w-3 bg-linear-to-b from-neutral-800 via-neutral-700 to-neutral-900 shadow-inner" />

          <div className="relative flex h-8 w-26 justify-center rounded-b-full border-t border-white/15 bg-linear-to-b from-neutral-800 to-neutral-950 shadow-xl">
            <div className="mt-1 h-1 w-18 rounded-full bg-orange-500/80" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
