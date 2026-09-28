"use client";

import { motion } from "motion/react";
import { DeskFinish } from "@/types/workspace";

interface DeskRendererProps {
  finish: DeskFinish;
  isStanding: boolean;
  heightCm: number;
  onToggleHeight?: () => void;
  onStepHeight?: (delta: number) => void;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function DeskRenderer({
  finish,
  isStanding,
  heightCm,
  onToggleHeight,
  onStepHeight,
  onClick,
  children,
}: DeskRendererProps) {
  // Tabletop & leg styling
  const finishStyles: Record<
    DeskFinish,
    { top: string; edge: string; bevel: string; legColor: string; innerLegColor: string }
  > = {
    "natural-bamboo": {
      top: "bg-gradient-to-b from-[#e3c48f] via-[#d5b074] to-[#c79e60]",
      edge: "bg-[#ad8348]",
      bevel: "border-amber-200/40",
      legColor: "bg-neutral-800",
      innerLegColor:
        "bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 border-x border-white/10",
    },
    walnut: {
      top: "bg-gradient-to-b from-[#5c4033] via-[#4a3328] to-[#39241b]",
      edge: "bg-[#291710]",
      bevel: "border-amber-900/30",
      legColor: "bg-zinc-900",
      innerLegColor:
        "bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 border-x border-white/10",
    },
    "matte-black": {
      top: "bg-gradient-to-b from-[#2a2e39] via-[#21242d] to-[#181a20]",
      edge: "bg-[#111216]",
      bevel: "border-white/10",
      legColor: "bg-neutral-900",
      innerLegColor:
        "bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 border-x border-white/10",
    },
    "minimal-white": {
      top: "bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]",
      edge: "bg-[#cbd5e1]",
      bevel: "border-white/80",
      legColor: "bg-slate-200",
      innerLegColor:
        "bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 border-x border-slate-300",
    },
  };

  const currentFinish = finishStyles[finish] || finishStyles["natural-bamboo"];

  // Continuous height calculation from 70cm to 118cm
  const currentHeight = heightCm || (isStanding ? 108 : 74);
  const heightRatio = Math.max(0, Math.min(1, (currentHeight - 70) / (118 - 70)));
  const elevationY = -(heightRatio * 52);

  return (
    <div
      className="absolute inset-x-0 bottom-6 flex flex-col items-center pointer-events-none select-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 1. Stationary Lower Base Columns & Heavy-Duty T-Feet (Firmly pinned to floor) */}
      <div
        className="absolute bottom-0 w-[460px] max-w-[460px] h-[138px] pointer-events-none z-20"
        style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
      >
        {/* Left Stationary Column & T-Foot (Centerline: left 80px) */}
        <div
          className="absolute bottom-0 left-[80px] -translate-x-1/2 flex flex-col items-center pointer-events-none"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Bushing Collar at top of lower column */}
          <div className="w-12 h-2.5 bg-neutral-950 rounded-t-sm border border-white/20 shadow-md flex items-center justify-center">
            <div className="w-9 h-1 bg-black/90 rounded-xs" />
          </div>

          {/* Lower Outer Stationary Column */}
          <div
            className={`w-11 h-28 ${currentFinish.legColor} border-x border-white/10 shadow-xl relative overflow-hidden transition-colors duration-500`}
          >
            {/* Subtle inner shadow indicating hollow column sleeve */}
            <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-1 w-0.5 bg-white/10 pointer-events-none" />
          </div>

          {/* Heavy-Duty T-Foot resting flat on the floor */}
          <div className="w-24 h-4 bg-neutral-900 rounded-lg border-t border-white/20 shadow-2xl flex justify-between px-2 items-center">
            <div className="w-3 h-1.5 bg-neutral-700/80 rounded-full shadow-inner" />
            <div className="w-8 h-1 bg-neutral-800 rounded-full" />
            <div className="w-3 h-1.5 bg-neutral-700/80 rounded-full shadow-inner" />
          </div>
        </div>

        {/* Right Stationary Column & T-Foot (Centerline: right 80px) */}
        <div
          className="absolute bottom-0 right-[80px] translate-x-1/2 flex flex-col items-center pointer-events-none"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Bushing Collar at top of lower column */}
          <div className="w-12 h-2.5 bg-neutral-950 rounded-t-sm border border-white/20 shadow-md flex items-center justify-center">
            <div className="w-9 h-1 bg-black/90 rounded-xs" />
          </div>

          {/* Lower Outer Stationary Column */}
          <div
            className={`w-11 h-28 ${currentFinish.legColor} border-x border-white/10 shadow-xl relative overflow-hidden transition-colors duration-500`}
          >
            <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-1 w-0.5 bg-white/10 pointer-events-none" />
          </div>

          {/* Heavy-Duty T-Foot resting flat on the floor */}
          <div className="w-24 h-4 bg-neutral-900 rounded-lg border-t border-white/20 shadow-2xl flex justify-between px-2 items-center">
            <div className="w-3 h-1.5 bg-neutral-700/80 rounded-full shadow-inner" />
            <div className="w-8 h-1 bg-neutral-800 rounded-full" />
            <div className="w-3 h-1.5 bg-neutral-700/80 rounded-full shadow-inner" />
          </div>
        </div>
      </div>

      {/* 2. Elevating Tabletop & Telescoping Upper Segments (Rises smoothly from lower base) */}
      <motion.div
        className="absolute bottom-[138px] w-[460px] max-w-[460px] flex flex-col items-center z-10"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(0px)" }}
        animate={{ y: elevationY }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
      >
        {/* Tabletop Surface Assembly */}
        <div
          onClick={onClick}
          className="relative w-full z-20 pointer-events-auto cursor-pointer"
          title="Configure Desk"
        >
          {/* Mounted Items Atop Tabletop (Monitors & Peripherals) */}
          {children && (
            <div
              className="absolute inset-x-0 top-0 h-0 pointer-events-auto z-10"
              style={{ transformStyle: "preserve-3d", transform: "translateZ(15px)" }}
            >
              {children}
            </div>
          )}

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
            className="pointer-events-auto absolute -bottom-6 right-8 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-white/15 shadow-xl hover:border-emerald-500/60 transition-all select-none z-30"
            title="Motorized Sit-Stand Memory Controller"
          >
            {/* Digital LED Screen - Click toggles Sitting/Standing preset */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleHeight?.();
              }}
              className="font-mono text-[11px] font-bold tracking-wider text-emerald-400 flex items-center gap-1 hover:text-emerald-300 transition-colors"
              title="Click to toggle Sit/Stand preset"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span suppressHydrationWarning>{Math.round(currentHeight)}</span>
              <span className="text-[9px] text-emerald-500/70">cm</span>
            </button>

            {/* Micro Touch Stepper Buttons */}
            <div className="flex flex-col gap-0.5 pl-1.5 border-l border-neutral-700">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStepHeight?.(2);
                }}
                disabled={currentHeight >= 118}
                className="text-[9px] leading-none text-neutral-400 hover:text-emerald-400 active:scale-125 disabled:opacity-30 transition-all"
                title="Raise desk (+2 cm)"
              >
                ▲
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStepHeight?.(-2);
                }}
                disabled={currentHeight <= 70}
                className="text-[9px] leading-none text-neutral-400 hover:text-emerald-400 active:scale-125 disabled:opacity-30 transition-all"
                title="Lower desk (-2 cm)"
              >
                ▼
              </button>
            </div>
          </div>
        </div>

        {/* Upper Telescoping Steel Leg Segments (Hanging from under-desk frame, sliding inside lower base columns) */}
        <div
          className="absolute top-[54px] inset-x-0 pointer-events-none z-5"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Left Upper Telescoping Leg (Centerline: left 80px) */}
          <div className="absolute top-0 left-[80px] -translate-x-1/2">
            <div
              className={`w-9 h-[116px] ${currentFinish.innerLegColor} shadow-md transition-colors duration-500 relative`}
            >
              {/* Vertical machining guide stripe */}
              <div className="absolute inset-y-0 left-1 w-0.5 bg-white/10" />
              <div className="absolute inset-y-0 right-1 w-0.5 bg-black/20" />
            </div>
          </div>

          {/* Right Upper Telescoping Leg (Centerline: right 80px) */}
          <div className="absolute top-0 right-[80px] translate-x-1/2">
            <div
              className={`w-9 h-[116px] ${currentFinish.innerLegColor} shadow-md transition-colors duration-500 relative`}
            >
              <div className="absolute inset-y-0 left-1 w-0.5 bg-white/10" />
              <div className="absolute inset-y-0 right-1 w-0.5 bg-black/20" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
