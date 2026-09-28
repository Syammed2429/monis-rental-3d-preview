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

  // Continuous height calculation from 70cm to 118cm
  const currentHeight = heightCm || (isStanding ? 108 : 74);
  const heightRatio = Math.max(0, Math.min(1, (currentHeight - 70) / (118 - 70)));
  const elevationY = -(heightRatio * 44);

  return (
    <div
      className="absolute inset-x-0 bottom-6 flex flex-col items-center pointer-events-none select-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 1. Stationary Lower Base Columns & Heavy-Duty T-Feet (Firmly pinned to floor) */}
      <div
        className="relative w-[460px] max-w-[460px] flex justify-between px-12 z-10"
        style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
      >
        {/* Left Stationary Foot & Base */}
        <div className="flex flex-col items-center">
          <div className={`w-11 h-20 ${currentFinish.legColor} rounded-t-sm border-x border-white/10 shadow-lg relative overflow-hidden`}>
            {/* Subtle inner shadow indicating hollow column */}
            <div className="absolute inset-x-0 top-0 h-2 bg-black/40" />
          </div>
          <div className="w-24 h-4 bg-neutral-900 rounded-lg border-t border-white/15 shadow-xl flex justify-between px-1.5 items-center">
            <div className="w-3 h-1.5 bg-neutral-700 rounded-full" />
            <div className="w-3 h-1.5 bg-neutral-700 rounded-full" />
          </div>
        </div>

        {/* Right Stationary Foot & Base */}
        <div className="flex flex-col items-center">
          <div className={`w-11 h-20 ${currentFinish.legColor} rounded-t-sm border-x border-white/10 shadow-lg relative overflow-hidden`}>
            {/* Subtle inner shadow indicating hollow column */}
            <div className="absolute inset-x-0 top-0 h-2 bg-black/40" />
          </div>
          <div className="w-24 h-4 bg-neutral-900 rounded-lg border-t border-white/15 shadow-xl flex justify-between px-1.5 items-center">
            <div className="w-3 h-1.5 bg-neutral-700 rounded-full" />
            <div className="w-3 h-1.5 bg-neutral-700 rounded-full" />
          </div>
        </div>
      </div>

      {/* 2. Elevating Tabletop & Telescoping Upper Segments (Rises smoothly from lower base) */}
      <motion.div
        className="absolute bottom-[92px] w-[460px] max-w-[460px] flex flex-col items-center z-20"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(25px)" }}
        animate={{ y: elevationY }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
      >
        {/* Tabletop Surface */}
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
            className="pointer-events-auto absolute -bottom-6 right-8 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-white/15 shadow-xl hover:border-emerald-500/60 transition-all select-none"
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

        {/* Upper Telescoping Steel Leg Segments (Slide down into lower base columns) */}
        <div className="w-[460px] flex justify-between px-13 -mt-1 relative z-5 pointer-events-none">
          {/* Left Upper Telescoping Leg */}
          <div className={`w-9 h-24 ${currentFinish.legColor} border-x border-white/10 transition-colors duration-500 shadow-md`} />

          {/* Right Upper Telescoping Leg */}
          <div className={`w-9 h-24 ${currentFinish.legColor} border-x border-white/10 transition-colors duration-500 shadow-md`} />
        </div>
      </motion.div>
    </div>
  );
}
