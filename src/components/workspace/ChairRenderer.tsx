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

  // When standing, user pushes chair back slightly to give room to stand
  const chairOffsetY = isStanding ? 28 : 8;

  return (
    <motion.div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none flex flex-col items-center"
      animate={{ y: chairOffsetY, scale: isStanding ? 0.96 : 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* 1. Monis Ergonomic 4D Mesh Chair */}
      {chairId === "chair-ergonomic-mesh" && (
        <div className="relative flex flex-col items-center">
          {/* Adjustable Neck/Headrest */}
          <div
            className="w-16 h-8 rounded-xl border border-white/10 shadow-md flex items-center justify-center relative z-20"
            style={{ backgroundColor: activeColors.mesh }}
          >
            <div className="w-10 h-1 bg-white/20 rounded-full" />
            {/* Headrest Mount Stalk */}
            <div className="absolute -bottom-2.5 w-2 h-3 bg-neutral-800" />
          </div>

          {/* Ergonomic Curved Mesh Backrest */}
          <div className="relative mt-1">
            <div
              className="w-36 h-40 rounded-t-3xl rounded-b-2xl border-2 border-neutral-800 shadow-xl overflow-hidden relative flex flex-col items-center justify-center"
              style={{ backgroundColor: activeColors.frame }}
            >
              {/* Breathable Mesh Grid Texture */}
              <div
                className="absolute inset-1.5 rounded-t-2xl rounded-b-xl opacity-80"
                style={{
                  backgroundColor: activeColors.mesh,
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0)",
                  backgroundSize: "6px 6px",
                }}
              />

              {/* Lumbar Spine Support Bar */}
              <div
                className="absolute bottom-5 w-24 h-4 rounded-full border border-white/15 shadow-md flex items-center justify-center"
                style={{ backgroundColor: activeColors.accent }}
              >
                <div className="w-12 h-1 bg-white/30 rounded-full" />
              </div>
            </div>

            {/* 4D Armrests (Left & Right) */}
            <div className="absolute top-16 -left-5 w-5 h-16 bg-neutral-900 rounded-t-lg rounded-b-sm border border-white/10 shadow-md">
              <div className="w-6 -ml-0.5 h-3 bg-neutral-800 rounded-md border-t border-white/20" />
            </div>
            <div className="absolute top-16 -right-5 w-5 h-16 bg-neutral-900 rounded-t-lg rounded-b-sm border border-white/10 shadow-md">
              <div className="w-6 -ml-0.5 h-3 bg-neutral-800 rounded-md border-t border-white/20" />
            </div>
          </div>

          {/* Contoured Seat Cushion */}
          <div
            className="w-44 h-12 -mt-2 rounded-2xl border-t border-white/15 shadow-2xl relative z-10 flex items-center justify-center"
            style={{ backgroundColor: activeColors.frame }}
          >
            <div
              className="w-[90%] h-8 rounded-xl shadow-inner"
              style={{ backgroundColor: activeColors.mesh }}
            />
          </div>

          {/* Gas Lift Hydraulic Cylinder */}
          <div className="w-4 h-9 bg-gradient-to-r from-neutral-700 via-neutral-400 to-neutral-800 shadow-inner" />

          {/* 5-Star Spider Caster Base */}
          <div className="relative w-44 h-6 flex justify-center items-center">
            {/* Base Hub */}
            <div className="w-6 h-6 rounded-full bg-neutral-800 border border-white/10 shadow-md relative z-10" />
            {/* Base Legs */}
            <div className="absolute w-36 h-2 bg-neutral-900 rounded-full" />
            <div className="absolute w-28 h-2 bg-neutral-900 rounded-full rotate-45" />
            <div className="absolute w-28 h-2 bg-neutral-900 rounded-full -rotate-45" />
            {/* Casters */}
            <div className="absolute -left-1 bottom-0 w-3 h-3 rounded-full bg-black border border-neutral-700" />
            <div className="absolute -right-1 bottom-0 w-3 h-3 rounded-full bg-black border border-neutral-700" />
            <div className="absolute left-8 -bottom-1 w-3 h-3 rounded-full bg-black border border-neutral-700" />
            <div className="absolute right-8 -bottom-1 w-3 h-3 rounded-full bg-black border border-neutral-700" />
          </div>
        </div>
      )}

      {/* 2. Full-Pellicle Mesh Pro Chair (Aeron Style) */}
      {chairId === "chair-aeron-style" && (
        <div className="relative flex flex-col items-center">
          {/* Iconic Aeron Curvature Frame */}
          <div className="relative">
            <div
              className="w-38 h-44 rounded-[2.5rem] border-4 border-slate-700 shadow-2xl overflow-hidden relative flex flex-col items-center justify-center"
              style={{ backgroundColor: "#0f172a" }}
            >
              {/* Pellicle Suspension Weave */}
              <div
                className="absolute inset-1 rounded-[2rem] opacity-75"
                style={{
                  backgroundColor: activeColors.mesh,
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1.2px, transparent 0)",
                  backgroundSize: "5px 5px",
                }}
              />

              {/* PostureFit SL Twin Lumbar Pads */}
              <div className="absolute bottom-6 flex gap-2">
                <div className="w-8 h-10 rounded-lg bg-neutral-800 border border-white/10 shadow-inner" />
                <div className="w-8 h-10 rounded-lg bg-neutral-800 border border-white/10 shadow-inner" />
              </div>
            </div>

            {/* Die-cast Aluminum Armrests */}
            <div className="absolute top-18 -left-6 w-6 h-14 bg-neutral-900 rounded-md border border-slate-600">
              <div className="w-8 -ml-1 h-3.5 bg-slate-800 rounded-full border border-white/10" />
            </div>
            <div className="absolute top-18 -right-6 w-6 h-14 bg-neutral-900 rounded-md border border-slate-600">
              <div className="w-8 -ml-1 h-3.5 bg-slate-800 rounded-full border border-white/10" />
            </div>
          </div>

          {/* Waterfall Front Seat Pan */}
          <div className="w-44 h-11 -mt-3 rounded-[1.8rem] bg-slate-900 border-2 border-slate-700 shadow-2xl relative z-10 flex items-center justify-center overflow-hidden">
            <div
              className="w-[90%] h-7 rounded-xl opacity-80"
              style={{
                backgroundColor: activeColors.mesh,
                backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 0)",
                backgroundSize: "5px 5px",
              }}
            />
          </div>

          {/* Chrome Cylinder */}
          <div className="w-4 h-9 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-500 shadow-md" />

          {/* Cast Aluminum Base */}
          <div className="relative w-44 h-6 flex justify-center items-center">
            <div className="w-6 h-6 rounded-full bg-slate-400 border border-white shadow-md relative z-10" />
            <div className="absolute w-36 h-2 bg-slate-500 rounded-full" />
            <div className="absolute w-28 h-2 bg-slate-500 rounded-full rotate-45" />
            <div className="absolute w-28 h-2 bg-slate-500 rounded-full -rotate-45" />
            {/* Casters */}
            <div className="absolute -left-1 bottom-0 w-3 h-3 rounded-full bg-slate-950 border border-slate-600" />
            <div className="absolute -right-1 bottom-0 w-3 h-3 rounded-full bg-slate-950 border border-slate-600" />
            <div className="absolute left-8 -bottom-1 w-3 h-3 rounded-full bg-slate-950 border border-slate-600" />
            <div className="absolute right-8 -bottom-1 w-3 h-3 rounded-full bg-slate-950 border border-slate-600" />
          </div>
        </div>
      )}

      {/* 3. Executive Comfort Lounge Chair */}
      {chairId === "chair-executive-leather" && (
        <div className="relative flex flex-col items-center">
          {/* Integrated Pillow Headrest */}
          <div
            className={`w-24 h-10 rounded-xl bg-gradient-to-b ${activeColors.leather} border-t border-white/20 shadow-lg relative z-20 flex items-center justify-center`}
          >
            <div className="w-16 h-1 bg-black/30 rounded-full" />
          </div>

          {/* Tufted Leather Backrest */}
          <div
            className={`w-40 h-40 -mt-1 rounded-2xl bg-gradient-to-b ${activeColors.leather} border border-white/10 shadow-2xl relative flex flex-col items-center justify-around py-3`}
          >
            {/* Tufting Channels */}
            <div className="w-28 h-7 rounded-lg bg-black/20 border-t border-white/10" />
            <div className="w-30 h-7 rounded-lg bg-black/20 border-t border-white/10" />
            <div className="w-32 h-8 rounded-lg bg-black/25 border-t border-white/10" />

            {/* Padded Leather Armrests */}
            <div className="absolute top-12 -left-5 w-5 h-20 bg-neutral-900 rounded-xl border border-white/10 shadow-lg">
              <div
                className={`w-7 -ml-1 h-12 rounded-lg bg-gradient-to-b ${activeColors.leather} border-t border-white/20`}
              />
            </div>
            <div className="absolute top-12 -right-5 w-5 h-20 bg-neutral-900 rounded-xl border border-white/10 shadow-lg">
              <div
                className={`w-7 -ml-1 h-12 rounded-lg bg-gradient-to-b ${activeColors.leather} border-t border-white/20`}
              />
            </div>
          </div>

          {/* Thick Leather Seat Pan */}
          <div
            className={`w-46 h-13 -mt-2 rounded-2xl bg-gradient-to-b ${activeColors.leather} border-t-2 border-white/25 shadow-2xl relative z-10 flex items-center justify-center`}
          >
            <div className="w-[85%] h-8 rounded-xl bg-black/20" />
          </div>

          {/* Heavy Duty Piston */}
          <div className="w-5 h-8 bg-gradient-to-r from-neutral-600 via-neutral-300 to-neutral-700" />

          {/* Polished Chrome Base */}
          <div className="relative w-44 h-6 flex justify-center items-center">
            <div className="w-6 h-6 rounded-full bg-slate-300 border border-white shadow-md relative z-10" />
            <div className="absolute w-36 h-2.5 bg-slate-300 rounded-full shadow" />
            <div className="absolute w-28 h-2.5 bg-slate-300 rounded-full rotate-45" />
            <div className="absolute w-28 h-2.5 bg-slate-300 rounded-full -rotate-45" />
            <div className="absolute -left-1 bottom-0 w-3 h-3 rounded-full bg-stone-900 border border-slate-400" />
            <div className="absolute -right-1 bottom-0 w-3 h-3 rounded-full bg-stone-900 border border-slate-400" />
            <div className="absolute left-8 -bottom-1 w-3 h-3 rounded-full bg-stone-900 border border-slate-400" />
            <div className="absolute right-8 -bottom-1 w-3 h-3 rounded-full bg-stone-900 border border-slate-400" />
          </div>
        </div>
      )}

      {/* 4. Ergonomic Active Wobble Stool */}
      {chairId === "chair-active-stool" && (
        <div className="relative flex flex-col items-center">
          {/* Rounded Saddle Seat Cushion */}
          <div
            className="w-28 h-12 rounded-full border-t-2 border-white/20 shadow-2xl relative z-20 flex items-center justify-center"
            style={{ backgroundColor: activeColors.mesh }}
          >
            <div className="w-20 h-6 rounded-full bg-black/25" />
            {/* Height Trigger Lever */}
            <div className="absolute -bottom-1 right-2 w-3 h-2 bg-neutral-700 rounded-full" />
          </div>

          {/* Telescoping Piston Column */}
          <div className="w-4 h-24 bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-900 shadow-inner" />

          {/* Counter-Weighted Wobble Dome Base */}
          <div className="w-32 h-10 rounded-b-full bg-gradient-to-b from-neutral-800 to-neutral-950 border-t border-white/15 shadow-2xl relative flex justify-center">
            <div className="w-24 h-1.5 bg-orange-500/80 rounded-full mt-1" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
