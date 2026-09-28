"use client";

import { motion } from "motion/react";
import { ChairColor } from "@/types/workspace";

interface ChairRendererProps {
  chairId: string;
  color: ChairColor;
  isStanding: boolean;
}

export function ChairRenderer({ chairId, color, isStanding }: ChairRendererProps) {
  // Color presets
  const colorMap: Record<ChairColor, { mesh: string; frame: string; accent: string; leather: string }> = {
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
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-15 pointer-events-none select-none flex flex-col items-center"
      animate={{
        y: isStanding ? 16 : 0,
        scale: isStanding ? 0.95 : 1,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      {/* 1. Monis Ergonomic 4D Mesh Chair */}
      {chairId === "chair-ergonomic-mesh" && (
        <div className="relative flex flex-col items-center">
          {/* Adjustable Neck/Headrest */}
          <div
            className="w-14 h-7 rounded-xl border border-white/10 shadow-md flex items-center justify-center relative z-20"
            style={{ backgroundColor: activeColors.mesh }}
          >
            <div className="w-8 h-1 bg-white/20 rounded-full" />
            <div className="absolute -bottom-2 w-1.5 h-2.5 bg-neutral-800" />
          </div>

          {/* Ergonomic Curved Mesh Backrest */}
          <div className="relative mt-0.5">
            <div
              className="w-28 h-32 rounded-t-2xl rounded-b-xl border-2 border-neutral-800 shadow-lg overflow-hidden relative flex flex-col items-center justify-center"
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
                className="absolute bottom-4 w-18 h-3 rounded-full border border-white/15 shadow-sm flex items-center justify-center"
                style={{ backgroundColor: activeColors.accent }}
              >
                <div className="w-8 h-0.5 bg-white/30 rounded-full" />
              </div>
            </div>

            {/* 4D Armrests */}
            <div className="absolute top-12 -left-3.5 w-3.5 h-12 bg-neutral-900 rounded-t-md border border-white/10 shadow-sm">
              <div className="w-4.5 -ml-0.5 h-2 bg-neutral-800 rounded border-t border-white/20" />
            </div>
            <div className="absolute top-12 -right-3.5 w-3.5 h-12 bg-neutral-900 rounded-t-md border border-white/10 shadow-sm">
              <div className="w-4.5 -ml-0.5 h-2 bg-neutral-800 rounded border-t border-white/20" />
            </div>
          </div>

          {/* Contoured Seat Cushion */}
          <div
            className="w-32 h-8 -mt-2 rounded-xl border-t border-white/15 shadow-xl relative z-10 flex items-center justify-center"
            style={{ backgroundColor: activeColors.frame }}
          >
            <div
              className="w-[88%] h-5 rounded-lg shadow-inner"
              style={{ backgroundColor: activeColors.mesh }}
            />
          </div>

          {/* Gas Lift Hydraulic Cylinder */}
          <div className="w-3 h-8 bg-gradient-to-r from-neutral-700 via-neutral-400 to-neutral-800 shadow-inner" />

          {/* 5-Star Spider Caster Base */}
          <div className="relative w-36 h-5 flex justify-center items-center">
            <div className="w-4.5 h-4.5 rounded-full bg-neutral-800 border border-white/10 shadow-sm relative z-10" />
            <div className="absolute w-30 h-1.5 bg-neutral-900 rounded-full" />
            <div className="absolute w-24 h-1.5 bg-neutral-900 rounded-full rotate-45" />
            <div className="absolute w-24 h-1.5 bg-neutral-900 rounded-full -rotate-45" />
            <div className="absolute -left-1 bottom-0 w-2.5 h-2.5 rounded-full bg-black border border-neutral-700" />
            <div className="absolute -right-1 bottom-0 w-2.5 h-2.5 rounded-full bg-black border border-neutral-700" />
            <div className="absolute left-6 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-black border border-neutral-700" />
            <div className="absolute right-6 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-black border border-neutral-700" />
          </div>
        </div>
      )}

      {/* 2. Full-Pellicle Mesh Pro Chair (Aeron Style) */}
      {chairId === "chair-aeron-style" && (
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <div
              className="w-30 h-34 rounded-[2rem] border-3 border-slate-700 shadow-xl overflow-hidden relative flex flex-col items-center justify-center"
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
                <div className="w-6 h-8 rounded-md bg-neutral-800 border border-white/10 shadow-inner" />
                <div className="w-6 h-8 rounded-md bg-neutral-800 border border-white/10 shadow-inner" />
              </div>
            </div>

            <div className="absolute top-14 -left-4 w-4 h-12 bg-neutral-900 rounded border border-slate-600">
              <div className="w-5.5 -ml-0.5 h-2.5 bg-slate-800 rounded-full border border-white/10" />
            </div>
            <div className="absolute top-14 -right-4 w-4 h-12 bg-neutral-900 rounded border border-slate-600">
              <div className="w-5.5 -ml-0.5 h-2.5 bg-slate-800 rounded-full border border-white/10" />
            </div>
          </div>

          <div className="w-34 h-8 -mt-2 rounded-[1.4rem] bg-slate-900 border-2 border-slate-700 shadow-xl relative z-10 flex items-center justify-center overflow-hidden">
            <div
              className="w-[88%] h-5 rounded-lg opacity-80"
              style={{
                backgroundColor: activeColors.mesh,
                backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 0)",
                backgroundSize: "4px 4px",
              }}
            />
          </div>

          <div className="w-3 h-8 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-500 shadow-md" />

          <div className="relative w-36 h-5 flex justify-center items-center">
            <div className="w-5 h-5 rounded-full bg-slate-400 border border-white shadow-sm relative z-10" />
            <div className="absolute w-30 h-1.5 bg-slate-500 rounded-full" />
            <div className="absolute w-24 h-1.5 bg-slate-500 rounded-full rotate-45" />
            <div className="absolute w-24 h-1.5 bg-slate-500 rounded-full -rotate-45" />
            <div className="absolute -left-1 bottom-0 w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-600" />
            <div className="absolute -right-1 bottom-0 w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-600" />
          </div>
        </div>
      )}

      {/* 3. Executive Comfort Lounge Chair */}
      {chairId === "chair-executive-leather" && (
        <div className="relative flex flex-col items-center">
          <div
            className={`w-18 h-7 rounded-lg bg-gradient-to-b ${activeColors.leather} border-t border-white/20 shadow-md relative z-20 flex items-center justify-center`}
          >
            <div className="w-12 h-0.5 bg-black/30 rounded-full" />
          </div>

          <div
            className={`w-32 h-32 -mt-1 rounded-xl bg-gradient-to-b ${activeColors.leather} border border-white/10 shadow-xl relative flex flex-col items-center justify-around py-2`}
          >
            <div className="w-22 h-5 rounded-md bg-black/20 border-t border-white/10" />
            <div className="w-24 h-5 rounded-md bg-black/20 border-t border-white/10" />
            <div className="w-26 h-6 rounded-md bg-black/25 border-t border-white/10" />

            <div className="absolute top-10 -left-4 w-4 h-16 bg-neutral-900 rounded-lg border border-white/10 shadow-md">
              <div
                className={`w-5 -ml-0.5 h-9 rounded-md bg-gradient-to-b ${activeColors.leather} border-t border-white/20`}
              />
            </div>
            <div className="absolute top-10 -right-4 w-4 h-16 bg-neutral-900 rounded-lg border border-white/10 shadow-md">
              <div
                className={`w-5 -ml-0.5 h-9 rounded-md bg-gradient-to-b ${activeColors.leather} border-t border-white/20`}
              />
            </div>
          </div>

          <div
            className={`w-36 h-9 -mt-2 rounded-xl bg-gradient-to-b ${activeColors.leather} border-t-2 border-white/25 shadow-xl relative z-10 flex items-center justify-center`}
          >
            <div className="w-[82%] h-5 rounded-lg bg-black/20" />
          </div>

          <div className="w-3.5 h-7 bg-gradient-to-r from-neutral-600 via-neutral-300 to-neutral-700" />

          <div className="relative w-36 h-5 flex justify-center items-center">
            <div className="w-5 h-5 rounded-full bg-slate-300 border border-white shadow-sm relative z-10" />
            <div className="absolute w-30 h-2 bg-slate-300 rounded-full shadow" />
            <div className="absolute w-24 h-2 bg-slate-300 rounded-full rotate-45" />
            <div className="absolute w-24 h-2 bg-slate-300 rounded-full -rotate-45" />
            <div className="absolute -left-1 bottom-0 w-2.5 h-2.5 rounded-full bg-stone-900 border border-slate-400" />
            <div className="absolute -right-1 bottom-0 w-2.5 h-2.5 rounded-full bg-stone-900 border border-slate-400" />
          </div>
        </div>
      )}

      {/* 4. Ergonomic Active Wobble Stool */}
      {chairId === "chair-active-stool" && (
        <div className="relative flex flex-col items-center">
          <div
            className="w-22 h-9 rounded-full border-t-2 border-white/20 shadow-xl relative z-20 flex items-center justify-center"
            style={{ backgroundColor: activeColors.mesh }}
          >
            <div className="w-16 h-4 rounded-full bg-black/25" />
            <div className="absolute -bottom-1 right-1.5 w-2.5 h-1.5 bg-neutral-700 rounded-full" />
          </div>

          <div className="w-3 h-20 bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-900 shadow-inner" />

          <div className="w-26 h-8 rounded-b-full bg-gradient-to-b from-neutral-800 to-neutral-950 border-t border-white/15 shadow-xl relative flex justify-center">
            <div className="w-18 h-1 bg-orange-500/80 rounded-full mt-1" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
