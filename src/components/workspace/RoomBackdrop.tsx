"use client";

import { TimeOfDay } from "@/types/workspace";

interface RoomBackdropProps {
  timeOfDay: TimeOfDay;
}

export function RoomBackdrop({ timeOfDay }: RoomBackdropProps) {
  // Color palettes for different times of day
  const ambientSettings = {
    daylight: {
      skyGradient: "from-sky-300 via-amber-50 to-emerald-100",
      wallBg: "from-stone-900 via-neutral-900 to-zinc-950",
      sunGlow: "bg-amber-200/20",
      windowLight: "from-amber-100/15 via-transparent to-transparent",
      palmColor: "#15803d",
      palmShadow: "#14532d",
      floorColor: "from-amber-950/70 via-stone-900 to-neutral-950",
    },
    sunset: {
      skyGradient: "from-rose-400 via-orange-400 to-amber-300",
      wallBg: "from-stone-950 via-zinc-900 to-neutral-950",
      sunGlow: "bg-orange-500/30",
      windowLight: "from-orange-400/25 via-amber-500/10 to-transparent",
      palmColor: "#064e3b",
      palmShadow: "#022c22",
      floorColor: "from-orange-950/50 via-stone-950 to-neutral-950",
    },
    "studio-night": {
      skyGradient: "from-indigo-950 via-slate-900 to-emerald-950",
      wallBg: "from-neutral-950 via-zinc-950 to-black",
      sunGlow: "bg-blue-500/10",
      windowLight: "from-indigo-400/10 via-transparent to-transparent",
      palmColor: "#06281e",
      palmShadow: "#02120e",
      floorColor: "from-stone-950 via-zinc-950 to-black",
    },
  }[timeOfDay];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden transition-colors duration-700 select-none">
      {/* Wall Backdrop */}
      <div className={`absolute inset-0 bg-gradient-to-b ${ambientSettings.wallBg}`} />

      {/* Modern Villa Architectural Grid / Wall Slat Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03]" />

      {/* Large Scenic Bali Villa Window */}
      <div className="absolute top-6 left-1/2 h-[62%] w-[92%] max-w-4xl -translate-x-1/2 overflow-hidden rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xs">
        {/* Sky View */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${ambientSettings.skyGradient} transition-all duration-1000`}
        />

        {/* Sun / Moon Orb */}
        <div
          className={`absolute rounded-full blur-xl transition-all duration-1000 ${ambientSettings.sunGlow} ${
            timeOfDay === "sunset"
              ? "right-1/4 bottom-12 h-40 w-40 bg-orange-500/40"
              : timeOfDay === "daylight"
                ? "top-8 right-1/3 h-32 w-32 bg-amber-200/30"
                : "top-10 right-1/3 h-20 w-20 bg-indigo-200/20"
          }`}
        />

        {/* Tropical Bali Palm Trees Vector Silhouette */}
        <svg
          className="absolute inset-x-0 bottom-0 h-44 w-full text-emerald-900/60 transition-colors duration-1000"
          viewBox="0 0 800 200"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Distant Fronds */}
          <path
            d="M 50 200 Q 120 80 180 120 Q 240 160 320 200 Z"
            fill={ambientSettings.palmShadow}
            opacity="0.6"
          />
          <path
            d="M 560 200 Q 640 60 720 110 Q 770 140 820 200 Z"
            fill={ambientSettings.palmShadow}
            opacity="0.6"
          />
          {/* Main Tropical Palm Leafage */}
          <path
            d="M-20 200 C40 100 120 70 200 200 C230 130 330 90 410 200 C480 110 580 80 680 200 C730 120 810 90 850 200 Z"
            fill={ambientSettings.palmColor}
            opacity="0.85"
          />
        </svg>

        {/* Window Pane Mullions / Minimalist Villa Frame */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-3">
          <div className="border-r border-white/10" />
          <div className="border-r border-white/10" />
          <div className="border-r border-white/0" />
        </div>
        <div
          className="absolute inset-0 border-t border-b border-white/10"
          style={{ top: "45%", height: "2px" }}
        />

        {/* Inward Light Ray Cast */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${ambientSettings.windowLight} transition-opacity duration-1000`}
        />
      </div>

      {/* Bali Teak Hardwood Flooring */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t ${ambientSettings.floorColor} border-t border-white/5 transition-colors duration-700`}
      >
        {/* Floor Wood Grain / Floorboards Perspective */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_60px,rgba(255,255,255,0.06)_61px)] opacity-15" />

        {/* Soft Ambient Shadow on Floor */}
        <div className="absolute bottom-12 left-1/2 h-24 w-[85%] max-w-3xl -translate-x-1/2 rounded-full bg-black/60 blur-2xl" />

        {/* Minimalist Villa Woven Carpet Under Workspace */}
        <div className="absolute bottom-6 left-1/2 h-36 w-[76%] max-w-2xl -translate-x-1/2 rounded-[2rem] border border-white/5 bg-gradient-to-r from-neutral-800/40 via-stone-800/30 to-neutral-800/40 shadow-inner" />
      </div>

      {/* Subtle Villa Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
