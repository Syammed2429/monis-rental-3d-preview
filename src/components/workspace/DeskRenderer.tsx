"use client";

import { motion } from "motion/react";
import { DeskFinish } from "@/types/workspace";

interface DeskRendererProps {
  finish: DeskFinish;
  isStanding: boolean;
  onToggleHeight?: () => void;
}

export function DeskRenderer({ finish, isStanding, onToggleHeight }: DeskRendererProps) {
  // Tabletop styling
  const finishStyles: Record<DeskFinish, { top: string; edge: string; bevel: string; legColor: string }> = {
    "natural-bamboo": {
      top: "bg-gradient-to-b from-[#e3c48f] via-[#d5b074] to-[#c79e60]",
      edge: "bg-[#ad8348]",
      bevel: "border-amber-200/40",
      legColor: "bg-neutral-800",
    },
    walnut: {
      top: "bg-gradient-to-b from-[#5c4033] via-[#4a3328] to-[#39241b]",
      edge: "bg-[#291710]",
      bevel: "border-amber-900/30",
      legColor: "bg-zinc-900",
    },
    "matte-black": {
      top: "bg-gradient-to-b from-[#2a2e39] via-[#21242d] to-[#181a20]",
      edge: "bg-[#111216]",
      bevel: "border-white/10",
      legColor: "bg-neutral-900",
    },
    "minimal-white": {
      top: "bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]",
      edge: "bg-[#cbd5e1]",
      bevel: "border-white/80",
      legColor: "bg-slate-200",
    },
  };

  const currentFinish = finishStyles[finish] || finishStyles["natural-bamboo"];

  // In sitting mode: tabletop is lower (e.g. translateY: 70px)
  // In standing mode: tabletop rises up (translateY: 0px)
  const deskOffsetY = isStanding ? 0 : 64;
  const currentHeightCm = isStanding ? 108 : 74;

  return (
    <div className="absolute inset-x-0 bottom-16 flex flex-col items-center pointer-events-none select-none">
      {/* Desk Group with Motion Elevation */}
      <motion.div
        className="relative w-[90%] max-w-2xl flex flex-col items-center"
        animate={{ y: deskOffsetY }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {/* Tabletop Surface */}
        <div className="relative w-full z-20">
          {/* Main Top Bevel & Shadow */}
          <div
            className={`w-full h-11 rounded-2xl ${currentFinish.top} border-t ${currentFinish.bevel} shadow-xl relative overflow-hidden transition-colors duration-500`}
          >
            {/* Subtle Timber Grain / Surface Luster */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent_70%)]" />

            {/* Rear Cable Grommet */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-2.5 rounded-full bg-black/40 border border-white/10 flex items-center justify-center">
              <div className="w-4 h-1 bg-black/70 rounded-full" />
            </div>
          </div>

          {/* Tabletop Front Edge (giving 3D depth) */}
          <div
            className={`w-full h-3 rounded-b-xl ${currentFinish.edge} shadow-md transition-colors duration-500`}
          />

          {/* Under-desk Steel Frame Crossbar */}
          <div className="mx-auto w-[82%] h-3 bg-neutral-900/90 rounded-b-md shadow-inner" />

          {/* Motorized Height Controller Display (Right Hand Side) */}
          <div
            onClick={onToggleHeight}
            className="pointer-events-auto absolute -bottom-6 right-8 cursor-pointer group flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-white/15 shadow-lg hover:border-emerald-500/60 transition-all hover:scale-105 active:scale-95"
            title="Click to toggle Sit/Stand height"
          >
            {/* Digital LED Screen */}
            <div className="font-mono text-[11px] font-bold tracking-wider text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentHeightCm}</span>
              <span className="text-[9px] text-emerald-500/70">cm</span>
            </div>

            {/* Micro Touch Buttons */}
            <div className="flex flex-col gap-0.5 pl-1 border-l border-neutral-700">
              <span className={`text-[8px] leading-none ${isStanding ? "text-emerald-400" : "text-neutral-500"}`}>▲</span>
              <span className={`text-[8px] leading-none ${!isStanding ? "text-emerald-400" : "text-neutral-500"}`}>▼</span>
            </div>
          </div>
        </div>

        {/* Telescoping Steel Columns / Legs (Left and Right) */}
        <div className="w-[84%] flex justify-between px-6 -mt-1 relative z-10">
          {/* Left Telescoping Leg */}
          <div className="flex flex-col items-center">
            {/* Upper Extending Segment (animates height) */}
            <motion.div
              className={`w-9 ${currentFinish.legColor} border-x border-white/10 transition-colors duration-500`}
              animate={{ height: isStanding ? 134 : 70 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
            {/* Lower Base Column */}
            <div className={`w-11 h-20 ${currentFinish.legColor} rounded-t-sm border-x border-white/10 shadow-lg`} />
            {/* Heavy-Duty T-Foot */}
            <div className="w-24 h-4 bg-neutral-900 rounded-lg border-t border-white/15 shadow-xl flex justify-between px-1.5 items-center">
              <div className="w-3 h-1.5 bg-neutral-700 rounded-full" />
              <div className="w-3 h-1.5 bg-neutral-700 rounded-full" />
            </div>
          </div>

          {/* Right Telescoping Leg */}
          <div className="flex flex-col items-center">
            {/* Upper Extending Segment */}
            <motion.div
              className={`w-9 ${currentFinish.legColor} border-x border-white/10 transition-colors duration-500`}
              animate={{ height: isStanding ? 134 : 70 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
            {/* Lower Base Column */}
            <div className={`w-11 h-20 ${currentFinish.legColor} rounded-t-sm border-x border-white/10 shadow-lg`} />
            {/* Heavy-Duty T-Foot */}
            <div className="w-24 h-4 bg-neutral-900 rounded-lg border-t border-white/15 shadow-xl flex justify-between px-1.5 items-center">
              <div className="w-3 h-1.5 bg-neutral-700 rounded-full" />
              <div className="w-3 h-1.5 bg-neutral-700 rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
