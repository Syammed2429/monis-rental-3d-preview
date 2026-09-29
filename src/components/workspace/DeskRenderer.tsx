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
      className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center select-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 1. Stationary Lower Base Columns & Heavy-Duty T-Feet (Firmly pinned to floor) */}
      <div
        className="pointer-events-none absolute bottom-0 z-20 h-34.5 w-115 max-w-115"
        style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
      >
        {/* Left Stationary Column & T-Foot (Centerline: left 80px) */}
        <div
          className="pointer-events-none absolute bottom-0 left-20 flex -translate-x-1/2 flex-col items-center"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Bushing Collar at top of lower column */}
          <div className="flex h-2.5 w-12 items-center justify-center rounded-t-sm border border-white/20 bg-neutral-950 shadow-md">
            <div className="h-1 w-9 rounded-xs bg-black/90" />
          </div>

          {/* Lower Outer Stationary Column */}
          <div
            className={`h-28 w-11 ${currentFinish.legColor} relative overflow-hidden border-x border-white/10 shadow-xl transition-colors duration-500`}
          >
            {/* Subtle inner shadow indicating hollow column sleeve */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-linear-to-b from-black/60 to-transparent" />
            <div className="pointer-events-none absolute top-0 bottom-0 left-1 w-0.5 bg-white/10" />
          </div>

          {/* Heavy-Duty T-Foot resting flat on the floor */}
          <div className="flex h-4 w-24 items-center justify-between rounded-lg border-t border-white/20 bg-neutral-900 px-2 shadow-2xl">
            <div className="h-1.5 w-3 rounded-full bg-neutral-700/80 shadow-inner" />
            <div className="h-1 w-8 rounded-full bg-neutral-800" />
            <div className="h-1.5 w-3 rounded-full bg-neutral-700/80 shadow-inner" />
          </div>
        </div>

        {/* Right Stationary Column & T-Foot (Centerline: right 80px) */}
        <div
          className="pointer-events-none absolute right-20 bottom-0 flex translate-x-1/2 flex-col items-center"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Bushing Collar at top of lower column */}
          <div className="flex h-2.5 w-12 items-center justify-center rounded-t-sm border border-white/20 bg-neutral-950 shadow-md">
            <div className="h-1 w-9 rounded-xs bg-black/90" />
          </div>

          {/* Lower Outer Stationary Column */}
          <div
            className={`h-28 w-11 ${currentFinish.legColor} relative overflow-hidden border-x border-white/10 shadow-xl transition-colors duration-500`}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-linear-to-b from-black/60 to-transparent" />
            <div className="pointer-events-none absolute top-0 bottom-0 left-1 w-0.5 bg-white/10" />
          </div>

          {/* Heavy-Duty T-Foot resting flat on the floor */}
          <div className="flex h-4 w-24 items-center justify-between rounded-lg border-t border-white/20 bg-neutral-900 px-2 shadow-2xl">
            <div className="h-1.5 w-3 rounded-full bg-neutral-700/80 shadow-inner" />
            <div className="h-1 w-8 rounded-full bg-neutral-800" />
            <div className="h-1.5 w-3 rounded-full bg-neutral-700/80 shadow-inner" />
          </div>
        </div>
      </div>

      {/* 2. Elevating Tabletop & Telescoping Upper Segments (Rises smoothly from lower base) */}
      <motion.div
        className="absolute bottom-34.5 z-20 flex w-115 max-w-115 flex-col items-center"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(0px)" }}
        animate={{ y: elevationY }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
      >
        {/* Mounted Items Atop Tabletop (Monitors & Peripherals) - Sibling container with zero pointer capture */}
        {children && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-30 h-0"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(15px)" }}
          >
            {children}
          </div>
        )}

        {/* Dedicated Clickable Wooden Tabletop Surface Assembly */}
        <div
          onClick={onClick}
          className="group/desk pointer-events-auto relative z-20 w-full cursor-pointer"
          title="Motorized Desk • Click to customize finish & height"
        >
          {/* Floating Hover Badge on Desk Surface */}
          <div className="pointer-events-none absolute -top-7 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/20 bg-neutral-900/90 px-2 py-0.5 text-[9px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover/desk:opacity-100">
            🪵 Motorized Desk • Click to Customize
          </div>

          {/* Main Top Bevel & Shadow */}
          <div
            className={`h-11 w-full rounded-2xl ${currentFinish.top} border-t ${currentFinish.bevel} relative overflow-hidden shadow-xl transition-colors duration-500`}
          >
            {/* Subtle Timber Grain / Surface Luster */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent_70%)] opacity-20" />

            {/* Rear Cable Grommet */}
            <div className="absolute top-2 left-1/2 flex h-2.5 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40">
              <div className="h-1 w-4 rounded-full bg-black/70" />
            </div>
          </div>

          {/* Tabletop Front Edge (giving 3D depth) */}
          <div
            className={`h-3 w-full rounded-b-xl ${currentFinish.edge} shadow-md transition-colors duration-500`}
          />

          {/* Under-desk Steel Frame Crossbar */}
          <div className="mx-auto h-3 w-[82%] rounded-b-md bg-neutral-900/90 shadow-inner" />

          {/* Motorized Height Controller Display (Right Hand Side) */}
          <div
            className="pointer-events-auto absolute right-8 -bottom-6 z-30 flex items-center gap-1.5 rounded-md border border-white/15 bg-neutral-900 px-2.5 py-1 shadow-xl transition-all select-none hover:border-emerald-500/60"
            title="Motorized Sit-Stand Memory Controller"
          >
            {/* Digital LED Screen - Click toggles Sitting/Standing preset */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleHeight?.();
              }}
              className="flex items-center gap-1 font-mono text-[11px] font-bold tracking-wider text-emerald-400 transition-colors hover:text-emerald-300"
              title="Click to toggle Sit/Stand preset"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span suppressHydrationWarning>{Math.round(currentHeight)}</span>
              <span className="text-[9px] text-emerald-500/70">cm</span>
            </button>

            {/* Micro Touch Stepper Buttons */}
            <div className="flex flex-col gap-0.5 border-l border-neutral-700 pl-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStepHeight?.(2);
                }}
                disabled={currentHeight >= 118}
                className="text-[9px] leading-none text-neutral-400 transition-all hover:text-emerald-400 active:scale-125 disabled:opacity-30"
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
                className="text-[9px] leading-none text-neutral-400 transition-all hover:text-emerald-400 active:scale-125 disabled:opacity-30"
                title="Lower desk (-2 cm)"
              >
                ▼
              </button>
            </div>
          </div>
        </div>

        {/* Upper Telescoping Steel Leg Segments (Hanging from under-desk frame, sliding inside lower base columns) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[13.5px] z-5"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Left Upper Telescoping Leg (Centerline: left 80px) */}
          <div className="absolute top-0 left-20 -translate-x-1/2">
            <div
              className={`h-18 w-9 ${currentFinish.innerLegColor} relative shadow-md transition-colors duration-500`}
            >
              {/* Vertical machining guide stripe */}
              <div className="absolute inset-y-0 left-1 w-0.5 bg-white/10" />
              <div className="absolute inset-y-0 right-1 w-0.5 bg-black/20" />
            </div>
          </div>

          {/* Right Upper Telescoping Leg (Centerline: right 80px) */}
          <div className="absolute top-0 right-20 translate-x-1/2">
            <div
              className={`h-18 w-9 ${currentFinish.innerLegColor} relative shadow-md transition-colors duration-500`}
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
