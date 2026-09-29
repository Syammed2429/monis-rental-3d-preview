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
  // Tabletop & hydraulic leg styling
  const finishStyles: Record<
    DeskFinish,
    {
      top: string;
      edge: string;
      bevel: string;
      frameColor: string;
      innerPiston: string;
      outerColumn: string;
      collar: string;
      foot: string;
    }
  > = {
    "natural-bamboo": {
      top: "bg-gradient-to-b from-[#e3c48f] via-[#d5b074] to-[#c79e60]",
      edge: "bg-[#ad8348]",
      bevel: "border-amber-200/40",
      frameColor: "bg-neutral-900 border-neutral-700/60",
      innerPiston:
        "bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 border-x border-neutral-600/50",
      outerColumn: "bg-neutral-850 bg-neutral-900 border-x border-neutral-700/60 shadow-xl",
      collar: "bg-neutral-950 border border-neutral-700/80",
      foot: "bg-neutral-900 border-t border-neutral-700/80",
    },
    walnut: {
      top: "bg-gradient-to-b from-[#5c4033] via-[#4a3328] to-[#39241b]",
      edge: "bg-[#291710]",
      bevel: "border-amber-900/30",
      frameColor: "bg-zinc-950 border-zinc-700/60",
      innerPiston:
        "bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 border-x border-zinc-600/50",
      outerColumn: "bg-zinc-900 border-x border-zinc-700/60 shadow-xl",
      collar: "bg-neutral-950 border border-zinc-700/80",
      foot: "bg-zinc-900 border-t border-zinc-700/80",
    },
    "matte-black": {
      top: "bg-gradient-to-b from-[#2a2e39] via-[#21242d] to-[#181a20]",
      edge: "bg-[#111216]",
      bevel: "border-white/10",
      frameColor: "bg-neutral-950 border-white/10",
      innerPiston:
        "bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 border-x border-white/15",
      outerColumn: "bg-neutral-900 border-x border-white/10 shadow-xl",
      collar: "bg-neutral-950 border border-neutral-700/80",
      foot: "bg-neutral-900 border-t border-white/10",
    },
    "minimal-white": {
      top: "bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]",
      edge: "bg-[#cbd5e1]",
      bevel: "border-white/80",
      frameColor: "bg-slate-300 border-slate-400",
      innerPiston:
        "bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 border-x border-slate-300",
      outerColumn: "bg-slate-200 border-x border-slate-300 shadow-lg",
      collar: "bg-slate-400 border border-slate-500",
      foot: "bg-slate-200 border-t border-slate-300",
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
      {/* 2. Layer 2: Stationary Lower Base Columns & Heavy-Duty T-Feet (z-20, in FRONT of upper piston) */}
      <div
        className="pointer-events-none absolute bottom-0 z-20 h-34.5 w-115 max-w-115"
        style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
      >
        {/* Left Stationary Column & T-Foot (Centerline: left 80px) */}
        <div
          className="pointer-events-none absolute bottom-0 left-20 flex -translate-x-1/2 flex-col items-center"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Engineered Bushing Collar with Rubber Wiper Seal (Upper piston enters here) */}
          <div
            className={`flex h-3 w-11.5 items-center justify-center rounded-t-sm ${currentFinish.collar} shadow-md`}
          >
            <div className="h-1 w-9 rounded-xs border-b border-white/10 bg-black/95 shadow-inner" />
          </div>

          {/* Lower Outer Stationary Column Sleeve */}
          <div
            className={`h-27.5 w-11 ${currentFinish.outerColumn} relative overflow-hidden transition-colors duration-500`}
          >
            {/* Hollow cylinder depth shadow inside collar */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-linear-to-b from-black/80 via-black/40 to-transparent" />
            {/* Outer sleeve highlights */}
            <div className="pointer-events-none absolute top-0 bottom-0 left-1 w-0.5 bg-white/10" />
            <div className="pointer-events-none absolute top-0 right-1 bottom-0 w-0.5 bg-black/30" />
          </div>

          {/* Heavy-Duty Welded T-Foot resting flat on the floor */}
          <div
            className={`flex h-4 w-24 items-center justify-between rounded-lg ${currentFinish.foot} px-2 shadow-2xl`}
          >
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
          {/* Engineered Bushing Collar with Rubber Wiper Seal */}
          <div
            className={`flex h-3 w-11.5 items-center justify-center rounded-t-sm ${currentFinish.collar} shadow-md`}
          >
            <div className="h-1 w-9 rounded-xs border-b border-white/10 bg-black/95 shadow-inner" />
          </div>

          {/* Lower Outer Stationary Column Sleeve */}
          <div
            className={`h-27.5 w-11 ${currentFinish.outerColumn} relative overflow-hidden transition-colors duration-500`}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-linear-to-b from-black/80 via-black/40 to-transparent" />
            <div className="pointer-events-none absolute top-0 bottom-0 left-1 w-0.5 bg-white/10" />
            <div className="pointer-events-none absolute top-0 right-1 bottom-0 w-0.5 bg-black/30" />
          </div>

          {/* Heavy-Duty Welded T-Foot resting flat on the floor */}
          <div
            className={`flex h-4 w-24 items-center justify-between rounded-lg ${currentFinish.foot} px-2 shadow-2xl`}
          >
            <div className="h-1.5 w-3 rounded-full bg-neutral-700/80 shadow-inner" />
            <div className="h-1 w-8 rounded-full bg-neutral-800" />
            <div className="h-1.5 w-3 rounded-full bg-neutral-700/80 shadow-inner" />
          </div>
        </div>
      </div>

      {/* 3. Layer 3: Elevating Tabletop & Controller & Mounted Items (z-30, in FRONT of lower columns) */}
      <motion.div
        className="absolute bottom-34.5 z-30 flex w-115 max-w-115 flex-col items-center"
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
          <div
            className={`mx-auto h-3 w-[84%] rounded-b-md ${currentFinish.frameColor} shadow-inner`}
          />

          {/* Motorized Height Controller Display (Mounted to front underside of desk, translateZ(16px), always in FRONT) */}
          <div
            className="pointer-events-auto absolute right-8 -bottom-6 z-40 flex items-center gap-1.5 rounded-md border border-white/15 bg-neutral-900 px-2.5 py-1 shadow-2xl transition-all select-none hover:border-emerald-500/60"
            style={{ transform: "translateZ(16px)" }}
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

        {/* Upper Hydraulic Actuator Columns (Anchored under desk frame, translateZ(-4px) so piston slides INSIDE lower sleeve) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-14 z-10"
          style={{ transform: "translateZ(-4px)" }}
        >
          {/* Left Upper Hydraulic Actuator Assembly (Centerline: left 80px) */}
          <div className="absolute top-0 left-20 flex -translate-x-1/2 flex-col items-center">
            {/* Upper Mounting Flange / Motor Housing Bracket */}
            <div
              className={`h-2.5 w-11 rounded-b-xs ${currentFinish.frameColor} flex items-center justify-between border-x border-b border-white/10 px-1 shadow-md`}
            >
              <div className="h-1 w-1 rounded-full bg-white/20" />
              <div className="h-0.5 w-5 rounded-full bg-white/10" />
              <div className="h-1 w-1 rounded-full bg-white/20" />
            </div>

            {/* Telescoping Hydraulic Piston Rod */}
            <div
              className={`h-32 w-9 ${currentFinish.innerPiston} relative shadow-md transition-colors duration-500`}
            >
              {/* Center specular cylinder highlight */}
              <div className="absolute inset-y-0 left-1/2 w-2.5 -translate-x-1/2 bg-white/10 blur-[0.5px]" />
              {/* Vertical machining guide stripe */}
              <div className="absolute inset-y-0 left-1 w-0.5 bg-white/15" />
              <div className="absolute inset-y-0 right-1 w-0.5 bg-black/30" />
            </div>
          </div>

          {/* Right Upper Hydraulic Actuator Assembly (Centerline: right 80px) */}
          <div className="absolute top-0 right-20 flex translate-x-1/2 flex-col items-center">
            {/* Upper Mounting Flange / Motor Housing Bracket */}
            <div
              className={`h-2.5 w-11 rounded-b-xs ${currentFinish.frameColor} flex items-center justify-between border-x border-b border-white/10 px-1 shadow-md`}
            >
              <div className="h-1 w-1 rounded-full bg-white/20" />
              <div className="h-0.5 w-5 rounded-full bg-white/10" />
              <div className="h-1 w-1 rounded-full bg-white/20" />
            </div>

            {/* Telescoping Hydraulic Piston Rod */}
            <div
              className={`h-32 w-9 ${currentFinish.innerPiston} relative shadow-md transition-colors duration-500`}
            >
              <div className="absolute inset-y-0 left-1/2 w-2.5 -translate-x-1/2 bg-white/10 blur-[0.5px]" />
              <div className="absolute inset-y-0 left-1 w-0.5 bg-white/15" />
              <div className="absolute inset-y-0 right-1 w-0.5 bg-black/30" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
